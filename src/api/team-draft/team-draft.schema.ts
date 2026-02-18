import { buildJsonSchemas } from "fastify-zod";
import {
    teamDraftCreateSchema,
    teamDraftWithSlotsSchema,
    teamDraftWithSlotsResponseSchema,
    teamDraftGetCurrentQuerySchema, teamSnapshotResponseSchema,
} from "./team-draft.model";
import {teamResponseSchema} from "~/api/team/team.model";

const { schemas: teamDraftSchemas, $ref } = buildJsonSchemas(
    {
        teamDraftCreateSchema,
        teamDraftWithSlotsSchema,
        teamDraftWithSlotsResponseSchema,
        teamDraftGetCurrentQuerySchema,
        teamResponseSchema,
        teamSnapshotResponseSchema
    },
    { $id: "teamDraftHttpSchema" }
);

export { teamDraftSchemas };

export const TeamDraftCreateSchema = {
    tags: ["teams-draft"],
    body: $ref("teamDraftCreateSchema"),
    response: {
        200: $ref("teamResponseSchema"),
    },
};

export const TeamDraftWithSlotsSchema = {
    tags: ["teams-draft"],
    body: $ref("teamDraftWithSlotsSchema"),
    response: {
        200: $ref("teamDraftWithSlotsResponseSchema"),
    },
};

export const TeamDraftGetCurrentSchema = {
    tags: ["teams-draft"],
    querystring: $ref("teamDraftGetCurrentQuerySchema"),
    response: {
        200: $ref("teamSnapshotResponseSchema"),
    },
};
