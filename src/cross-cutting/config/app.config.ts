import { z } from 'zod';

export const ApiKeyConfig = z.object({
  header: z.string(),
  value: z.string().optional(),
});
export type ApiKeyConfig = z.infer<typeof ApiKeyConfig>;

export const AppConfig = z.object({
  port: z.number().default(8080),
  env: z.string(),
  kongUrl: z.string().default('http://localhost:8081'),
  corsOrigins: z.string().default('*'),
  logLevel: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'),
  logPretty: z.boolean().default(false),
  newRelicLicenseKey: z.string().optional(),
});
export type AppConfig = z.infer<typeof AppConfig>;
