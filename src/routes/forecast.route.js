import { Router } from 'express';
import ForecastController from '../controllers/forecast.controller';

const forecastRouter = Router();

forecastRouter.get('/', ForecastController.getForecast);

export default forecastRouter;
