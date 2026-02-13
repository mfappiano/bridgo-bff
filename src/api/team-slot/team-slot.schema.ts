import { buildJsonSchemas } from "fastify-zod";
import {
    teamSlotCreateSchema,
    teamSlotResponseSchema,
    teamSlotAssignSchema,
    teamSlotUpdateSchema,
} from "./team-slot.model";

const { schemas: teamSlotSchemas, $ref } = buildJsonSchemas(
    {
        teamSlotCreateSchema,
        teamSlotResponseSchema,
        teamSlotAssignSchema,
        teamSlotUpdateSchema,
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
        200: $ref("teamSlotResponseSchema"),
    },
};

export const TeamSlotVacateSchema = {
    tags: ["teams"],
    response: {
        200: $ref("teamSlotResponseSchema"),
    },
};
