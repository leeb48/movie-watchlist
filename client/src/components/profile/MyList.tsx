import React, { useEffect } from "react";
import { connect } from "react-redux";
import { AppState } from "../../reducers";
import { User } from "../../reducers/auth";
import { getUserInfo, removeMovie } from "../../actions/auth.actions";
import "./MyList.scss";
import { Movie } from "../../reducers/movies";

interface MyListProps {
  user: User | null;
  getUserInfo: () => void;
  removeMovie: (movie: Movie) => void;
}

const MyList = ({ user, getUserInfo, removeMovie }: MyListProps) => {
  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  const renderList = user
    ? user.myList.map((movie) => (
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
            <div className="media-right">
              <button
                onClick={() => removeMovie(movie)}
                className="button is-danger"
              >
                Remove
              </button>
            </div>
          </article>
        </>
      ))
    : null;

  return <div className="container">{renderList}</div>;
};

const mapStateToProps = (state: AppState) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { getUserInfo, removeMovie })(MyList);
