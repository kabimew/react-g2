import PieChart from 'lib/charts/PieChart';
import React, {
  FC,
} from 'react';
import {
  Statis,
} from 'modules/common/model/statis/type';
import {
  mapStatisToSpec,
} from './mapStatisToSpec';

const PieStatisChart: FC<{
  statis: Statis,
  percent?: boolean
}> = ({
  statis,
  percent = false,
}) =>  {
  if (!statis) {
    return null;
  }
  return (
    <PieChart
      spec={mapStatisToSpec(statis, percent)}
      initialWidth={(window.innerWidth - 20 * 2 - 24 *2 - 240) + 'px'}
    />
  );
};

export default PieStatisChart;
