import { median } from 'ramda';
import socketStream from 'socket.io-stream';

import { listen, parser, squash } from '@motion-midi/util';

import { socketName } from '../env';

const createStream = ({ fps, window } = {}) => {
  let durations = {};
  const stream = socketStream.createStream({
    allowHalfOpen: true,
  });

  const client = listen({ socket: socketName });

  client.on('data', data => {
    const { id, duration } = parser.parse(data);
    if (!durations[id]) {
      durations[id] = [duration];
    } else {
      durations[id] = [
        ...durations[id].slice(durations[id].length === window ? 1 : 0),
        duration,
      ];
    }
  });

  const interval = setInterval(() => {
    Object.keys(durations).forEach(id =>
      stream.write(squash({ id, duration: median(durations[id]) })),
    );
  }, 1000 / fps);

  return {
    stream,
    close: () => {
      client.destroy();
      stream.destroy();
      clearInterval(interval);
    },
  };
};

export default ({ socket }) =>
  socket.on('client::stream', ({ fps = 10, window = 5 }) => {
    const { stream, close } = createStream({ fps, window });
    socketStream(socket).emit('server::stream', stream);
    socket.on('client::streamEnd', close);
  });
