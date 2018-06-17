import React from 'react';

import { parser } from '@motion-midi/util/dist/parser';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';

import Component from 'components/utils/Component';
import DataStream from './DataStream';

const Live = () => (
  <Box align="center">
    <Component initialState={{ on: false }}>
      {({ state: { on }, setState }) => (
        <Box align="center">
          <Box margin="small">
            <Button
              onClick={() => setState({ on: !on })}
              label={on ? `Stop` : `Start`}
            />
          </Box>
          <DataStream
            {...{ on }}
            message="stream"
            args={{ fps: 15, window: 10 }}
            render={({ data, closed, error }) => (
              <Box>
                {data ? <pre>{JSON.stringify(parser.parse(data))}</pre> : ''}
              </Box>
            )}
          />
        </Box>
      )}
    </Component>
  </Box>
);

export default Live;
