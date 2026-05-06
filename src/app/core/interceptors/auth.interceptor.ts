import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  // Prepend the environment API URL if it's an API request and doesn't already have http
  let url = req.url;
  if (url.startsWith('/api/') && !url.startsWith('http')) {
    // Robustly handle the base URL to prevent doubling of /api
    const baseUrl = environment.apiUrl.replace(/\/$/, '').replace(/\/api\/?$/, '');
    url = `${baseUrl}${url}`;
  }

  let authReq = req.clone({ url });

  const rawToken = localStorage.getItem('token');
  if (rawToken) {
    const cleanToken = rawToken.replace(/['"]+/g, '').trim();
    if (!cleanToken) {
      console.error('[Interceptor] ⚠️ Token exists in localStorage but is EMPTY after cleaning!');
    } else {
      console.log('[Interceptor] ✅ Token attached:', cleanToken.substring(0, 30) + '...');
      authReq = authReq.clone({
        setHeaders: {
          'Authorization': `Bearer ${cleanToken}`,
          'Accept': 'application/json'
        }
      });
    }
  } else {
    console.warn('[Interceptor] ⚠️ NO TOKEN FOUND in localStorage! Request will be sent without Authorization header.');
  }

  console.log(`[Interceptor] Full URL: ${authReq.url}`);

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      const isLoginRequest = req.url.includes('/api/Login');
      const isLoginPage = router.url.includes('/login');

      // Strict logging of API failures
      console.error(`[Interceptor] API Error on ${req.url}:`, error);

      if (error.status === 401 && !isLoginRequest && !isLoginPage) {
        console.warn('Unauthorized request. Redirecting to login...');
        localStorage.removeItem('token');
        router.navigate(['/login']);
      }

      // Always throw the original error to be handled by the services
      return throwError(() => error);
    })
  );
};


