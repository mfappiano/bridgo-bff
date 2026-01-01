import { buildJsonSchemas } from 'fastify-zod';
import { z } from 'zod';

export const healthResponseSchema = z.object({
  ok: z.boolean(),
  message: z.string(),
});

export type HealthResponseSchemaType = z.infer<typeof healthResponseSchema>;

/**
 * Se crean los schemas y la funcion $ref que sirve para obtener el schema
 * @link https://github.com/elierotenberg/fastify-zod?tab=readme-ov-file#api
 */
const { schemas: healthSchemas, $ref } = buildJsonSchemas(
  {
    healthResponseSchema,
  },
  {
    $id: 'healthSchemas',
  },
);
export { healthSchemas };

export const healthSchema = {
  tags: ['health-module'],
  response: {
    200: $ref('healthResponseSchema'),
  },
};
