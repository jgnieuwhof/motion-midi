import React, { Fragment } from 'react';
import { withTheme } from 'emotion-theming';
import { Stage, Layer, Rect } from 'react-konva';

const LevelsCanvas = withTheme(
  ({ levels, width, height, theme, barWidth = 20 }) => {
    const n = levels.length;
    const xWidth = width / n;
    return (
      <Stage {...{ width, height }}>
        <Layer>
          {levels.map((level, i) => {
            const x = xWidth * i + xWidth / 2 - barWidth / 2;
            const yHeight = height * (level / 100);
            return (
              <Fragment key={i}>
                <Rect
                  x={x}
                  y={0}
                  width={barWidth}
                  height={height}
                  fill={theme.colors.grey12}
                />
                <Rect
                  x={x}
                  y={height - yHeight}
                  width={20}
                  height={yHeight}
                  fill={theme.colors.grey3}
                />
              </Fragment>
            );
          })}
        </Layer>
      </Stage>
    );
  },
);

export default LevelsCanvas;
