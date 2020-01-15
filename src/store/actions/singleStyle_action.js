import {SINGLE_STYLE} from './action_types';

export default singleStyle = (singleStyle) => {
  console.log('single style in action: ',singleStyle )
  return{
    type: SINGLE_STYLE,
    payload: singleStyle
  };
}