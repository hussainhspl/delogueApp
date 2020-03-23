import {USER, CLEAR_STORE} from '../actions/action_types';

const initialState = {
	userState: ''
}
const userReducer = (state = initialState, action) => {
		// console.log(action.type);
    switch ( action.type) {
			case USER:
      	// console.log("in reducer", action);
				return {
					...state,
					userState: action.payload
				}
			case CLEAR_STORE:
				return {
					...state,
					userState: []
				}
			default:
				return state
		}
}
export default userReducer;