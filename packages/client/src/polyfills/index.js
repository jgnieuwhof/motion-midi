import socketStream from 'socket.io-stream';

// binary-parser in @motion-midi/utils requires Buffer. socket.io-stream
// includes a buffer polyfill for convenience
window.Buffer = socketStream.Buffer;
