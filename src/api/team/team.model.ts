import { z } from "zod";

export const teamTypeEnum = z.enum(["PLANNED", "EXISTING"]);

export const teamResponseSchema = z.object({
    teamId: z.string(),
    name: z.string().nullable().optional(),
    category: z.string().nullable().optional(),
    type: teamTypeEnum.nullable().optional(),
    status: z.string().nullable().optional(),
    createdByUserId: z.string().nullable().optional(),
    createdAt: z.string().datetime().nullable().optional(),
    updatedAt: z.string().datetime().nullable().optional(),
    expiresAt: z.string().datetime().nullable().optional(),
    publishedAt: z.string().datetime().nullable().optional(),
    archivedAt: z.string().datetime().nullable().optional(),
    version: z.number().int(),
    metadata: z.record(z.any()).nullable().optional(),
});

export const teamUpdateSchema = z.object({
    name: z.string().min(1).optional(),
    category: z.string().min(1).optional(),
    type: teamTypeEnum.optional(),
    metadata: z.record(z.any()).optional(),
});

export const teamProgressResponseSchema = z.object({
    totalSlots: z.number().int(),
    assignedSlots: z.number().int(),
    pendingInvites: z.number().int(),
    activeAssignments: z.number().int(),
    rejectedInvites: z.number().int(),
    completionPercentage: z.number().int(),
});

export type TeamResponseType = z.infer<typeof teamResponseSchema>;
export type TeamUpdateRequestType = z.infer<typeof teamUpdateSchema>;
export type TeamProgressResponseType = z.infer<typeof teamProgressResponseSchema>;
