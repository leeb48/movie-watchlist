import { Injectable } from '@nestjs/common';
import { moviesAxios } from './config/axios.config';
import { GetMoviesDto } from './dto/get-movies.dto';

@Injectable()
export class MoviesService {
  async getPopularMovies(page: number): Promise<GetMoviesDto[]> {
    const res = await moviesAxios.get(
      `/movie/popular?language=en-US&page=${page}`,
    );

    // Produce array of popular movie objects with
    // only the relevant info
    const popularMovies: GetMoviesDto[] = res.data.results.map(
      movie =>
        ({
          popularity: movie.popularity,
          voteCount: movie.vote_count,
          postPath: movie.poster_path,
          backdropPath: movie.backdrop_path,
          title: movie.title,
          overview: movie.overview,
          releaseDate: movie.release_date,
        } as GetMoviesDto),
    );

    return popularMovies;
  }

  async searchMovies(query: string, page: number): Promise<GetMoviesDto[]> {
    const res = await moviesAxios.get(
      `search/movie?language=en-US&query=${query}&page=${page}&include_adult=false`,
    );

    const searchedMovies: GetMoviesDto[] = res.data.results.map(
      movie =>
        ({
          popularity: movie.popularity,
          voteCount: movie.vote_count,
          postPath: movie.poster_path,
          backdropPath: movie.backdrop_path,
          title: movie.title,
          overview: movie.overview,
          releaseDate: movie.release_date,
        } as GetMoviesDto),
    );

    return searchedMovies;
  }
}
