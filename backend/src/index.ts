import express from 'express';

const expressApp = express();

expressApp.get('/ping', (req, res) => {
  res.send('pong');
});

expressApp.get('/ideas', (req, res) => {
  res.send([
    {
      id: 1,
      title: 'Fuck',
    },
  ]);
});

const PORT = 3000;

expressApp.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
