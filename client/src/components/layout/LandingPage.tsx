import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getPopularMovies } from "../../actions/movies.action";
import { addMovie } from "../../actions/auth.actions";
import "./LandingPage.scss";
import { AppState } from "../../reducers";
import { Movie, movies } from "../../reducers/movies";
import SearchBar from "../search/SearchBar";
import { useHistory } from "react-router-dom";

interface LandingPageProps {
  movies: Movie[];
  isAuthenticated: boolean;
  getPopularMovies: (page: number) => void;
  addMovie: (movie: Movie) => void;
}

const LandingPage = ({
  getPopularMovies,
  addMovie,
  movies,
  isAuthenticated,
}: LandingPageProps) => {
  const [currPage, setCurrPage] = useState(0);

  useEffect(() => {
    getPopularMovies(currPage + 1);
  }, [getPopularMovies, currPage]);

  const history = useHistory();

  const handleAddMovieClick = (movie: Movie) => {
    if (!isAuthenticated) {
      history.push("/login");
    } else {
      addMovie(movie);
    }
  };

  const renderMovies = movies.map((movie, idx) => (
    <div key={idx} className="card">
      {movie.postPath ? (
        <div className="card-image">
          <figure className="image">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.postPath}`}
              alt=""
            />
          </figure>
        </div>
      ) : (
        <div className="card-content movie-title-card">
          <div className="metida-content">
            <p className="title is-3">{movie.title}</p>
          </div>
        </div>
      )}
      <footer className="card-footer">
        <button
          onClick={() => handleAddMovieClick(movie)}
          className="button is-black add-button"
        >
          Add To Watchlist Now
        </button>
      </footer>
    </div>
  ));

  return (
    movies && (
      <div className="has-background-dark" style={{ height: "100vh" }}>
        <div className="container">
          <SearchBar
            pageCount={100}
            currPage={currPage}
            setCurrPage={setCurrPage}
          />
          <div className="poster-grid">{renderMovies}</div>
        </div>
      </div>
    )
  );
};

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  movies: state.movies.listOfMovies,
});

export default connect(mapStateToProps, { getPopularMovies, addMovie })(
  LandingPage
);
