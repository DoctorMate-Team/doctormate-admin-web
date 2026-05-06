import { Component, OnInit, inject, signal, effect } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PaymentService } from '../core/services/payment.service';

@Component({
  selector: 'app-payment-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './payment-dashboard.html',
  styleUrl: './payment-dashboard.css',
})
export class PaymentDashboard implements OnInit {
  public paymentService = inject(PaymentService);
  
  payments: any[] = [];

  // For Modal
  isModalOpen = signal(false);

  constructor() {
    effect(() => {
      this.payments = this.paymentService.paymentsData();
      console.log('Payments Data:', this.payments);
    });
  }

  ngOnInit() {
    this.paymentService.fetchPaymentsSummary();
    this.paymentService.fetchPayments();
  }

  viewDetails(id: string) {
    this.paymentService.fetchPaymentById(id);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.paymentService.clearSelectedPayment();
  }
}

