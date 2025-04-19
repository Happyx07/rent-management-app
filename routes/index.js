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
        
        // Get recent payments with tenant names
        const query = `
          SELECT p.*, t.first_name || ' ' || t.last_name as tenant_name 
          FROM Payments p
          JOIN Tenants t ON p.tenant_id = t.id
          ORDER BY p.payment_date DESC
          LIMIT 5
        `;
        
        db.all(query, [], (err, recentPayments) => {
          if (err) {
            console.error('Error fetching recent payments:', err);
            recentPayments = [];
          }
          
          // Format payment data
          recentPayments = recentPayments || [];
          recentPayments = recentPayments.map(payment => {
            // Add a status field (just for UI demonstration)
            payment.status = 'paid';
            return payment;
          });
          
          res.render('home', { 
            stats, 
            recentPayments,
            isHome: true 
          });
        });
      });
    });
  });
});

module.exports = router;