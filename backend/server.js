const express = require('express');
const path = require('path')
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
app.use('/api/users', require('./routes/userRoutes'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.use(errorHandling)

app.listen(port, () => console.log(`Server is running on port ${port}`));