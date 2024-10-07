import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export default class RegisterComponent {
  username: string = '';
  password: string = '';
  passwordRepeat: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  passwordStrengthMessage: string = '';
  passwordStrengthLevel: string = ''; // This will hold the level of strength (Weak, Medium, Strong)

  // Register logic
  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.username, this.password).subscribe({
      next: () => {
        this.successMessage = 'Registration successful!';
        this.router.navigate(['/login']); // Redirect to login after registration
        this.errorMessage ='';
      },
      error: () => {
        this.errorMessage = 'Registration failed';
        this.successMessage = '';
      }
    });
  }

  // Check password strength
  checkPasswordStrength() {
    const hasUpperCase = /[A-Z]/.test(this.password);
    const hasLowerCase = /[a-z]/.test(this.password);
    const hasNumbers = /\d/.test(this.password);
    const hasNonAlphas = /\W/.test(this.password); // special characters
    const isLongEnough = this.password.length >= 8;

    // Check the strength level and provide real-time feedback
    if (!isLongEnough) {
      this.passwordStrengthMessage = 'Password must be at least 8 characters long.';
      this.passwordStrengthLevel = 'Weak';
    } else if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasNonAlphas) {
      if (!hasUpperCase || !hasLowerCase) {
        this.passwordStrengthMessage = 'Password should contain both uppercase and lowercase letters.';
      } else if (!hasNumbers) {
        this.passwordStrengthMessage = 'Password should contain at least one number.';
      } else if (!hasNonAlphas) {
        this.passwordStrengthMessage = 'Password should contain at least one special character.';
      }
      this.passwordStrengthLevel = 'Medium';
    } else {
      this.passwordStrengthMessage = 'Strong password!';
      this.passwordStrengthLevel = 'Strong'; // When all criteria are met
    }
  }
}