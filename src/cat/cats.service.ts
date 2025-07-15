
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './schemas/cat.schema';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { ConflictException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';


@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const { name, age, breed } = createCatDto;
    const existingCat = await this.catModel.findOne({ name, age, breed });
    if (existingCat) {
      throw new ConflictException('This cat entry already exists.');
    }
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  async findOne(id: string): Promise<Cat> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format')
    }

    const cat = await this.catModel.findById(id).exec();

    if (!cat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }

    return cat
  } 



  async remove(id: string) {
    const cat = await this.catModel.findByIdAndDelete(id);
    return { message: `Cat with ID ${id} deleted.` };
  }

  async update(id: string, UpdateCatDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }

    const updated = await this.catModel.findByIdAndUpdate(id, UpdateCatDto, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    return updated;
  }
}
