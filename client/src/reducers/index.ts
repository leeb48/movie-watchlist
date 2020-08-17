import { combineReducers } from "redux";
import { auth, AuthState } from "./auth";
import { MoviesState, movies } from "./movies";

export type AppState = {
  auth: AuthState;
  movies: MoviesState;
};

export default combineReducers<AppState>({
  auth,
  movies,
});
