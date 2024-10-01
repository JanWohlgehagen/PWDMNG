import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';''
import * as CryptoJS from 'crypto-js';
import { Vault } from './entities/vault';

@Injectable()
export class VaultService {
  constructor(
    @InjectRepository(Vault)
    private vaultRepository: Repository<Vault>,
  ) {}

  encryptPassword(password: string, key: string): string {
    const iv = CryptoJS.lib.WordArray.random(16); // Generate a random IV
    const encrypted = CryptoJS.AES.encrypt(password, key, { iv });
    return `${iv.toString()}:${encrypted.toString()}`;
  }

  decryptPassword(encryptedPassword: string, key: string): string {
    const [iv, encryptedData] = encryptedPassword.split(':');
    const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
      iv: CryptoJS.enc.Hex.parse(iv),
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  async storePassword(userId: string, website: string, username: string, password: string, key: string): Promise<Vault> {
    const encryptedPassword = this.encryptPassword(password, key);
    const vaultEntry = this.vaultRepository.create({ user: { id: userId }, website, username, encryptedPassword });
    return this.vaultRepository.save(vaultEntry);
  }

  async retrievePasswords(userId: string): Promise<Vault[]> {
    return this.vaultRepository.find({ where: { user: { id: userId } } });
  }
}
