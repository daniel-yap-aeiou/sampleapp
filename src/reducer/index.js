import { combineReducers } from "redux";
import toDoReducer from "./toDoReducer";
import commentReducer from "./commentReducer";
import UsersReducer  from './users';

import cartReducer from '../components/reducers/cartReducer';
import newsReducer from '../components/reducers/newsReducer';

export default combineReducers({
  toDoReducer,
  commentReducer,
  users: UsersReducer,
  cartReducer,
  newsReducer
});
