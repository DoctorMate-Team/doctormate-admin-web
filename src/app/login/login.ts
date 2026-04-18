import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  ngOnInit() {
    this.authService.isLoggedIn.set(false);
    localStorage.removeItem('token');
  }

  loginForm = this.fb.group({
    emailOrPhone: ['', [Validators.required]], // Allowing both email and phone
    password: ['', [Validators.required, Validators.minLength(4)]] // Minimum length adjusted if necessary
  });


  isLoading = signal(false);
  errorMessage = signal('');

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    const credentials = {
      emailOrPhone: this.loginForm.value.emailOrPhone!,
      password: this.loginForm.value.password!
    };

    this.authService.login(credentials).subscribe({
      error: (err) => {
        this.isLoading.set(false);
        if (err.status === 0) {
          this.errorMessage.set('Network error. Please check your internet connection.');
        } else if (err.status === 401) {
          this.errorMessage.set('Invalid email/phone or password.');
        } else {
          this.errorMessage.set('Server error (' + err.status + '). Please try again later.');
        }
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }
}

