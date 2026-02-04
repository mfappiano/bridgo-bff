import { FastifyReply, FastifyRequest } from "fastify";
import { Controller, GET, POST, Inject } from "fastify-decorators";
import { SuggestProfessionalUseCase } from "~/modules/professional/useCases/suggestProfessional.UserCase";
import {
    ProfessionalSearchRequestBodyType,
    ProfessionalSearchResponseSchemaType,
    ProfessionalSearchSchema,
    ProfessionalInviteCreateSchema,
    ProfessionalInviteAcceptSchema,
    ProfessionalInviteValidateSchema,
    ProfessionalInviteCreateRequestType,
    ProfessionalInviteAcceptRequestType,
    ProfessionalInviteResponseType,
} from "~/api";
import { CreateProfessionalInviteUseCase } from "~/modules/professional/useCases/createProfessionalInvite.UserCase";
import { ValidateProfessionalInviteUseCase } from "~/modules/professional/useCases/validateProfessionalInvite.UserCase";
import { AcceptProfessionalInviteUseCase } from "~/modules/professional/useCases/acceptProfessionalInvite.UserCase";

@Controller({ route: "/professionals" })
export default class ProfessionalController {

    @Inject(SuggestProfessionalUseCase)
    private readonly suggestProfessionalUseCase!: SuggestProfessionalUseCase;

    @Inject(CreateProfessionalInviteUseCase)
    private readonly createProfessionalInviteUseCase!: CreateProfessionalInviteUseCase;

    @Inject(ValidateProfessionalInviteUseCase)
    private readonly validateProfessionalInviteUseCase!: ValidateProfessionalInviteUseCase;

    @Inject(AcceptProfessionalInviteUseCase)
    private readonly acceptProfessionalInviteUseCase!: AcceptProfessionalInviteUseCase;

    @POST({
        url: "/search",
        options: {
            schema: ProfessionalSearchSchema,
        },
    })
    async search(
        request: FastifyRequest<{
            Body: ProfessionalSearchRequestBodyType;
            Reply: ProfessionalSearchResponseSchemaType;
        }>,
        reply: FastifyReply,
    ) {
        const logger = request.log.child({
            module: "ProfessionalController.search",
        });

        logger.debug(
            { body: request.body },
            "Professional search request received",
        );

        const result =
            await this.suggestProfessionalUseCase.execute(request.body);

        logger.debug(
            { count: result.length },
            "Professionals found",
        );

        return reply.status(200).send(result);
    }

    @POST({
        url: "/invites",
        options: {
            schema: ProfessionalInviteCreateSchema,
        },
    })
    async createInvite(
        request: FastifyRequest<{
            Body: ProfessionalInviteCreateRequestType;
            Reply: ProfessionalInviteResponseType;
        }>,
        reply: FastifyReply,
    ) {
        const result = await this.createProfessionalInviteUseCase.execute(
            request.body
        );

        return reply.status(200).send(result);
    }

    @GET({
        url: "/invites/:token",
        options: {
            schema: ProfessionalInviteValidateSchema,
        },
    })
    async validateInvite(
        request: FastifyRequest<{
            Params: { token: string };
            Reply: ProfessionalInviteResponseType;
        }>,
        reply: FastifyReply,
    ) {
        const result = await this.validateProfessionalInviteUseCase.execute(
            request.params.token
        );

        return reply.status(200).send(result);
    }

    @POST({
        url: "/invites/accept",
        options: {
            schema: ProfessionalInviteAcceptSchema,
        },
    })
    async acceptInvite(
        request: FastifyRequest<{
            Body: ProfessionalInviteAcceptRequestType;
            Reply: ProfessionalInviteResponseType;
        }>,
        reply: FastifyReply,
    ) {
        const result = await this.acceptProfessionalInviteUseCase.execute(
            request.body
        );

        return reply.status(200).send(result);
    }
}
