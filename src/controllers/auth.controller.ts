import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, GET, Inject, PATCH, POST } from 'fastify-decorators';
import config from '~/cross-cutting/config';
import { ApiError, ErrorKeys } from '~/cross-cutting/error-handling/api-error.error-handling';
import {
  AuthGoogleSchema,
  AuthLoginSchema,
  AuthMeResponseType,
  AuthMeSchema,
  AuthMeUpdateSchema,
  AuthMeUpdateType,
  AuthPayloadType,
  AuthRegisterSchema,
  AuthResponseType,
  AuthRoleAssignSchema,
  AuthRoleRemoveSchema,
  AuthRolesListSchema,
} from '~/api';
import { AuthService } from '~/service/auth.service';
import { StatusCodes } from 'http-status-codes';

const extractTokenFromResponse = (data: unknown) => {
  if (!data || typeof data !== 'object') return undefined;
  const record = data as Record<string, any>;
  return (
    record.token ||
    record.accessToken ||
    record.jwt ||
    record.data?.token ||
    record.data?.accessToken ||
    record.data?.jwt
  );
};

const setAuthCookie = (reply: FastifyReply, token?: string) => {
  if (!token) return;
  const isSecureEnv = config.env === 'prod' || config.env === 'stg';
  reply.setCookie(config.authCookieName, token, {
    httpOnly: true,
    sameSite: isSecureEnv ? 'none' : 'lax',
    secure: isSecureEnv,
    path: '/',
  });
};

@Controller({ route: '/auth' })
export default class AuthController {
  @Inject(AuthService)
  private readonly authService!: AuthService;

  @POST({
    url: '/register',
    options: {
      schema: AuthRegisterSchema,
    },
  })
  async register(
    request: FastifyRequest<{ Body: AuthPayloadType; Reply: AuthResponseType }>,
    reply: FastifyReply,
  ) {
    const result = await this.authService.register(request.body);
    setAuthCookie(reply, extractTokenFromResponse(result));
    return reply.status(200).send(result);
  }

  @POST({
    url: '/login',
    options: {
      schema: AuthLoginSchema,
    },
  })
  async login(
    request: FastifyRequest<{ Body: AuthPayloadType; Reply: AuthResponseType }>,
    reply: FastifyReply,
  ) {
    const result = await this.authService.login(request.body);
    setAuthCookie(reply, extractTokenFromResponse(result));
    return reply.status(200).send(result);
  }

  @POST({
    url: '/google',
    options: {
      schema: AuthGoogleSchema,
    },
  })
  async google(
    request: FastifyRequest<{ Body: AuthPayloadType; Reply: AuthResponseType }>,
    reply: FastifyReply,
  ) {
    const result = await this.authService.google(request.body);
    setAuthCookie(reply, extractTokenFromResponse(result));
    return reply.status(200).send(result);
  }

  @POST({
    url: '/roles/assign',
    options: {
      schema: AuthRoleAssignSchema,
    },
  })
  async assignRole(
    request: FastifyRequest<{ Body: AuthPayloadType; Reply: AuthResponseType }>,
    reply: FastifyReply,
  ) {
    const result = await this.authService.assignRole(request.body);
    return reply.status(200).send(result);
  }

  @POST({
    url: '/roles/remove',
    options: {
      schema: AuthRoleRemoveSchema,
    },
  })
  async removeRole(
    request: FastifyRequest<{ Body: AuthPayloadType; Reply: AuthResponseType }>,
    reply: FastifyReply,
  ) {
    const result = await this.authService.removeRole(request.body);
    return reply.status(200).send(result);
  }

  @GET({
    url: '/roles',
    options: {
      schema: AuthRolesListSchema,
    },
  })
  async roles(
    _request: FastifyRequest<{ Reply: AuthResponseType }>,
    reply: FastifyReply,
  ) {
    const result = await this.authService.listRoles();
    return reply.status(200).send(result);
  }

  @GET({
    url: '/me',
    options: {
      schema: AuthMeSchema,
    },
  })
  async me(
    request: FastifyRequest<{ Reply: AuthMeResponseType }>,
    reply: FastifyReply,
  ) {
    const user = request.user;
    if (!user) {
      throw new ApiError(
        ErrorKeys.CUSTOM_ERROR,
        'Falta token de autorización',
        StatusCodes.UNAUTHORIZED,
      );
    }
    const result = await this.authService.me();
    return reply.status(200).send(result);
  }

  @PATCH({
    url: '/me',
    options: {
      schema: AuthMeUpdateSchema,
    },
  })
  async updateMe(
    request: FastifyRequest<{ Body: AuthMeUpdateType; Reply: AuthMeResponseType }>,
    reply: FastifyReply,
  ) {
    const user = request.user;
    if (!user) {
      throw new ApiError(
        ErrorKeys.CUSTOM_ERROR,
        'Falta token de autorización',
        StatusCodes.UNAUTHORIZED,
      );
    }
    const result = await this.authService.updateMe(request.body);
    return reply.status(200).send(result);
  }
}
