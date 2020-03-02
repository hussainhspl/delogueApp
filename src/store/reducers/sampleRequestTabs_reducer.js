import {ITEM_PLACEMENT, FINISH_OUTSIDE, FINISH_INSIDE, DESIGN, MEASUREMENT_TABLE,
  SAMPLE_STATUS, CUSTOM_COMMENT} from '../actions/action_types';

const initialState = {
  itemPlacementState : [],
  finishOutsideState: [],
  finishInsideState: [],
  designState: [],
  measurementTableState: [],
  sampleStatusState: [],
  customCommentsState: []
};

const sampleRequestTabsReducer = (state = initialState, action) => {
  console.log('payload', action);
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
    case MEASUREMENT_TABLE:
      return {
        ...state,
        measurementTableState: action.payload
      }
    case SAMPLE_STATUS: 
      return {
        ...state,
        sampleStatusState: action.payload
      }
    case CUSTOM_COMMENT:
      return {
        ...state,
        customCommentsState: action.payload
      }
    default: 
      return state
  }
}
export default sampleRequestTabsReducer; 