import {GENERAL, COMMENTS, FILES, SAMPLE, PDF} from '../actions/action_types';
// import { } from '../actions/action_types';
// import console = require('console');

const initialState = {
  now: 'general'
};


const tabReducer = (state = initialState, action) => {
	switch (action.type) {
    case GENERAL:
      // console.log("clicked on genral tab");
      return {
        ...state,
        now: state.now = 'general'
      };

    case COMMENTS:
      return {
        ...state,
        now: state.now = 'comments'
			};
			
		case FILES:
			return {
				...state,
				now: state.now = 'files'
			}

		case SAMPLE:
			return {
				...state,
				now: state.now = 'sample'
			}

		case PDF:
			return {
				...state,
				now: state.now = 'pdf'
			}

    default:
      return state;
  }
}

export default tabReducer;



// const reducer = (state, action) => {
// 	if(action.type === "ATTACK"){
// 		return action.payload
// 	}
// 	return state;
// } 

  // renderSelectedTab () {
  //   switch (path) {
  //     case 'welcome':
  //       return (<Welcome />);
  //       break;
  //     case 'profile':
  //       return (<Profile />);
  //       break;
  //     case 'login':
  //       return (<Login />);
  //       break;
  //     default:
  //   }
  // }