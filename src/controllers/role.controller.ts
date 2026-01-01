import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, GET, Inject } from 'fastify-decorators';

import {
    RoleSearchRequestQueryType,
    RoleSearchResponseSchemaType,
    RoleSearchSchema,
} from '~/api';

import { SearchRolesUseCase } from '~/modules/catalogItem/useCases/searchRoles.UserCase';

@Controller({ route: '/catalogItem' })
export default class RoleController {
    @Inject(SearchRolesUseCase)
    private readonly searchRolesUseCase!: SearchRolesUseCase;

    @GET({
        url: '/search',
        options: {
            schema: RoleSearchSchema,
        },
    })
    async search(
        request: FastifyRequest<{
            Querystring: RoleSearchRequestQueryType;
            Reply: RoleSearchResponseSchemaType;
        }>,
        reply: FastifyReply,
    ) {
        const logger = request.log.child({
            module: 'RoleController.search',
        });

        const { q, category, limit } = request.query;

        logger.debug(
            {
                q,
                category,
                limit,
            },
            'Buscando catalogItem',
        );

        const result = await this.searchRolesUseCase.execute({
            q: q,
            category,
            limit,
        });

        logger.debug(
            { count: result.items.length },
            'Roles encontrados',
        );

        return reply.status(200).send(result);
    }
}
