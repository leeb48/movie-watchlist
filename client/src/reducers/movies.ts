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

export type SearchData = {
  searchTerm: string;
  currPage: number;
  totalPages: number;
};

export type MoviesState = {
  listOfMovies: Movie[];
  searchData: SearchData;
};

const initialState: MoviesState = {
  listOfMovies: [],
  searchData: {
    currPage: 0,
    totalPages: 0,
    searchTerm: "",
  },
};

export const movies = (state = initialState, action: MovieActions) => {
  switch (action.type) {
    case MovieActionTypes.getPopularMovies:
      return {
        ...state,
        listOfMovies: action.payload,
      };

    case MovieActionTypes.searchMovies:
      return {
        ...state,
        listOfMovies: action.payload.listOfMovies,
        searchData: {
          ...state.searchData,
          currPage: action.payload.currPage,
          totalPages: action.payload.totalPages,
          searchTerm: action.payload.searchTerm,
        },
      };
    default:
      return state;
  }
};
