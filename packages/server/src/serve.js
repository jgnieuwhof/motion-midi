import express from 'express';
import socketIO from 'socket.io';
import { Server } from 'http';
import cors from 'cors';

import { log } from '@motion-midi/util';

import { port } from './env';
import sockets from './sockets';

const serve = () => {
  const app = express();
  app.use(cors());

  const http = Server(app);
  const io = socketIO(http);

  sockets({ io });

  http.listen(port, () => log(`⚡️⚡️⚡️ Listening on port ${port} ⚡️⚡️⚡️`));
};

export default serve;
