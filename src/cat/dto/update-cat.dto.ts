import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateCatDto } from './create-cat.dto';


@InputType()
export class UpdateCatDto {
  @Field({ nullable: true })
  name?: string;

  @Field(() => Int, { nullable: true })
  age?: number;

  @Field({ nullable: true })
  breed?: string;
}
