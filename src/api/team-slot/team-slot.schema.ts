import { buildJsonSchemas } from "fastify-zod";
import {
    teamSlotCreateSchema,
    teamSlotResponseSchema,
    teamSlotAssignSchema,
    teamSlotUpdateSchema,
    teamSlotAssignmentCancelResponseSchema,
    teamSlotAssignmentResponseSchema,
    teamSlotAssignmentUpdateSchema,
} from "./team-slot.model";

const { schemas: teamSlotSchemas, $ref } = buildJsonSchemas(
    {
        teamSlotCreateSchema,
        teamSlotResponseSchema,
        teamSlotAssignSchema,
        teamSlotUpdateSchema,
        teamSlotAssignmentCancelResponseSchema,
        teamSlotAssignmentResponseSchema,
        teamSlotAssignmentUpdateSchema,
    },
    { $id: "teamSlotHttpSchema" }
);

export { teamSlotSchemas };

export const TeamSlotCreateSchema = {
    tags: ["teams"],
    body: $ref("teamSlotCreateSchema"),
    response: {
        200: $ref("teamSlotResponseSchema"),
    },
};

export const TeamSlotUpdateSchema = {
    tags: ["teams"],
    body: $ref("teamSlotUpdateSchema"),
    response: {
        200: $ref("teamSlotResponseSchema"),
    },
};

export const TeamSlotAssignSchema = {
    tags: ["teams"],
    body: $ref("teamSlotAssignSchema"),
    response: {
        200: $ref("teamSlotAssignmentResponseSchema"),
    },
};

export const TeamSlotVacateSchema = {
    tags: ["teams"],
    response: {
        200: $ref("teamSlotResponseSchema"),
    },
};

export const TeamSlotAssignmentCancelSchema = {
    tags: ["teams"],
    response: {
        204: $ref("teamSlotAssignmentCancelResponseSchema"),
    },
};

export const TeamSlotAssignmentUpdateSchema = {
    tags: ["teams"],
    body: $ref("teamSlotAssignmentUpdateSchema"),
    response: {
        200: $ref("teamSlotAssignmentResponseSchema"),
    },
};
