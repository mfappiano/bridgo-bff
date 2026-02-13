import { z } from "zod";
import {
    teamSlotCreateSchema,
    teamSlotResponseSchema, teamSlotWhitAssignmentsResponseSchema
} from "~/api/team-slot/team-slot.model";
import {
    teamProgressResponseSchema,
    teamResponseSchema,
    teamTypeEnum
} from "~/api/team/team.model";

export const teamDraftCreateSchema = z.object({
    name: z.string().min(1),
    category: z.string().min(1),
    type: teamTypeEnum,
    createdByUserId: z.string().optional(),
    metadata: z.record(z.any()).optional(),
});

export const teamDraftWithSlotsSchema = z.object({
    team: teamDraftCreateSchema.pick({
        name: true,
        category: true,
        type: true,
    }),
    slots: z.array(teamSlotCreateSchema),
});

export const teamDraftWithSlotsResponseSchema = z.object({
    team: teamResponseSchema,
    slots: z.array(teamSlotResponseSchema),
});

export const teamSnapshotResponseSchema = z.object({
    team: teamResponseSchema,
    slots: z.array(teamSlotWhitAssignmentsResponseSchema),
    progress: teamProgressResponseSchema,
});

export const teamDraftGetCurrentQuerySchema = z.object({
    type: teamTypeEnum.optional(),
});

export type TeamDraftCreateRequestType = z.infer<typeof teamDraftCreateSchema>;
export type TeamDraftWithSlotsResponseType = z.infer<
    typeof teamDraftWithSlotsResponseSchema
>;
export type TeamDraftWithSlotsRequestType = z.infer<typeof teamDraftWithSlotsSchema>;
export type TeamDraftGetCurrentRequestType = z.infer<typeof teamDraftGetCurrentQuerySchema>;
export type TeamSnapshotResponseType = z.infer<typeof teamSnapshotResponseSchema>;
