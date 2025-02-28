const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/', (req, res) => {
  // Fetch counts and total payments
  const stats = {};
  db.get('SELECT COUNT(*) as tenantCount FROM Tenants', (err, row) => {
    if (err) return res.send('Error fetching tenant count');
    stats.tenantCount = row.tenantCount;

    db.get('SELECT COUNT(*) as propertyCount FROM Properties', (err, row) => {
      if (err) return res.send('Error fetching property count');
      stats.propertyCount = row.propertyCount;

      db.get('SELECT SUM(amount) as totalPayments FROM Payments', (err, row) => {
        if (err) return res.send('Error fetching payment total');
        stats.totalPayments = row.totalPayments || 0;
        res.render('home', { stats });
      });
    });
  });
});

module.exports = router;