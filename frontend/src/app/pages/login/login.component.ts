import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Import RouterModule for routing

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],  // Ensure RouterModule is included
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent {
  // Login logic
  onSubmit() {
    // Add login logic here
    console.log('Login form submitted');
  }
}
