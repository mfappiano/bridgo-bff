import { FastifyInstanceToken, Inject, Service } from "fastify-decorators";
import { FastifyInstance } from "fastify";
import type {
    ProfessionalInviteAcceptRequestType,
    ProfessionalInviteResponseType,
} from "~/api";
import { ProfessionalRepository } from "~/modules/professional/repositories/professional.repository";

@Service()
export class AcceptProfessionalInviteUseCase {
    @Inject(FastifyInstanceToken)
    private readonly app!: FastifyInstance;

    @Inject(ProfessionalRepository)
    private readonly professionalRepository!: ProfessionalRepository;

    async execute(
        payload: ProfessionalInviteAcceptRequestType
    ): Promise<ProfessionalInviteResponseType> {
        const logger = this.app.log.child({
            useCase: "AcceptProfessionalInviteUseCase",
            payload,
        });

        logger.info("Accepting professional invite");

        return this.professionalRepository.acceptInvite(payload);
    }
}
