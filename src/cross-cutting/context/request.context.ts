import { FastifyBaseLogger, FastifyRequest } from 'fastify';
import { requestContext } from '@fastify/request-context';

// https://github.com/fastify/fastify-request-context?tab=readme-ov-file#typescript
declare module '@fastify/request-context' {
  interface RequestContextData extends FastifyRequest {
    id: string;
    logger: FastifyBaseLogger;
    authToken?: string;
  }
}

export const initContext = () => {
  return {
    defaultStoreValues: (request: FastifyRequest) => ({
      ...request,
      id: request.id,
      logger: request.log,
    }),
  };
};

export const getContext = () => {
  return {
    id: requestContext.get('id')!,
    logger: requestContext.get('logger')!,
    authToken: requestContext.get('authToken'),
  };
};
