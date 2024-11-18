require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

//MongoDb connection
const connectDB = require('./db/connect');

// Routes
const authRouter = require('./routes/auth');
const jobRouter = require('./routes/jobs');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// extra packages

// routes
app.get('/', (req, res) => {
  res.send('jobs api');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // Connect to the database
    await connectDB(process.env.MONGODB_URI);
    console.log('Database connection established');

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting the application:', error);
    process.exit(1); // Exit the process if there is an error
  }
};

start();
