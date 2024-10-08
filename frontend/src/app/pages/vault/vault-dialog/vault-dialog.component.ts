import { Component } from '@angular/core';
import { Vault } from '../../../Services/user/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatDialogContent,
  MatDialogActions,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

export interface ICreateVaultItem {
  website: string;
  username: string;
  password: string;
}

@Component({
  selector: 'app-vault-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDialogContent,
    FormsModule,
    MatDialogActions,
    MatDialogTitle,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './vault-dialog.component.html',
  styleUrl: './vault-dialog.component.scss',
})
export class VaultDialogComponent {
  vaultItem: ICreateVaultItem = {
    website: '',
    username: '',
    password: '',
  };

  constructor(public dialogRef: MatDialogRef<VaultDialogComponent>) {}

  onSubmit(): void {
    if (
      this.vaultItem.website &&
      this.vaultItem.username &&
      this.vaultItem.password
    ) {
      this.dialogRef.close(this.vaultItem);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
