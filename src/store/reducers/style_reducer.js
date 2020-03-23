import { STYLE_LIST, CLEAR_STYLE_LIST, CLEAR_STORE } from '../actions/action_types';

const initialState = {
  styleListState: []
};

const styleReducer = (state = initialState, action) => {
  // console.log('style action:',action);
  switch ( action.type) {
    case STYLE_LIST: 
      return {
        ...state,
        styleListState: [...state.styleListState, ...action.payload]
      }
    case CLEAR_STYLE_LIST:
      return {
        ...state,
        styleListState: []
      }
    case CLEAR_STORE:
      return {
        ...state,
        styleListState: []
      }
    default: 
      return state
  }
}
export default styleReducer;

