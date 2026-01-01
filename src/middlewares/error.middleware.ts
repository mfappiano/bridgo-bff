import { AxiosError } from 'axios';
import { FastifyInstance } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import { BaseError } from '~/cross-cutting/error-handling/abstract-error.error-handling';
import { ApiError, ErrorKeys } from '~/cross-cutting/error-handling/api-error.error-handling';

export async function errorHandler(app: FastifyInstance) {
  app.setErrorHandler((error, request, reply) => {
    let responseError = new ApiError(ErrorKeys.GENERIC_ERROR);

    if (error instanceof BaseError) responseError = error;

    if (error instanceof AxiosError) {
      const status =
        error.status === StatusCodes.NOT_FOUND ? StatusCodes.BAD_REQUEST : error.status;
      responseError = new ApiError(
        ErrorKeys.CUSTOM_ERROR,
        `[${request.method}] ${request.url} - ${error.message}`,
        status ?? StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }

    request.log.error({
      url: request.url,

      statusCode: responseError.statusCode,
      debugData: (error as AxiosError)?.response?.data ?? 'N/A',

      error: error.name,
      errorMessage: error.message,
      errorStack: error.stack,
      errorCause: error.cause,
    });

    reply.status(responseError.statusCode).send({
      message: responseError.message,
      code: responseError.code,
      debugData: (error as AxiosError)?.response?.data ?? 'N/A',
    });
  });
}
