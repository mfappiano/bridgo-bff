import { buildJsonSchemas } from "fastify-zod";
import { teamResponseSchema, teamUpdateSchema } from "./team.model";

const { schemas: teamSchemas, $ref } = buildJsonSchemas(
    {
        teamResponseSchema,
        teamUpdateSchema,
    },
    { $id: "teamHttpSchema" }
);

export { teamSchemas };

export const TeamUpdateSchema = {
    tags: ["teams"],
    body: $ref("teamUpdateSchema"),
    response: {
        200: $ref("teamResponseSchema"),
    },
};

export const TeamPublishSchema = {
    tags: ["teams"],
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
