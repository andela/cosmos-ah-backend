import server from './server';

const PORT = parseInt(process.env.PORT || 4000, 10);

server
  .startServer(PORT)
  .then((app) => {
    console.log(`Server started on http://localhost:${app.address().port}`);
  })
  .catch((err) => {
    console.error(err.message);
  });
