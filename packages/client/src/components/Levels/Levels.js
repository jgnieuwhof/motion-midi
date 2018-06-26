import React from 'react';

import { parser } from '@motion-midi/util/dist/parser';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';

import DataStream from './DataStream';
import LevelsCanvas from './LevelsCanvas';
import { Component, Measure } from 'components/utils';
import { Div } from 'components/uikit';

const Levels = ({
  min,
  max,
  fps,
  window: _window,
  wrapperRef = React.createRef(),
}) => (
  <Component initialState={{ on: false }}>
    {({ state: { on }, setState }) => (
      <Box align="center" full>
        <Box margin="small">
          <Button
            onClick={() => setState({ on: !on })}
            label={on ? `Stop` : `Start`}
          />
        </Box>
        <Div flexGrow={1} width="100%" innerRef={wrapperRef}>
          <Measure
            measureRef={wrapperRef}
            render={({ set, rect: { width, height } }) =>
              set ? (
                <DataStream
                  {...{ on }}
                  initialState={{ durations: {} }}
                  message="stream"
                  args={{ fps, window: _window }}
                  onData={(data, state) => {
                    const { id, duration } = parser.parse(data);
                    const clipped =
                      duration > max
                        ? duration > max * 1.5
                          ? 0
                          : max
                        : Math.max(duration, min) - min;
                    return {
                      durations: {
                        ...state.durations,
                        [id]: (clipped / (max - min)) * 100,
                      },
                    };
                  }}
                  render={({ state: { data, durations } }) =>
                    on ? (
                      <LevelsCanvas
                        {...{ height, width }}
                        levels={Object.values(durations)}
                      />
                    ) : null
                  }
                />
              ) : (
                ``
              )
            }
          />
        </Div>
      </Box>
    )}
  </Component>
);

export default Levels;
