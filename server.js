const express = require('express');
const cors = require('cors'); // Import cors package
const app = express();
const port = 8000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3001'
})); // Use cors middleware to enable CORS with specific origin
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const accountsRoute = require('./backend/Routes/Accounts');
app.use('/accounts', accountsRoute);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
