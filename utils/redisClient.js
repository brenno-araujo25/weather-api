import { createClient } from "redis";
import config from "config.js";

export const redisClient = createClient({
    url: config.REDIS_URL,
});

redisClient.on("error", (err) => {
    console.log("Redis Client Error", err);
});

(async () => {
    try {
      await redisClient.connect();
      console.log('Connected to Redis');
    } catch (error) {
      console.error('Error connecting to Redis: ', error);
    }
})();

export default redisClient;