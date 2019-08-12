import {SEARCH, MESSAGE, STYLE} from '../actions/action_types';

const initialState = {
    now: 'search'
};

const headerReducer = (state = initialState, action) => {
	switch ( action.type) {
		case SEARCH: 
			return {
				...state,
				now: state.now = 'search'
			};
		case MESSAGE: 
			return {
				...state,
				now: state.now = 'message'
			};
		case STYLE: 
		console.log("clicked on style tab");
			return {
				...state,
				now: state.now = 'style'
			};

		default:
  			return state
	}
}
export default headerReducer;