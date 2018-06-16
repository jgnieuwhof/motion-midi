import { mapObjIndexed, median } from 'ramda';
import socketStream from 'socket.io-stream';

import { listen, parser } from '@motion-midi/util';

const createStream = ({ fps, window } = {}) => {
  let durations = {};
  const stream = new Readable({ read: () => {} });

  listen({
    socket: socketName,
    callback: data => {
      const { id, duration } = parser.parse(data);
      if (!durations[id]) {
        durations[id] = [duration];
      } else {
        durations[id] = [
          ...durations[id].slice(durations[id].length === window ? 1 : 0),
          duration,
        ];
      }
    },
  });

  setInterval(() => {
    stream.push(mapObjIndexed(d => median(d)));
  }, 1000 / fps);

  return stream;
};

export default ({ socket }) =>
  socketStream(socket).on(
    `client::stream`,
    (stream, { fps = 10, window = 5 } = {}) => {
      createStream({ fps, window }).pipe(stream);
    },
  );
