import SerialPort from "serialport";
const ByteLength = require("@serialport/parser-byte-length");

const connect = ({ device, baudRate, chunkLength }) =>
  new SerialPort(device, { baudRate }).pipe(
    new ByteLength({ length: chunkLength })
  );

export default connect;
