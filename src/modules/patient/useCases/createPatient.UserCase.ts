import { Inject, Service } from "fastify-decorators";
import { PatientRepository } from "~/modules/patient/repositories/patient.repository";
import {
    PatientCreateRequestType,
    PatientResponseType,
} from "~/api/patient/patient.model";

@Service()
export class CreatePatientUseCase {
    @Inject(PatientRepository)
    private readonly patientRepository!: PatientRepository;

    async execute(payload: PatientCreateRequestType): Promise<PatientResponseType> {
        return this.patientRepository.create(payload);
    }
}
