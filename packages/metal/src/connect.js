import SerialPort from "serialport";

import { baudRate } from "./common/env";

const connect = port => new SerialPort(port.comName, { baudRate });

export default connect;
