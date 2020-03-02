import {ITEM_PLACEMENT, FINISH_OUTSIDE, FINISH_INSIDE, DESIGN, MEASUREMENT_TABLE,
  SAMPLE_STATUS, CUSTOM_COMMENT} from './action_types';

export const itemPlacement = (itemPlacement) => {
  return {
    type: ITEM_PLACEMENT,
    payload: itemPlacement
  };
}

export const finishOutside = (finishOutside) => {
  return {
    type: FINISH_OUTSIDE,
    payload: finishOutside
  };
}

export const finishInside = (finishInside) => {
  return {
    type: FINISH_INSIDE,
    payload: finishInside
  };
}

export const design = (design) => {
  return {
    type: DESIGN,
    payload: design
  };
}

export const measurementTable =  (measurementTable) => {
  return {
    type:  MEASUREMENT_TABLE,
    payload: measurementTable
  }
}

export const sampleStatus = (sampleStatus) => {
  return{
    type: SAMPLE_STATUS,
    payload: sampleStatus
  }
}

export const customComment = (customComment) => {
  return{
    type: CUSTOM_COMMENT,
    payload: customComment
  }
}