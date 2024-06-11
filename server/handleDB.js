const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./mydb.sqlite3", (err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    return;
  }
  console.log("Connected to the SQLite database.");
});

const opportunities = [
  {
    imageUrl:
      "C:\\Users\\n7777\\investment-app\\client\\src\\images\\home2.png",
    id: 1,
    name: "Serene Garden Villas",
    brefDescription: "Luxury living in Alkhaledh Gardens",
    description:
      "A community of high-end residential villas offering a serene lifestyle with green spaces, smart home technology, and communal amenities.",
    potentialReturn: "8% return",
    lowestInvestment: 800,
    totalValue: 85000000,
    unitPrice: 350000,
    numberOfUnits: 240,
    remainingValue: 82000000,
  },
  {
    imageUrl:
      "C:\\Users\\n7777\\investment-app\\client\\src\\images\\home2.png",
    id: 2,
    name: "Eco-friendly Modern Homes",
    brefDescription: "Sustainable homes in Alkamleh Suburb",
    description:
      "Eco-friendly residential project focusing on sustainability, featuring modern designs with solar panels, rainwater harvesting, and energy-efficient appliances.",
    potentialReturn: "6% return",
    lowestInvestment: 1500,
    totalValue: 60000000,
    unitPrice: 200000,
    numberOfUnits: 300,
    remainingValue: 15000,
  },
  {
    imageUrl:
      "C:\\Users\\n7777\\investment-app\\client\\src\\images\\tower.png",
    id: 3,
    name: "Alfaisaliya Tower Enhancement",
    brefDescription: "Renovation of the iconic Alfaisaliya Tower",
    description:
      "Upgrade and modernization of the historic Alfaisaliya Tower, transforming it into a mixed-use development with luxury apartments, offices, and retail space.",
    potentialReturn: "10% return",
    lowestInvestment: 3000,
    totalValue: 200000000,
    unitPrice: 500000,
    numberOfUnits: 400,
    remainingValue: 200000000,
  },
  {
    imageUrl:
      "C:\\Users\\n7777\\investment-app\\client\\src\\images\\home3.png",
    id: 4,
    name: "Nassreh Villa Complex",
    brefDescription: "Contemporary villas in the heart of Alnassreh",
    description:
      "Exclusive gated community offering contemporary villas with private pools, in close proximity to international schools, hospitals, and shopping centers.",
    potentialReturn: "7% return",
    lowestInvestment: 1000,
    totalValue: 95000000,
    unitPrice: 400000,
    numberOfUnits: 238,
    remainingValue: 10000000,
  },
  {
    imageUrl: "C:\\Users\\n7777\\investment-app\\client\\src\\images\\mall.png",
    id: 5,
    name: "Blue Sea Shopping Mall",
    brefDescription: "State-of-the-art commercial complex by the coast",
    description:
      "Development of a premier shopping mall featuring international brands, gourmet dining, and entertainment options, strategically located near the bustling coastline.",
    potentialReturn: "9% return",
    lowestInvestment: 1000,
    totalValue: 120000000,
    unitPrice: 300000,
    numberOfUnits: 400,
    remainingValue: 70000000,
  },
];

// Ensure the table exists
db.serialize(() => {
  const stmt = db.prepare(`
    INSERT INTO opportunities (id, name, bref_description, description, potential_return, lowest_investment, total_value, unit_price, number_of_units, remaining_value, imageUrl)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  opportunities.forEach((opportunity) => {
    stmt.run(
      opportunity.id,
      opportunity.name,
      opportunity.brefDescription,
      opportunity.description,
      opportunity.potentialReturn,
      opportunity.lowestInvestment,
      opportunity.totalValue,
      opportunity.unitPrice,
      opportunity.numberOfUnits,
      opportunity.remainingValue,
      opportunity.imageUrl
    );
  });

  stmt.finalize();
});

db.close();
