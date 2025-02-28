const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS Landlords (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT
    )`);
  db.run(`
    CREATE TABLE IF NOT EXISTS Tenants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT UNIQUE,
      phone TEXT
    )`);
  db.run(`
    CREATE TABLE IF NOT EXISTS Properties (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      landlord_id INTEGER NOT NULL,
      address TEXT NOT NULL,
      property_name TEXT,
      FOREIGN KEY (landlord_id) REFERENCES Landlords(id)
    )`);
  db.run(`
    CREATE TABLE IF NOT EXISTS Payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tenant_id INTEGER NOT NULL,
      amount REAL NOT NULL,
      payment_date TEXT NOT NULL,
      payment_method TEXT NOT NULL,
      FOREIGN KEY (tenant_id) REFERENCES Tenants(id)
    )`);

  db.get("SELECT COUNT(*) as count FROM Landlords", (err, row) => {
    if (err) {
      console.error('Error checking Landlords:', err.message);
    } else if (row.count === 0) {
      db.run("INSERT INTO Landlords (name, email, phone) VALUES ('John Doe', 'john@example.com', '555-1234')");
      db.run("INSERT INTO Tenants (first_name, last_name, email, phone) VALUES ('Alice', 'Smith', 'alice@example.com', '555-5678')");
      db.run("INSERT INTO Properties (landlord_id, address, property_name) VALUES (1, '123 Main St', 'Main Apartments')");
      db.run("INSERT INTO Payments (tenant_id, amount, payment_date, payment_method) VALUES (1, 500.00, '2025-02-01', 'Cash')");
      console.log('Inserted sample data');
    }
  });
});

module.exports = db;