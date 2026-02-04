import { FastifyInstanceToken, Inject, Service } from 'fastify-decorators';
import { FastifyInstance } from 'fastify';
import { SearchCatalogRequestDto } from '~/modules/catalogItem/dtos/SearchCatalogRequest.dto';
import { SearchCatalogResponseDto } from '~/modules/catalogItem/dtos/SearchCatalogResponse.dto';
import { CatalogItemService } from '~/service/catalogItem.service';
import { CatalogMapper } from '~/modules/catalogItem/mappers/catalog.mapper';

@Service()
export class SearchCatalogUseCase {
    @Inject(FastifyInstanceToken)
    private readonly app: FastifyInstance;

    @Inject(CatalogItemService)
    private readonly catalogItemService: CatalogItemService;

    async execute(input: SearchCatalogRequestDto): Promise<SearchCatalogResponseDto> {
        const logger = this.app.log.child({ catalogs: input });
        logger.info('Searching catalogItem');

        const { q, category, limit } = input;
        const normalizedQuery = q?.trim().toLowerCase();

        if (!normalizedQuery && !category) {
            return { items: [] };
        }

        const catalogs = await this.catalogItemService.searchCatalog({
            limit,
            q: normalizedQuery,
            category,
        });

        return CatalogMapper.toSearchResponse(catalogs);
    }
}
