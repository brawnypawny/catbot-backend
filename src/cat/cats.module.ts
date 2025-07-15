import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsController } from './cats.controllers';
import { CatsService } from './cats.service';
import { Cat, CatSchema } from './schemas/cat.schema';
import { CatsResolver } from './cats.resolver';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
  controllers: [CatsController],
  providers: [CatsService, CatsResolver],
})
export class CatsModule {}