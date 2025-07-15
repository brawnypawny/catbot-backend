import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CatsService } from './cats.service';
import { Cat } from './cat.model';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Resolver(() => Cat)
export class CatsResolver{
    constructor(private readonly catsService: CatsService) {}

    @Query(() => [Cat])
    async cats(){
        return this.catsService.findAll();
    }

    @Query(() => Cat)
    async cat(@Args('id') id: string) {
        return this.catsService.findOne(id);
    }

    @Mutation(() => Cat)
    async createCat(@Args('input') input: CreateCatDto) {
        return this.catsService.create(input);
    }

    @Mutation (() => Cat)
    async updateCat(@Args('id') id: string, @Args('input') input: UpdateCatDto) {
        return this.catsService.update(id, input);
  }
}