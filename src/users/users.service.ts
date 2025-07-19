import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from './users.model'; // Should extend Document (see note below)

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async findOne(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async findById(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async createUser(username: string, password: string): Promise<User> {
    const existing = await this.findOne(username);
    if (existing) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({
      username,
      password: hashedPassword,
    });

    return newUser.save();
  }
}
