import { Injectable } from '@nestjs/common';
import { moviesAxios } from './config/axios.config';

@Injectable()
export class MoviesService {
  async getPopularMovies(page: number) {
    const res = await moviesAxios.get(
      `/movie/popular?language=en-US&page=${page}`,
    );

    return res.data.results;
  }

  async searchMovies(query: string, page: number) {
    const res = await moviesAxios.get(
      `search/movie?language=en-US&query=${query}&page=${page}&include_adult=false`,
    );

    return res.data.results;
  }
}
