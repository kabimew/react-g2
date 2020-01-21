import BaseChart from 'lib/charts/BaseChart';
import React, { FC, useMemo } from 'react';
import { defaultsDeep } from '@kabigon/lamda';
import lineSpec from './spec';
import { Spec } from '@kabigon/react-g2';
import { ChartSpec } from 'lib/charts/index.d';
import { get } from 'lodash/fp';
import { cloneDeep } from 'lodash';

const LineChart: FC<{
  spec: ChartSpec;
  initialWidth?: string;
}> = ({ spec, initialWidth }) => {
  const sp = useMemo(() => {
    const position = get('options.geoms[0].position.field')(spec);
    const axes = {
      [position[1]]: {
        title: {
          offset: 60,
          textStyle: {},
        },
      },
      // [position[0]]: {
      //   title: {
      //     textStyle: {
      //       textAlign: 'start',
      //       textBaseline: 'bottom'
      //     }
      //   }
      // }
    };
    const geom = cloneDeep(get('options.geoms[0]')(spec));
    return defaultsDeep(
      spec,
      {
        options: {
          geoms: [
            {},
            {
              ...geom,
              type: 'point',
              size: 4,
              shape: 'circle',
              style: {
                stroke: '#fff',
                lineWidth: 1,
              },
            },
          ],
          axes,
        },
      },
      lineSpec,
    ) as Spec;
  }, [spec]);
  return <BaseChart spec={sp as any} initialWidth={initialWidth} />;
};

export default LineChart;
