import { z } from 'zod';

export const ROLE_LIST = [
  'USER',
  'PROFESSIONAL',
  'PATIENT',
  'IT',
  'ADMIN',
  'ROOT',
] as const;

export type Role = (typeof ROLE_LIST)[number];

export const JwtClaimsSchema = z
  .object({
    email: z.string(),
    provider: z.string(),
    roles: z.array(z.string()).default([]),
  })
  .passthrough();

export type JwtClaims = z.infer<typeof JwtClaimsSchema> & {
  roles: Role[];
};

export const isRole = (value: string): value is Role =>
  (ROLE_LIST as readonly string[]).includes(value);
