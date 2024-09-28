import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: process.env.PORT || 3000,
    OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY,
    REDIS: {
        REDIS_URL: process.env.REDIS_URL,
        REDIS_TTL: process.env.REDIS_TTL,
    }
}