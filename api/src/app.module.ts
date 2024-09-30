import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/users';
import { Vault } from './vault/entities/vault';
import { VaultModule } from './vault/vault.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'sso',
      entities: [User, Vault],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    VaultModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
