// Required for fastify-decorators/testing
import 'reflect-metadata';

vi.mock('newrelic', () => ({
  addCustomAttributes: vi.fn(),
}));
process.env.PORT = '80';
process.env.LOG_LEVEL = 'silent';
