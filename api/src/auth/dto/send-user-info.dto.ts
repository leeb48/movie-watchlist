import { Movie } from '../../movies/entity/movie.entity';

export class SendUserInfoDto {
  username: string;
  firstName: string;
  lastName: string;
  myList: Movie[];
}
