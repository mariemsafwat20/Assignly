import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthCard } from '../../../shared/components/auth-card/auth-card';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import Swal from 'sweetalert2';
import { ILogin, IUser } from '../../../core/Model/iuser';
import { AuthService } from '../../../core/Services/AuthServices/auth-service';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    AuthCard,
    PasswordModule,
    InputTextModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  
  loginForm!: FormGroup;
  @Output() formSubmit = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}


  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]]
    });
  }

  get email() { return this.loginForm.get('email')!; }
  get password() { return this.loginForm.get('password')!; }

  // Login method
  onLogin() {
    if (this.loginForm.invalid) return;

    const loginUser: ILogin = {
      email: this.email.value,
      password: this.password.value
    };

    console.log("Logging in user:", loginUser);

    this.authService.login(loginUser).subscribe({
      next: (response) => {
        console.log("Login successful:", response);

        Swal.fire({
          title: 'Login successful.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          this.router.navigate(['/']);
        });
      },

      error: (error: any) => {
        console.error("Login failed:", error);

        Swal.fire({
          title: 'Login failed. Please try again.',
          text: error.error?.message || 'Invalid credentials',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }
}