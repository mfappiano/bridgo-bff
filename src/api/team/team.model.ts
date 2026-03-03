import { z } from "zod";
import {teamSlotAssignmentResponseSchema, teamSlotWhitAssignmentsResponseSchema} from "~/api/team-slot/team-slot.model";

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
    completionPercentage: z.number().min(0).max(100)
});

export const teamResultResponseSchema = z.object({
    team: teamResponseSchema, // todos los campos del equipo
    slots: z.array(teamSlotWhitAssignmentsResponseSchema)
});

export const paginatedTeamResponseSchema = z.object({
    contexts: z.array(teamResultResponseSchema),
    page: z.number().int(),
    size: z.number().int(),
    totalElements: z.number().int(),
    totalPages: z.number().int(),
});

export const teamPublishBodySchema = z.object({
    associateAsPatient: z.boolean().optional(),
}).optional();

export type TeamPublishBodyType = z.infer<typeof teamPublishBodySchema>;

export const paginatedTeamRequestQuerySchema = z.object({
    page: z.number().int(),
    size: z.number().int(),
});

export type TeamResponseType = z.infer<typeof teamResponseSchema>;
export type TeamUpdateRequestType = z.infer<typeof teamUpdateSchema>;
export type TeamProgressResponseType = z.infer<typeof teamProgressResponseSchema>;
export type TeamResultResponseType = z.infer<typeof teamResultResponseSchema>;
export type PaginatedTeamResponseType = z.infer<typeof paginatedTeamResponseSchema>;
export type PaginatedTeamRequestQueryType = z.infer<typeof paginatedTeamRequestQuerySchema>;
