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
  private baseUrl = `${environment.apiUrl}/api/admin/users`;

  // Users List Signals
  usersData = signal<PaginatedUsers | null>(null);
  usersLoading = signal<boolean>(false);
  usersError = signal<string | null>(null);

  // Single User Details Signals
  selectedUser = signal<User | null>(null);
  userDetailsLoading = signal<boolean>(false);
  userDetailsError = signal<string | null>(null);

  fetchUsers(page: number = 1, limit: number = 10, role?: string, isActive?: boolean | string) {
    this.usersLoading.set(true);
    this.usersError.set(null);

    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (role) {
      params = params.set('role', role);
    }
    if (isActive !== undefined) {
      params = params.set('isActive', isActive.toString());
    }

    const fullUrl = `${this.baseUrl}?page=${page}&limit=${limit}`;
    console.log('[UserService] Fetching:', fullUrl);

    this.http.get<any>(this.baseUrl, { params }).pipe(
      map((res: any) => {
        console.log('[UserService] Raw response:', res);
        const users = res?.data?.users ?? res?.data ?? [];
        console.log('[UserService] Extracted users array:', users);
        return Array.isArray(users) ? users : [];
      }),
      tap(usersArray => {
        this.usersData.set({
          content: usersArray,
          totalElements: usersArray.length,
          totalPages: Math.ceil(usersArray.length / limit) || 1,
          size: limit,
          number: page,
          first: page === 1,
          last: usersArray.length < limit,
          empty: usersArray.length === 0,
          pageable: { pageNumber: page, pageSize: limit }
        });
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
