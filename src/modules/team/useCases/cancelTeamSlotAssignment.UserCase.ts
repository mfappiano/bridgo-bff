import { FastifyInstance } from "fastify";
import { FastifyInstanceToken, Inject, Service } from "fastify-decorators";
import { TeamRepository } from "~/modules/team/repositories/team.repository";

@Service()
export class CancelTeamSlotAssignmentUseCase {
    @Inject(FastifyInstanceToken)
    private readonly app!: FastifyInstance;

    @Inject(TeamRepository)
    private readonly teamRepository!: TeamRepository;

    async execute(teamId: string, slotId: string, assignmentId: string): Promise<void> {
        const logger = this.app.log.child({
            useCase: "CancelTeamSlotAssignmentUseCase",
            teamId,
            slotId,
            assignmentId,
        });
        logger.info("Cancelling team slot assignment");
        await this.teamRepository.cancelAssignment(teamId, slotId, assignmentId);
    }
}
