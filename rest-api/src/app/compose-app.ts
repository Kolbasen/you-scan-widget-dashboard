import Fastify, { FastifyServerOptions } from 'fastify';
import cors from '@fastify/cors';
import db from '../config/db';
import { TypeBoxTypeProvider, TypeBoxValidatorCompiler } from '@fastify/type-provider-typebox';
import { widgetRoutes } from '../routes/widgets.routes';
import { errorHandler } from '../errors/error-handler';

export type ServerOptions = Partial<FastifyServerOptions>;

const composeApp = (options: ServerOptions) => {
  const fastify = Fastify(options)
    .setValidatorCompiler(TypeBoxValidatorCompiler)
    .withTypeProvider<TypeBoxTypeProvider>();

  fastify.setErrorHandler(errorHandler);
  fastify.register(cors, { origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] });
  fastify.register(db);

  fastify.register(widgetRoutes, { prefix: '/api/widgets' });

  return fastify;
};

export { composeApp };
