import {
    getWeatherByCityService,
    getWeatherByCoordinatesService
} from "../services/weatherService.js";

export const getWeatherByCity = async (req, res, next) => {
    const { city, state, country } = req.query;

    if (!city || !state || !country) {
        return res.status(400).json({ error: 'City, state and country are required' });
    }

    try {
        const weather = await getWeatherByCityService(city, state, country);
        return res.status(200).json(weather);
    } catch (error) {
        next(error)
    }
};

export const getWeatherByCoordinates = async (req, res, next) => {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    try {
        const weather = await getWeatherByCoordinatesService(lat, lon);
        return res.status(200).json(weather);
    } catch (error) {
        next(error);
    }
};