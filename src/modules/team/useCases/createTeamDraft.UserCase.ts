import { FastifyInstance } from "fastify";
import { FastifyInstanceToken, Inject, Service } from "fastify-decorators";
import { TeamRepository } from "~/modules/team/repositories/team.repository";
import {TeamDraftCreateRequestType} from "~/api/team-draft/team-draft.model";
import {TeamResponseType} from "~/api/team/team.model";

@Service()
export class CreateTeamDraftUseCase {
    @Inject(FastifyInstanceToken)
    private readonly app!: FastifyInstance;

    @Inject(TeamRepository)
    private readonly teamRepository!: TeamRepository;

    async execute(payload: TeamDraftCreateRequestType): Promise<TeamResponseType> {
        const logger = this.app.log.child({
            useCase: "CreateTeamDraftUseCase",
            payload,
        });
        logger.info("Creating team draft");
        return this.teamRepository.createDraft(payload);
    }
}
