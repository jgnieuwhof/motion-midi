import React from 'react';

import Sidebar from 'grommet/components/Sidebar';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';

export default () => (
  <Sidebar size="small" full colorIndex="brand">
    <Header pad="medium" justify="between">
      <Title>nieuwhof</Title>
    </Header>
    <Box flex="grow" justify="start">
      <Menu primary={true}>
        <Anchor path="/" label="dashboard" />
      </Menu>
    </Box>
  </Sidebar>
);
