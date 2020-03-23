import { STYLE_FILE_LIST, CLEAR_STORE } from '../actions/action_types';

const initialState = {
  styleFileListState: null
};

const styleFileListReducer = (state = initialState, action) => {
  switch (action.type) {
    case STYLE_FILE_LIST:
      return {
        ...state,
        styleFileListState: action.payload
      }
      case CLEAR_STORE:
      return {
        ...state,
        styleFileListState: []
      }
    default: 
      return state
  }
}
export default styleFileListReducer