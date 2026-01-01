import fastify, { FastifyInstance } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import { configureControllerTest } from 'fastify-decorators/testing';
import HealthController from '~/controllers/health.controller';
import { initSchemas } from '~/api';
import config from '~/cross-cutting/config';

describe('Health Tests', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    // Recreate app for testing purposes omitting unnecessary configurations
    app = fastify();
    initSchemas(app);

    // Register controller
    app = await configureControllerTest({
      instance: app,
      controller: HealthController,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should respond with 200 OK', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/health',
    });

    expect(response.statusCode).toBe(StatusCodes.OK);
    expect(response.json()).toEqual({
      ok: true,
      message: `running at port: ${config.port}`,
    });
  });
});
