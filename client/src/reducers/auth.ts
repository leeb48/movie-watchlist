import { AuthActions } from "../actions/auth.actions";
import { AuthActionTypes } from "../actions/actions.type";
import { Movie } from "./movies";

export type User = {
  username: string;
  firstName: string;
  lastName: string;
  myList: Movie[];
};

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

export const auth = (state = initialState, action: AuthActions) => {
  switch (action.type) {
    case AuthActionTypes.registerUser:
    case AuthActionTypes.loginUser:
      localStorage.setItem("token", action.payload);
      return { ...state, isAuthenticated: true };

    case AuthActionTypes.getUserInfo:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };

    default:
      return state;
  }
};
