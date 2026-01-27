import { FastifyReply, FastifyRequest } from "fastify";
import { Controller, POST, Inject } from "fastify-decorators";
import {SuggestProfessionalUseCase} from "~/modules/professional/useCases/suggestProfessional.UserCase";
import {ProfessionalSearchRequestBodyType, ProfessionalSearchResponseSchemaType, ProfessionalSearchSchema} from "~/api";

@Controller({ route: "/professionals" })
export default class ProfessionalController {

    @Inject(SuggestProfessionalUseCase)
    private readonly suggestProfessionalUseCase!: SuggestProfessionalUseCase;

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
}
