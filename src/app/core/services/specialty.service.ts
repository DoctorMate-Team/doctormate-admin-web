import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, tap, map } from 'rxjs';
import { ApiResponse } from '../models/response.model';
import { Specialty } from '../models/specialty.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/admin/specialties`;

  // State Signals
  specialtiesData = signal<Specialty[]>([]);
  isLoading = signal(false);
  errorMsg = signal<string | null>(null);

  getAllSpecialties(page: number = 1, limit: number = 100, includeInactive: boolean = true): Observable<any> {
    this.isLoading.set(true);
    this.errorMsg.set(null);
    return this.http.get<any>(`${this.baseUrl}?page=${page}&limit=${limit}&includeInactive=${includeInactive}`).pipe(
      map((res: any) => res.data),
      tap(data => {
        const items = data?.items || data || [];
        this.specialtiesData.set(items);
        this.isLoading.set(false);
      }),
      catchError(err => {
        console.error('Error fetching specialties:', err);
        this.errorMsg.set(err.error?.message || 'Failed to load specialties.');
        this.isLoading.set(false);
        return throwError(() => err);
      })
    );
  }

  getSpecialtyById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
      map((res: any) => res.data),
      catchError(err => {
        console.error(`Error fetching specialty ${id}:`, err);
        return throwError(() => err);
      })
    );
  }

  createSpecialty(data: { name: string; description: string; image: File | null }): Observable<any> {
    const formData = new FormData();
    formData.append('Name', data.name);
    formData.append('Description', data.description);
    if (data.image) {
      formData.append('Image', data.image);
    }

    return this.http.post<any>(this.baseUrl, formData).pipe(
      map((res: any) => res.data),
      catchError(err => {
        console.error('Error creating specialty:', err);
        return throwError(() => err);
      })
    );
  }

  updateSpecialty(id: string, data: { name: string; description: string; image?: File | null }): Observable<any> {
    const formData = new FormData();
    formData.append('Name', data.name);
    formData.append('Description', data.description);
    if (data.image) {
      formData.append('Image', data.image);
    }

    return this.http.put<any>(`${this.baseUrl}/${id}`, formData).pipe(
      map((res: any) => res.data),
      catchError(err => {
        console.error(`Error updating specialty ${id}:`, err);
        return throwError(() => err);
      })
    );
  }

  deleteSpecialty(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
      map((res: any) => res.data),
      catchError(err => {
        console.error(`Error deleting specialty ${id}:`, err);
        return throwError(() => err);
      })
    );
  }

  restoreSpecialty(id: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${id}/restore`, {}).pipe(
      map((res: any) => res.data),
      catchError(err => {
        console.error(`Error restoring specialty ${id}:`, err);
        return throwError(() => err);
      })
    );
  }
}


