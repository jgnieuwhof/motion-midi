import { compose, withPropsOnChange, withState } from 'recompose';
import socketStream from 'socket.io-stream';
import uuid from 'uuid/v4';

import { withContext } from 'context/index';

const enhance = compose(
  withContext('socket'),
  withState('id', 'setId', null),
  withState('closed', 'setClosed', true),
  withState('error', 'setError', null),
  withState('state', 'setState', { data: null, state: {} }),
  withPropsOnChange(
    ['on'],
    ({
      message,
      onData = () => {},
      args,
      socket,
      on,
      id,
      setId,
      setClosed,
      setError,
      setState,
    }) => {
      if (on) {
        const id = uuid();
        socketStream(socket).on(`server::${message}::${id}`, stream => {
          console.log(
            `Connected to stream '${stream.id}', internal id '${id}'`,
          );
          stream.on('close', () => setClosed(true));
          stream.on('error', error => console.error(error) || setError(error));
          stream.on('data', data =>
            setState(state => ({
              data,
              state: onData(data, state.state) || {},
            })),
          );
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

export default enhance(
  ({ render, on, state: { data, state }, error, closed }) =>
    render ? render({ on, data, state, error, closed }) : null,
);
