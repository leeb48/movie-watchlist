import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import "./App.scss";
import Navbar from "./components/layout/Navbar";
import LandingPage from "./components/layout/LandingPage";
import SearchResults from "./components/movie/SearchResults";
import { getUserInfo } from "./actions";
import MyList from "./components/profile/MyList";

if (localStorage.getItem("token")) {
  store.dispatch<any>(getUserInfo());
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />

          <Route exact path="/search-results" component={SearchResults} />
          <Route exact path="/profile" component={MyList} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
