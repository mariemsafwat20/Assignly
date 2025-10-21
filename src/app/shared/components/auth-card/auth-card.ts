import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-card',
  imports: [],
  templateUrl: './auth-card.html',
  styleUrl: './auth-card.scss'
})
export class AuthCard {
  @Input() subtitle = 'Sign in to your account to continue.';
}
