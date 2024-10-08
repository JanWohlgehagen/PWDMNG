import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/users';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async create(
    username: string,
    password: string,
    salt: string,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const lowerCaseUsername = username.toLowerCase();
    const user = this.usersRepository.create({
      username: lowerCaseUsername,
      password: hashedPassword,
      salt,
    });
    return this.usersRepository.save(user);
  }
}
