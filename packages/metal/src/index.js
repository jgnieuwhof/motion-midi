import { merge, padStart, set } from "lodash";
import { Parser } from "binary-parser";

import connect from "./connect";
import listPorts from "./listPorts";

const parser = new Parser()
  .endianess("little")
  .uint8("id")
  .uint32("duration");

let state = [];

const main = async () => {
  const ports = await listPorts();
  if (ports.length) {
    const port = connect(ports[0]);
    console.log(`Connected to: ${ports[0].comName}`);
    port.on("data", chunk => {
      console.log(parser.parse(chunk));
    });

    // setInterval(() => {
    //   console.log(JSON.stringify(state));
    // }, 1000 / 10);
  }
};

main();
