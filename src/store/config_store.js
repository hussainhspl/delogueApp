import { createStore, combineReducers } from 'redux';
import tabReducer from './reducers/tab_reducer';
import headerReducer from './reducers/header_reducer';
import asyncReducer from './reducers/async_reducer';
import userReducer from './reducers/user_reducer';
import styleReducer from './reducers/style_reducer';
import singleStyleReducer from './reducers/singleStyle_reducer';
import styleFileListReducer from './reducers/styleFileList_reducer';
import unreadMessagesListReducer from './reducers/unreadMessagesList_reducer';
import styleMessageListReducer from './reducers/styleMessageList_reducer';
import styleIdReducer from './reducers/StyleID_reducer'

const rootReducer = combineReducers({
  tab: tabReducer,
  header: headerReducer,
  async: asyncReducer,
  user: userReducer,
  styleList: styleReducer,
  singleStyle: singleStyleReducer,
  styleFileList: styleFileListReducer,
  unreadMessagesList: unreadMessagesListReducer,
  styleMessageList: styleMessageListReducer,
  styleId: styleIdReducer
});

const configStore = () => {
	return createStore(rootReducer);
}

export default configStore;