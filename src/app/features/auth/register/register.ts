import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthCard } from '../../../shared/components/auth-card/auth-card';

import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext'; 
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    AuthCard,
    PasswordModule,
    InputTextModule,
    SelectModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  registerForm!: FormGroup;
  @Output() formSubmit = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', [
        Validators.required,
      ]],
      email: ['', [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
      ]],
      confirmPassword: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
      ]],
      role: ['', [
        Validators.required,
      ]],
    },
    { validator: this.passwordMatchValidator }
  );
  }

  get username() { return this.registerForm.get('username')!; }
  get email() { return this.registerForm.get('email')!; }
  get password() { return this.registerForm.get('password')!; }
  get confirmPassword() { return this.registerForm.get('confirmPassword')!; }
  get role() { return this.registerForm.get('role')!; }

  // Toggle password visibility
  isPasswordVisible = false;
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  // Custom validator to check password match
  passwordMatchValidator(form: AbstractControl) {
    const passwordControl = form.get('password');
    const confirmPasswordControl = form.get('confirmPassword');

    if (!passwordControl || !confirmPasswordControl) return null;

    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;

    if (password !== confirmPassword) {
      // Keep other errors (e.g. required, pattern)
      const existingErrors = confirmPasswordControl.errors || {};
      confirmPasswordControl.setErrors({ ...existingErrors, passwordMismatch: true });
    } else {
      // Remove only the passwordMismatch error, keep others
      const errors = confirmPasswordControl.errors;
      if (errors) {
        delete errors['passwordMismatch'];
        if (Object.keys(errors).length === 0) {
          confirmPasswordControl.setErrors(null);
        } else {
          confirmPasswordControl.setErrors(errors);
        }
      }
    }
    return null;
  }


  //  Role Dropdown
  roles = [
    { name: 'Admin - Create Organization' },
    { name: 'Admin - Join Organization' },
    { name: 'Member - Join Organization' }
  ];

  selectedRole: any;

  // Register Form
  onRegister() {
    if (this.registerForm.invalid) return;
      this.formSubmit.emit(this.registerForm.value);
  }
}
