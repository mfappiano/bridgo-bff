import { FastifyInstanceToken, Inject, Service } from "fastify-decorators";
import { FastifyInstance } from "fastify";
import type { ProfessionalInviteResponseType } from "~/api";
import { ProfessionalRepository } from "~/modules/professional/repositories/professional.repository";

@Service()
export class ValidateProfessionalInviteUseCase {
    @Inject(FastifyInstanceToken)
    private readonly app!: FastifyInstance;

    @Inject(ProfessionalRepository)
    private readonly professionalRepository!: ProfessionalRepository;

    async execute(token: string): Promise<ProfessionalInviteResponseType> {
        const logger = this.app.log.child({
            useCase: "ValidateProfessionalInviteUseCase",
            token,
        });

        logger.info("Validating professional invite");

        return this.professionalRepository.validateInvite(token);
    }
}
