import { Controller, Get, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get('/popular/:page')
  async getPopularMovies(@Param('page') page: number) {
    return await this.moviesService.getPopularMovies(page);
  }

  @Get('/search/:query/:page')
  async searchMovies(
    @Param('query') query: string,
    @Param('page') page: number,
  ) {
    return await this.moviesService.searchMovies(query, page);
  }

  // TODO:
  // Add movie to watchlist
  // Remove movie from watchlist
}
