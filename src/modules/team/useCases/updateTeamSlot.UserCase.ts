import { FastifyInstance } from "fastify";
import { FastifyInstanceToken, Inject, Service } from "fastify-decorators";
import { TeamRepository } from "~/modules/team/repositories/team.repository";
import {TeamSlotResponseType, TeamSlotUpdateRequestType} from "~/api/team-slot/team-slot.model";

@Service()
export class UpdateTeamSlotUseCase {
    @Inject(FastifyInstanceToken)
    private readonly app!: FastifyInstance;

    @Inject(TeamRepository)
    private readonly teamRepository!: TeamRepository;

    async execute(
        teamId: string,
        slotId: string,
        payload: TeamSlotUpdateRequestType
    ): Promise<TeamSlotResponseType> {
        const logger = this.app.log.child({
            useCase: "UpdateTeamSlotUseCase",
            teamId,
            slotId,
        });
        logger.info("Updating team slot");
        return this.teamRepository.updateSlot(teamId, slotId, payload);
    }
}
