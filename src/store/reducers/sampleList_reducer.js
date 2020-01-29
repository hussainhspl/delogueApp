import { SAMPLE_LIST} from '../actions/action_types';

const initialState = {
  sampleListState: []
};

const sampleListReducer = (state = initialState, action) => {
  // console.log('reducer p')
  switch (action.type) {
    case SAMPLE_LIST: 
      return {
        ...state, 
        sampleListState : action.payload
      }
    default: 
      return state
  }
}
export default sampleListReducer;