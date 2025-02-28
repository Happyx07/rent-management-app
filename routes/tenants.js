const express = require('express');
const router = express.Router();
const Tenant = require('../models/Tenant');

// List all tenants
router.get('/', (req, res) => {
  Tenant.all((err, tenants) => {
    if (err) {
      console.error(err);
      res.send('Error fetching tenants');
    } else {
      res.render('tenants/list', { tenants });
    }
  });
});

// Show add tenant form
router.get('/add', (req, res) => {
  res.render('tenants/add');
});

// Handle add tenant form submission
router.post('/add', (req, res) => {
  Tenant.create(req.body, (err) => {
    if (err) {
      console.error(err);
      res.send('Error adding tenant');
    } else {
      res.redirect('/tenants');
    }
  });
});

// Show edit tenant form
router.get('/edit/:id', (req, res) => {
  Tenant.find(req.params.id, (err, tenant) => {
    if (err || !tenant) {
      res.send('Tenant not found');
    } else {
      res.render('tenants/edit', { tenant });
    }
  });
});

// Handle edit tenant form submission
router.post('/edit/:id', (req, res) => {
  Tenant.update(req.params.id, req.body, (err) => {
    if (err) {
      console.error(err);
      res.send('Error updating tenant');
    } else {
      res.redirect('/tenants');
    }
  });
});

module.exports = router;