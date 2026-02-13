import { FastifyInstance } from "fastify";
import { FastifyInstanceToken, Inject, Service } from "fastify-decorators";
import {TeamSlotResponseType} from "~/api/team-slot/team-slot.model";
import {TeamRepository} from "~/modules/team/repositories/team.repository";

@Service()
export class VacateTeamSlotUseCase {
    @Inject(FastifyInstanceToken)
    private readonly app!: FastifyInstance;

    @Inject(TeamRepository)
    private readonly teamRepository!: TeamRepository;

    async execute(teamId: string, slotId: string): Promise<TeamSlotResponseType> {
        const logger = this.app.log.child({
            useCase: "VacateTeamSlotUseCase",
            teamId,
            slotId,
        });
        logger.info("Vacating team slot");
        return this.teamRepository.vacateSlot(teamId, slotId);
    }
}
