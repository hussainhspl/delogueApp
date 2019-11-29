import { STYLE_LIST } from '../actions/action_types';

const initialState = {
  styleListState: null
};

const styleReducer = (state = initialState, action) => {
  switch ( action.type) {
    case STYLE_LIST: 
      return {
        ...state,
        styleListState: action.payload
      }
    default: 
      return state
  }
}
export default styleReducer;