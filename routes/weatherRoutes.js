import express from "express";
import {
    getWeatherByCity,
    getWeatherByCoordinates
} from "../controllers/weatherController.js";
import { errorHandler } from "../middlewares/errorHandler.js";

const router = express.Router();

router.get("/city", getWeatherByCity, errorHandler);

router.get("/coordinates", getWeatherByCoordinates, errorHandler);

export default router;