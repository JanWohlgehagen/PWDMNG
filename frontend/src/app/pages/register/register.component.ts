import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Import RouterModule for routing
import { CommonModule } from '@angular/common'; // Import CommonModule for ngClass
import { AuthService } from '../../Services/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],  // Ensure CommonModule is included
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export default class RegisterComponent {
  constructor(private authService: AuthService) {}

  email: string = '';
  password: string = '';

  passwordStrength: string = '';
  strengthLevel: number = 0;


  checkPasswordStrength(password: string): void {
    const lengthCriteria = password.length >= 8; // Minimum length
    const numberCriteria = /\d/.test(password); // At least one number
    const uppercaseCriteria = /[A-Z]/.test(password); // At least one uppercase letter
    const lowercaseCriteria = /[a-z]/.test(password); // At least one lowercase letter
    const specialCharCriteria = /[!@#$%^&*]/.test(password); // At least one special character

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
    this.authService.registerUser(this.email, this.password)
    console.log('Registration form submitted');
  }
}
