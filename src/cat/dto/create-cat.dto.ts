import { InputType, Field, Int } from '@nestjs/graphql';



@InputType()
export class CreateCatDto {
  @Field()
  name: string;

  @Field(() => Int)
  age: number;

  @Field({ nullable: true })
  breed?: string;
}

