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
  user: User;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  user: {
    firstName: "",
    lastName: "",
    myList: [],
    username: "",
  },

  isAuthenticated: false,
};

const emptyUser: User = {
  firstName: "",
  lastName: "",
  myList: [],
  username: "",
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

    case AuthActionTypes.logoutUser:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        user: emptyUser,
      };

    case AuthActionTypes.removeMovie:
      return {
        ...state,
        user: {
          ...state.user,
          myList: state.user!.myList.filter(
            (movie) => movie.title !== action.payload
          ),
        },
      };

    default:
      return state;
  }
};
