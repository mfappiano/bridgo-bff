import {ICatalogItemRepository} from "~/modules/catalogItem/repositories/catalogItem.repository.interface";
import {FastifyInstanceToken, Inject, Service} from "fastify-decorators";
import {CatalogSearchResponseDto} from "~/modules/catalogItem/dtos/catalogItemResponse.dto";
import HttpClient from "~/cross-cutting/communication/http-client.communication";
import {FastifyInstance} from "fastify";
import config from '~/cross-cutting/config';
import {AxiosError, HttpStatusCode} from "axios";

@Service()
export class CatalogItemRepository implements ICatalogItemRepository {
    private readonly baseUrl = `${config.kongUrl}/catalogs`;

    @Inject(FastifyInstanceToken)
    private readonly app: FastifyInstance;

    @Inject(HttpClient)
    private readonly httpClient: HttpClient;

    async searchByCategory(
        category: string,
        q?: string,
        limit: number = 10
    ): Promise<CatalogSearchResponseDto> {

        const logger = this.app.log.child({
            module: 'CatalogItemRepository.search',
            category,
            q,
            limit,
        });

        logger.debug('Searching catalog items');

        try {
            const {data} = await this.httpClient.get(
                `${this.baseUrl}/${category}/search`,
                {
                    q,
                    limit,
                },
            );

            logger.info('Catalog search executed successfully');

            return data as CatalogSearchResponseDto;
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === HttpStatusCode.NotFound) {
                    logger.warn('Catalog items not found');
                    return {catalogItemResponses: []};
                }
            }

            logger.error('Error searching catalog items', error);
            throw error;
        }
    }

}
