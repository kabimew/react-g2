import ReactG2 from '../ReactG2';
import React, { FC, useMemo } from 'react';
import { defaultsDeep } from '@kabigon/lamda';
import baseSpec from './spec';
import { View } from '@antv/data-set';
import { forEach, omit } from 'lodash';
import { BaseSpec } from './type';

const BaseChart: FC<{
  spec: BaseSpec;
  initialWidth?: string;
}> = ({ spec, initialWidth }) => {
  const sp = useMemo(() => {
    const dv = new View().source(spec.data);
    if (spec.transformers) {
      forEach(spec.transformers, transformer => {
        dv.transform(transformer);
      });
    }
    const normalizedSpec = {
      ...omit(spec, 'transformers'),
      data: dv.rows,
    };
    return defaultsDeep(normalizedSpec, baseSpec) as any;
  }, [spec]);
  return <ReactG2 spec={sp} initialWidth={initialWidth} />;
};

export default BaseChart;
