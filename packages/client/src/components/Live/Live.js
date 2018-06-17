import React from 'react';

import { parser } from '@motion-midi/util/dist/parser';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Meter from 'grommet/components/Meter';
import Chart, { Base } from 'grommet/components/chart/Chart';

import Component from 'components/utils/Component';
import DataStream from './DataStream';

const Live = () => (
  <Component initialState={{ on: false }}>
    {({ state: { on }, setState }) => (
      <Box align="center" full>
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
          onData={(data, state) => {
            const { id, duration } = parser.parse(data);
            return {
              durations: {
                ...state.durations,
                [id]: duration > 3000 ? 0 : (duration / 3000) * 100,
              },
            };
          }}
          render={({ state: { data, durations } }) =>
            on ? (
              <Chart full>
                <Base width="full">
                  <Box full direction="row" justify="between">
                    {Object.keys(durations || {}).map(id => (
                      <Meter
                        key={id}
                        vertical={true}
                        max={100}
                        min={0}
                        value={durations[id]}
                      />
                    ))}
                  </Box>
                </Base>
              </Chart>
            ) : null
          }
        />
      </Box>
    )}
  </Component>
);

export default Live;
