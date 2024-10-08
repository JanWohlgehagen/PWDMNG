import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    MatCheckboxModule,
    MatIconModule,
  ], // Ensure CommonModule is included
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export default class RegisterComponent implements OnDestroy {
  destroy$ = new Subject<void>();

  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  registrationErrorText = '';

  passwordStrength: string = 'Weak';
  strengthLevel: number = 0;

  lengthCriteria = false;
  numberCriteria = false;
  uppercaseCriteria = false;
  lowercaseCriteria = false;
  specialCharCriteria = false;

  showPasswordTips = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  checkPasswordStrength(password: string): void {
    const lengthCriteria = password.length >= 8; // Minimum length
    const numberCriteria = /\d/.test(password); // At least one number
    const uppercaseCriteria = /[A-Z]/.test(password); // At least one uppercase letter
    const lowercaseCriteria = /[a-z]/.test(password); // At least one lowercase letter
    const specialCharCriteria = /[!@#$%^&*]/.test(password); // At least one special character

    this.lengthCriteria = lengthCriteria;
    this.numberCriteria = numberCriteria;
    this.uppercaseCriteria = uppercaseCriteria;
    this.lowercaseCriteria = lowercaseCriteria;
    this.specialCharCriteria = specialCharCriteria;

    this.strengthLevel = 0; // Reset strength level

    // Increment strength level based on criteria
    if (lengthCriteria) this.strengthLevel++;
    if (numberCriteria) this.strengthLevel++;
    if (uppercaseCriteria) this.strengthLevel++;
    if (lowercaseCriteria) this.strengthLevel++;
    if (specialCharCriteria) this.strengthLevel++;

    // Set password strength based on level
    switch (this.strengthLevel) {
      case 0:
      case 1:
        this.passwordStrength = 'Weak';
        break;
      case 2:
        this.passwordStrength = 'Moderate';
        break;
      case 3:
      case 4:
        this.passwordStrength = 'Strong';
        break;
      case 5:
        this.passwordStrength = 'Very Strong';
        break;
      default:
        this.passwordStrength = '';
    }
  }

  // Method to handle form submission
  onSubmit() {
    this.authService
      .registerUser(this.email, this.password)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response) => {
          console.log('Registration successful:', response);
          this.registrationErrorText = '';
          this.router.navigate(['/login']);
          return response;
        },
        (error) => {
          console.error('Registration error:', error);
          this.registrationErrorText = 'Registration failed. Please try again.';
        }
      );
    console.log('Registration form submitted');
  }

  get getFormStatus(): boolean {
    return (
      this.lengthCriteria &&
      this.numberCriteria &&
      this.uppercaseCriteria &&
      this.lowercaseCriteria &&
      this.specialCharCriteria &&
      this.password === this.confirmPassword &&
      this.email.includes('@') &&
      this.email.includes('.')
    );
  }
}
