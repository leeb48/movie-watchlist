import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getPopularMovies } from "../../actions/movies.action";
import "./LandingPage.scss";
import { AppState } from "../../reducers";
import { Movie, movies } from "../../reducers/movies";
import ReactPaginate from "react-paginate";

interface LandingPageProps {
  movies: Movie[];
  getPopularMovies: (page: number) => void;
}

const LandingPage = ({ getPopularMovies, movies }: LandingPageProps) => {
  const [currPage, setCurrPage] = useState(0);

  useEffect(() => {
    getPopularMovies(currPage + 1);
  }, [getPopularMovies, currPage]);

  const renderMovies = movies.map((movie, idx) => (
    <div key={idx} className="card">
      <div className="card-image">
        <figure className="image">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.postPath}`}
            alt=""
          />
        </figure>
      </div>
    </div>
  ));

  const handlePagination = (selectedItem: any) => {
    setCurrPage(selectedItem.selected);
  };

  return (
    movies && (
      <div className="has-background-dark" style={{ height: "100vh" }}>
        <div className="container">
          <ReactPaginate
            initialPage={currPage}
            previousLabel="previous"
            nextLabel="next"
            pageCount={100}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            onPageChange={handlePagination}
            containerClassName="pagination"
            previousClassName="pagination-previous button"
            nextClassName="pagination-next button"
            pageClassName="pagination-link button"
            activeClassName="pagination-link is-current"
            breakClassName="pagination-ellipsis"
          />
          <div className="grid">{renderMovies}</div>
        </div>
      </div>
    )
  );
};

const mapStateToProps = (state: AppState) => ({
  movies: state.movies.listOfMovies,
});

export default connect(mapStateToProps, { getPopularMovies })(LandingPage);
