import styled from 'react-emotion';
import {
  space,
  height,
  width,
  fontSize,
  color,
  justifySelf,
  alignSelf,
} from 'styled-system';

const styleHelper = (prop, cssProp) => props =>
  props[prop] ? `${cssProp}: ${props[prop]};` : ``;

const applyDefaultStyles = Component => styled(Component)`
  ${space}
  ${height}
  ${width}
  ${fontSize}
  ${color}

  ${justifySelf}
  ${alignSelf}

  ${styleHelper('flexGrow', 'flex-grow')}
`;

export default applyDefaultStyles;
