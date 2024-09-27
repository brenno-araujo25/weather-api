import { 
    apiClient, 
    apiGeoClient 
} from "../utils/apiClient.js";

export const getCoordinateByCityService = async (city, state, country) => {
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
        return {lat, lon};
    } catch (error) {
        throw error;
    }
};

export const getWeatherByCityService = async (city, state, country) => {
    try {
        const { lat, lon } = await getCoordinateByCityService(city, state, country);
        const response = await apiClient.get('weather', {
            params: {
                lat: lat,
                lon: lon,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getWeatherByCoordinatesService = async (lat, lon) => {
    try {
        const response = await apiClient.get('weather', {
            params: {
                lat: lat,
                lon: lon
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};