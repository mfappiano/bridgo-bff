import {buildJsonSchemas} from "fastify-zod";
import {paginatedTeamResponseSchema, teamPublishBodySchema, teamResponseSchema, teamUpdateSchema} from "./team.model";

const {schemas: teamSchemas, $ref} = buildJsonSchemas(
    {
        teamResponseSchema,
        teamUpdateSchema,
        teamPublishBodySchema,
        paginatedTeamResponseSchema
    },
    {$id: "teamHttpSchema"}
);

export {teamSchemas};

export const TeamUpdateSchema = {
    tags: ["teams"],
    body: $ref("teamUpdateSchema"),
    response: {
        200: $ref("teamResponseSchema"),
    },
};

export const TeamPublishSchema = {
    tags: ["teams"],
    body: $ref("teamPublishBodySchema"),
    response: {
        200: $ref("teamResponseSchema"),
    },
};

export const TeamArchiveSchema = {
    tags: ["teams"],
    response: {
        200: $ref("teamResponseSchema"),
    },
};

export const PaginatedTeamResponseSchema = {
    tags: ["teams"],
    response: {
        200: $ref("paginatedTeamResponseSchema"),
    },
};
