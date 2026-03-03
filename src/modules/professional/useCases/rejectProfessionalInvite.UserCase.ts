import { FastifyInstanceToken, Inject, Service } from "fastify-decorators";
import { FastifyInstance } from "fastify";
import type {
    ProfessionalInviteResponseType,
} from "~/api";
import { ProfessionalRepository } from "~/modules/professional/repositories/professional.repository";

@Service()
export class RejectProfessionalInviteUseCase {
    @Inject(FastifyInstanceToken)
    private readonly app!: FastifyInstance;

    @Inject(ProfessionalRepository)
    private readonly professionalRepository!: ProfessionalRepository;

    async execute(payload: { token: string }): Promise<ProfessionalInviteResponseType> {
        const logger = this.app.log.child({
            useCase: "RejectProfessionalInviteUseCase",
            payload,
        });

        logger.info("Rejecting professional invite");

        return this.professionalRepository.rejectInvite(payload);
    }
}
