export interface DashboardOverview {
  totalUsers: number;
  totalDoctors: number;
  totalPatients: number;
  totalAppointments: number;
  totalPayments: number;
  usersGrowth: number;
  doctorsGrowth: number;
  patientsGrowth: number;
  appointmentsGrowth: number;
  paymentsGrowth: number;
}

export interface SystemHealthService {
  name: string;
  status: 'Online' | 'Stable' | 'Ready' | 'Offline' | 'Error';
  uptime: number;
}

export interface SystemHealth {
  services: SystemHealthService[];
  databaseLoad: number;
  memoryUsage: number;
  criticalAlerts: number;
}
