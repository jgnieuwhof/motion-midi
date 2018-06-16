import net from 'net';
import { Parser } from 'binary-parser';

import { socketName } from './env';

const parser = new Parser()
  .endianess('little')
  .uint8('id')
  .uint32('duration');

const stream = ({ socket, callback }) => {
  const client = net.createConnection({ path: socket });
  client.on('data', data => callback(parser.parse(data)));
};

const transpose = () => {
  stream({
    socket: socketName,
    callback: console.log,
  });
};

export default transpose;
