import { FastifyInstance } from "fastify";
import { FastifyInstanceToken, Inject, Service } from "fastify-decorators";
import { TeamRepository } from "~/modules/team/repositories/team.repository";
import type { TeamResponseType } from "~/api/team/team.model";

@Service()
export class ArchiveTeamUseCase {
    @Inject(FastifyInstanceToken)
    private readonly app!: FastifyInstance;

    @Inject(TeamRepository)
    private readonly teamRepository!: TeamRepository;

    async execute(teamId: string): Promise<TeamResponseType> {
        const logger = this.app.log.child({
            useCase: "ArchiveTeamUseCase",
            teamId,
        });
        logger.info("Archiving team");
        return this.teamRepository.archiveTeam(teamId);
    }
}
