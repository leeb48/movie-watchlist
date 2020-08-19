export enum AuthActionTypes {
  registerUser = "user/register",
  loginUser = "user/login",
  logoutUser = "user/logout",
  getUserInfo = "user/get-info",
  addMovie = "movies/add",
  removeMovie = "movies/remove",
}

export enum MovieActionTypes {
  getPopularMovies = "movies/popular",
  searchMovies = "movies/search",
}
