require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT;

const db = new sqlite3.Database(process.env.DATABASE_PATH, (err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    return;
  }
  console.log("Connected to the SQLite database.");
});

app.use(express.json());
app.use(
  cors({
    origin: "https://investment-app-pi.vercel.app/",
    methods: ["GET", "POST", "OPTIONS", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    store: new SQLiteStore({
      db: "sessions.db",
      dir: "./",
    }),
    secret: "Secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      expires: new Date(Date.now() + 86400000), // 24 hours
      secure: false, // Should be set to true in production if using HTTPS
    },
  })
);

app.get("/getSession", (req, res) => {
  if (req.session.user) {
    return res.json({
      valid: true,
      name: req.session.user.name,
      email: req.session.user.email,
    });
  } else {
    return res.json({ valid: false });
  }
});

app.get("/", (req, res) => {
  return res.json("hello");
});

const dbGet = (sql, params) =>
  new Promise((resolve, reject) => {
    db.get(sql, params, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });

const dbRun = (sql, params) =>
  new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this.lastID);
    });
  });

db.run(`CREATE TABLE IF NOT EXISTS accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT ,
    email TEXT UNIQUE,
    password TEXT 
)`);

db.run(`CREATE TABLE IF NOT EXISTS opportunities(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT ,
    bref_description TEXT ,
    description TEXT ,
    potential_return TEXT ,
    lowest_investment INTEGER ,
    total_value INTEGER ,
    unit_price INTEGER ,
    number_of_units INTEGER NULL,
    remaining_value INTEGER,
    imageUrl TEXT

  
  )`);

db.run(`CREATE TABLE IF NOT EXISTS investments(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    opportunity_id INTEGER ,
    amount_invested INTEGER ,
    FOREIGN KEY (user_id) REFERENCES accounts(id),
    FOREIGN KEY (opportunity_id) REFERENCES opportunities(id)
  )`);

app.post("/accounts", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const row = await dbGet("SELECT name FROM accounts WHERE email = ?", [
      email,
    ]);
    if (row) return res.status(409).send("Email already exists.");

    const hashedPassword = await bcrypt.hash(password, 10);
    const lastID = await dbRun(
      "INSERT INTO accounts (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );
    req.session.user = { name: name, email: email };
    res.status(201).send({ id: lastID });
  } catch (err) {
    console.error("Error during database operation:", err.message);
    res.status(500).send("An error occurred while processing your request.");
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await dbGet("SELECT * FROM accounts WHERE email = ?", [email]);
    if (!user) {
      return res.status(412).send("User not found");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(403).send("Invalid credentials");
    }

    req.session.user = { email: user.email, name: user.name };
    res.status(200).send("Login successful");
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).send("An internal server error occurred");
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).send("Logout failed due to server error.");
    }
    res.clearCookie("connect.sid");
    res.send("Logged out successfully");
  });
});

app.put("/updateAccount", async (req, res) => {
  const { name, email, newEmail, password, newPassword } = req.body;

  if (!req.session.user) {
    return res
      .status(401)
      .json({ message: "No session found or unauthorized." });
  }

  const currentUserEmail = req.session.user.email;

  if (email !== currentUserEmail) {
    return res
      .status(401)
      .json({ message: "Unauthorized to update this account." });
  }

  try {
    let updates = {};
    let values = [];

    if (newEmail && newEmail !== currentUserEmail) {
      const emailExists = await dbGet(
        "SELECT email FROM accounts WHERE email = ?",
        [newEmail]
      );
      if (emailExists) {
        return res.status(409).json({ message: "Email already in use." });
      }
      updates.email = newEmail;
      values.push(newEmail);
    }

    if (newPassword && password) {
      const user = await dbGet(
        "SELECT password FROM accounts WHERE email = ?",
        [currentUserEmail]
      );
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res
          .status(403)
          .json({ message: "Current password is incorrect." });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      updates.password = hashedPassword;
      values.push(hashedPassword);
    }

    if (name) {
      updates.name = name;
      values.push(name);
    }

    if (Object.keys(updates).length > 0) {
      const setParts = Object.keys(updates)
        .map((key) => `${key} = ?`)
        .join(", ");
      const sql = `UPDATE accounts SET ${setParts} WHERE email = ?`;
      values.push(currentUserEmail);

      await dbRun(sql, values);
      if (updates.email) {
        req.session.user.email = updates.email;
      }
      if (updates.name) {
        req.session.user.name = updates.name;
      }
      res.json({ message: "Account updated successfully." });
    } else {
      res.status(400).json({ message: "No update data provided." });
    }
  } catch (err) {
    console.error("Error updating account:", err.message);
    res
      .status(500)
      .json({ message: "Failed to update account due to server error." });
  }
});

app.post("/invest", async (req, res) => {
  const { email, opprtunityId, amountToInvest } = req.body;
  try {
    // Fetch user ID
    console.log("here");

    const userResult = await dbGet("SELECT id FROM accounts WHERE email = ?", [
      email,
    ]);
    const userId = userResult?.id; // Assuming dbGet returns an object with id property
    if (!userId) {
      return res.status(412).send("User not found");
    }

    // Insert investment data
    const insertResult = await dbRun(
      "INSERT INTO investments (user_id, opportunity_id, amount_invested) VALUES (?, ?, ?)",
      [userId, opprtunityId, amountToInvest]
    );

    // Check if the insertion was successful
    if (insertResult?.lastID) {
      // Assuming dbRun returns an object with lastID property
      res.status(200).send("Investment successful");
    } else {
      res.status(413).send("Failed to insert investment");
    }
  } catch (err) {
    console.error("Investment error:", err.message);
    res.status(500).send("An internal server error occurred");
  }
});



app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
