import { combineReducers } from "redux";
import { auth, AuthState } from "./auth";

export type AppState = {
  auth: AuthState;
};

export default combineReducers<AppState>({
  auth,
});
