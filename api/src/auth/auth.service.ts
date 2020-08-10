import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { TokenDto } from './dto/token.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(createUserDto: CreateUserDto): Promise<TokenDto> {
    const username = await this.userRepo.registerUser(createUserDto);

    const payload = {
      username,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<TokenDto> {
    const { username, password } = loginUserDto;

    const user = await this.userRepo.getUserByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    // Validate the password
    const match = await user.validatePassword(password);

    if (!match) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    // Send back token with username upon successful validation
    const payload = {
      username,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
