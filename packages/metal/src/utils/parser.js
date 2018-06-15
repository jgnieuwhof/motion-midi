import { Parser } from "binary-parser";

const parser = new Parser()
  .endianess("little")
  .uint8("id")
  .uint32("duration");

export default parser;
