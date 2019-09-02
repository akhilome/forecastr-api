import GeocodeService from '../services/geocode.service';
import WeatherService from '../services/weather.service';

class ForecastController {
  static async getForecast(req, res) {
    const { locations } = req.query;

    const coords = await Promise.all(
      locations.split(',').map(loc => GeocodeService.getLatLng(loc))
    );

    const forecasts = await Promise.all(
      coords.map(coord => WeatherService.getDailyForecast(coord))
    );

    const data = forecasts.reduce((acc, cur) => {
      return { ...acc, [cur.location]: cur.forecasts };
    }, {});

    res.status(200).json({
      success: true,
      message: 'forecasts retrieved successfully',
      data
    });
  }
}

export default ForecastController;
