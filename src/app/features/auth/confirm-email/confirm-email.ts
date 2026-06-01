import { Component } from '@angular/core';
import { AuthCard } from "../../../shared/components/auth-card/auth-card";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/Services/AuthServices/auth-service';

@Component({
  selector: 'app-confirm-email',
  imports: [
    AuthCard,
    RouterLink,
  ],
  templateUrl: './confirm-email.html',
  styleUrl: './confirm-email.scss',
})
export class ConfirmEmail {
  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {}
  
  ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('token');
    console.log('Email confirmation token:', token);
    
    if (token) {
      this.authService.confirmEmail(token).subscribe({
        next: (response) => {
          console.log('Email confirmed successfully:', response);
        },
        error: (error) => {
          console.error('Email confirmation failed:', error);
        }
      });
    }
  }
}