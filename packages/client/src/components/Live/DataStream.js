import { compose, withPropsOnChange, withState } from 'recompose';
import socketStream from 'socket.io-stream';

import { withContext } from 'context/index';

const enhance = compose(
  withContext('socket'),
  withState('closed', 'setClosed', true),
  withState('error', 'setError', null),
  withState('data', 'setData', null),
  withPropsOnChange(
    ['on'],
    ({ message, args, socket, on, setClosed, setData, setError }) => {
      if (on) {
        socketStream(socket).on(`server::${message}`, stream => {
          console.log(`Connected to stream '${stream.id}'`);
          stream.on('close', () => setClosed(true));
          stream.on('error', error => console.error(error) || setError(error));
          stream.on('data', data => setData(data));
          setClosed(false);
        });
        socket.emit(`client::${message}`, args);
      } else {
        setClosed(true);
        socket.emit(`client::${message}End`);
      }
    },
  ),
);

export default enhance(({ render, on, data, error, closed }) =>
  render({ on, data, error, closed }),
);
