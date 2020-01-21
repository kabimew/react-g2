import LineChart from 'lib/charts/LineChart';
import React, {
  FC,
} from 'react';
import {
  Statis,
} from 'modules/common/model/statis/type';
import {
  mapStatisToSpec,
} from './mapStatisToSpec';
import {
  LineShape,
} from '@kabigon/react-g2';

const LineStatisChart: FC<{
  statis: Statis
  type?: LineShape
}> = ({
  statis,
  type = 'smooth',
}) =>  {
  if (!statis) {
    return null;
  }
  return (
    <LineChart
      spec={mapStatisToSpec(statis, type)}
      initialWidth={(window.innerWidth - 20 * 2 - 24 *2 - 240) + 'px'}
    />
  );
};

export default LineStatisChart;
