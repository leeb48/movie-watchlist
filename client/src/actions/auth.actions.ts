import { AuthActionTypes } from "./actions.type";
import { Dispatch } from "react";
import { movieApi } from "../config/axios.config";
import { User } from "../reducers/auth";
import { Movie } from "../reducers/movies";

// Descriminated Union Action Types
export type AuthActions =
  | RegisterUserAction
  | LoginUserAction
  | GetUserInfoAction
  | LogoutUserAction
  | RemoveMovieAction;

// ---------------------------------------------------------------------
// Remove Movie From Watchlist Action
export type RemoveMovieAction = {
  type: AuthActionTypes.removeMovie;
  payload: string;
};

export const removeMovie = (movie: Movie) => async (
  dispatch: Dispatch<RemoveMovieAction>
) => {
  await movieApi.post("/movies/remove-watchlist", movie);

  dispatch({
    type: AuthActionTypes.removeMovie,
    payload: movie.title,
  });
};

// ---------------------------------------------------------------------
// Add Movie To Watchlist Action
export type AddMovieAction = {
  type: AuthActionTypes.addMovie;
  payload: Movie;
};

export const addMovie = (movie: Movie) => async (
  dispatch: Dispatch<AddMovieAction>
) => {
  await movieApi.post("/movies/add-watchlist", movie);
};

// ---------------------------------------------------------------------
// Register User Action
export type GetUserInfoAction = {
  type: AuthActionTypes.getUserInfo;
  payload: User;
};

export const getUserInfo = () => async (
  dispatch: Dispatch<GetUserInfoAction>
) => {
  try {
    const res = await movieApi.get("/auth/get-user");

    if (res.data) {
      dispatch({
        type: AuthActionTypes.getUserInfo,
        payload: res.data,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

// ---------------------------------------------------------------------
// Register User Action
export type RegisterUserDto = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
};

export type RegisterUserAction = {
  type: AuthActionTypes.registerUser;
  payload: string;
};

export const registerUser = (data: RegisterUserDto) => async (
  dispatch: Dispatch<RegisterUserAction>
) => {
  try {
    const res = await movieApi.post("/auth/register", data);

    dispatch({
      type: AuthActionTypes.registerUser,
      payload: res.data.token,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// ---------------------------------------------------------------------
// Login User Action
export type LoginUserDto = {
  username: string;
  password: string;
};

export type LoginUserAction = {
  type: AuthActionTypes.loginUser;
  payload: string;
};

export const loginUser = (data: LoginUserDto) => async (
  dispatch: Dispatch<LoginUserAction>
) => {
  try {
    const res = await movieApi.post("/auth/login", data);

    dispatch({
      type: AuthActionTypes.loginUser,
      payload: res.data.token,
    });
  } catch (error) {}
};

// ---------------------------------------------------------------------
// Logout Uesr Action
export type LogoutUserAction = {
  type: AuthActionTypes.logoutUser;
};

export const logoutUser = () => (dispatch: Dispatch<LogoutUserAction>) => {
  dispatch({
    type: AuthActionTypes.logoutUser,
  });
};
