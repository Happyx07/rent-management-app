const db = require('../config/database');

class Payment {
  // Get all payments with tenant info
  static all(callback) {
    const sql = `
      SELECT p.*, t.first_name, t.last_name 
      FROM Payments p 
      JOIN Tenants t ON p.tenant_id = t.id
    `;
    db.all(sql, [], (err, rows) => {
      callback(err, rows);
    });
  }

  // Add a new payment
  static create(data, callback) {
    const sql = 'INSERT INTO Payments (tenant_id, amount, payment_date, payment_method) VALUES (?, ?, ?, ?)';
    db.run(sql, [data.tenant_id, data.amount, data.payment_date, data.payment_method], (err) => {
      callback(err);
    });
  }
}

module.exports = Payment;