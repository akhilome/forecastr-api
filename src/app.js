import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import env from './config/environment';
import router from './routes/index.route';

const { port } = env;

const app = express();

app.use(helmet());

const whitelist = [
  'https://forecstr.now.sh',
  'http://localhost:3000',
  'http://localhost:5000'
];
const corsOptions = {
  origin: whitelist
};

app.use(cors(corsOptions));
app.use('/api/v1', router);

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running'
  });
});

app.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'non-existent path'
  });
});

app.listen(port, () => console.log(`App running on port ${port}`));
