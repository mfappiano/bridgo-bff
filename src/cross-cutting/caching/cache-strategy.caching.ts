import { RedisClientOptions, RedisClientType, createClient } from 'redis';
import { LRUCache } from 'lru-cache';

/* =======================
   CACHE STRATEGY CONTRACT
   ======================= */
export interface CacheStrategy {
  get<T>(key: string): Promise<T | undefined>;
  set<T>(key: string, value: T, ttl: number): Promise<void>;
}

/* =======================
   LRU STRATEGY (IN-MEMORY)
   ======================= */
export class LRUCacheStrategy implements CacheStrategy {
  private cache: LRUCache<string, any, any>;

  constructor(options: { max: number; ttl: number }) {
    this.cache = new LRUCache<string, any, any>({
      max: options.max,
      ttl: options.ttl,
    });
  }

  async get<T>(key: string): Promise<T | undefined> {
    return this.cache.get(key) as T | undefined;
  }

  async set<T>(key: string, value: T, _ttl: number): Promise<void> {
    this.cache.set(key, value);
  }
}

/* =======================
   REDIS STRATEGY
   ======================= */
export class RedisCacheStrategy implements CacheStrategy {
  private client!: RedisClientType<Record<string, never>>;

  async connect(opts?: RedisClientOptions): Promise<void> {
    if (this.client) return;

    this.client = createClient({
      url: process.env.REDIS_URL,
      ...opts,
    }) as RedisClientType<Record<string, never>>; // cast explícito

    await this.client.connect();
  }

  private ensureConnected() {
    if (!this.client) throw new Error('Redis not connected');
  }

  async get<T>(key: string): Promise<T | undefined> {
    this.ensureConnected();
    const result = await this.client.get(key);
    return result ? (JSON.parse(result) as T) : undefined;
  }

  async set<T>(key: string, value: T, ttl: number): Promise<void> {
    this.ensureConnected();
    await this.client.setEx(key, ttl, JSON.stringify(value));
  }
}

/* =======================
   CACHE MANAGER
   ======================= */
class CacheManager {
  constructor(private readonly strategy: CacheStrategy) {}

  async get<T>(key: string): Promise<T | undefined> {
    return this.strategy.get<T>(key);
  }

  async set<T>(key: string, value: T, ttl: number): Promise<void> {
    return this.strategy.set<T>(key, value, ttl);
  }
}

export default CacheManager;
