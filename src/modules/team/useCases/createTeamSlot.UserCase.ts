import { FastifyInstance } from "fastify";
import { FastifyInstanceToken, Inject, Service } from "fastify-decorators";
import { TeamRepository } from "~/modules/team/repositories/team.repository";
import {
    TeamSlotCreateRequestType,
    TeamSlotResponseType
} from "~/api/team-slot/team-slot.model";

@Service()
export class CreateTeamSlotUseCase {
    @Inject(FastifyInstanceToken)
    private readonly app!: FastifyInstance;

    @Inject(TeamRepository)
    private readonly teamRepository!: TeamRepository;

    async execute(teamId: string, payload: TeamSlotCreateRequestType): Promise<TeamSlotResponseType> {
        const logger = this.app.log.child({
            useCase: "CreateTeamSlotUseCase",
            teamId,
        });
        logger.info("Creating team slot");
        return this.teamRepository.createSlot(teamId, payload);
    }
}
