import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { trpcRouter } from './trpc';

const expressApp = express();

expressApp.get('/ping', (req, res) => {
  res.send('pong');
});

expressApp.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: trpcRouter,
  })
);

const PORT = 3000;

expressApp.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
