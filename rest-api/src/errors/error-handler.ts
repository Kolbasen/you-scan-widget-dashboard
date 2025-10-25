import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { AppErrorResponse } from '../schemas/common/error.schema';
import { AppError } from './app-error';

const isFastifyError = (error: unknown): error is FastifyError => {
  if (typeof error !== 'object' || error === null) {
    return false;
  }
  const err = error as Record<string, unknown>;

  if (typeof err.code === 'string' && err.code.startsWith('FST_')) {
    return true;
  }

  if (err.validation !== undefined) {
    return true;
  }

  if (err.serialization !== undefined) {
    return true;
  }

  return false;
};

export const errorHandler = (
  error: Error | FastifyError | AppError,
  _: FastifyRequest,
  reply: FastifyReply,
) => {
  if (error instanceof AppError) {
    const response: AppErrorResponse = {
      code: error.code,
      message: error.message,
    };

    return reply.status(error.statusCode).send(response);
  }

  if (isFastifyError(error)) {
    return reply.send(error);
  }

  return reply.status(500).send(error);
};
