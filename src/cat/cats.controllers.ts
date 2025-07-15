import { Controller, Get, Post, Body, Delete, Patch, Put, Param } from '@nestjs/common';
import { CatsService } from './cats.service';
import { UpdateCatDto } from './dto/update-cat.dto';


interface Cat {
  name: string;
  age: number;
  breed: string;
}

@Controller('furballs')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() cat: Cat) {
    return this.catsService.create(cat);
  }

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log(id)
    return this.catsService.remove(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(id, updateCatDto);
  }

}