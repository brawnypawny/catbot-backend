//resolver for handling user registration in a GraphQL API using NestJS

import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { RegisterUserDto } from './dto/register-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { AuthService } from './auth.service';
import { Public } from './decorator';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  @Public()
  async registerUser(
    @Args('registerUserInput') registerUserInput: RegisterUserDto,
  ): Promise<string> {
    const user = await this.authService.register(registerUserInput);
    console.log('User from register:', user);
    return `User ${user.username} created with ID ${user._id}`;
  }

  @Mutation(() => String)
  @Public()
  async login(
    @Args('signInUserDto') signInUserDto: SignInDto,
  ): Promise<string> {
    const { access_token } = await this.authService.signIn(
      signInUserDto.username,
      signInUserDto.password,
    );
    return access_token;
  }
}