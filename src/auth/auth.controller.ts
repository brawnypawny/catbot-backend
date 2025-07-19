import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Public } from './decorator';
import { RegisterUserDto } from './dto/register-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { User } from '../users/users.service'; 



@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public() //  decorator lets this route to be accessed without authentication
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }



  @Public() 
  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    return this.authService.register(registerUserDto);
  }


  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}
