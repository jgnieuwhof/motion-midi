import net from 'net';

import { socketToPath } from './utils';

const listen = ({ socket, callback }) => {
  const client = net.createConnection({ path: socketToPath(socket) });
  client.on('data', data => callback(data));
};

export default listen;
