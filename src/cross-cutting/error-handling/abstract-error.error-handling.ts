import { StatusCodes } from 'http-status-codes';

export interface Error {
  message: string;
  code: number;
  statusCode: StatusCodes;
  validation?: any;
}

export abstract class BaseError extends Error {
  statusCode: StatusCodes;
  code: number;
  validation?: any;

  constructor(error: Error) {
    super(error.message);
    Error.captureStackTrace(this, this.constructor);
    this.code = error.code;
    this.statusCode = error.statusCode;
    this.validation = error.validation;
  }
}
