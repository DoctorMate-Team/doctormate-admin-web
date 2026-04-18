import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError, throwError } from 'rxjs';

import { ApiResponse } from '../models/response.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  // Auth State
  isLoggedIn = signal<boolean>(this.hasToken());

  login(credentials: { emailOrPhone: string; password: string }) {
    console.log('[AuthService] Sending login request to API');

    const loginBody = {
      emailOrPhone: credentials.emailOrPhone,
      password: credentials.password
    };

    // Send POST request to /api/Login exactly as specified in cURL
    return this.http.post<any>(`${environment.apiUrl}/api/Login`, loginBody).pipe(
      tap((response: any) => {
        console.log('Login Response:', response);
        
        const token = response.data.token;
        
        if (token) {
          // Save token to localStorage with key 'token'
          localStorage.setItem('token', token);
          this.isLoggedIn.set(true);
          
          // Navigate to /admin/overview after successful login
          this.router.navigate(['/admin/overview']);
        } else {
          console.error('Login successful but no token found in response:', response);
          throw new Error('Token not found in response');
        }
      }),
      catchError((error) => {
        // Show real server errors without any mock data
        console.error('Login API Error:', error);
        console.error('Error Status:', error.status);
        console.error('Error Message:', error.message);
        if (error.error) {
          console.error('Server Error Body:', error.error);
        }
        
        // Return the actual error for UI display
        return throwError(() => error);
      })
    );
  }


  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }

  hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
