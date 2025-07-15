import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class Cat{
    @Field(() => ID)
    id: string;

    @Field()
    name: string

    @Field()
    age: number;

    @Field({ nullable: true }) 
    breed: string
}