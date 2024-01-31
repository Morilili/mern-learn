const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandling } = require('./middleware/errormiddleware');
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goalRoutes'));

app.use(errorHandling)

app.listen(port, () => console.log(`Server is running on port ${port}`));