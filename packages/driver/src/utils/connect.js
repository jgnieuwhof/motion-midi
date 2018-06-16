import SerialPort from 'serialport';
const ByteLength = require('@serialport/parser-byte-length');

import { baudRate, packageLength } from '../env';

const connect = ({ device }) =>
  new SerialPort(device, { baudRate }).pipe(
    new ByteLength({ length: packageLength }),
  );

export default connect;
