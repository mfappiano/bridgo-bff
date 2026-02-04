import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

/* =====================
   Querystring
===================== */

const catalogSearchQuerySchema = z.object({
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

const catalogSearchPathSchema = z.object({
  category: z.string().min(2).max(50),
});

/* =====================
   Response
===================== */

const catalogSearchItemSchema = z.object({
  id: z.string(),
  label: z.string(),
});

const catalogSearchResponseSchema = z.object({
  items: z.array(catalogSearchItemSchema),
});

/* =====================
   Types
===================== */

export type CatalogSearchRequestQueryType = z.infer<
  typeof catalogSearchQuerySchema
>;

export type CatalogSearchPathParamsType = z.infer<
  typeof catalogSearchPathSchema
>;

export type CatalogSearchResponseSchemaType = z.infer<
  typeof catalogSearchResponseSchema
>;

/* =====================
   Build schemas
===================== */

const { schemas: catalogSearchByCategorySchemas, $ref } = buildJsonSchemas(
  {
    catalogSearchQuerySchema,
    catalogSearchResponseSchema,
    catalogSearchPathSchema,
  },
  {
    $id: 'catalogSearchByCategorySchemas',
  },
);

export { catalogSearchByCategorySchemas };

/* =====================
   Fastify schema
===================== */

export const CatalogSearchByCategorySchema = {
  tags: ['catalogs'],
  params: $ref('catalogSearchQuerySchema'),
  querystring: $ref('catalogSearchQuerySchema'),
  response: {
    200: $ref('catalogSearchResponseSchema'),
  },
};
