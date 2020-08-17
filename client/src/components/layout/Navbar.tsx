import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
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
            <Link to="/" className="navbar-item">
              Home
            </Link>

            <Link to="/profile" className="navbar-item">
              My List
            </Link>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Link to="/register" className="button is-dark">
                  <strong>Sign up</strong>
                </Link>
                <Link to="/login" className="button is-dark">
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
