import { z } from "zod";
import {teamTypeEnum} from "~/api/team/team.model";

export const assignmentStatusEnum = z.enum(
    ["INVITED", "ACTIVE", "REJECTED", "EXPIRED", "CANCELLED"]);

export const teamSlotCreateSchema = z.object({
    roleId: z.string().min(1),
    required: z.boolean().optional(),
    quantity: z.number().int().min(1).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    priority: z.number().int().optional(),
});

export const teamSlotResponseSchema = z.object({
    slotId: z.string(),
    teamId: z.string(),
    roleId: z.string(),
    required: z.boolean(),
    quantity: z.number().int(),
    status: z.string().nullable().optional(),
    memberId: z.string().nullable().optional(),
    inviteId: z.string().nullable().optional(),
    startDate: z.string().datetime().nullable().optional(),
    endDate: z.string().datetime().nullable().optional(),
    priority: z.number().int().nullable().optional(),
    createdAt: z.string().datetime().nullable().optional(),
    updatedAt: z.string().datetime().nullable().optional(),
});

export const teamSlotAssignSchema = z.object({
    professionalId: z.string().optional(),
    inviteId: z.string().optional(),
});

export const teamSlotUpdateSchema = z.object({
    required: z.boolean().optional(),
    quantity: z.number().int().min(1).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    priority: z.number().int().optional(),
});

export const teamSlotAssignmentResponseSchema = z.object({
    id: z.string(),
    slotId: z.string(),
    professionalId: z.string().optional(),
    inviteId: z.string().optional(),
    assignedAt: z.string().datetime().optional(),
    status: assignmentStatusEnum.nullable().optional(),
    email: z.string().email().optional(),
});

export const teamSlotWhitAssignmentsResponseSchema = z.object({
    slotId: z.string(),
    roleId: z.string(),
    required: z.boolean().optional(),
    quantity: z.number().int().min(1).optional(),
    status: z.string().optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    priority: z.number().int().optional(),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
    assignments: z.array(teamSlotAssignmentResponseSchema)
});

export type TeamSlotResponseType = z.infer<typeof teamSlotResponseSchema>;
export type TeamSlotCreateRequestType = z.infer<typeof teamSlotCreateSchema>;
export type TeamSlotUpdateRequestType = z.infer<typeof teamSlotUpdateSchema>;
export type TeamSlotAssignRequestType = z.infer<typeof teamSlotAssignSchema>;
export type TeamSlotAssignmentResponseType = z.infer<typeof teamSlotAssignmentResponseSchema>;
export type TeamSlotWhitAssignmentsResponseType = z.infer<typeof teamSlotWhitAssignmentsResponseSchema>;
