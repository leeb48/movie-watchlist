import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
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
}
