/* eslint-disable @typescript-eslint/no-require-imports */
import 'dotenv/config';
import 'reflect-metadata';
import createServer from './server';
import config from './cross-cutting/config';

const app = createServer();

const withNewRelic = ['dev', 'stg', 'prod'].includes(config.env);

if (withNewRelic) {
  require('../newrelic');
}

app.listen({ port: config.port, host: '0.0.0.0' }, (err) => {
  if (err) throw err;

  if (process.env.NODE_ENV === 'dev') {
    console.log(`✅ Server listening at: http://localhost:${config.port}`);
    console.log(`✅ Swagger docs at: http://localhost:${config.port}/private/swagger-docs`);
  }
});
