/* eslint-disable @typescript-eslint/no-unused-vars */
import sqlite3 from 'sqlite3';

declare module 'fastify' {
  export interface FastifyInstance<
    HttpServer = http.Server,
    HttpRequest = http.IncomingMessage,
    HttpResponse = http.ServerResponse,
  > {
    db: sqlite3.Database;
  }
}
