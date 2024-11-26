// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const loggerMiddleware = require('./middlewares/loggerMiddleware'); // Import logger middleware
const dotenv = require('dotenv');
const connectDB = require('./database/dbConfig');
const quizRoutes = require('./routes/quizRoutes');
const morgan = require('morgan');
dotenv.config();
const app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        status: true,
        status_code: 200,
        message: "Welcome to the Quiz Application Backend",
        data: {}
    });
});


// Middleware
app.use(loggerMiddleware); // Use the logger middleware
app.use(bodyParser.json());
app.use(morgan('dev')); 
app.use('/api', quizRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    status: 'error',
    statusCode: 500,
    message: 'Internal Server Error',
    error: err.message,
  });
});

// Connect DB and Start Server
connectDB();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
