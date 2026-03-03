import { z } from "zod";

export const patientResponseSchema = z.object({
    id: z.string(),
    accountId: z.string().optional(),
    firstName: z.string(),
    lastName: z.string(),
    birthDate: z.string().nullable().optional(),
    createdByUserId: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

export const patientCreateSchema = z.object({
    accountId: z.string().optional(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    birthDate: z.string().nullable().optional(),
});

export const patientListResponseSchema = z.array(patientResponseSchema);

export const patientIdParamsSchema = z.object({
    patientId: z.string(),
});

export type PatientResponseType = z.infer<typeof patientResponseSchema>;
export type PatientCreateRequestType = z.infer<typeof patientCreateSchema>;
