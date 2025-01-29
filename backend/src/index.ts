import express from 'express';
import { trpcRouter } from './router';
import cors from 'cors';
import { applyTrpcExpressApp } from './lib/trpc';
import { AppContext, createAppContext } from './lib/ctx';

void (async () => {
  let ctx: AppContext | null = null;

  try {
    ctx = createAppContext();

    const expressApp = express();

    expressApp.use(cors());

    expressApp.get('/ping', (req, res) => {
      res.send('pong');
    });

    applyTrpcExpressApp(expressApp, ctx, trpcRouter);

    const PORT = 3000;

    expressApp.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
  } catch (error) {
    console.log(error);

    await ctx?.stop;
  }
})();
