import React from 'react';

import SocketContext from './SocketContext';

const ContextProvider = ({ children }) => (
  <SocketContext.Provider>{children}</SocketContext.Provider>
);

export const withContext = name => Component => ({ children, ...props }) => {
  const Consumer = {
    socket: SocketContext,
  }[name].Consumer;
  return (
    <Consumer>{val => <Component {...props} {...{ [name]: val }} />}</Consumer>
  );
};

export default ContextProvider;
