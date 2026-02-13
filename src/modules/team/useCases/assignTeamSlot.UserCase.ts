import { FastifyInstance } from "fastify";
import { FastifyInstanceToken, Inject, Service } from "fastify-decorators";
import { TeamRepository } from "~/modules/team/repositories/team.repository";
import {
    TeamSlotAssignRequestType,
    TeamSlotResponseType
} from "~/api/team-slot/team-slot.model";

@Service()
export class AssignTeamSlotUseCase {
    @Inject(FastifyInstanceToken)
    private readonly app!: FastifyInstance;

    @Inject(TeamRepository)
    private readonly teamRepository!: TeamRepository;

    async execute(
        teamId: string,
        slotId: string,
        payload: TeamSlotAssignRequestType
    ): Promise<TeamSlotResponseType> {
        const logger = this.app.log.child({
            useCase: "AssignTeamSlotUseCase",
            teamId,
            slotId,
        });
        logger.info("Assigning team slot");
        return this.teamRepository.assignSlot(teamId, slotId, payload);
    }
}
