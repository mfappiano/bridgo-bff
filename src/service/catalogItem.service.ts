import {FastifyInstanceToken, Inject, Service} from 'fastify-decorators';
import {FastifyInstance} from 'fastify';
import {SearchCatalogRequestDto} from '~/modules/catalogItem/dtos/SearchCatalogRequest.dto';
import CacheManager from '~/cross-cutting/caching/cache-strategy.caching';
import {CatalogItemRepository} from "~/modules/catalogItem/repositories/catalogItem.repository";

@Service()
    export class CatalogItemService {
    @Inject(CatalogItemRepository)
    private readonly catalogItemRepository: CatalogItemRepository;

    @Inject(FastifyInstanceToken)
    private readonly app: FastifyInstance;

    private readonly MIN_CHARS = 2;
    private readonly CACHE_TTL_SECONDS = 60;

    // Inyectamos CacheManager o accedemos vía Fastify.decorate
    private get cache(): CacheManager | undefined {
        return this.app.cache;
    }

    async searchCatalog(input: SearchCatalogRequestDto): Promise<{ id: string; label: string }[]> {
        const logger = this.app.log.child({module: 'CatalogItemService.searchCatalog', input});

        const {q, category, limit = 10} = input;
        const normalizedQuery = this.normalizeQuery(q);

        // Guardrail UX
        if ((!normalizedQuery || normalizedQuery.length < this.MIN_CHARS) && !category) {
            logger.debug('Search ignored: insufficient query');
            return [];
        }

        const cacheKey = `catalog:${category ?? 'any'}:${normalizedQuery ?? 'none'}:${limit}`;

        // Cache lookup
        const cached = await this.cache?.get<{ id: string; label: string }[]>(cacheKey);
        if (cached) {
            logger.debug('Catalog search cache hit', {cacheKey});
            return cached;
        }
        logger.debug('Catalog search cache miss', {cacheKey});

        // Call CatalogItem Backend
        const backendResponse = await this.catalogItemRepository.searchByCategory(
            category!,
            normalizedQuery ?? undefined,
            limit
        );

        const items =
            backendResponse.catalogItemResponses.map(item => ({
                id: item.id,
                label: item.label,
            }));

        // 💾 Cache result
        await this.cache?.set(cacheKey, items, this.CACHE_TTL_SECONDS);

        return items;
    }

    private normalizeQuery(q?: string | null): string | null {
        if (!q) return null;
        return q.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
}
