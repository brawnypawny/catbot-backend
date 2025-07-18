import { InputType, Field } from '@nestjs/graphql';


@InputType()
export class RegisterUserDto {
  @Field()
  username: string;

  @Field()
  password: string;
}