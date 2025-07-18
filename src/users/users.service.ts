import { Injectable } from '@nestjs/common';

// real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {


  //hardcoded
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'kelsey',
      password: 'addmin',
    },
  ];



  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}