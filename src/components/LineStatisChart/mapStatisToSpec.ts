import {
  Statis,
  Column,
} from 'modules/common/model/statis/type';
import {
  getMetris,
  isNMetris,
  mapStatisToJsonArray,
} from 'modules/common/model/statis/helper';
import {
  BaseSpec,
  Transformer,
} from 'lib/charts/BaseChart/type';
import {
  get,
  last,
  flowRight,
  findLast,
  keyBy,
} from 'lodash/fp';
import {
  mapArrayToObject,
} from '@kabigon/lamda';
import {
  TIME_DIMENTION,
  METRIC_NUMBER_DIMENSION,
  METRIC_ID_DIMENSION,
} from 'modules/common/model/statis/constances';
import {
  LineShape,
} from '@kabigon/react-g2';

export const mapStatisToTransformer = (statis: Statis): Transformer[] => {
  if (isNMetris(statis)) {
    return [{
      type: 'fold',
      fields: getMetris(statis),
      key: METRIC_ID_DIMENSION,
      value: METRIC_NUMBER_DIMENSION
    }];
  }
  return [];
};

export const mapStatisToPosition = (statis: Statis): string[] => {
  if (isNMetris(statis)) {
    return [get('meta.columns[0].id')(statis), METRIC_NUMBER_DIMENSION];
  }
  return [get('meta.columns[0].id')(statis), get('id')(last(get('meta.columns')(statis)))];
};

export const mapColumnToScaleType = (column: Column): 'time' | 'cat' | 'timeCat' | 'linear' => {
  if (get('id')(column) === TIME_DIMENTION) {
    return 'time';
  }
  if (get('type')(column) === 'metric') {
    return 'linear';
  }
  return 'cat';
};

export const mapStatisToScale = (statis: Statis) => {
  const columns: Column[] = get('meta.columns')(statis);
  const keyedColumns: any = keyBy('id')(columns);
  const lastMetric = flowRight(
    last,
    get('meta.columns'),
  )(statis);
  if (isNMetris(statis)) {
    return mapArrayToObject('id')((column) => {
      return {
        type: mapColumnToScaleType(column as any),
        alias: get('label')(column),
        formatter: get('formatter')(column),
      }
    })([{
      id: get('meta.columns[0].id')(statis),
      type: 'dimension',
      label: get('meta.columns[0].label')(statis)
    }, {
      id: METRIC_NUMBER_DIMENSION,
      type: 'metric',
      label: get('unit_label')(lastMetric)
    }, {
      id: METRIC_ID_DIMENSION,
      formatter: (metricId: string) => {
        return (keyedColumns as Record<string, Column>)[metricId].label;
      }
    }]);
  }
  return flowRight(
    mapArrayToObject('id')((column) => {
      return {
        type: mapColumnToScaleType(column as any),
        alias: get('label')(column),
      }
    }),
    get('meta.columns'),
  )(
    statis
  );
};

export const mapStatisToColor = (statis: Statis): string => {
  if (isNMetris(statis)) {
    return METRIC_ID_DIMENSION;
  }
  return flowRight(
    get('id'),
    findLast({
      type: 'dimension'
    }),
    get('meta.columns'),
  )(
    statis
  );
}

export const mapStatisToSpec = (statis: Statis, type: LineShape): any => {
  return {
    data: mapStatisToJsonArray(statis),
    transformers: mapStatisToTransformer(statis),
    options: {
      geoms: [{
        position: {
          field: mapStatisToPosition(statis)
        },
        type: 'line',
        color: mapStatisToColor(statis),
        shape: type || 'line'
      }],
      scales: mapStatisToScale(statis),
      legends: isNMetris(statis) ? {} : false
    }
  };
};

export default mapStatisToSpec;