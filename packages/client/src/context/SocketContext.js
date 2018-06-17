import React from 'react';
import io from 'socket.io-client';

import { api } from 'common/env';

const socket = io.connect(api);
socket.on('connect', () => console.log(`Socket connected '${socket.id}'`));

const { Consumer, Provider } = React.createContext(null);

export default {
  Consumer,
  Provider: ({ children }) => <Provider value={socket}>{children}</Provider>,
};
