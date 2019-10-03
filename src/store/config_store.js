import { createStore, combineReducers } from 'redux';
import tabReducer from './reducers/tab_reducer';
import headerReducer from './reducers/header_reducer';
import asyncReducer from './reducers/async_reducer';

const rootReducer = combineReducers({
  tab: tabReducer,
  header: headerReducer,
  async: asyncReducer,
});

const configStore = () => {
	return createStore(rootReducer);
}

export default configStore;