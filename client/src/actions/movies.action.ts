import { movieApi } from "../config/axios.config";
import { MovieActionTypes } from "./actions.type";
import { Dispatch } from "react";
import { Movie } from "../reducers/movies";

// Movie Action Types
export type MovieActions = GetPopularMoviesAction;

// ---------------------------------------------------------------------
// Get Popular Movies Action
export type GetPopularMoviesAction = {
  type: MovieActionTypes.getPopularMovies;
  payload: Movie[];
};

export const getPopularMovies = (page: number = 1) => async (
  dispatch: Dispatch<GetPopularMoviesAction>
) => {
  const res = await movieApi.get(`/movies/popular/${page}`);

  dispatch({
    type: MovieActionTypes.getPopularMovies,
    payload: res.data,
  });
};