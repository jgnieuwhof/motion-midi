import styled from 'react-emotion';
import {
  alignItems,
  alignContent,
  justifyContent,
  flexWrap,
  flexDirection,
  flex,
  flexBasis,
  order,
} from 'styled-system';

import Div from './Div';

const Flex = styled(Div)`
  ${alignItems}
  ${alignContent}
  ${justifyContent}
  ${flexWrap}
  ${flexDirection}
  ${flex}
  ${flexBasis}
  ${order}
`;

export default Flex;
