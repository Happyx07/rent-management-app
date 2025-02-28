const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const Tenant = require('../models/Tenant');

router.get('/', (req, res) => {
  Payment.all((err, payments) => {
    if (err) {
      console.error(err);
      res.send('Error fetching payments');
    } else {
      res.render('payments/list', { payments });
    }
  });
});

router.get('/add', (req, res) => {
  Tenant.all((err, tenants) => {
    if (err) {
      res.send('Error fetching tenants');
    } else {
      res.render('payments/add', { tenants });
    }
  });
});

router.post('/add', (req, res) => {
  Payment.create(req.body, (err) => {
    if (err) {
      console.error(err);
      res.send('Error adding payment');
    } else {
      res.redirect('/payments');
    }
  });
});

// Add payment history report
router.get('/report', (req, res) => {
  Payment.all((err, payments) => {
    if (err) {
      console.error(err);
      res.send('Error fetching payment history');
    } else {
      res.render('payments/report', { payments });
    }
  });
});

module.exports = router;