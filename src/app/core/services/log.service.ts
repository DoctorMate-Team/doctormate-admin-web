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
  private baseUrl = `${environment.apiUrl}/api/Admin/Logs`;

  getLogs(page: number = 1, pageSize: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<any>(this.baseUrl, { params }).pipe(
      map((res: any) => res.data)
    );
  }
}
