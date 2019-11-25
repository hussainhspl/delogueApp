import {USER} from '../actions/action_types';

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
			default:
				return state
		}
}
export default userReducer;