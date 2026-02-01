import { AppConfig } from '~/cross-cutting/config/app.config';

const config = AppConfig.parse({
  port: Number(process.env.PORT ?? 8080),
  env: process.env.NODE_ENV!,
  kongUrl: process.env.KONG_URL ?? 'http://localhost:8081',
  corsOrigins: process.env.CORS_ORIGINS ?? 'http://localhost:5173',
  logLevel: process.env.LOG_LEVEL || 'info',
  logPretty: process.env.LOG_PRETTY === 'true',
  jwtSecret: process.env.AUTH_JWT_SECRET ?? process.env.JWT_SECRET,
  jwtPublicKey: process.env.JWT_PUBLIC_KEY,
  jwtAlgorithms: process.env.JWT_ALGORITHMS ?? 'HS256',
  authCookieName: process.env.AUTH_COOKIE_NAME ?? 'auth_token',
});

export default config;
