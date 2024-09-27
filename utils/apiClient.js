import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const apiClient = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
    params: {
        appid: process.env.OPENWEATHER_API_KEY,
        units: "metric",
        lang: "en"
    }
});

export const apiGeoClient = axios.create({
    baseURL: 'https://api.openweathermap.org/geo/1.0',
    params: {
        appid: process.env.OPENWEATHER_API_KEY,
    }
});