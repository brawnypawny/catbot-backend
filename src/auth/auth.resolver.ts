//resolver for handling user registration in a GraphQL API using NestJS

import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { RegisterUserDto } from './dto/register-user.dto';
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
    return `User ${user.username} created with ID ${user.id}`;
  }
}