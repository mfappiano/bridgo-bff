import { FastifyInstanceToken, Inject, Service } from "fastify-decorators";
import { FastifyInstance } from "fastify";
import type {
    ProfessionalInviteCreateRequestType,
    ProfessionalInviteResponseType,
} from "~/api";
import { ProfessionalRepository } from "~/modules/professional/repositories/professional.repository";

@Service()
export class CreateProfessionalInviteUseCase {
    @Inject(FastifyInstanceToken)
    private readonly app!: FastifyInstance;

    @Inject(ProfessionalRepository)
    private readonly professionalRepository!: ProfessionalRepository;

    async execute(
        payload: ProfessionalInviteCreateRequestType
    ): Promise<ProfessionalInviteResponseType> {
        const logger = this.app.log.child({
            useCase: "CreateProfessionalInviteUseCase",
            payload,
        });

        logger.info("Creating professional invite");

        return this.professionalRepository.createInvite(payload);
    }
}
