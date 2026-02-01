import { FastifyReply, FastifyRequest } from 'fastify';
import { requestContext } from '@fastify/request-context';
import { StatusCodes } from 'http-status-codes';
import crypto from 'crypto';
import config from '~/cross-cutting/config';
import { ApiError, ErrorKeys } from '~/cross-cutting/error-handling/api-error.error-handling';
import { JwtClaimsSchema, isRole } from '~/modules/auth/auth.types';

const PUBLIC_ROUTES: Array<{ method: string; path: string }> = [
  { method: 'POST', path: '/auth/register' },
  { method: 'POST', path: '/auth/login' },
  { method: 'POST', path: '/auth/google' },
  { method: 'GET', path: '/health' },
  { method: 'GET', path: '/health/' },
  { method: 'GET', path: '/' },
  { method: 'GET', path: '/favicon.ico' },
];

const SWAGGER_PREFIXES = ['/private/swagger-docs', '/documentation', '/swagger-ui'];

const ADMIN_ROLES = new Set(['ADMIN', 'ROOT']);

const base64UrlDecode = (input: string) => {
  const normalized = input.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
  return Buffer.from(padded, 'base64');
};

const timingSafeEqual = (a: Buffer, b: Buffer) => {
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
};

const extractToken = (request: FastifyRequest) => {
  const authHeader = request.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice('Bearer '.length).trim();
  }
  const cookieToken = request.cookies?.[config.authCookieName];
  return cookieToken;
};

const normalizePath = (path: string) => {
  if (path.length > 1 && path.endsWith('/')) return path.slice(0, -1);
  return path;
};

const isSwaggerEnabled = () => config.env === 'dev' || config.env === 'local';

const isPublicRoute = (request: FastifyRequest) => {
  if (request.method === 'OPTIONS') return true;
  const urlPath = normalizePath(request.url.split('?')[0]);
  if (isSwaggerEnabled() && SWAGGER_PREFIXES.some((prefix) => urlPath.startsWith(prefix))) {
    return true;
  }
  return PUBLIC_ROUTES.some(
    (route) => route.method === request.method && route.path === urlPath,
  );
};

const getAllowedAlgorithms = () =>
  config.jwtAlgorithms
    .split(',')
    .map((alg) => alg.trim())
    .filter(Boolean);

const verifyJwt = (token: string) => {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new ApiError(
      ErrorKeys.CUSTOM_ERROR,
      'Token inválido',
      StatusCodes.UNAUTHORIZED,
    );
  }

  const [headerB64, payloadB64, signatureB64] = parts;

  let header: { alg?: string };
  let payload: { exp?: number };

  try {
    header = JSON.parse(base64UrlDecode(headerB64).toString('utf8')) as {
      alg?: string;
    };
    payload = JSON.parse(base64UrlDecode(payloadB64).toString('utf8')) as {
      exp?: number;
    };
  } catch {
    throw new ApiError(
      ErrorKeys.CUSTOM_ERROR,
      'Token inválido',
      StatusCodes.UNAUTHORIZED,
    );
  }

  const allowedAlgorithms = getAllowedAlgorithms();
  if (!header.alg || !allowedAlgorithms.includes(header.alg)) {
    throw new ApiError(
      ErrorKeys.CUSTOM_ERROR,
      'Algoritmo de token no permitido',
      StatusCodes.UNAUTHORIZED,
    );
  }

  const data = `${headerB64}.${payloadB64}`;
  const signature = base64UrlDecode(signatureB64);

  if (header.alg === 'HS256') {
    if (!config.jwtSecret) {
      throw new ApiError(
        ErrorKeys.CUSTOM_ERROR,
        'JWT secret no configurado',
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
    const expected = crypto.createHmac('sha256', config.jwtSecret).update(data).digest();
    if (!timingSafeEqual(signature, expected)) {
      throw new ApiError(
        ErrorKeys.CUSTOM_ERROR,
        'Token inválido',
        StatusCodes.UNAUTHORIZED,
      );
    }
  } else if (header.alg === 'RS256') {
    if (!config.jwtPublicKey) {
      throw new ApiError(
        ErrorKeys.CUSTOM_ERROR,
        'JWT public key no configurada',
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
    const publicKey = config.jwtPublicKey.replace(/\\n/g, '\n');
    const verified = crypto.verify(
      'RSA-SHA256',
      Buffer.from(data),
      publicKey,
      signature,
    );
    if (!verified) {
      throw new ApiError(
        ErrorKeys.CUSTOM_ERROR,
        'Token inválido',
        StatusCodes.UNAUTHORIZED,
      );
    }
  }

  if (payload.exp && Date.now() / 1000 >= payload.exp) {
    throw new ApiError(
      ErrorKeys.CUSTOM_ERROR,
      'Token expirado',
      StatusCodes.UNAUTHORIZED,
    );
  }

  return payload;
};

const getTargetRoles = (body: unknown): string[] => {
  if (!body || typeof body !== 'object') return [];
  const record = body as Record<string, any>;
  if (Array.isArray(record.roles)) return record.roles;
  if (typeof record.role === 'string') return [record.role];
  if (typeof record.roleName === 'string') return [record.roleName];
  return [];
};

const isRoleRestricted = (role: string) => role === 'ADMIN' || role === 'ROOT';

export const authPreHandler = async (
  request: FastifyRequest,
  _reply: FastifyReply,
) => {
  if (isPublicRoute(request)) return;

  const token = extractToken(request);
  if (!token) {
    throw new ApiError(
      ErrorKeys.CUSTOM_ERROR,
      'Falta token de autorización',
      StatusCodes.UNAUTHORIZED,
    );
  }

  const payload = verifyJwt(token);
  const parsed = JwtClaimsSchema.safeParse(payload);
  if (!parsed.success) {
    throw new ApiError(
      ErrorKeys.CUSTOM_ERROR,
      'Token inválido',
      StatusCodes.UNAUTHORIZED,
    );
  }

  const roles = parsed.data.roles.filter(isRole);

  request.user = {
    ...parsed.data,
    roles,
  };

  requestContext.set('authToken', token);

  const urlPath = normalizePath(request.url.split('?')[0]);
  if (urlPath.startsWith('/auth/roles')) {
    const hasAdminRole = roles.some((role) => ADMIN_ROLES.has(role));
    if (!hasAdminRole) {
      throw new ApiError(
        ErrorKeys.CUSTOM_ERROR,
        'No autorizado para administrar roles',
        StatusCodes.FORBIDDEN,
      );
    }

    const targetRoles = getTargetRoles(request.body);
    const includesRestricted = targetRoles.some(isRoleRestricted);
    if (includesRestricted && !roles.includes('ROOT')) {
      throw new ApiError(
        ErrorKeys.CUSTOM_ERROR,
        'Solo ROOT puede asignar o quitar ADMIN/ROOT',
        StatusCodes.FORBIDDEN,
      );
    }
  }
};
