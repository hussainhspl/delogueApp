import { createStore, combineReducers } from 'redux';
import tabReducer from './reducers/tab_reducer';

const rootReducer = combineReducers({
  tab: tabReducer,
})

const configStore = () => {
	return createStore(rootReducer);
}

export default configStore;