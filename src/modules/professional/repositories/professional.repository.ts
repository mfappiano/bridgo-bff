import {IProfessionalRepository} from '~/modules/professional/repositories/professional.repository.interface';
import {FastifyInstanceToken, Inject, Service} from 'fastify-decorators';
import {
    SearchProfessionalsResponseSchema,
    SearchProfessionalsResponseDto
} from '~/modules/professional/dtos/ProfessionalResponse.dto';
import HttpClient from '~/cross-cutting/communication/http-client.communication';
import {FastifyInstance} from 'fastify';
import config from '~/cross-cutting/config';
import {AxiosError, HttpStatusCode} from 'axios';
import {ProfessionalSearch} from '~/modules/professional/domain/ProfessionalSearch';

@Service()
export class ProfessionalRepository implements IProfessionalRepository {

    private readonly baseUrl = `${config.kongUrl}/professionals`;

    @Inject(FastifyInstanceToken)
    private readonly app: FastifyInstance;

    @Inject(HttpClient)
    private readonly httpClient: HttpClient;

    async search(
        search: ProfessionalSearch
    ): Promise<SearchProfessionalsResponseDto> {

        const logger = this.app.log.child({
            module: 'ProfessionalRepository.search',
            context: search.context,
            query: search.query,
            limit: search.limit,
        });

        logger.debug('Searching professionals');

        try {
            const {data} = await this.httpClient.post(
                `${this.baseUrl}/search`,
                search
            );
            logger.info('Professional search executed successfully');

            return SearchProfessionalsResponseSchema.parse(data);

        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === HttpStatusCode.NotFound) {
                    logger.warn('Professionals not found');

                    return {professionalItems: []};
                }
            }

            logger.error('Error searching professionals', error);
            throw error;
        }
    }
}
