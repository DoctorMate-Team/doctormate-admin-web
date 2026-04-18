import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { LogService } from '../core/services/log.service';
import { Log } from '../core/models/log.model';

@Component({
  selector: 'app-logs-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './logs-dashboard.html',
  styleUrl: './logs-dashboard.css',
})
export class LogsDashboard implements OnInit {
  private logService = inject(LogService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  logs = signal<Log[]>([]);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  loading = signal(false);

  totalPages = computed(() => {
    return Math.ceil(this.totalCount() / this.pageSize()) || 1;
  });

  pagesArray = computed(() => {
    const pages = [];
    for (let i = 1; i <= this.totalPages(); i++) {
      pages.push(i);
    }
    return pages;
  });

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const page = params['page'] ? parseInt(params['page'], 10) : 1;
      this.currentPage.set(page);
      this.loadLogs();
    });
  }

  loadLogs() {
    this.loading.set(true);
    this.logService.getLogs(this.currentPage(), this.pageSize()).subscribe({
      next: (res) => {
        if (res && res.data) {
          this.logs.set(res.data.items || []);
          this.totalCount.set(res.data.totalCount || 0);
        }
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages() && page !== this.currentPage()) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: page },
        queryParamsHandling: 'merge',
      });
    }
  }
}
