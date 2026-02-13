import {FastifyReply, FastifyRequest} from "fastify";
import {Controller, GET, Inject, POST} from "fastify-decorators";
import {CreateTeamDraftUseCase} from "~/modules/team/useCases/createTeamDraft.UserCase";
import {CreateTeamDraftWithSlotsUseCase} from "~/modules/team/useCases/createTeamDraftWithSlots.UserCase";
import {
    TeamDraftCreateSchema, TeamDraftGetCurrentSchema,
    TeamDraftWithSlotsSchema,
} from "~/api";
import {
    TeamDraftCreateRequestType, TeamDraftGetCurrentRequestType,
    TeamDraftWithSlotsRequestType,
    TeamDraftWithSlotsResponseType, TeamSnapshotResponseType
} from "~/api/team-draft/team-draft.model";
import {TeamResponseType} from "~/api/team/team.model";
import {GetCurrentDraftUseCase} from "~/modules/team/useCases/getCurrentDraftUseCase";

@Controller({route: "/teams/drafts"})
export default class TeamDraftController {
    @Inject(CreateTeamDraftUseCase)
    private readonly createTeamDraftUseCase!: CreateTeamDraftUseCase;

    @Inject(CreateTeamDraftWithSlotsUseCase)
    private readonly createTeamDraftWithSlotsUseCase!: CreateTeamDraftWithSlotsUseCase;

    @Inject(GetCurrentDraftUseCase)
    private readonly getCurrentDraftUseCase!: GetCurrentDraftUseCase;

    @GET({
        url: "/current",
        options: { schema: TeamDraftGetCurrentSchema },
    })
    async currentDraft(
        request: FastifyRequest<{
            Querystring: TeamDraftGetCurrentRequestType;
            Reply: TeamSnapshotResponseType;
        }>,
        reply: FastifyReply
    ) {
        const { type } = request.query;

        const result = await this.getCurrentDraftUseCase.execute({ type });

        return reply.status(200).send(result);
    }

    @POST({
        url: "",
        options: {schema: TeamDraftCreateSchema},
    })
    async createDraft(
        request: FastifyRequest<{
            Body: TeamDraftCreateRequestType;
            Reply: TeamResponseType;
        }>,
        reply: FastifyReply
    ) {
        const result = await this.createTeamDraftUseCase.execute(request.body);
        return reply.status(200).send(result);
    }

    @POST({
        url: "/with-slots",
        options: {schema: TeamDraftWithSlotsSchema},
    })
    async createDraftWithSlots(
        request: FastifyRequest<{
            Body: TeamDraftWithSlotsRequestType;
            Reply: TeamDraftWithSlotsResponseType;
        }>,
        reply: FastifyReply
    ) {
        const result = await this.createTeamDraftWithSlotsUseCase.execute(request.body);
        return reply.status(200).send(result);
    }
}
