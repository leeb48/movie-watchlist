import { Controller, Get, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { GetMoviesDto } from './dto/get-movies.dto';
import { SearchMoviesDto } from './dto/search-movies.dto';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get('/popular/:page')
  async getPopularMovies(@Param('page') page: number): Promise<GetMoviesDto[]> {
    return await this.moviesService.getPopularMovies(page);
  }

  @Get('/search/:query/:page')
  async searchMovies(
    @Param('query') query: string,
    @Param('page') page: number,
  ): Promise<SearchMoviesDto> {
    return await this.moviesService.searchMovies(query, page);
  }

  // TODO:
  // Add movie to watchlist
  // Remove movie from watchlist
}
