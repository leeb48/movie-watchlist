import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Unique,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Movie } from 'src/movies/entity/movie.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @Column()
  salt: string;

  @Column()
  password: string;

  @OneToMany(
    type => Movie,
    movie => movie.user,
    { eager: true },
  )
  movies: Movie[];

  // Hash the passed in password with the stored salt
  // and compare with stored hash to authenticate user
  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);

    if (hash !== this.password) return false;

    return true;
  }
}
