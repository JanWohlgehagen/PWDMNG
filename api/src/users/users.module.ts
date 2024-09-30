import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './entities/users';

@Module({
  imports: [TypeOrmModule.forFeature([User])], 
  providers: [UsersService],
  exports: [UsersService],  
})
export class UsersModule {}