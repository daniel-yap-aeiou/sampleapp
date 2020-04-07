import { combineReducers } from "redux";
import toDoReducer from "./toDoReducer";
import commentReducer from "./commentReducer";
import UsersReducer  from './users';

export default combineReducers({
  toDoReducer,
  commentReducer,
  users: UsersReducer
});
