import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import SearchBar from "../search/SearchBar";
import { AppState } from "../../reducers";
import { SearchData, Movie } from "../../reducers/movies";
import { searchMovies } from "../../actions/movies.action";

import "./SearchResults.scss";

interface SearchResultsProps {
  searchMovies: (term: string, page: number) => void;
  searchData: SearchData;
  movies: Movie[];
}

const SearchResults = ({
  searchData: { totalPages, searchTerm },
  movies,
  searchMovies,
}: SearchResultsProps) => {
  const [currPage, setCurrPage] = useState(0);

  useEffect(() => {
    if (searchTerm) {
      searchMovies(searchTerm, currPage + 1);
    }
  }, [searchMovies, searchTerm, currPage]);

  const renderResults = movies.map((movie) => (
    <>
      <article className="media">
        <figure className="media-left">
          <p className="image is-50x50">
            <img
              src={`https://image.tmdb.org/t/p/w200/${movie.postPath}`}
              alt={movie.title}
            />
          </p>
        </figure>
        <div className="media-content">
          <div className="content movie-description">
            <p>
              <h3 className="title is-3 movie-title">{movie.title}</h3>
              <p className="subtitle is-5 movie-release-date">
                {movie.releaseDate}
              </p>

              <p>
                <em>Popularity:</em> {movie.popularity}{" "}
              </p>
              <p>
                <em>Vote Count:</em> {movie.voteCount}
              </p>
              <br />
              {movie.overview}
            </p>
          </div>
        </div>
      </article>
    </>
  ));

  return (
    <>
      <div className="container">
        <SearchBar
          currPage={currPage}
          setCurrPage={setCurrPage}
          pageCount={totalPages}
        />
        {renderResults}
      </div>
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  movies: state.movies.listOfMovies,
  searchData: state.movies.searchData,
});

export default connect(mapStateToProps, { searchMovies })(SearchResults);
