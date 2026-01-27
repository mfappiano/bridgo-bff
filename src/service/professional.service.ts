import { FastifyInstanceToken, Inject, Service } from 'fastify-decorators';
import { FastifyInstance } from 'fastify';

import CacheManager from '~/cross-cutting/caching/cache-strategy.caching';
import { SearchSuggestedProfessionalsDto } from '~/modules/professional/dtos/SuggestProfessionalView.dto';
import {
    SearchProfessionalsResponseDto
} from '~/modules/professional/dtos/ProfessionalResponse.dto';
import { ProfessionalRepository } from '~/modules/professional/repositories/professional.repository';

@Service()
export class ProfessionalService {
    @Inject(ProfessionalRepository)
    private readonly professionalRepository!: ProfessionalRepository;

    @Inject(FastifyInstanceToken)
    private readonly app!: FastifyInstance;

    private readonly MIN_CHARS = 2;
    private readonly CACHE_TTL_SECONDS = 60;

    private get cache(): CacheManager | undefined {
        return this.app.cache;
    }

    async searchSuggestedProfessionals(
        input: SearchSuggestedProfessionalsDto
    ): Promise<SearchProfessionalsResponseDto> {

        const logger = this.app.log.child({
            module: 'ProfessionalService.searchSuggestedProfessionals',
            input,
        });

        const normalizedQuery = this.normalizeQuery(input.query.text);

        if (!normalizedQuery || normalizedQuery.length < this.MIN_CHARS) {
            logger.debug('Search ignored: insufficient query');

            // MISMO CONTRATO SIEMPRE
            return { professionalItems: [] };
        }

        const cacheKey = this.buildCacheKey({
            category: input.context.category,
            catalogItemId: input.context.catalogItemId,
            q: normalizedQuery,
            filters: input.filters,
            limit: input.limit,
        });

        // Cache lookup
        const cached =
            await this.cache?.get<SearchProfessionalsResponseDto>(cacheKey);

        if (cached) {
            logger.debug('Professionals search cache hit', { cacheKey });
            return cached;
        }

        logger.debug('Professionals search cache miss', { cacheKey });

        // Repository
        const result = await this.professionalRepository.search({
            context: input.context,
            query: { text: normalizedQuery },
            filters: input.filters,
            limit: input.limit,
        });

        // Cache result
        await this.cache?.set(
            cacheKey,
            result,
            this.CACHE_TTL_SECONDS
        );

        return result;
    }

    private normalizeQuery(q: string): string {
        return q
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    }

    private buildCacheKey(params: {
        category: string;
        catalogItemId: string;
        q: string;
        filters?: unknown;
        limit: number;
    }): string {
        return [
            'professionals',
            params.category,
            params.catalogItemId,
            params.q,
            JSON.stringify(params.filters ?? {}),
            params.limit,
        ].join(':');
    }
}
