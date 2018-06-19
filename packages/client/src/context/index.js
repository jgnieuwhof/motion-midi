import React from 'react';
import { ThemeProvider } from 'emotion-theming';

import theme from 'common/theme';
import SocketContext from './SocketContext';

const ContextProvider = ({ children }) => (
  <ThemeProvider theme={theme}>
    <SocketContext.Provider>{children}</SocketContext.Provider>
  </ThemeProvider>
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
