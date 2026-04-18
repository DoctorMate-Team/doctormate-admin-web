export interface Payment {
  id: string;
  transactionId: string;
  amount: number;
  currency: string;
  status: 'Completed' | 'Pending' | 'Failed' | 'Refunded';
  paymentMethod: string;
  patientName: string;
  doctorName: string;
  createdAt: string;
}

export interface PaymentSummary {
  totalRevenue: number;
  monthlyRevenue: number;
  pendingAmount: number;
  totalTransactions: number;
  successRate: number;
}
