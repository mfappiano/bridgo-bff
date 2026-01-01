import config from '~/cross-cutting/config';
import { LoggerConfig } from './index';

export const prettyLoggerConfig: LoggerConfig = {
  level: config.logLevel,
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'HH:MM:ss Z',
      ignore: 'pid,hostname',
      levelFirst: true,
      colorize: true,
    },
  },
};
