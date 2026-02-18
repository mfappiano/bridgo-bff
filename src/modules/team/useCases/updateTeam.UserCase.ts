import { FastifyInstance } from "fastify";
import { FastifyInstanceToken, Inject, Service } from "fastify-decorators";
import { TeamRepository } from "~/modules/team/repositories/team.repository";
import {
    TeamResponseType,
    TeamUpdateRequestType
} from "~/api/team/team.model";

@Service()
export class UpdateTeamUseCase {
    @Inject(FastifyInstanceToken)
    private readonly app!: FastifyInstance;

    @Inject(TeamRepository)
    private readonly teamRepository!: TeamRepository;

    async execute(teamId: string, payload: TeamUpdateRequestType): Promise<TeamResponseType> {
        const logger = this.app.log.child({
            useCase: "UpdateTeamUseCase",
            teamId,
        });
        logger.info("Updating team");
        return this.teamRepository.updateTeam(teamId, payload);
    }
}
