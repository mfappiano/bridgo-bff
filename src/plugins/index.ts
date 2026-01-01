import { FastifyInstance } from 'fastify';
import cookie, { FastifyCookieOptions } from '@fastify/cookie';
import fastifyRequestContext from '@fastify/request-context';
import fastifySwagger from '@fastify/swagger';
import fastifyMultipart from '@fastify/multipart';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { ServerType } from '~/cross-cutting/config/server.config';
import { initContext } from '~/cross-cutting/context/request.context';
import cachePlugin from './cache.plugin';
import { version } from '../../package.json';
import cors from '@fastify/cors';
import config from '~/cross-cutting/config';

const servers: ServerType[] = [];

export function initPlugins(app: FastifyInstance) {
  app.register(cors, { origin: config.corsOrigins.split(',') });
  app.register(fastifyRequestContext, initContext());
  app.register(cookie, {} as FastifyCookieOptions);
  app.register(fastifyMultipart, { attachFieldsToBody: true });
  app.register(cachePlugin, { cacheStrategy: 'lru', opts: { max: 100, ttl: 10000 } });

  app.register(fastifySwagger, {
    openapi: {
      openapi: '3.0.1',
      info: {
        title: 'Node Fastify Template BFF',
        version,
      },
      servers: servers,
    },

    stripBasePath: true,
  });

  app.register(fastifySwaggerUi, {
    routePrefix: '/private/swagger-docs',
  });
}
