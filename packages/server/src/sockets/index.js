import streamSensorData from './streamSensorData';

export default ({ io, ...args }) => {
  io.on('connection', socket => {
    streamSensorData({ ...args, io, socket });
  });
};
