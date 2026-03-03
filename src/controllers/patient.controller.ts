import { FastifyReply, FastifyRequest } from "fastify";
import { Controller, GET, Inject, POST } from "fastify-decorators";
import { CreatePatientUseCase } from "~/modules/patient/useCases/createPatient.UserCase";
import { GetAccessiblePatientsUseCase } from "~/modules/patient/useCases/getAccessiblePatients.UserCase";
import { GetPatientByIdUseCase } from "~/modules/patient/useCases/getPatientById.UserCase";
import { GetPatientMeUseCase } from "~/modules/patient/useCases/getPatientMe.UserCase";
import {
    PatientCreateSchema,
    PatientGetByIdSchema,
    PatientGetMeSchema,
    PatientListSchema,
} from "~/api/patient/patient.schema";
import {
    PatientCreateRequestType,
    PatientResponseType,
} from "~/api/patient/patient.model";

@Controller({ route: "/patients" })
export default class PatientController {
    @Inject(CreatePatientUseCase)
    private readonly createPatientUseCase!: CreatePatientUseCase;

    @Inject(GetAccessiblePatientsUseCase)
    private readonly getAccessiblePatientsUseCase!: GetAccessiblePatientsUseCase;

    @Inject(GetPatientByIdUseCase)
    private readonly getPatientByIdUseCase!: GetPatientByIdUseCase;

    @Inject(GetPatientMeUseCase)
    private readonly getPatientMeUseCase!: GetPatientMeUseCase;

    @GET({
        url: "/me",
        options: { schema: PatientGetMeSchema },
    })
    async getMe(
        _request: FastifyRequest,
        reply: FastifyReply
    ) {
        const result = await this.getPatientMeUseCase.execute();
        if (result == null) {
            return reply.status(404).send();
        }
        return reply.status(200).send(result);
    }

    @GET({
        url: "",
        options: { schema: PatientListSchema },
    })
    async getAccessible(
        _request: FastifyRequest,
        reply: FastifyReply
    ) {
        const result = await this.getAccessiblePatientsUseCase.execute();
        return reply.status(200).send(result);
    }

    @GET({
        url: "/:patientId",
        options: { schema: PatientGetByIdSchema },
    })
    async getById(
        request: FastifyRequest<{
            Params: { patientId: string };
            Reply: PatientResponseType;
        }>,
        reply: FastifyReply
    ) {
        const { patientId } = request.params;
        const result = await this.getPatientByIdUseCase.execute(patientId);
        if (result == null) {
            return reply.status(404).send();
        }
        return reply.status(200).send(result);
    }

    @POST({
        url: "",
        options: { schema: PatientCreateSchema },
    })
    async create(
        request: FastifyRequest<{
            Body: PatientCreateRequestType;
            Reply: PatientResponseType;
        }>,
        reply: FastifyReply
    ) {
        const result = await this.createPatientUseCase.execute(request.body);
        return reply.status(200).send(result);
    }
}
