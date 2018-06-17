import React from 'react';
import Component from 'react-component-component';

const TheComponent = ({ children, initialState }) => (
  <Component {...{ initialState }}>
    {({ state, setState }) => children({ state, setState })}
  </Component>
);

export default TheComponent;
