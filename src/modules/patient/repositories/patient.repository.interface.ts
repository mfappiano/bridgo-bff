import {
    PatientCreateRequestType,
    PatientResponseType,
} from "~/api/patient/patient.model";

export interface IPatientRepository {
    getAccessible(): Promise<PatientResponseType[]>;
    getById(patientId: string): Promise<PatientResponseType | null>;
    getMe(): Promise<PatientResponseType | null>;
    create(payload: PatientCreateRequestType): Promise<PatientResponseType>;
}
