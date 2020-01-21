import { Spec } from '@kabigon/react-g2';
import { DeepPartial } from 'redux';

const lineSpec: DeepPartial<Spec> = {
  options: {
    coord: {
      type: 'rect',
    },
  },
};

export default lineSpec;
