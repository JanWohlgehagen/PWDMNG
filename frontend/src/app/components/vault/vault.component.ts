import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VaultService } from '../../services/vault.service';

@Component({
  selector: 'app-vault',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './vault.component.html',
  styleUrl: './vault.component.scss'
})
export default class VaultComponent implements OnInit {
  passwords: any[] = [];
  website: string = '';
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private vaultService: VaultService) {}

  ngOnInit(): void {
    this.retrievePasswords();
  }

  storePassword() {
    const token = localStorage.getItem('token');
    if (token) {
      this.vaultService.storePassword(token, this.website, this.username, this.password).subscribe({
        next: () => {
          this.successMessage = 'Password stored successfully!';
          this.retrievePasswords(); // Refresh password list
        },
        error: () => {
          this.errorMessage = 'Error storing password';
        }
      });
    }
  }

  retrievePasswords() {
    const token = localStorage.getItem('token');
    if (token) {
      this.vaultService.retrievePasswords(token).subscribe({
        next: (data) => {
          this.passwords = data;
        },
        error: () => {
          this.errorMessage = 'Error retrieving passwords';
        }
      });
    }
  }
}
