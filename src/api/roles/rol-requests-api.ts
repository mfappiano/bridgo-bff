import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

/* =====================
   Querystring
===================== */

const roleSearchQuerySchema = z.object({
  q: z
    .string()
    .min(2, 'La búsqueda debe tener al menos 2 caracteres')
    .max(100)
    .optional(),

  category: z
    .string()
    .min(2)
    .max(50)
    .optional(),

  limit: z
    .number()
    .int()
    .min(1)
    .max(20)
    .optional()
    .default(10),
});

/* =====================
   Response
===================== */

const roleSearchItemSchema = z.object({
  id: z.string(),
  label: z.string(),
});

const roleSearchResponseSchema = z.object({
  items: z.array(roleSearchItemSchema),
});

/* =====================
   Types
===================== */

export type RoleSearchRequestQueryType = z.infer<
  typeof roleSearchQuerySchema
>;

export type RoleSearchResponseSchemaType = z.infer<
  typeof roleSearchResponseSchema
>;

/* =====================
   Build schemas
===================== */

const { schemas: roleSearchSchemas, $ref } = buildJsonSchemas(
  {
    roleSearchQuerySchema,
    roleSearchResponseSchema,
  },
  {
    $id: 'roleSearchSchemas',
  },
);

export { roleSearchSchemas };

/* =====================
   Fastify schema
===================== */

export const RoleSearchSchema = {
  tags: ['roles'],
  querystring: $ref('roleSearchQuerySchema'),
  response: {
    200: $ref('roleSearchResponseSchema'),
  },
};
