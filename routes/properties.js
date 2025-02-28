const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

// List all properties
router.get('/', (req, res) => {
  Property.all((err, properties) => {
    if (err) {
      console.error(err);
      res.send('Error fetching properties');
    } else {
      res.render('properties/list', { properties });
    }
  });
});

// Show add property form
router.get('/add', (req, res) => {
  res.render('properties/add');
});

// Handle add property form submission
router.post('/add', (req, res) => {
  req.body.landlord_id = 1; // Hardcode landlord_id for now
  Property.create(req.body, (err) => {
    if (err) {
      console.error(err);
      res.send('Error adding property');
    } else {
      res.redirect('/properties');
    }
  });
});

// Show edit property form
router.get('/edit/:id', (req, res) => {
  Property.find(req.params.id, (err, property) => {
    if (err || !property) {
      res.send('Property not found');
    } else {
      res.render('properties/edit', { property });
    }
  });
});

// Handle edit property form submission
router.post('/edit/:id', (req, res) => {
  Property.update(req.params.id, req.body, (err) => {
    if (err) {
      console.error(err);
      res.send('Error updating property');
    } else {
      res.redirect('/properties');
    }
  });
});

module.exports = router;