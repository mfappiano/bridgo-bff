import { FastifyInstance } from "fastify";
import { FastifyInstanceToken, Inject, Service } from "fastify-decorators";
import HttpClient from "~/cross-cutting/communication/http-client.communication";
import config from "~/cross-cutting/config";
import { IPatientRepository } from "~/modules/patient/repositories/patient.repository.interface";
import {
    PatientCreateRequestType,
    PatientResponseType,
} from "~/api/patient/patient.model";
import {
    patientListResponseSchema,
    patientResponseSchema,
} from "~/api/patient/patient.model";

@Service()
export class PatientRepository implements IPatientRepository {
    private readonly baseUrl = `${config.kongUrl}/patients`;

    @Inject(FastifyInstanceToken)
    private readonly app!: FastifyInstance;

    @Inject(HttpClient)
    private readonly httpClient!: HttpClient;

    async getAccessible(): Promise<PatientResponseType[]> {
        const logger = this.app.log.child({ module: "PatientRepository.getAccessible" });
        logger.debug("Fetching accessible patients");
        const { data } = await this.httpClient.get<PatientResponseType[]>(this.baseUrl);
        const parsed = patientListResponseSchema.safeParse(data);
        if (!parsed.success) {
            return (data as PatientResponseType[]) ?? [];
        }
        return parsed.data;
    }

    async getMe(): Promise<PatientResponseType | null> {
        const logger = this.app.log.child({ module: "PatientRepository.getMe" });
        logger.debug("Fetching current user's patient profile");
        try {
            const { data } = await this.httpClient.get<PatientResponseType>(`${this.baseUrl}/me`);
            const parsed = patientResponseSchema.safeParse(data);
            return parsed.success ? parsed.data : (data as PatientResponseType);
        } catch (err: unknown) {
            if (typeof err === "object" && err !== null && "response" in err) {
                const axiosErr = err as { response?: { status?: number } };
                if (axiosErr.response?.status === 404) {
                    return null;
                }
            }
            throw err;
        }
    }

    async getById(patientId: string): Promise<PatientResponseType | null> {
        const logger = this.app.log.child({ module: "PatientRepository.getById" });
        logger.debug("Fetching patient by id", { patientId });
        try {
            const { data } = await this.httpClient.get<PatientResponseType>(
                `${this.baseUrl}/${patientId}`
            );
            const parsed = patientResponseSchema.safeParse(data);
            return parsed.success ? parsed.data : (data as PatientResponseType);
        } catch (err: unknown) {
            if (typeof err === "object" && err !== null && "response" in err) {
                const axiosErr = err as { response?: { status?: number } };
                if (axiosErr.response?.status === 404) {
                    return null;
                }
            }
            throw err;
        }
    }

    async create(payload: PatientCreateRequestType): Promise<PatientResponseType> {
        const logger = this.app.log.child({ module: "PatientRepository.create" });
        logger.debug("Creating patient");
        const { data } = await this.httpClient.post<
            PatientResponseType,
            PatientCreateRequestType
        >(this.baseUrl, payload);
        return data as PatientResponseType;
    }
}
