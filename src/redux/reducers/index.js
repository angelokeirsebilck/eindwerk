import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postsReducer from "./postsReducer";
import commentsReducer from "./commentsReducer";
import postDetailsReducer from "./postDetailsReducer";

export default combineReducers({
  auth: authReducer,
  posts: postsReducer,
  comments: commentsReducer,
  postDetails: postDetailsReducer
});