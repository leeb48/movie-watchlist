import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
  ) {}

  async registerUser(createUserDto: CreateUserDto): Promise<void> {
    await this.userRepo.registerUser(createUserDto);
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<void> {}
}
