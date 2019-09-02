import fetch from 'node-fetch';
import env from '../config/environment';
import DAYS_OF_THE_WEEK from '../constants/weekdays.const';

const { darkSkyToken } = env;

class WeatherService {
  /**
   *
   * @param {{ latitude: number, longitude: number }} coords - coordinates object for location
   * @param {number} days - number of days to get forecast for (defaults to 5)
   * @returns {{ day: string, summary: string, minTemp: number, maxTemp: number, avgTemp: number, windSpeed: number }[]} forecasts for specified number of days
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
          day: DAYS_OF_THE_WEEK[day],
          summary: cur.summary,
          minTemp: cur.temperatureMin,
          maxTemp: cur.temperatureMax,
          avgTemp: Number(
            ((cur.temperatureMin + cur.temperatureMax) / 2).toFixed(2)
          ),
          windSpeed: cur.windSpeed
        };

        return [...acc, obj];
      }, [])
      .slice(0, days + 1);

    return formattedData;
  }
}

export default WeatherService;
