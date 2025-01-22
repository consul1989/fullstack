import express from 'express';
import { trpcRouter } from './router';
import cors from 'cors';
import { applyTrpcExpressApp } from './lib/trpc';

const expressApp = express();

expressApp.use(cors());

expressApp.get('/ping', (req, res) => {
  res.send('pong');
});

applyTrpcExpressApp(expressApp, trpcRouter);

const PORT = 3000;

expressApp.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
