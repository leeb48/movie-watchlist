import { GetMoviesDto } from './get-movies.dto';

export class SearchMoviesDto {
  currPage: number;
  totalPages: number;
  searchTerm: string;
  listOfMovies: GetMoviesDto[];
}
