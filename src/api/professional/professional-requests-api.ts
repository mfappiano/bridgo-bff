import {z} from "zod";
import {buildJsonSchemas} from "fastify-zod";
import {CategoryUnion} from "~/modules/catalogItem/domain/catalog-item";

/* =====================
   Request
===================== */

const professionalSearchBodySchema = z.object({
    context: z.object({
        category: CategoryUnion,
        catalogItemId: z.string(),
    }),
    query: z.object({
        text: z.string().min(1),
    }),
    filters: z
        .object({
            talent: z
                .object({
                    obras_sociales: z.string().optional(),
                    guardias: z.boolean().optional(),
                })
                .optional(),
            professional: z
                .object({
                    verified: z.boolean().optional(),
                })
                .optional(),
        })
        .optional(),
    limit: z.number().min(1).max(50).default(10),
});

const professionalInviteCreateSchema = z.object({
    teamId: z.string().min(1),
    slotId: z.string().min(1),
    email: z.string().email(),
    sentByUserId: z.string().min(1),
});

const professionalInviteAcceptSchema = z.object({
    token: z.string().min(1),
    acceptedByProfessionalId: z.string().optional(),
});

/* =====================
   Response
===================== */

const suggestProfessionalViewSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    lastName: z.string(),
    healthProfile: z
        .object({
            license: z
                .object({
                    number: z.string(),
                    authority: z.string(),
                    region: z.string(),
                })
                .nullable(),
        })
        .nullable(),
});

const professionalInviteResponseSchema = z.object({
    id: z.string(),
    teamId: z.string(),
    slotId: z.string(),
    email: z.string().email(),
    status: z.string(),
    sentAt: z.string().datetime().nullable().optional(),
    expiresAt: z.string().datetime().nullable().optional(),
    sentByUserId: z.string().optional(),
    acceptedAt: z.string().datetime().nullable().optional(),
    acceptedByProfessionalId: z.string().nullable().optional(),
    token: z.string(),
});

const suggestProfessionalResponseSchema =
    z.array(suggestProfessionalViewSchema);

/* =====================
   Types
===================== */

export type ProfessionalSearchRequestBodyType = z.infer<
    typeof professionalSearchBodySchema
>;

export type ProfessionalSearchResponseSchemaType = z.infer<
    typeof suggestProfessionalResponseSchema
>;

export type ProfessionalInviteCreateRequestType = z.infer<
    typeof professionalInviteCreateSchema
>;

export type ProfessionalInviteAcceptRequestType = z.infer<
    typeof professionalInviteAcceptSchema
>;

export type ProfessionalInviteResponseType = z.infer<
    typeof professionalInviteResponseSchema
>;

/* =====================
   Build schemas
===================== */

const {schemas: professionalSearchSchemas, $ref} = buildJsonSchemas(
    {
        professionalSearchBodySchema,
        suggestProfessionalResponseSchema,
        professionalInviteCreateSchema,
        professionalInviteAcceptSchema,
        professionalInviteResponseSchema,
    },
    {$id: "professionalSearchSchemas"}
);

export {professionalSearchSchemas};

/* =====================
   Fastify schema
===================== */

export const ProfessionalSearchSchema = {
    tags: ["professionals"],
    body: $ref("professionalSearchBodySchema"),
    response: {
        200: $ref("suggestProfessionalResponseSchema"),
    },
};

export const ProfessionalInviteCreateSchema = {
    tags: ["professionals"],
    body: $ref("professionalInviteCreateSchema"),
    response: {
        200: $ref("professionalInviteResponseSchema"),
    },
};

export const ProfessionalInviteValidateSchema = {
    tags: ["professionals"],
    response: {
        200: $ref("professionalInviteResponseSchema"),
    },
};

export const ProfessionalInviteAcceptSchema = {
    tags: ["professionals"],
    body: $ref("professionalInviteAcceptSchema"),
    response: {
        200: $ref("professionalInviteResponseSchema"),
    },
};
