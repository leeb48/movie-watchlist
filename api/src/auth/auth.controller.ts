import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async registerUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.authService.registerUser(createUserDto);
  }

  @Post()
  async loginUser(@Body() loginUserDto: LoginUserDto): Promise<void> {}
}
