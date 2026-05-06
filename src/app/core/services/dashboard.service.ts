import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError, tap, map } from 'rxjs';
import { ApiResponse } from '../models/response.model';
import { DashboardOverview, SystemHealth } from '../models/dashboard.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient);
  private overviewUrl = `${environment.apiUrl}/api/admin/dashboard/overview`;
  private healthUrl = `${environment.apiUrl}/api/admin/dashboard/system-health`;

  // Overview signals
  overviewData = signal<DashboardOverview | null>(null);
  overviewLoading = signal<boolean>(false);
  overviewError = signal<string | null>(null);

  // System Health signals
  healthData = signal<SystemHealth | null>(null);
  healthLoading = signal<boolean>(false);
  healthError = signal<string | null>(null);

  fetchOverview() {
    this.overviewLoading.set(true);
    this.overviewError.set(null);

    console.log(`Full Request URL: ${this.overviewUrl}`);

    this.http.get<any>(this.overviewUrl).pipe(
      map((res: any) => res.data),
      tap(data => {
        this.overviewData.set(data);
        this.overviewLoading.set(false);
      }),
      catchError(err => {
        console.error('Overview API Error:', err);
        this.overviewError.set(err.status === 401 ? 'Unauthorized. Please login.' : (err.error?.message || 'Failed to load overview data.'));
        this.overviewLoading.set(false);
        return throwError(() => err);
      })
    ).subscribe();
  }

  fetchSystemHealth() {
    this.healthLoading.set(true);
    this.healthError.set(null);

    console.log(`Full Request URL: ${this.healthUrl}`);

    this.http.get<any>(this.healthUrl).pipe(
      map((res: any) => res.data),
      tap(data => {
        this.healthData.set(data);
        this.healthLoading.set(false);
      }),
      catchError(err => {
        console.error('System Health API Error:', err);
        this.healthError.set(err.status === 401 ? 'Unauthorized. Please login.' : (err.error?.message || 'Failed to load system health data.'));
        this.healthLoading.set(false);
        return throwError(() => err);
      })
    ).subscribe();
  }
}

