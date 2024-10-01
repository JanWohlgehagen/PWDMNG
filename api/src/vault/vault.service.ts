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

  // //TODO Move this to frontend
  // encryptPassword(password: string, key: string): string {
  //   const iv = CryptoJS.lib.WordArray.random(16); // Generate a random IV
  //   const salt = CryptoJS.lib.WordArray.random(16); // Generate a random Salt

  //   // Derive the key using the salt (or just prepend/append it)
  //   const saltedKey = CryptoJS.PBKDF2(key, salt, { keySize: 256 / 32 });
  //   const encrypted = CryptoJS.AES.encrypt(password, saltedKey, { iv });
  //   return `${salt.toString(CryptoJS.enc.Hex)}:${iv.toString(CryptoJS.enc.Hex)}:${encrypted.toString()}`;
  // }

  // //TODO Move this to frontend
  // decryptPassword(encryptedPassword: string, key: string): string {
  //   const [salt, iv, encryptedData] = encryptedPassword.split(':');
  //   const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
  //     iv: CryptoJS.enc.Hex.parse(iv),
  //     salt: CryptoJS.enc.Hex.pars(salt),
  //   });
  //   return decrypted.toString(CryptoJS.enc.Utf8);
  // }

  async storePassword(
    userId: string,
    website: string,
    username: string,
    password: string,
  ): Promise<Vault> {
    const vaultEntry = this.vaultRepository.create({
      user: { id: userId },
      website,
      username,
      encryptedPassword: password,
    });
    return this.vaultRepository.save(vaultEntry);
  }

  async retrievePasswords(userId: string): Promise<Vault[]> {
    return this.vaultRepository.find({ where: { user: { id: userId } } });
  }
}
