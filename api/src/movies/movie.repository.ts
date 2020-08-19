import { EntityRepository, Repository } from 'typeorm';
import { Movie } from './entity/movie.entity';
import { User } from 'src/auth/entity/user.entity';
import { AddToWatchlistDto } from './dto/add-to-watchlist.dto';

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {
  async addToWatchlist(
    user: User,
    addToWatchlistDto: AddToWatchlistDto,
  ): Promise<void> {
    const {
      backdropPath,
      overview,
      popularity,
      postPath,
      releaseDate,
      title,
      voteCount,
    } = addToWatchlistDto;

    const newMovie = new Movie();

    newMovie.backdropPath = backdropPath;
    newMovie.overview = overview;
    newMovie.popularity = popularity;
    newMovie.postPath = postPath;
    newMovie.releaseDate = releaseDate;
    newMovie.title = title;
    newMovie.voteCount = voteCount;

    newMovie.user = user;

    await newMovie.save();
  }
}
