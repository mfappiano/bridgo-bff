import {FastifyInstance} from "fastify";
import {FastifyInstanceToken, Inject, Service} from "fastify-decorators";
import {TeamRepository} from "~/modules/team/repositories/team.repository";
import {TeamDraftGetCurrentRequestType, TeamSnapshotResponseType} from "~/api/team-draft/team-draft.model";

@Service()
export class GetCurrentDraftUseCase {
    @Inject(FastifyInstanceToken)
    private readonly app!: FastifyInstance;

    @Inject(TeamRepository)
    private readonly teamRepository!: TeamRepository;

    async execute(payload: TeamDraftGetCurrentRequestType): Promise<TeamSnapshotResponseType> {
        const logger = this.app.log.child({
            useCase: "GetCurrentTeamDraftUseCase",
            payload,
        });
        logger.info("Getting team draft");
        return this.teamRepository.getCurrentDraft(payload);
    }
}
