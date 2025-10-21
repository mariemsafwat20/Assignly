import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthCard } from '../../../shared/components/auth-card/auth-card';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    AuthCard
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  
  form!: FormGroup;
  @Output() formSubmit = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
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

  get email() {
    return this.form.get('email')!;
  }

  get password() {
    return this.form.get('password')!;
  }

  onLogin() {
    if (this.form.invalid) return;
      this.formSubmit.emit(this.form.value);
  }
}