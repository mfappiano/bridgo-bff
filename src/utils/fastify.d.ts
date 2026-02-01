import { CacheManager } from '~/cross-cutting/caching/cache-strategy.caching';
import { JwtClaims } from '~/modules/auth/auth.types';

declare module 'fastify' {
    interface FastifyInstance {
        cache: CacheManager;
    }

    interface FastifyRequest {
        user?: JwtClaims;
    }
}
