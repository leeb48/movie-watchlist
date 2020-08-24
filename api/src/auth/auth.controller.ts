/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Controller,
  Post,
  Get,
  Body,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { TokenDto } from './dto/token.dto';
import { AuthGuard } from '@nestjs/passport';
import { SendUserInfoDto } from './dto/send-user-info.dto';
import { GetUser } from 'src/movies/decorator/user.decorator';
import { User } from './entity/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async registerUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<TokenDto> {
    try {
      return await this.authService.registerUser(createUserDto);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Post('/login')
  async loginUser(
    @Body(ValidationPipe) loginUserDto: LoginUserDto,
  ): Promise<TokenDto> {
    return await this.authService.loginUser(loginUserDto);
  }

  @Post('/test')
  test(): string {
    return 'test';
  }

  @Get('/get-user')
  @UseGuards(AuthGuard())
  getUser(@GetUser() user: User): SendUserInfoDto {
    const { username, firstName, lastName, movies } = user;

    const userInfo: SendUserInfoDto = {
      username,
      firstName,
      lastName,
      myList: movies,
    };

    return userInfo;
  }
}
