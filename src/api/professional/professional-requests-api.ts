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

/* =====================
   Build schemas
===================== */

const {schemas: professionalSearchSchemas, $ref} = buildJsonSchemas(
    {
        professionalSearchBodySchema,
        suggestProfessionalResponseSchema,
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
