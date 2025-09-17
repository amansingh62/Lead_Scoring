//Imported Required Packages
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

//Imported Route Handlers
const offerRoutes = require('./routes/offerRoutes');
const leadRoutes = require('./routes/leadRoutes');
const scoreRoutes = require('./routes/scoreRoutes');

//Called environment variable from .env file
dotenv.config();

//Called the function for the database connection
connectDB();

const app = express();

//Middleware to parse incomming JSON requests
app.use(express.json());

//Defined API Routes
app.use('/offer', offerRoutes);
app.use('/leads', leadRoutes);
app.use('/', scoreRoutes);

//Set the server port via env vaiable and default for development
const PORT = process.env.PORT || 5000;

//Started the express server 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));