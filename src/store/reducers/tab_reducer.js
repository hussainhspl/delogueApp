import {GENERAL, COMMENTS, FILES, SAMPLE, PDF} from '../acttions/action_types';

const initialState = {
  now: 'general'
};


const tabReducer = (state = initialState, action) => {
	// switch (action.type) {
  //   case nowER_ADD:
  //     return {
  //       ...state,
  //       now: state.now + 1
  //     };

  //   case nowER_SUBTRACT:
  //     return {
  //       ...state,
  //       now: state.now - 1
  //     };

  //   default:
  //     return state;
	// }
	switch (action.type) {
    case GENERAL:
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