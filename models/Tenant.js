const db = require('../config/database');

class Tenant {
  // Get all tenants
  static all(callback) {
    db.all('SELECT * FROM Tenants', [], (err, rows) => {
      callback(err, rows);
    });
  }

  // Add a new tenant
  static create(data, callback) {
    const sql = 'INSERT INTO Tenants (first_name, last_name, email, phone) VALUES (?, ?, ?, ?)';
    db.run(sql, [data.first_name, data.last_name, data.email, data.phone], (err) => {
      callback(err);
    });
  }

  // Get a tenant by ID
  static find(id, callback) {
    db.get('SELECT * FROM Tenants WHERE id = ?', [id], (err, row) => {
      callback(err, row);
    });
  }

  // Update a tenant
  static update(id, data, callback) {
    const sql = 'UPDATE Tenants SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE id = ?';
    db.run(sql, [data.first_name, data.last_name, data.email, data.phone, id], (err) => {
      callback(err);
    });
  }
}

module.exports = Tenant;