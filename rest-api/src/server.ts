import { composeApp, ServerOptions } from './app/compose-app';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const host = process.env.HOST ?? 'localhost';

const options: ServerOptions = {
  logger: true,
};

const start = async () => {
  const app = composeApp(options);

  try {
    await app.listen({
      port,
      host,
    });
  }
  catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
