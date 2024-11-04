import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../Services/login/login.service';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { JWTService } from '../../Services/Jwt/jwt.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, HttpClientModule, CommonModule],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  emailError: string = '';
  passwordError: string = '';
  isUserLoggedIn: boolean = false;
  showPassword: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private jwtService: JWTService
  ) {}

  ngOnInit(): void {
    this.isUserLoggedIn = this.loginService.isUserLoggedIn;
  }

  login(): void {
    this.emailError = '';
    this.passwordError = '';
    this.errorMessage = '';

    if (!this.email) {
      this.emailError = 'Email is required';
      return;
    }
    if (!this.password) {
      this.passwordError = 'Password is required';
      return;
    }

    this.loginService.login(this.email, this.password).subscribe(
      (response) => {
        if (response && response.token) {
          try {
            const decodedToken = this.jwtService.decodeToken(response.token);
            if (decodedToken && decodedToken.role === 'admin') {
              localStorage.setItem('token', response.token);
              this.router.navigate(['/dashboard']);
              this.isUserLoggedIn = true;
            } else {
              this.errorMessage = 'Access denied. You are not authorized.';
            }
          } catch (error) {
            console.error('Token decode error:', error);
            this.errorMessage = 'Authentication failed. Please try again.';
          }
        } else {
          this.errorMessage = 'Invalid response from server.';
          console.log('Invalid response structure:', response);
        }
      },
      (error) => {
        if (error.status === 401) {
          this.errorMessage = 'Invalid email or password';
        } else {
          this.errorMessage = 'Access denied.';
        }
      }
    );
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
