import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import sqlite3 from 'sqlite3';

const dbConnector = (fastify: FastifyInstance) => {
  const dbFile = './app.db';
  const verboseSqlite3 = sqlite3.verbose();
  const db = new verboseSqlite3.Database(dbFile);

  db.exec(`
    CREATE TABLE IF NOT EXISTS widgets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL CHECK (type IN ('line', 'bar', 'text')),
      content TEXT NULL,
      data JSON NULL,
      "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  fastify.decorate('db', db);

  fastify.addHook('onClose', (_, done) => {
    db.close();
    done();
  });
};

export default fp(dbConnector);
