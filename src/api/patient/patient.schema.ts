import { buildJsonSchemas } from "fastify-zod";
import {
    patientCreateSchema,
    patientIdParamsSchema,
    patientListResponseSchema,
    patientResponseSchema,
} from "./patient.model";

const { schemas: patientSchemas, $ref } = buildJsonSchemas(
    {
        patientResponseSchema,
        patientCreateSchema,
        patientListResponseSchema,
        patientIdParamsSchema,
    },
    { $id: "patientHttpSchema" }
);

export { patientSchemas };

export const PatientCreateSchema = {
    tags: ["patients"],
    body: $ref("patientCreateSchema"),
    response: { 200: $ref("patientResponseSchema") },
};

export const PatientListSchema = {
    tags: ["patients"],
    response: { 200: $ref("patientListResponseSchema") },
};

export const PatientGetByIdSchema = {
    tags: ["patients"],
    params: $ref("patientIdParamsSchema"),
    response: { 200: $ref("patientResponseSchema") },
};

export const PatientGetMeSchema = {
    tags: ["patients"],
    response: { 200: $ref("patientResponseSchema") },
};
