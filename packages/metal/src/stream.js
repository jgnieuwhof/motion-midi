import { keys, merge, padStart, set } from "lodash";
import { median } from "ramda";

import { connect, listPorts, parser } from "./utils";
import { clear, log } from "./common/console";

// let state = {
//   durations: Array.from({ length: n }, () => [])
// };
//
// if (state.durations[id].length === history) state.durations[id].shift();
// state.durations[id].push(duration);
//
// setInterval(() => {
//   const warning = clear();
//   log(
//     state.durations
//       .map(median)
//       .map((m, i) => `${padStart(i, 2, "0")}: ${m}`)
//       .join("\n")
//   );
// }, 1000 / fps);

const stream = async (
  callback,
  { baudRate = 28800, byteLength = 5, device: _device } = {}
) => {
  const device = _device || (await listPorts())[0];
  const port = connect({ device, baudRate, byteLength });
  log(`Connected to: ${device}`);
  port.on("error", log);
  port.on("data", chunk => callback(parser.parse(chunk)));
};

main();
