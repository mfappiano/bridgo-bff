import 'reflect-metadata';
import fastify from 'fastify';
import { v4 as uuidV4 } from 'uuid';
import qs from 'qs';
import initRoutes from '~/routes';
import { initPlugins } from '~/plugins';
import { errorHandler } from '~/middlewares/error.middleware';
import { initSchemas } from '~/api';
import { loggerConfig, disableRequestLogging } from '~/cross-cutting/logging';

function createServer() {
  const app = fastify({
    routerOptions: {
      querystringParser: (str: string) => qs.parse(str, { comma: true }),
    },
    requestIdHeader: 'correlation_id',
    requestIdLogLabel: 'correlation_id',
    genReqId: function (req) {
      return (req.headers.correlation_id as string | undefined) || uuidV4();
    },
    logger: loggerConfig,
    disableRequestLogging,
  });

  initPlugins(app);
  initSchemas(app);
  initRoutes(app);
  errorHandler(app);

  return app;
}

export default createServer;
