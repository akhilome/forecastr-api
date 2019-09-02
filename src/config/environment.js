import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT || 3000,
  mapboxToken: process.env.MAPBOX_TOKEN
};
