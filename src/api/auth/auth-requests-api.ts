import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

/* =====================
   Request
===================== */

const authPayloadSchema = z.object({}).passthrough();
const authMeUpdateSchema = z
  .object({
    displayName: z.string().min(1).optional(),
    onboardingCompleted: z.boolean().optional(),
  })
  .passthrough();

/* =====================
   Response
===================== */

const authResponseSchema = z.any();

const meResponseSchema = z.object({
  email: z.string(),
  provider: z.string(),
  roles: z.array(z.string()),
  displayName: z.string().optional(),
  onboardingCompleted: z.boolean().optional(),
});

/* =====================
   Types
===================== */

export type AuthPayloadType = z.infer<typeof authPayloadSchema>;
export type AuthResponseType = z.infer<typeof authResponseSchema>;
export type AuthMeResponseType = z.infer<typeof meResponseSchema>;
export type AuthMeUpdateType = z.infer<typeof authMeUpdateSchema>;

/* =====================
   Build schemas
===================== */

const { schemas: authSchemas, $ref } = buildJsonSchemas(
  {
    authPayloadSchema,
    authResponseSchema,
    meResponseSchema,
    authMeUpdateSchema,
  },
  { $id: 'authSchemas' },
);

export { authSchemas };

/* =====================
   Fastify schemas
===================== */

export const AuthRegisterSchema = {
  tags: ['auth'],
  body: $ref('authPayloadSchema'),
  response: {
    200: $ref('authResponseSchema'),
  },
};

export const AuthLoginSchema = {
  tags: ['auth'],
  body: $ref('authPayloadSchema'),
  response: {
    200: $ref('authResponseSchema'),
  },
};

export const AuthGoogleSchema = {
  tags: ['auth'],
  body: $ref('authPayloadSchema'),
  response: {
    200: $ref('authResponseSchema'),
  },
};

export const AuthRoleAssignSchema = {
  tags: ['auth'],
  body: $ref('authPayloadSchema'),
  response: {
    200: $ref('authResponseSchema'),
  },
};

export const AuthRoleRemoveSchema = {
  tags: ['auth'],
  body: $ref('authPayloadSchema'),
  response: {
    200: $ref('authResponseSchema'),
  },
};

export const AuthRolesListSchema = {
  tags: ['auth'],
  response: {
    200: $ref('authResponseSchema'),
  },
};

export const AuthMeSchema = {
  tags: ['auth'],
  response: {
    200: $ref('meResponseSchema'),
  },
};

export const AuthMeUpdateSchema = {
  tags: ['auth'],
  body: $ref('authMeUpdateSchema'),
  response: {
    200: $ref('meResponseSchema'),
  },
};
