import { MovieActions } from "../actions/movies.action";
import { MovieActionTypes } from "../actions/actions.type";

export type Movie = {
  postPath: string;
  backdropPath: string;
  popularity: string;
  voteCount: string;
  title: string;
  overview: string;
  releaseDate: string;
};

export type MoviesState = {
  listOfMovies: Movie[];
};

const initialState: MoviesState = {
  listOfMovies: [],
};

export const movies = (state = initialState, action: MovieActions) => {
  switch (action.type) {
    case MovieActionTypes.getPopularMovies:
      return {
        ...state,
        listOfMovies: action.payload,
      };
    default:
      return state;
  }
};
