import { FastifyInstanceToken, Inject, Service } from "fastify-decorators";
import { FastifyInstance } from "fastify";
import type { ProfessionalInviteResponseType } from "~/api";
import { ProfessionalRepository } from "~/modules/professional/repositories/professional.repository";

@Service()
export class GetPendingInvitesUseCase {
    @Inject(FastifyInstanceToken)
    private readonly app!: FastifyInstance;

    @Inject(ProfessionalRepository)
    private readonly professionalRepository!: ProfessionalRepository;

    async execute(): Promise<ProfessionalInviteResponseType[]> {
        const logger = this.app.log.child({
            useCase: "GetPendingInvitesUseCase",
        });

        logger.info("Getting pending invites");

        return this.professionalRepository.getPendingInvites();
    }
}
