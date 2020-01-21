import { Spec } from '../ReactG2';
import { DeepPartial } from '../../type';

const pieSpec: DeepPartial<Spec> = {
  options: {
    coord: {
      type: 'theta',
    },
    tooltip: {
      showTitle: false,
    },
    geoms: [
      {
        type: 'interval',
        adjust: 'stack',
      },
    ],
  },
};

export default pieSpec;
