import { Router } from 'express';
import forecastRouter from './forecast.route';

const router = Router();

router.use('/forecast', forecastRouter);

export default router;
