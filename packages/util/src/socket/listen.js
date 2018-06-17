import net from 'net';

import { socketToPath } from './utils';

const listen = ({ socket }) =>
  net.createConnection({ path: socketToPath(socket) });

export default listen;
