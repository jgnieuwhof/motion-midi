import net from 'net';
import fs from 'fs';
import uuid from 'uuid/v4';

const serve = async ({ socket, onConnect, onEnd }) => {
  let connections = {};

  if (fs.existsSync(socket)) fs.unlinkSync(socket);

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

  await new Promise(r => server.listen(socket, r));

  return {
    socket,
    server,
    write: data =>
      Object.keys(connections).forEach(k => connections[k].write(data)),
  };
};

export default serve;
