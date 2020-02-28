import {ITEM_PLACEMENT, FINISH_OUTSIDE, FINISH_INSIDE, DESIGN} from '../actions/action_types';

const initialState = {
  itemPlacementState : [],
  finishOutsideState: [],
  finishInsideState: [],
  designState: [],
};

const sampleRequestTabsReducer = (state = initialState, action) => {
  console.log('payload', action.payload);
  switch ( action.type) {
    case ITEM_PLACEMENT:
      return {
        ...state,
        itemPlacementState: {...state.itemPlacementState, ...action.payload}
      }
    case FINISH_OUTSIDE:
      return {
        ...state,
        finishOutsideState: action.payload
      }
    case FINISH_INSIDE: 
      return {
        ...state,
        finishInsideState: action.payload
      }
    case DESIGN:
      return {
        ...state,
        designState : action.payload
      }
    default: 
      return state
  }
}
export default sampleRequestTabsReducer; 