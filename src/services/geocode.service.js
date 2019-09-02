import fetch from 'node-fetch';
import env from '../config/environment';

const { mapboxToken } = env;

class GeocodeService {
  static async getLatLng(location) {
    const reqURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?limit=1&access_token=${mapboxToken}`;

    const data = await fetch(reqURL);
    const res = await data.json();
    const [longitude, latitude] = res.features[0].geometry.coordinates;
    return { latitude, longitude };
  }
}

export default GeocodeService;
