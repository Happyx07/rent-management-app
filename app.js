const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const db = require('./config/database');

const app = express();

// Set up Handlebars with helpers
app.engine('handlebars', exphbs.engine({ 
  defaultLayout: 'main',
  helpers: {
    eq: function(v1, v2) {
      return v1 === v2;
    },
    formatDate: function(date) {
      if (!date) return '';
      return new Date(date).toLocaleDateString();
    },
    formatCurrency: function(amount) {
      if (!amount) return '$0.00';
      return '$' + parseFloat(amount).toFixed(2);
    }
  }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', require('./routes/index'));
app.use('/tenants', require('./routes/tenants'));
app.use('/properties', require('./routes/properties'));
app.use('/payments', require('./routes/payments'));

// Start server
app.listen(3000, () => {
  console.log('=== RentEase Application ===');
  console.log('Server running on port 3000');
  console.log('Open http://localhost:3000 to view the application');
});