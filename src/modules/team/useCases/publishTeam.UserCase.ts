import { FastifyInstance } from "fastify";
import { FastifyInstanceToken, Inject, Service } from "fastify-decorators";
import { TeamRepository } from "~/modules/team/repositories/team.repository";
import {TeamResponseType} from "~/api/team/team.model";

@Service()
export class PublishTeamUseCase {
    @Inject(FastifyInstanceToken)
    private readonly app!: FastifyInstance;

    @Inject(TeamRepository)
    private readonly teamRepository!: TeamRepository;

    async execute(teamId: string): Promise<TeamResponseType> {
        const logger = this.app.log.child({
            useCase: "PublishTeamUseCase",
            teamId,
        });
        logger.info("Publishing team");
        return this.teamRepository.publishTeam(teamId);
    }
}
