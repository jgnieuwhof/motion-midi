import connect from "./connect";
import listPorts from "./listPorts";

// function getConnectedArduino() {
//   var serialPort = require("serialport");
//   sp = new serialPort(arduinoport, {
//     buadRate: 9600
//   });
//   sp.on("open", function() {
//     console.log("done! arduino is now connected at port: " + arduinoport);
//   });
// }

const main = async () => {
  const ports = await listPorts();
  if (ports.length) {
    const port = connect(ports[0]);
    port.on("data", chunk => {
      console.log(chunk.toString());
    });
  }
};

main();
