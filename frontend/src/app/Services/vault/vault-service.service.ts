import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VaultService {
  private apiUrl = 'http://localhost:3000/vault';

  constructor(private http: HttpClient) {}

  storePassword(website: string, username: string, password: string, key: string) {
    return this.http.post(`${this.apiUrl}/store`, { website, username, password, key });
  }

  retrievePasswords() {
    return this.http.get(`${this.apiUrl}/retrieve`);
  }
}