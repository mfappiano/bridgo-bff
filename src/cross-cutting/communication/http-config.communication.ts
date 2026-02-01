import Agent from 'agentkeepalive';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getContext } from '~/cross-cutting/context/request.context';

export const agentHttpConfig = {
  maxSockets: process.env.HTTP_CLIENT_HTTP_AGENT_MAX_SOCKETS ?? 100,
  maxFreeSockets: process.env.HTTP_CLIENT_HTTP_AGENT_MAX_FREE_SOCKETS ?? 100,
  timeout: process.env.HTTP_CLIENT_HTTP_AGENT_SOCKET_TIMEOUT ?? 60000,
  freeSocketTimeout: process.env.HTTP_CLIENT_HTTP_AGENT_FREE_SOCKET_TIMEOUT ?? 300000,
} as Agent.HttpOptions;

export const agentHttpsConfig = {
  maxSockets: process.env.HTTP_CLIENT_HTTPS_AGENT_MAX_SOCKETS ?? 100,
  maxFreeSockets: process.env.HTTP_CLIENT_HTTPS_AGENT_MAX_FREE_SOCKETS ?? 100,
  timeout: process.env.HTTP_CLIENT_HTTPS_AGENT_SOCKET_TIMEOUT ?? 60000,
  freeSocketTimeout: process.env.HTTP_CLIENT_HTTPS_AGENT_FREE_SOCKET_TIMEOUT ?? 300000,
} as Agent.HttpsOptions;

export const logRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  const requestContext = getContext();
  config.headers.set('correlation_id', requestContext.id);
  if (requestContext.authToken) {
    config.headers.set('Authorization', `Bearer ${requestContext.authToken}`);
  }

  requestContext.logger.debug(
    'Llamando a servicio... %s %s %o',
    config.method?.toUpperCase(),
    config.url,
    config.data,
  );

  return config;
};

export const logResponseInterceptor = (config: AxiosResponse) => {
  const context = getContext();
  if (context.logger) {
    context.logger.debug(`Respuesta del servicio... %s %o`, config.status, config.data);
  }

  return config;
};
