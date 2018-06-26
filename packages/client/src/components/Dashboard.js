import React from 'react';

import Box from 'grommet/components/Box';

import Levels from 'components/Levels';

export default () => (
  <Box>
    <Levels min={300} max={700} fps={30} window={5} />
  </Box>
);
