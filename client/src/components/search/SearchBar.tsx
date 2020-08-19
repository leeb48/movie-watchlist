import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { searchMovies } from "../../actions/movies.action";
import { connect } from "react-redux";

interface SearchBarProps {
  currPage: number;
  setCurrPage: (page: number) => void;
  pageCount: number;
  searchMovies: (search: string, page: number) => void;
}

// Handles search and pagination
const SearchBar = ({
  currPage,
  pageCount,
  setCurrPage,
  searchMovies,
}: SearchBarProps) => {
  const handlePagination = (selectedItem: any) => {
    setCurrPage(selectedItem.selected);
  };

  const onSearchSubmit = () => {
    searchMovies(term, 1);
    // Reset the page count on a new search
    setCurrPage(0);
  };

  const [term, setTerm] = useState("");
  const onChange = (e: React.FormEvent<HTMLInputElement>) =>
    setTerm(e.currentTarget.value);

  return (
    <div className="pagination-searchbar-grid">
      <ReactPaginate
        initialPage={currPage}
        previousLabel="previous"
        nextLabel="next"
        pageCount={pageCount}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePagination}
        containerClassName="pagination"
        previousClassName="pagination-previous button is-black"
        nextClassName="pagination-next button is-black"
        pageClassName="pagination-link button"
        activeClassName="pagination-link is-black"
        breakClassName="pagination-ellipsis"
      />

      <div className="field has-addons searchbar">
        <div className="control">
          <input
            className="input search-input"
            type="text"
            placeholder="Find Your Movies"
            value={term}
            onChange={onChange}
          />
        </div>
        <div className="control">
          <Link
            onClick={onSearchSubmit}
            to="/search-results"
            className="button is-black"
          >
            Search
          </Link>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { searchMovies })(SearchBar);
