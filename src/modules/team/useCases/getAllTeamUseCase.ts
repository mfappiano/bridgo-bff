import {FastifyInstance} from "fastify";
import {FastifyInstanceToken, Inject, Service} from "fastify-decorators";
import {TeamRepository} from "~/modules/team/repositories/team.repository";
import {PaginatedTeamRequestQueryType, PaginatedTeamResponseType} from "~/api/team/team.model";

@Service()
export class GetAllTeamUseCase {
    @Inject(FastifyInstanceToken)
    private readonly app!: FastifyInstance;

    @Inject(TeamRepository)
    private readonly teamRepository!: TeamRepository;

    async execute(payload: PaginatedTeamRequestQueryType): Promise<PaginatedTeamResponseType> {
        const logger = this.app.log.child({
            useCase: "GetAllTeamUseCase",
            payload,
        });

        logger.info("Getting paginated teams for user");

        return await this.teamRepository.getAllTeamByUser(payload);
    }
}
