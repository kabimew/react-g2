import {
  Statis,
} from 'modules/common/model/statis/type';
import {
  mapStatisToJsonArray,
} from 'modules/common/model/statis/helper';
import {
  BaseSpec,
  Transformer,
} from 'lib/charts/BaseChart/type';
import {
  get,
} from 'lodash/fp';
import { DeepPartial } from 'redux';

const PERCENT = 'percent';

export const mapStatisToTransformer = (statis: Statis, percent: boolean): Transformer[] => {
  if (percent) {
    return [{
      type: 'percent',
      field: get('meta.columns[1].id')(statis),
      dimension: get('meta.columns[0].id')(statis),
      as: PERCENT,
    }];
  }
  return [];
};

export const mapStatisToPosition = (statis: Statis, percent: boolean): string[] => {
  return percent ? PERCENT : get('meta.columns[1].id')(statis);
};

export const mapStatisToColor = (statis: Statis): string => {
  return get('meta.columns[0].id')(statis);
}

export const mapStatisToScale = (statis: Statis, percent: boolean) => {
  return percent ? {
    percent: {
      formatter: (val: number) => {
        return (val * 100).toFixed(2) + '%';
      }
    }
  }: {};
}

export const mapStatisToSpec = (statis: Statis, percent: boolean): any => {
  const position = mapStatisToPosition(statis, percent);
  return {
    data: mapStatisToJsonArray(statis),
    transformers: mapStatisToTransformer(statis, percent),
    options: {
      scales: mapStatisToScale(statis, percent),
      geoms: [{
        position: {
          field: position,
        },
        color: mapStatisToColor(statis),
        label: {
            field: position,
            cfg: {
              offset: -40,
              textStyle: {
                textAlign: 'center',
                shadowBlur: 2,
                shadowColor: 'rgba(0, 0, 0, .45)'
              }
            }
        },
      }],
    }
  };
};

export default mapStatisToSpec;