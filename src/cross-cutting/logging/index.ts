import { LoggerOptions } from 'pino';
import { FastifyLoggerOptions } from 'fastify';
import config from '~/cross-cutting/config';
import { prettyLoggerConfig } from '~/cross-cutting/logging/prettyLogger';
import { jsonLoggerConfig } from '~/cross-cutting/logging/jsonLogger';

export type LoggerConfig = FastifyLoggerOptions & LoggerOptions;

export const loggerConfig = config.logPretty ? prettyLoggerConfig : jsonLoggerConfig;
export const disableRequestLogging = loggerConfig.level !== 'debug';
