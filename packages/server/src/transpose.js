import { listen, parser } from '@motion-midi/util';

import { socketName } from './env';

const transpose = () => {
  listen({
    socket: socketName,
    callback: data => console.log(parser.parse(data)),
  });
};

export default transpose;
