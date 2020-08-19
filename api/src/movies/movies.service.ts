import { Injectable } from '@nestjs/common';
import { moviesAxios } from './config/axios.config';
import { GetMoviesDto } from './dto/get-movies.dto';
import { SearchMoviesDto } from './dto/search-movies.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieRepository } from './movie.repository';
import { User } from 'src/auth/entity/user.entity';
import { AddToWatchlistDto } from './dto/add-to-watchlist.dto';
import { RemoveWatchlistDto } from './dto/remove-watchlist.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieRepository) private movieRepo: MovieRepository,
  ) {}

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

  async searchMovies(query: string, page: number): Promise<SearchMoviesDto> {
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

    const searchResults: SearchMoviesDto = {
      currPage: res.data.page,
      totalPages: res.data.total_pages,
      searchTerm: query,
      listOfMovies: searchedMovies,
    };

    return searchResults;
  }

  async addToWatchlist(
    user: User,
    addToWatchlistDto: AddToWatchlistDto,
  ): Promise<void> {
    await this.movieRepo.addToWatchlist(user, addToWatchlistDto);
  }

  async removeWatchlist(
    user: User,
    removeWatchlistDto: RemoveWatchlistDto,
  ): Promise<void> {
    await this.movieRepo.removeWatchlist(user, removeWatchlistDto);
  }
}
