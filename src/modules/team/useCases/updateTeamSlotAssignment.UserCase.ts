import { FastifyInstance } from "fastify";
import { FastifyInstanceToken, Inject, Service } from "fastify-decorators";
import { TeamRepository } from "~/modules/team/repositories/team.repository";
import {
    TeamSlotAssignmentResponseType,
    TeamSlotAssignmentUpdateRequestType
} from "~/api/team-slot/team-slot.model";

@Service()
export class UpdateTeamSlotAssignmentUseCase {
    @Inject(FastifyInstanceToken)
    private readonly app!: FastifyInstance;

    @Inject(TeamRepository)
    private readonly teamRepository!: TeamRepository;

    async execute(
        teamId: string,
        slotId: string,
        assignmentId: string,
        payload: TeamSlotAssignmentUpdateRequestType
    ): Promise<TeamSlotAssignmentResponseType> {
        const logger = this.app.log.child({
            useCase: "UpdateTeamSlotAssignmentUseCase",
            teamId,
            slotId,
            assignmentId,
        });
        logger.info("Updating team slot assignment");
        return this.teamRepository.updateAssignment(teamId, slotId, assignmentId, payload);
    }
}
