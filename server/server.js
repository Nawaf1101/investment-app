const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const PORT = 3001;
const app = express();
const db = new sqlite3.Database('./mydb.sqlite3', (err) => {
    if (err) {
        console.error(err.message);
        return;
    }
    console.log('Connected to SQLite database.');
});

app.use(cors());
app.use(express.json()); // Use Express's built-in JSON parser

// Create table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    password TEXT NOT NULL
)`);

// Endpoint to get accounts
app.get('/accounts', (req, res) => {
    db.all("SELECT * FROM accounts", [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error retrieving data from database');
            return;
        }
        res.json(rows);
    });
});

const hashPassword = (password) => {
    if (typeof password !== 'string' || password.trim() === '') {
        console.error('Invalid password provided for hashing');
        return null;
    }
    const saltRounds = 10; // Number of salt rounds
    return bcrypt.hashSync(password, saltRounds);
}

// Endpoint to add an account
app.post('/accounts', (req, res) => {
    const { name, email, password } = req.body;

    db.get("SELECT email FROM accounts WHERE email = ?", [email], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).send("An error occurred while checking the email.");
            return;
        }
        
        if (row) {
            res.status(409).send("Email already exists."); // 409 Conflict might be appropriate
            return;
        }
        
        // If no existing email is found, proceed to hash the password and create the account
        if (!password || typeof password !== 'string') {
            res.status(400).send('Invalid password provided');
            return;
        }

        const hashedPassword = hashPassword(password);
        if (!hashedPassword) {
            res.status(500).send('Error hashing password');
            return;
        }

        // Insert the new account into the database
        db.run(`INSERT INTO accounts (name, email, password) VALUES (?, ?, ?)`, [name, email, hashedPassword], function(err) {
            if (err) {
                console.error(err.message);
                res.status(500).send('Failed to create account');
                return;
            }
            res.status(201).send({ id: this.lastID });
        });
    });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});