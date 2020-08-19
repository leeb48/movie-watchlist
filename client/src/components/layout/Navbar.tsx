/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { AppState } from "../../reducers";

interface NavbarProps {
  isAuthenticated: boolean;
}

const Navbar = ({ isAuthenticated }: NavbarProps) => {
  const authenticatedButtons = (
    <button className="button is-dang">Logout</button>
  );
  const guestbuttons = (
    <>
      <Link to="/register" className="button is-dark">
        <strong>Sign up</strong>
      </Link>
      <Link to="/login" className="button is-dark">
        Log in
      </Link>
    </>
  );

  const authenticatedMenu = (
    <Link to="/profile" className="navbar-item">
      My List
    </Link>
  );

  const guestMenu = (
    <Link to="/" className="navbar-item">
      Home
    </Link>
  );

  return (
    <>
      <section className="hero is-small is-dark is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Movie Watchlist</h1>
            <h2 className="subtitle">Personalized movie storage</h2>
          </div>
        </div>
      </section>
      <nav
        className="navbar is-black"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            {guestMenu}
            {isAuthenticated && authenticatedMenu}
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {isAuthenticated ? authenticatedButtons : guestbuttons}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Navbar);
