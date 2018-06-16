import net from 'net';
import fs from 'fs';
import uuid from 'uuid/v4';

import { socketToPath } from './utils';

const serve = async ({ socket, onConnect, onEnd }) => {
  let connections = {};
  const path = socketToPath(socket);

  if (fs.existsSync(path)) fs.unlinkSync(path);

  const server = net.createServer(connection => {
    const id = uuid();
    const args = { id, connection };

    connections[id] = connection;

    onConnect?.(args);

    connection.on('end', () => {
      onEnd?.(args);
      delete connections[id];
    });
  });

  await new Promise(r => server.listen(path, r));

  return {
    socket,
    path,
    server,
    write: data =>
      Object.keys(connections).forEach(k => connections[k].write(data)),
  };
};

export default serve;
