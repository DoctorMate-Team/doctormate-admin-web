import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError, tap, map } from 'rxjs';
import { ApiResponse } from '../models/response.model';
import { Payment, PaymentSummary } from '../models/payment.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/Admin/Payments`;

  // Payments List Signals
  paymentsData = signal<Payment[]>([]);
  paymentsLoading = signal<boolean>(false);
  paymentsError = signal<string | null>(null);

  // Payment Summary Signals
  summaryData = signal<PaymentSummary | null>(null);
  summaryLoading = signal<boolean>(false);
  summaryError = signal<string | null>(null);

  // Single Payment Signal
  selectedPayment = signal<Payment | null>(null);
  paymentDetailsLoading = signal<boolean>(false);
  paymentDetailsError = signal<string | null>(null);

  fetchPayments() {
    this.paymentsLoading.set(true);
    this.paymentsError.set(null);

    this.http.get<any>(this.baseUrl).pipe(
      map((res: any) => res.data),
      tap(data => {
        this.paymentsData.set(data || []);
        this.paymentsLoading.set(false);
      }),
      catchError(err => {
        console.error('Payments API Error:', err);
        this.paymentsError.set(err.status === 401 ? 'Unauthorized' : (err.error?.message || 'Failed to load payments.'));
        this.paymentsLoading.set(false);
        return throwError(() => err);
      })
    ).subscribe();
  }

  fetchPaymentsSummary() {
    this.summaryLoading.set(true);
    this.summaryError.set(null);

    this.http.get<any>(`${this.baseUrl}/summary`).pipe(
      map((res: any) => res.data),
      tap(data => {
        this.summaryData.set(data);
        this.summaryLoading.set(false);
      }),
      catchError(err => {
        console.error('Payments Summary API Error:', err);
        this.summaryError.set(err.status === 401 ? 'Unauthorized' : (err.error?.message || 'Failed to load summary.'));
        this.summaryLoading.set(false);
        return throwError(() => err);
      })
    ).subscribe();
  }

  fetchPaymentById(id: string) {
    this.paymentDetailsLoading.set(true);
    this.paymentDetailsError.set(null);
    this.selectedPayment.set(null);

    this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
      map((res: any) => res.data),
      tap(data => {
        this.selectedPayment.set(data);
        this.paymentDetailsLoading.set(false);
      }),
      catchError(err => {
        console.error('Payment Details API Error:', err);
        this.paymentDetailsError.set(err.status === 401 ? 'Unauthorized' : (err.error?.message || 'Failed to load payment details.'));
        this.paymentDetailsLoading.set(false);
        return throwError(() => err);
      })
    ).subscribe();
  }

  clearSelectedPayment() {
    this.selectedPayment.set(null);
    this.paymentDetailsError.set(null);
  }
}

