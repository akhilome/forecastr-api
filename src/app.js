import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const { PORT = 3000 } = process.env;

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running'
  });
});

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
