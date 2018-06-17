import { Parser } from 'binary-parser';

export const parser = new Parser()
  .endianess('little')
  .uint8('id')
  .uint32('duration');

export const squash = ({ id, duration }) => {
  const buf = Buffer.alloc(5);
  buf.writeUInt8(id, 0);
  buf.writeUInt32LE(duration, 1);
  return buf;
};
