import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/auth/entity/user.entity';

@Entity()
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  postPath: string;

  @Column()
  backdropPath: string;

  @Column()
  popularity: string;

  @Column()
  voteCount: string;

  @Column()
  title: string;

  @Column()
  overview: string;

  @Column()
  releaseDate: string;

  @ManyToOne(
    type => User,
    user => user.movies,
  )
  user: User;
}
