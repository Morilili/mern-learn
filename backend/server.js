const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandling } = require('./middleware/errormiddleware');
const { connectDB } = require('./config/db'); 
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goalRoutes'));

app.use(errorHandling)

app.listen(port, () => console.log(`Server is running on port ${port}`));