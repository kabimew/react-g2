import{
  Spec,
} from '@kabigon/react-g2';

export type BaseSpec = Spec & {
  transformers?: Transformer[]
};

export type Transformer = {
  type: 'fold' | 'map' | 'percent'
  callback?: (x: any) => any
  fields?: string[]
  field?: string
  key?: string
  value?: string
  retains?: string[]
  dimension?: string | string[]
  as?: string
};