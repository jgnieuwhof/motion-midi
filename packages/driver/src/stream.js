import { connect, listPorts, serve } from './utils';
import { log } from './common/console';
import { device as _device, socketName } from './common/env';

const stream = async () => {
  const device = _device || (await listPorts().then(r => r?.[0]?.comName));
  if (!device) return log(`No device found, exiting`);

  const port = connect({ device });
  log(`Connected to: ${device}`);

  const socket = await serve({
    socket: socketName,
  });

  log(`Serving '${device}' data to socket '${socketName}'`);
  port.on('error', log);
  port.on('data', data => socket.write(data));
};

export default stream;
