import {ITEM_PLACEMENT, FINISH_OUTSIDE, FINISH_INSIDE, DESIGN} from './action_types';

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

export const Design = (Design) => {
  return {
    type: DESIGN,
    payload: Design
  };
}