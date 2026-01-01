import { AppConfig } from '~/cross-cutting/config/app.config';

const config = AppConfig.parse({
  port: Number(process.env.PORT ?? 8080),
  env: process.env.NODE_ENV!,
  kongUrl: process.env.KONG_URL ?? 'http://localhost:8081',
  corsOrigins: process.env.CORS_ORIGINS ?? '*',
  logLevel: process.env.LOG_LEVEL || 'info',
  logPretty: process.env.LOG_PRETTY === 'true',
});

export default config;
