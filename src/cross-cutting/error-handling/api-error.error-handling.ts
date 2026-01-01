import { StatusCodes } from 'http-status-codes';
import { BaseError } from './abstract-error.error-handling';

export enum ErrorKeys {
  CUSTOM_ERROR,
  GENERIC_ERROR,
  RESOURCE_NOT_MODIFY,
  RESOURCES_NOT_FOUND,
  CREATE_RESOURCE_ERROR,
  RESOURCE_BAD_REQUEST,
  VALIDATION_ERROR,
}

export class ApiError extends BaseError {
  constructor(key: ErrorKeys, message?: string, statusCode?: StatusCodes, validation?: any) {
    const errorInventory = new Map([
      [
        ErrorKeys.CUSTOM_ERROR,
        {
          message,
          code: 0,
          statusCode: statusCode,
        },
      ],
      [
        ErrorKeys.GENERIC_ERROR,
        {
          message: 'Ups something went wrong...',
          code: 1,
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        },
      ],
      // Crud errors 200 - 300
      [
        ErrorKeys.CREATE_RESOURCE_ERROR,
        {
          message: 'Resource can not be created',
          code: 200,
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        },
      ],
      [
        ErrorKeys.RESOURCES_NOT_FOUND,
        {
          message: "Resource doesn't exist",
          code: 201,
          statusCode: StatusCodes.NOT_FOUND,
        },
      ],
      [
        ErrorKeys.RESOURCE_NOT_MODIFY,
        {
          message: "Resource can't be modified",
          code: 202,
          statusCode: StatusCodes.NOT_MODIFIED,
        },
      ],
      [
        ErrorKeys.RESOURCE_BAD_REQUEST,
        {
          message: 'Bad request, check your params',
          code: 203,
          statusCode: StatusCodes.BAD_REQUEST,
        },
      ],
      [
        ErrorKeys.VALIDATION_ERROR,
        {
          message: message ?? 'Bad request, check your params',
          validation: validation ?? null,
          code: 204,
          statusCode: StatusCodes.BAD_REQUEST,
        },
      ],
    ]);

    const error = errorInventory.get(key) || errorInventory.get(ErrorKeys.GENERIC_ERROR);

    super(error as BaseError);
  }
}
