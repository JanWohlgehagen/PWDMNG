import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Vault } from '../user/user.service';
import { Observable } from 'rxjs';
import { IPostVaultItem } from '../../pages/vault/vault.component';

@Injectable({
  providedIn: 'root',
})
export class VaultService {
  private apiUrl = 'http://localhost:3000/vault/';

  constructor(private http: HttpClient) {}

  getVaultItems(userId: string): Observable<Vault[]> {
    const params = new HttpParams().set('userId', userId);
    const token = sessionStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Vault[]>(this.apiUrl + 'retrieve', {
      params,
      headers,
    });
  }

  addVaultItem(item: IPostVaultItem): Observable<Vault> {
    const token = sessionStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Vault>(this.apiUrl + 'store', item, { headers });
  }
}
