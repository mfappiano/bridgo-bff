import { FastifyReply, FastifyRequest } from "fastify";
import { Controller, Inject, PATCH, POST } from "fastify-decorators";
import { CreateTeamDraftUseCase } from "~/modules/team/useCases/createTeamDraft.UserCase";
import { UpdateTeamUseCase } from "~/modules/team/useCases/updateTeam.UserCase";
import { PublishTeamUseCase } from "~/modules/team/useCases/publishTeam.UserCase";
import { ArchiveTeamUseCase } from "~/modules/team/useCases/archiveTeam.UserCase";
import { CreateTeamSlotUseCase } from "~/modules/team/useCases/createTeamSlot.UserCase";
import { UpdateTeamSlotUseCase } from "~/modules/team/useCases/updateTeamSlot.UserCase";
import { AssignTeamSlotUseCase } from "~/modules/team/useCases/assignTeamSlot.UserCase";
import { VacateTeamSlotUseCase } from "~/modules/team/useCases/vacateTeamSlot.UserCase";
import {
    TeamPublishSchema,
    TeamArchiveSchema,
    TeamSlotAssignSchema,
    TeamSlotCreateSchema,
    TeamSlotUpdateSchema,
    TeamSlotVacateSchema,
    TeamUpdateSchema
} from "~/api";
import {TeamResponseType, TeamUpdateRequestType} from "~/api/team/team.model";
import {
    TeamSlotAssignRequestType,
    TeamSlotCreateRequestType,
    TeamSlotResponseType,
    TeamSlotUpdateRequestType
} from "~/api/team-slot/team-slot.model";

@Controller({ route: "/teams" })
export default class TeamController {
    @Inject(CreateTeamDraftUseCase)

    @Inject(UpdateTeamUseCase)
    private readonly updateTeamUseCase!: UpdateTeamUseCase;

    @Inject(PublishTeamUseCase)
    private readonly publishTeamUseCase!: PublishTeamUseCase;

    @Inject(ArchiveTeamUseCase)
    private readonly archiveTeamUseCase!: ArchiveTeamUseCase;

    @Inject(CreateTeamSlotUseCase)
    private readonly createTeamSlotUseCase!: CreateTeamSlotUseCase;

    @Inject(UpdateTeamSlotUseCase)
    private readonly updateTeamSlotUseCase!: UpdateTeamSlotUseCase;

    @Inject(AssignTeamSlotUseCase)
    private readonly assignTeamSlotUseCase!: AssignTeamSlotUseCase;

    @Inject(VacateTeamSlotUseCase)
    private readonly vacateTeamSlotUseCase!: VacateTeamSlotUseCase;

    @PATCH({
        url: "/:teamId",
        options: { schema: TeamUpdateSchema },
    })
    async updateTeam(
        request: FastifyRequest<{
            Params: { teamId: string };
            Body: TeamUpdateRequestType;
            Reply: TeamResponseType;
        }>,
        reply: FastifyReply
    ) {
        const result = await this.updateTeamUseCase.execute(
            request.params.teamId,
            request.body
        );
        return reply.status(200).send(result);
    }

    @POST({
        url: "/:teamId/publish",
        options: { schema: TeamPublishSchema },
    })
    async publish(
        request: FastifyRequest<{
            Params: { teamId: string };
            Reply: TeamResponseType;
        }>,
        reply: FastifyReply
    ) {
        const result = await this.publishTeamUseCase.execute(request.params.teamId);
        return reply.status(200).send(result);
    }

    @POST({
        url: "/:teamId/archive",
        options: { schema: TeamArchiveSchema },
    })
    async archive(
        request: FastifyRequest<{
            Params: { teamId: string };
            Reply: TeamResponseType;
        }>,
        reply: FastifyReply
    ) {
        const result = await this.archiveTeamUseCase.execute(request.params.teamId);
        return reply.status(200).send(result);
    }

    @POST({
        url: "/:teamId/slots",
        options: { schema: TeamSlotCreateSchema },
    })
    async createSlot(
        request: FastifyRequest<{
            Params: { teamId: string };
            Body: TeamSlotCreateRequestType;
            Reply: TeamSlotResponseType;
        }>,
        reply: FastifyReply
    ) {
        const result = await this.createTeamSlotUseCase.execute(
            request.params.teamId,
            request.body
        );
        return reply.status(200).send(result);
    }

    @PATCH({
        url: "/:teamId/slots/:slotId",
        options: { schema: TeamSlotUpdateSchema },
    })
    async updateSlot(
        request: FastifyRequest<{
            Params: { teamId: string; slotId: string };
            Body: TeamSlotUpdateRequestType;
            Reply: TeamSlotResponseType;
        }>,
        reply: FastifyReply
    ) {
        const result = await this.updateTeamSlotUseCase.execute(
            request.params.teamId,
            request.params.slotId,
            request.body
        );
        return reply.status(200).send(result);
    }

    @POST({
        url: "/:teamId/slots/:slotId/assign",
        options: { schema: TeamSlotAssignSchema },
    })
    async assignSlot(
        request: FastifyRequest<{
            Params: { teamId: string; slotId: string };
            Body: TeamSlotAssignRequestType;
            Reply: TeamSlotResponseType;
        }>,
        reply: FastifyReply
    ) {
        const result = await this.assignTeamSlotUseCase.execute(
            request.params.teamId,
            request.params.slotId,
            request.body
        );
        return reply.status(200).send(result);
    }

    @POST({
        url: "/:teamId/slots/:slotId/vacate",
        options: { schema: TeamSlotVacateSchema },
    })
    async vacateSlot(
        request: FastifyRequest<{
            Params: { teamId: string; slotId: string };
            Reply: TeamSlotResponseType;
        }>,
        reply: FastifyReply
    ) {
        const result = await this.vacateTeamSlotUseCase.execute(
            request.params.teamId,
            request.params.slotId
        );
        return reply.status(200).send(result);
    }
}
