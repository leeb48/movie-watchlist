import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { GetMoviesDto } from './dto/get-movies.dto';
import { SearchMoviesDto } from './dto/search-movies.dto';
import { AuthGuard } from '@nestjs/passport';
import { AddToWatchlistDto } from './dto/add-to-watchlist.dto';
import { GetUser } from './decorator/user.decorator';
import { User } from 'src/auth/entity/user.entity';

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

  @Post('/add-watchlist')
  @UseGuards(AuthGuard('jwt'))
  async addToWatchlist(
    @GetUser() user: User,
    @Body() addToWatchlistDto: AddToWatchlistDto,
  ): Promise<void> {
    await this.moviesService.addToWatchlist(user, addToWatchlistDto);
  }

  // TODO:
  // Add movie to watchlist
  // Remove movie from watchlist
}
