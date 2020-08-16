import { AuthActionTypes } from "./actions.type";
import { Dispatch } from "react";
import { movieApi } from "../config/axios.config";

// Descriminated Union Action Types
export type AuthActions = RegisterUserAction | LoginUserAction;

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
