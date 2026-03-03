import { Inject, Service } from "fastify-decorators";
import { PatientRepository } from "~/modules/patient/repositories/patient.repository";
import { PatientResponseType } from "~/api/patient/patient.model";

@Service()
export class GetPatientByIdUseCase {
    @Inject(PatientRepository)
    private readonly patientRepository!: PatientRepository;

    async execute(patientId: string): Promise<PatientResponseType | null> {
        return this.patientRepository.getById(patientId);
    }
}
