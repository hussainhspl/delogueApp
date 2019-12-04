import { createStore, combineReducers } from 'redux';
import tabReducer from './reducers/tab_reducer';
import headerReducer from './reducers/header_reducer';
import asyncReducer from './reducers/async_reducer';
import userReducer from './reducers/user_reducer';
import styleReducer from './reducers/style_reducer';
import singleStyle from './reducers/singleStyle_reducer';


const rootReducer = combineReducers({
  tab: tabReducer,
  header: headerReducer,
  async: asyncReducer,
  user: userReducer,
  styleList: styleReducer,
  style: singleStyle 
});

const configStore = () => {
	return createStore(rootReducer);
}

export default configStore;