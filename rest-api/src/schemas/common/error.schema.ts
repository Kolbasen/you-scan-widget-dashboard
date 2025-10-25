import { Static, Type } from '@fastify/type-provider-typebox';

export const AppErrorResponseSchema = Type.Object({
  code: Type.String(),
  message: Type.String(),
});

export type AppErrorResponse = Static<typeof AppErrorResponseSchema>;
