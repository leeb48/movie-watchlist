import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { LoginUserDto } from './dto/login-user.dto';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async registerUser(createUserDto: CreateUserDto): Promise<void> {
    const { username, firstName, lastName, password } = createUserDto;

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new User();
    newUser.username = username;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.password = hash;
    newUser.salt = salt;

    await newUser.save();
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<{ token: string }> {
    const { username, password } = loginUserDto;

    const user = await this.findOne({ username });

    if (!user) {
      throw new NotFoundException('Username does not exist');
    }
  }
}
