import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VaultService {
  private apiUrl = 'http://localhost:3000/vault';

  constructor(private http: HttpClient) {}

  storePassword(token: string, website: string, username: string, password: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/store`, { website, username, password }, { headers });
  }

  retrievePasswords(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/retrieve`, { headers });
  }
}
