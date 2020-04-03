import { combineReducers } from "redux";
import toDoReducer from "./toDoReducer";
import commentReducer from "./commentReducer";

export default combineReducers({
  toDoReducer,
  commentReducer
});
