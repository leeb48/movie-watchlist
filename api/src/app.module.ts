import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './db-config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, MoviesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
