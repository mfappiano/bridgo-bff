import { FastifyInstance } from 'fastify';
import { bootstrap } from 'fastify-decorators';
import HealthController from './controllers/health.controller';
import RoleController from "~/controllers/role.controller";

function initRoutes(app: FastifyInstance) {
  app.register(bootstrap, {
    controllers: [
      RoleController,
      HealthController,
    ],
  });
}

export default initRoutes;
