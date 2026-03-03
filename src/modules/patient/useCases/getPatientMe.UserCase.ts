import { Inject, Service } from "fastify-decorators";
import { PatientRepository } from "~/modules/patient/repositories/patient.repository";
import { PatientResponseType } from "~/api/patient/patient.model";

@Service()
export class GetPatientMeUseCase {
    @Inject(PatientRepository)
    private readonly patientRepository!: PatientRepository;

    async execute(): Promise<PatientResponseType | null> {
        return this.patientRepository.getMe();
    }
}
