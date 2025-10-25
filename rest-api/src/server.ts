import { composeApp, ServerOptions } from './app/compose-app';

const options: ServerOptions = {
  logger: true,
};

const start = async () => {
  const app = composeApp(options);

  try {
    await app.listen({
      port: 8080,
      host: 'localhost',
    });
  }
  catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
