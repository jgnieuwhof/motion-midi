import { compose, withPropsOnChange, withState } from 'recompose';
import socketStream from 'socket.io-stream';
import uuid from 'uuid/v4';

import { withContext } from 'context/index';

const enhance = compose(
  withContext('socket'),
  withState('id', 'setId', null),
  withState('closed', 'setClosed', true),
  withState('error', 'setError', null),
  withState('data', 'setData', null),
  withPropsOnChange(
    ['on'],
    ({
      message,
      args,
      socket,
      on,
      id,
      setId,
      setClosed,
      setData,
      setError,
    }) => {
      if (on) {
        const id = uuid();
        socketStream(socket).on(`server::${message}::${id}`, stream => {
          console.log(
            `Connected to stream '${stream.id}', internal id '${id}'`,
          );
          stream.on('close', () => setClosed(true));
          stream.on('error', error => console.error(error) || setError(error));
          stream.on('data', data => setData(data));
          setId(id);
          setClosed(false);
        });
        socket.emit(`client::${message}`, { ...args, id });
      } else {
        setId(null);
        setClosed(true);
        socket.emit(`client::${message}End::${id}`);
      }
    },
  ),
);

export default enhance(({ render, on, data, error, closed }) =>
  render({ on, data, error, closed }),
);
