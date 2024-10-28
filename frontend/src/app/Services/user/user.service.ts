import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  user: User = { id: '', salt: '', vaultItems: [] };

  setUser(access_token: string) {
    const decodedToken: any = jwtDecode(access_token);
    sessionStorage.setItem('userId', decodedToken.sub);
    sessionStorage.setItem('salt', decodedToken.salt);
    sessionStorage.setItem('access_token', access_token);
    this.user = {
      id: decodedToken.sub,
      salt: decodedToken.salt,
      vaultItems: [],
    };
  }

  getUser(): User {
    return this.user;
  }
}

export interface User {
  id: string;
  salt: string;
  vaultItems: Vault[];
}

export interface Vault {
  id: string;
  website: string;
  username: string;
  encryptedPassword: string;
  iv: string;
  password?: string;
}
