import { FastifyInstance } from "fastify";
import { FastifyInstanceToken, Inject, Service } from "fastify-decorators";
import { TeamRepository } from "~/modules/team/repositories/team.repository";
import {
    TeamDraftWithSlotsRequestType,
    TeamDraftWithSlotsResponseType
} from "~/api/team-draft/team-draft.model";

@Service()
export class CreateTeamDraftWithSlotsUseCase {
    @Inject(FastifyInstanceToken)
    private readonly app!: FastifyInstance;

    @Inject(TeamRepository)
    private readonly teamRepository!: TeamRepository;

    async execute(
        payload: TeamDraftWithSlotsRequestType
    ): Promise<TeamDraftWithSlotsResponseType> {
        const logger = this.app.log.child({
            useCase: "CreateTeamDraftWithSlotsUseCase",
        });
        logger.info("Creating team draft with slots");

        const team = await this.teamRepository.createDraft({
            name: payload.team.name,
            category: payload.team.category,
            type: payload.team.type,
        });

        const slots = [];
        for (const slot of payload.slots) {
            const created = await this.teamRepository.createSlot(team.teamId, slot);
            slots.push(created);
        }

        return { team, slots };
    }
}
