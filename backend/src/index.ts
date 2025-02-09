import express from 'express';
import { trpcRouter } from './router';
import cors from 'cors';
import { applyTrpcExpressApp } from './lib/trpc';
import { AppContext, createAppContext } from './lib/ctx';
import { applyPassportToExpressApp } from './lib/passport';
import { env } from './lib/env';

void (async () => {
  let ctx: AppContext | null = null;

  try {
    ctx = createAppContext();

    const expressApp = express();

    expressApp.use(cors());

    expressApp.get('/ping', (req, res) => {
      res.send('pong');
    });

    applyPassportToExpressApp(expressApp, ctx);
    await applyTrpcExpressApp(expressApp, ctx, trpcRouter);

    expressApp.listen(env.PORT, () => console.log(`Listening at http://localhost:${env.PORT}`));
  } catch (error) {
    console.log(error);

    await ctx?.stop;
  }
})();
