import { redis } from "../../config/redisClient";

const CACHE_PREFIX = process.env.CACHE_PREFIX ?? "v2";

export const getOrSetCache = async (key: any, cb: any) => {
  try {
    const cacheKey = `${CACHE_PREFIX}:${key}`;
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log("Cache hit");
      return JSON.parse(cachedData);
    }

    console.log("Cache miss");
    const freshData = await cb();
    await redis.setex(cacheKey, 3600, JSON.stringify(freshData)); // Cache for 1 hour
    return freshData;
  } catch (error) {
    console.error("Redis error: ", error);
    throw error;
  }
};
