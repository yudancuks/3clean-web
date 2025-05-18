const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const authRoute = require('./routes/authRoute.js');
const dashboardRoute = require('./routes/dashboardRoute.js');
const adminRoute = require('./routes/adminRoute.js');
const cleanerRoute = require('./routes/cleanerRoute.js');

const serviceRoute = require('./routes/serviceRoute.js');
const packageRoute = require('./routes/packageRoute.js');
const addonRoute = require('./routes/addonRoute.js');
const orderRoute = require('./routes/orderRoute.js');
const invoiceRoute = require('./routes/invoiceRoute.js');


//landing route
const indexRoute = require('./routes/landing/indexRoute.js');

const app = express();

// Use cookie-parser
app.use(cookieParser());

// Other middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set Pug as the template engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use('/public', express.static('public'));

app.use(express.static(path.join(__dirname, "public")));

// Serve Routes
app.use('/', authRoute);
app.use('/', dashboardRoute);
app.use('/', adminRoute);
app.use('/', cleanerRoute);

app.use('/dashboard/services', serviceRoute);
app.use('/dashboard/packages', packageRoute);
app.use('/dashboard/addons', addonRoute);
app.use('/dashboard/orders', orderRoute);
app.use('/dashboard/invoices', invoiceRoute);

app.use('/', indexRoute);

// Catch-all middleware for undefined routes
app.use((req, res) => {
    res.status(404).render('contents/error-404'); // Render a custom 404 page
});

  


// Start the server
const PORT = process.env.PORT || 9000;

app.locals.baseUrl = `http://3cleaningsydney.com:${PORT}`; // Your base URL here

app.listen(PORT, () => {
    console.log(`Frontend running at ${app.locals.baseUrl}`);
});

