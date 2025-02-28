const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const db = require('./config/database');

const app = express();

// Set up Handlebars
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));



// Routes
// Routes
app.use('/', require('./routes/index')); // Add this line

app.use('/tenants', require('./routes/tenants'));
app.use('/properties', require('./routes/properties'));
app.use('/payments', require('./routes/payments'));

app.get('/', (req, res) => {
  res.render('home'); // We’ll create this file next
});

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});