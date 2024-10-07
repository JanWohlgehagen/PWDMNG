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

  async create(username: string, password: string, salt: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password before saving with work factor 10 - increase to make more resistant to bruteforce attacks.
    const user = this.usersRepository.create({ username, password: hashedPassword, salt});
    console.log(user);
    return this.usersRepository.save(user);
  }
}
