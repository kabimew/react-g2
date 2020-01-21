import BaseChart from '../BaseChart';
import React, { FC, useMemo } from 'react';
import { defaultsDeep } from '@kabigon/lamda';
import pieSpec from './spec';
import { Spec } from '../ReactG2';
import { ChartSpec } from 'lib/charts/index.d';

const PieChart: FC<{
  spec: ChartSpec;
  initialWidth?: string;
}> = ({ spec, initialWidth }) => {
  const sp = useMemo(() => {
    return defaultsDeep(spec, pieSpec) as Spec;
  }, [spec]);
  return <BaseChart spec={sp as any} initialWidth={initialWidth} />;
};

export default PieChart;
