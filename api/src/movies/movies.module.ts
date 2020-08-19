import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MovieRepository } from './movie.repository';

@Module({
  imports: [AuthModule],
  providers: [MoviesService, MovieRepository],
  controllers: [MoviesController],
})
export class MoviesModule {}
