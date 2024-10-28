import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // Import RouterModule for routing
import { AuthService } from '../../Services/auth/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UserService } from '../../Services/user/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule], // Ensure RouterModule is included
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export default class LoginComponent implements OnDestroy {
  email: string = '';
  password: string = '';
  destroy$ = new Subject<void>();
  loginErrorText = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    this.loading = true;

    this.authService
      .signInUser(this.email, this.password)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        async (response) => {
          this.loginErrorText = '';
          this.userService.setUser(response.access_token);
          const salt = sessionStorage.getItem('salt') || '';
          if (response) {
            this.authService
              .hashPassword(this.password, salt)
              .then((hash) => {
                this.password = '';
                this.email = '';
              })
              .then(() => {
                this.router.navigate(['/vault']);
              });
          }
        },
        (error) => {
          console.error('Login error:', error);
          this.loginErrorText = 'Login failed. Please try again.';
          this.loading = false;
        }
      );
    console.log('Login form submitted');
  }
}
