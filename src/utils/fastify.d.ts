import { CacheManager } from '~/cross-cutting/caching/cache-strategy.caching';

declare module 'fastify' {
    interface FastifyInstance {
        cache: CacheManager;
    }
}
