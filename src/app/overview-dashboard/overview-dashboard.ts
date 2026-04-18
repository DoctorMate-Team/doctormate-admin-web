import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DashboardService } from '../core/services/dashboard.service';

@Component({
  selector: 'app-overview-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './overview-dashboard.html',
  styleUrl: './overview-dashboard.css',
})
export class OverviewDashboard implements OnInit {
  public dashboardService = inject(DashboardService);

  ngOnInit() {
    this.dashboardService.fetchOverview();
    this.dashboardService.fetchSystemHealth();
  }
}
