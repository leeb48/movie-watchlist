import { movieApi } from "../config/axios.config";
import { MovieActionTypes } from "./actions.type";
import { Dispatch } from "react";
import { Movie } from "../reducers/movies";

// Movie Action Types
export type MovieActions = GetPopularMoviesAction | SearchMoviesAction;

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

  const res2 = await movieApi.post("/auth/test");

  console.log(res2.data);

  dispatch({
    type: MovieActionTypes.getPopularMovies,
    payload: res.data,
  });
};

// ---------------------------------------------------------------------
// Get Popular Movies Action

type SearchResultsDto = {
  currPage: number;
  totalPages: number;
  searchTerm: string;
  listOfMovies: Movie[];
};

export type SearchMoviesAction = {
  type: MovieActionTypes.searchMovies;
  payload: SearchResultsDto;
};

export const searchMovies = (search: string, page: number) => async (
  dispatch: Dispatch<SearchMoviesAction>
) => {
  const res = await movieApi.get(`/movies/search/${search}/${page}`);

  dispatch({
    type: MovieActionTypes.searchMovies,
    payload: res.data,
  });
};
