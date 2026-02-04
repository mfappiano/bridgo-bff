import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, GET, Inject } from 'fastify-decorators';

import {
  CatalogSearchByCategorySchema,
  CatalogSearchRequestQueryType,
  CatalogSearchResponseSchemaType,
  CatalogSearchPathParamsType,
} from '~/api';

import { SearchCatalogUseCase } from '~/modules/catalogItem/useCases/searchCatalog.UserCase';

@Controller({ route: '/catalogs' })
export default class CatalogController {
  @Inject(SearchCatalogUseCase)
  private readonly searchRolesUseCase!: SearchCatalogUseCase;

  @GET({
    url: '/:category/search',
    options: {
      schema: CatalogSearchByCategorySchema,
    },
  })
  async searchByCategory(
    request: FastifyRequest<{
      Params: CatalogSearchPathParamsType;
      Querystring: CatalogSearchRequestQueryType;
      Reply: CatalogSearchResponseSchemaType;
    }>,
    reply: FastifyReply,
  ) {
    const logger = request.log.child({
      module: 'CatalogController.searchByCategory',
    });

    const { q, limit } = request.query;
    const { category } = request.params;

    logger.debug(
      {
        q,
        category,
        limit,
      },
      'Buscando catalogItem por categoría',
    );

    const result = await this.searchRolesUseCase.execute({
      q,
      category,
      limit,
    });

    return reply.status(200).send(result);
  }
}
