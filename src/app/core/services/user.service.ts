import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, throwError, tap, map } from 'rxjs';

import { ApiResponse } from '../models/response.model';
import { User, PaginatedUsers } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/Admin/Users`;

  // Users List Signals
  usersData = signal<PaginatedUsers | null>(null);
  usersLoading = signal<boolean>(false);
  usersError = signal<string | null>(null);

  // Single User Details Signals
  selectedUser = signal<User | null>(null);
  userDetailsLoading = signal<boolean>(false);
  userDetailsError = signal<string | null>(null);

  fetchUsers(page: number = 0) {
    this.usersLoading.set(true);
    this.usersError.set(null);

    const params = new HttpParams().set('page', page.toString());

    this.http.get<any>(this.baseUrl, { params }).pipe(
      map((res: any) => res.data),
      tap(rawData => {
        if (Array.isArray(rawData)) {
          this.usersData.set({
            content: rawData,
            totalElements: rawData.length,
            totalPages: 1,
            size: rawData.length,
            number: 0,
            first: true,
            last: true,
            empty: rawData.length === 0,
            pageable: { pageNumber: 0, pageSize: 20 }
          });
        } else {
          this.usersData.set(rawData as PaginatedUsers);
        }
        this.usersLoading.set(false);
      }),
      catchError(err => {
        console.error('Users API Error:', err);
        this.usersError.set(err.status === 401 ? 'Unauthorized Access.' : (err.error?.message || 'Failed to load users list.'));
        this.usersLoading.set(false);
        return throwError(() => err);
      })
    ).subscribe();
  }

  fetchUserById(id: string) {
    this.userDetailsLoading.set(true);
    this.userDetailsError.set(null);
    this.selectedUser.set(null);

    this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
      map((res: any) => res.data),
      tap(data => {
        this.selectedUser.set(data);
        this.userDetailsLoading.set(false);
      }),
      catchError(err => {
        console.error('User Details API Error:', err);
        this.userDetailsError.set(err.status === 401 ? 'Unauthorized Access.' : (err.error?.message || 'Failed to load user details.'));
        this.userDetailsLoading.set(false);
        return throwError(() => err);
      })
    ).subscribe();
  }


  clearSelectedUser() {
    this.selectedUser.set(null);
    this.userDetailsError.set(null);
  }
}
