import { FastifyInstanceToken, Inject, Service } from 'fastify-decorators';
import { FastifyInstance } from 'fastify';
import { SearchRolesRequestDto } from '~/modules/catalogItem/dtos/SearchRolesRequest.dto';
import { SearchRolesResponseDto } from '~/modules/catalogItem/dtos/SearchRolesResponse.dto';
import { CatalogItemService } from '~/service/catalogItem.service';
import { RoleMapper } from '~/modules/catalogItem/mappers/role.mapper';

@Service()
export class SearchRolesUseCase {
    @Inject(FastifyInstanceToken)
    private readonly app: FastifyInstance;

    @Inject(CatalogItemService)
    private readonly roleService: CatalogItemService;

    async execute(input: SearchRolesRequestDto): Promise<SearchRolesResponseDto> {
        const logger = this.app.log.child({ roles: input });
        logger.info('Searching catalogItem');

        const { q, category, limit } = input;
        const normalizedQuery = q?.trim().toLowerCase();

        if (!normalizedQuery && !category) {
            return { items: [] };
        }

        const roles = await this.roleService.searchRole({
            limit,
            q: normalizedQuery,
            category,
        });

        return RoleMapper.toSearchResponse(roles);
    }
}
