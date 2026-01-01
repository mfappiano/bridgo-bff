import { RedisClientOptions } from 'redis';
import {
  LRUCacheStrategy,
  RedisCacheStrategy,
  default as CacheManager,
} from '~/cross-cutting/caching/cache-strategy.caching';
import fp from 'fastify-plugin';

type CachePluginOptions =
    | {
  cacheStrategy: 'lru';
  opts: {
    max: number;
    ttl: number;
  };
}
    | {
  cacheStrategy: 'redis';
  opts?: RedisClientOptions;
};

export default fp<CachePluginOptions>(
    async (fastify, options) => {
      let cacheManager: CacheManager;

      if (options.cacheStrategy === 'lru') {
        const strategy = new LRUCacheStrategy(options.opts);
        cacheManager = new CacheManager(strategy);
      } else {
        const strategy = new RedisCacheStrategy();
        await strategy.connect(options.opts);
        cacheManager = new CacheManager(strategy);
      }

      fastify.decorate('cache', cacheManager);
    },
    {
      name: 'cache-plugin',
    },
);
