import express from 'express';
import env from './config/environment';

const { port } = env;

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running'
  });
});

app.listen(port, () => console.log(`App running on port ${port}`));
