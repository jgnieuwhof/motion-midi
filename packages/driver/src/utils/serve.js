import net from 'net';
import fs from 'fs';
import uuid from 'uuid/v4';

import { log } from '../common/console';

const serve = async ({ socket }) => {
  let connections = {};

  if (fs.existsSync(socket)) fs.unlinkSync(socket);

  const server = net.createServer(c => {
    const id = uuid();
    connections[id] = c;
    log(`Connected to '${id}'`);
    c.on('end', () => {
      log(`'${id}' disconnected`);
      delete connections[id];
    });
  });

  await new Promise(r => server.listen(socket, r));

  return {
    socket,
    server,
    write: data =>
      Object.keys(connections).forEach(k => connections[k].write(data)),
  };
};

export default serve;
