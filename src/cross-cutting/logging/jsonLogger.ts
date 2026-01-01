import env from '~/cross-cutting/config';
import { LoggerConfig } from './index';

export const jsonLoggerConfig: LoggerConfig = {
  messageKey: 'message',
  level: env.logLevel,
  base: {
    dateTime: new Date().toISOString(),
  },
  formatters: {
    level(label) {
      return { level: label.toUpperCase() };
    },
  },
  redact: {
    paths: ['req.headers.authorization'],
    censor: '********',
  },
};
