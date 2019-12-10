import { STYLE_FILE_LIST } from '../actions/action_types';

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
    default: 
      return state
  }
}
export default styleFileListReducer