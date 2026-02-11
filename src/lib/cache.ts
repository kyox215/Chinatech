import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL;

let redis: Redis | null = null;

if (redisUrl) {
  redis = new Redis(redisUrl, {
    maxRetriesPerRequest: 3,
    retryStrategy(times) {
      if (times > 3) return null; // stop retrying
      return Math.min(times * 50, 2000);
    },
  });
  
  redis.on('error', (err) => {
    console.warn('Redis connection error:', err);
  });
} else {
  console.warn('REDIS_URL not set, using in-memory fallback (not shared across instances)');
}

// Simple in-memory cache for fallback
const memoryCache = new Map<string, { value: any; expiry: number }>();

export const cache = {
  async get<T>(key: string): Promise<T | null> {
    try {
      if (redis) {
        const data = await redis.get(key);
        return data ? JSON.parse(data) : null;
      } else {
        const item = memoryCache.get(key);
        if (!item) return null;
        if (Date.now() > item.expiry) {
          memoryCache.delete(key);
          return null;
        }
        return item.value;
      }
    } catch (error) {
      console.error(`Cache GET error for key ${key}:`, error);
      return null;
    }
  },

  async set(key: string, value: any, ttlSeconds: number = 300): Promise<void> {
    try {
      if (redis) {
        await redis.set(key, JSON.stringify(value), 'EX', ttlSeconds);
      } else {
        memoryCache.set(key, {
          value,
          expiry: Date.now() + ttlSeconds * 1000,
        });
      }
    } catch (error) {
      console.error(`Cache SET error for key ${key}:`, error);
    }
  },

  async del(key: string): Promise<void> {
    try {
      if (redis) {
        await redis.del(key);
      } else {
        memoryCache.delete(key);
      }
    } catch (error) {
      console.error(`Cache DEL error for key ${key}:`, error);
    }
  },
  
  async flushPattern(pattern: string): Promise<void> {
    try {
      if (redis) {
        const keys = await redis.keys(pattern);
        if (keys.length > 0) {
          await redis.del(...keys);
        }
      } else {
        // Simple regex matching for memory cache
        const regex = new RegExp(pattern.replace('*', '.*'));
        for (const key of memoryCache.keys()) {
          if (regex.test(key)) {
            memoryCache.delete(key);
          }
        }
      }
    } catch (error) {
      console.error(`Cache FLUSH error for pattern ${pattern}:`, error);
    }
  }
};
