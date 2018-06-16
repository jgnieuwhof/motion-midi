import net from 'net';

const listen = ({ socket, callback }) => {
  const client = net.createConnection({ path: socket });
  client.on('data', data => callback(data));
};

export default listen;
