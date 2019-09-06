import fetch from 'node-fetch';
import env from '../config/environment';
import DAYS_OF_THE_WEEK from '../constants/weekdays.const';

const { darkSkyToken } = env;

class WeatherService {
  /**
   *
   * @param {{ location: string, latitude: number, longitude: number }} coords - coordinates object for location
   * @param {number} days - number of days to get forecast for (defaults to 5)
   * @returns {{location: string, forecasts: { day: string, summary: string, minTemp: number, maxTemp: number, avgTemp: number, windSpeed: number }[]}} forecasts for specified number of days
   */
  static async getDailyForecast(coords, days = 5) {
    const { latitude, longitude } = coords;
    const reqURL = `https://api.darksky.net/forecast/${darkSkyToken}/${latitude},${longitude}?exclude=currently,minutely,hourly,alerts,flags&units=si`;

    const reqData = await fetch(reqURL);
    const res = await reqData.json();
    const { data } = res.daily;

    const formattedData = data
      .reduce((acc, cur, i) => {
        const day = new Date(Date.now()).getDay() + i;
        const obj = {
          day: i === 0 ? 'Today' : DAYS_OF_THE_WEEK[day],
          summary: cur.summary,
          minTemp: Math.round(cur.temperatureMin),
          maxTemp: Math.round(cur.temperatureMax),
          avgTemp: Math.round((cur.temperatureMin + cur.temperatureMax) / 2),
          windSpeed: cur.windSpeed
        };

        return [...acc, obj];
      }, [])
      .slice(0, days + 1);

    return { location: coords.location, forecasts: formattedData };
  }
}

export default WeatherService;
