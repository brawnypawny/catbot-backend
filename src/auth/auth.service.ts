
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';
import { RegisterUserDto } from './dto/register-user.dto';
//import * as bcrypt from 'bcrypt';


interface User {
  id: string;
  username: string;
  password: string; // store as-is or hashed later
}

@Injectable()
export class AuthService {
  private users: User[] = [];

  constructor(
    //@InjectRepository(User)
    //private userRepository: Repository<User>,
    private usersService: UsersService,
    private jwtService: JwtService, 
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    console.log('AuthController signIn called with:', SignInDto);
    const user = await this.usersService.findOne(username);
      console.log('signIn: user found:', user); // Debugging line
    if (user?.password !== pass) {
      console.log('signIn: password mismatch');
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }


    async register(dto: RegisterUserDto): Promise<User> {
    const existing = this.users.find(user => user.username === dto.username);
    if (existing) {
      throw new Error('User already exists');
    }

    const newUser: User = {
      id: Date.now().toString(),
      username: dto.username, // Assuming username is used as email for simplicity
      password: dto.password, // For real use, hash this!
    };

    this.users.push(newUser);
    return newUser;
  }


    getUsers() {
      return this.users;
    }


}
