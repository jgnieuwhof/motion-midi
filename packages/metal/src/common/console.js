import readline from "readline";

export const log = console.log;

export const clear = () => {
  readline.cursorTo(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);
};
