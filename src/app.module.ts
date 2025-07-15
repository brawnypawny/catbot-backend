import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cat/cats.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://liuky:g8ScP9atx6uAVoRc@cluster0.blwjoi9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
   CatsModule,

   GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
     }),
  ],
   controllers: [AppController],
     providers: [AppService],

  
})
export class AppModule {}