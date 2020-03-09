import {ITEM_PLACEMENT, FINISH, FINISH_OUTSIDE, FINISH_INSIDE, DESIGN, MEASUREMENT_TABLE,
  SAMPLE_STATUS, CUSTOM_COMMENTS, SAMPLE_STATUS_PLANNED} from './action_types';

export const itemPlacement = (itemPlacement) => {
  return {
    type: ITEM_PLACEMENT,
    payload: itemPlacement
  };
}

export const finish = (finish) => {
  return {
    type: FINISH,
    payload: finish
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

export const customComments = (customComments) => {
  return{
    type: CUSTOM_COMMENTS,
    payload: customComments
  }
}

export const sampleStatusPlanned = (sampleStatusPlanned) => {
  return{
    type: SAMPLE_STATUS_PLANNED,
    payload: sampleStatusPlanned
  }
}