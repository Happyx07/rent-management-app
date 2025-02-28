const db = require('../config/database');

class Property {
  // Get all properties
  static all(callback) {
    db.all('SELECT * FROM Properties', [], (err, rows) => {
      callback(err, rows);
    });
  }

  // Add a new property
  static create(data, callback) {
    const sql = 'INSERT INTO Properties (landlord_id, address, property_name) VALUES (?, ?, ?)';
    db.run(sql, [data.landlord_id, data.address, data.property_name], (err) => {
      callback(err);
    });
  }

  // Get a property by ID
  static find(id, callback) {
    db.get('SELECT * FROM Properties WHERE id = ?', [id], (err, row) => {
      callback(err, row);
    });
  }

  // Update a property
  static update(id, data, callback) {
    const sql = 'UPDATE Properties SET address = ?, property_name = ? WHERE id = ?';
    db.run(sql, [data.address, data.property_name, id], (err) => {
      callback(err);
    });
  }
}

module.exports = Property;