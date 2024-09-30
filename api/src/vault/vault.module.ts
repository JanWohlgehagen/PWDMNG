import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VaultService } from './vault.service';
import { VaultController } from './vault.controller';
import { User } from '../users/entities/users'; // Adjust according to your structure
import { Vault } from './entities/vault';

@Module({
  imports: [TypeOrmModule.forFeature([Vault, User])],
  providers: [VaultService],
  controllers: [VaultController],
  exports: [VaultService], // Export the service if needed in other modules
})
export class VaultModule {}
