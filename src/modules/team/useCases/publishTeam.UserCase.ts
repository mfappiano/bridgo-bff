import { FastifyInstance } from "fastify";
import { FastifyInstanceToken, Inject, Service } from "fastify-decorators";
import { PatientRepository } from "~/modules/patient/repositories/patient.repository";
import { TeamRepository } from "~/modules/team/repositories/team.repository";
import { TeamResponseType } from "~/api/team/team.model";
import { TeamPublishBodyType } from "~/api/team/team.model";

@Service()
export class PublishTeamUseCase {
    @Inject(FastifyInstanceToken)
    private readonly app!: FastifyInstance;

    @Inject(TeamRepository)
    private readonly teamRepository!: TeamRepository;

    @Inject(PatientRepository)
    private readonly patientRepository!: PatientRepository;

    async execute(teamId: string, body?: TeamPublishBodyType): Promise<TeamResponseType> {
        const logger = this.app.log.child({
            useCase: "PublishTeamUseCase",
            teamId,
        });
        logger.info("Publishing team");
        const result = await this.teamRepository.publishTeam(teamId);

        if (body?.associateAsPatient) {
            try {
                const patient = await this.patientRepository.getMe();
                if (patient?.id) {
                    await this.teamRepository.associateTeamWithPatient(teamId, patient.id);
                    logger.info("Associated patient with team", { patientId: patient.id });
                } else {
                    logger.warn("associateAsPatient requested but no patient profile found for current user");
                }
            } catch (err) {
                logger.warn({ err }, "Failed to associate patient with team (non-fatal)");
            }
        }

        return result;
    }
}
