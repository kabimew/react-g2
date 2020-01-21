import { BaseSpec } from './components/BaseChart/type';

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export type PartialExclude<T, K extends keyof T> = {
  [L in Exclude<keyof T, K>]?: T[L];
};

export type ChartSpec = PartialExclude<BaseSpec, 'data'> & Pick<BaseSpec, 'data'>;
