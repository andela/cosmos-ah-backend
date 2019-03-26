import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4000;

// Create global app object
const app = express();

// Express config defaults
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'welcome to cosmos authors haeven'
  });
});

// catch 404 error
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// catch error from database and other errors
app.use((error, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message
    }
  });
  next();
});

app.listen(PORT, () => console.log(`Running on localhost:${PORT}`));

export default app;
