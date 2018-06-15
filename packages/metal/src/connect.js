import SerialPort from "serialport";
const ByteLength = require("@serialport/parser-byte-length");

import { baudRate } from "./common/env";

const connect = port =>
  new SerialPort(port.comName, { baudRate }).pipe(
    new ByteLength({ length: 5 })
  );

export default connect;
