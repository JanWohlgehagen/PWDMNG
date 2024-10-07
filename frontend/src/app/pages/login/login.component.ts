import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Import RouterModule for routing
import { AuthService } from '../../Services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],  // Ensure RouterModule is included
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {

  }

  // Login logic
  onSubmit() {

    console.log('Login form submitted');
  }
}
