import { startServer, closeServer } from './server';

const PORT = parseInt(process.env.PORT || 4000, 10);

const startUp = async () => {
  try {
    console.log('Starting application...');
    await startServer(PORT);
    await console.log(`Server started listening on http://localhost:${PORT}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const shutdown = async (err = {}) => {
  try {
    console.log('Shutting down server');
    await closeServer();
  } catch (error) {
    console.log('An error occured', error);
  }

  if (err) {
    process.exit(1); // exit with a failure code
  } else {
    process.exit();
  }
};

// handles javascript error that thrown but not caught and handled with try-catch
process.on('uncaughtException', (err) => {
  console.log('uncaught Exception', err);
  shutdown(err);
});

process.on('SIGTERM', () => {
  console.log('Termination Signal received');
  shutdown();
});

// handles signal like ctrl + c
process.on('SIGINT', () => {
  console.log('Received SIGINT');

  shutdown();
});

startUp();
