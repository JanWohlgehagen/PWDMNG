import { Component, OnInit } from '@angular/core';
import { VaultService } from '../../Services/vault/vault-service.service';
import { UserService, Vault } from '../../Services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { VaultDialogComponent } from './vault-dialog/vault-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../Services/auth/auth.service';

export interface IPostVaultItem {
  website: string;
  username: string;
  encryptedPassword: string;
  iv: string;
}
@Component({
  selector: 'app-vault',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatButtonModule],
  templateUrl: './vault.component.html',
  styleUrl: './vault.component.scss',
})
export default class VaultComponent implements OnInit {
  vaultItems: Vault[] = [];
  previousViewedItem: Vault | null = null;

  constructor(
    private vaultService: VaultService,
    private userService: UserService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadVaultItems();
  }

  loadVaultItems(): void {
    const userId = sessionStorage.getItem('userId') || '';
    this.vaultService.getVaultItems(userId).subscribe((items) => {
      this.userService.user.vaultItems = items;
      this.vaultItems = this.userService.user.vaultItems;
    });
  }

  decryptPassword(vaultItem: Vault) {
    if (this.previousViewedItem) {
      this.previousViewedItem.password = '';
    }

    const hash = sessionStorage.getItem('hash') || '';
    const pw = this.authService.decryptString(
      vaultItem.iv,
      hash,
      vaultItem.encryptedPassword
    );

    vaultItem.password = pw;
    this.previousViewedItem = vaultItem;
  }

  hidePassword(vaultItem: Vault) {
    vaultItem.password = '';
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(VaultDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const iv = window.crypto.getRandomValues(new Uint8Array(16)).toString();
        const hash = sessionStorage.getItem('hash') || '';
        const salt = sessionStorage.getItem('salt') || '';
        const encryptedPassword = this.authService.encryptString(
          salt,
          iv,
          hash,
          result.password
        );

        const newVaultItem: IPostVaultItem = {
          website: result.website,
          username: result.username,
          encryptedPassword: encryptedPassword,
          iv,
        };

        console.log('Adding new item to vault:', newVaultItem);
        this.vaultService.addVaultItem(newVaultItem).subscribe((newItem) => {
          this.userService.user.vaultItems.push(newItem); // Add new item to the list
        });
      }
    });
  }

  signOut(): void {
    this.authService.signOut();
  }
}
