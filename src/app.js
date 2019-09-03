import express from 'express';
import cors from 'cors';
import env from './config/environment';
import router from './routes/index.route';

const { port } = env;

const app = express();

const whitelist = ['https://forecstr.now.sh'];
const corsOptions = {
  origin: (origin, cb) => {
    if (
      whitelist.indexOf(origin) !== -1 ||
      origin.startsWith('http://localhost')
    ) {
      cb(null, true);
    } else {
      cb(new Error('CORS: Not allowed'));
    }
  }
};

app.use(cors(corsOptions), (err, req, res, next) => {
  if (err) {
    res.status(400).json({ success: false, message: 'blocked by cors' });
  } else {
    next();
  }
});
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
