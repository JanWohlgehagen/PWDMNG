import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
('');
import * as CryptoJS from 'crypto-js';
import { Vault } from './entities/vault';

@Injectable()
export class VaultService {
  constructor(
    @InjectRepository(Vault)
    private vaultRepository: Repository<Vault>,
  ) {}

  async storePassword(
    userId: string,
    website: string,
    username: string,
    encryptedPassword: string,
    iv: string,
  ): Promise<Vault> {
    const vaultEntry = this.vaultRepository.create({
      user: { id: userId },
      website,
      username,
      encryptedPassword: encryptedPassword,
      iv,
    });
    return this.vaultRepository.save(vaultEntry);
  }

  async retrievePasswords(userId: string): Promise<Vault[]> {
    return this.vaultRepository.find({ where: { user: { id: userId } } });
  }
}
