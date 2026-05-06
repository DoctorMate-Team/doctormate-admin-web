import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ApiResponse, PaginatedResponse } from '../models/response.model';
import { Log } from '../models/log.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/admin/logs`;

  getLogs(page: number = 1, pageSize: number = 10, logType?: string, severity?: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', pageSize.toString());

    if (logType) {
      params = params.set('logType', logType);
    }
    if (severity) {
      params = params.set('severity', severity);
    }

    const fullUrl = `${this.baseUrl}?page=${page}&limit=${pageSize}`;
    console.log('[LogService] Fetching:', fullUrl);

    return this.http.get<any>(this.baseUrl, { params }).pipe(
      map(res => {
        console.log('[LogService] ===== FULL RESPONSE =====');
        console.log('[LogService] res:', res);
        console.log('[LogService] res.data:', res?.data);
        console.log('[LogService] res.data keys:', res?.data ? Object.keys(res.data) : 'data is null/undefined');

        // Try all common array property names
        const logs = res?.data?.logs
          || res?.data?.items
          || res?.data?.data
          || (Array.isArray(res?.data) ? res.data : null)
          || [];

        console.log('[LogService] Extracted logs array (length):', logs.length);
        return Array.isArray(logs) ? logs : [];
      })
    );
  }
}
