import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private destroy$ = new Subject<void>();
  private apiUrl = 'http://localhost:3000/auth/';

  constructor(private http: HttpClient) {}

  registerUser(username: string, password: string) {
    const salt = this.generateSalt();
    return this.http.post(this.apiUrl + 'register', { username, password, salt }).pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      (response) => {
        console.log('Registration successful:', response);
        return response;
      },
      (error) => {
        console.error('Registration error:', error);
        throw error;
      }
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  generateSalt(length: number = 16): string {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
  }
}
