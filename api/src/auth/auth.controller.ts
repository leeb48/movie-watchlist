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

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async registerUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<TokenDto> {
    return await this.authService.registerUser(createUserDto);
  }

  @Post('/login')
  async loginUser(
    @Body(ValidationPipe) loginUserDto: LoginUserDto,
  ): Promise<TokenDto> {
    return await this.authService.loginUser(loginUserDto);
  }

  // Google OAuth2 Login/Register Route
  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req): Promise<void> {
    return;
  }

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }

  @Get('/test')
  @UseGuards(AuthGuard('jwt'))
  test(): string {
    return 'Protected Route';
  }
}
