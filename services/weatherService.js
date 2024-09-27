import { 
    apiClient, 
    apiGeoClient 
} from "../utils/apiClient.js";
import { redisClient } from "../utils/redisClient.js";
import config from "../config/config.js";

const REDIS_TTL = config.REDIS.REDIS_TTL || 600;

// Generate Redis key based on type (city or coordinates) and identifier (city name or coordinates)
const generateRedisKey = (type, identifier) => {
    return `weather:${type}:${identifier}`;
};

// Get the coordinates of a city 
export const getCoordinateByCityService = async (city, state, country) => {
    const cacheKey = generateRedisKey('city_coords', city.toLowerCase());

    // Check if the city is in the cache
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
        console.log('City found in cache:', city);
        return JSON.parse(cachedData);
    }

    // If not, get the coordinates from the API
    console.log('City not found in cache:', city);
    try {
        const response = await apiGeoClient.get('direct', {
            params: {
                q: [city, state, country].join(','),
                limit: 1,
            },
        });

        if (response.data.length === 0) {
            throw new Error('City not found');
        }

        const { lat, lon } = response.data[0];

        // Store the coordinates in the cache
        await redisClient.setEx(cacheKey, REDIS_TTL, JSON.stringify({ lat, lon }));

        return {lat, lon};
    } catch (error) {
        throw error;
    }
};

// Get the weather data for a city
export const getWeatherByCityService = async (city, state, country) => {
    const cacheKey = generateRedisKey('city', city.toLowerCase());

    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
        console.log('City found in cache:', city);
        return JSON.parse(cachedData);
    }

    console.log('City not found in cache:', city);
    try {
        const { lat, lon } = await getCoordinateByCityService(city, state, country);
        const response = await apiClient.get('weather', {
            params: {
                lat: lat,
                lon: lon,
            },
        });

        // Store the weather data in the cache
        await redisClient.setEx(cacheKey, REDIS_TTL, JSON.stringify(response.data));

        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// Get the weather data for a set of coordinates
export const getWeatherByCoordinatesService = async (lat, lon) => {
    const identifier = `${lat}:${lon}`;
    const cacheKey = generateRedisKey('coords', identifier);

    // Check if the coordinates are in the cache
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
        console.log('Coordinates found in cache:', identifier);
        return JSON.parse(cachedData);
    }

    console.log('Coordinates not found in cache:', identifier);
    try {
        const response = await apiClient.get('weather', {
            params: {
                lat: lat,
                lon: lon
            }
        });

        // Store the weather data in the cache
        await redisClient.setEx(cacheKey, REDIS_TTL, JSON.stringify(response.data));

        return response.data;
    } catch (error) {
        console.log(error);
    }
};