import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT || 3000,
  mapboxToken: process.env.MAPBOX_TOKEN,
  darkSkyToken: process.env.DARK_SKY_TOKEN
};
