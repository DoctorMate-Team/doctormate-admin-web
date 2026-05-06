import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css',
})
export class UserDashboard implements OnInit {
  public userService = inject(UserService);
  
  // Client side filtering state
  searchQuery = signal<string>('');
  
  // Computed signal for filtered results
  filteredUsers = computed(() => {
    const term = this.searchQuery().toLowerCase();
    const data = this.userService.usersData();
    if (!data || !data.content) return [];
    
    return data.content.filter(u => 
      (u.firstName?.toLowerCase() || '').includes(term) ||
      (u.lastName?.toLowerCase() || '').includes(term) ||
      (u.email?.toLowerCase() || '').includes(term) ||
      (u.id?.toLowerCase() || '').includes(term)
    );
  });

  // Modal State
  isModalOpen = signal(false);

  ngOnInit() {
    this.loadPage(1);
  }

  loadPage(page: number) {
    this.userService.fetchUsers(page);
  }

  updateSearchQuery(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  viewDetails(id: string) {
    this.userService.fetchUserById(id);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.userService.clearSelectedUser();
  }

  nextPage() {
    const data = this.userService.usersData();
    if (data && !data.last) {
      this.loadPage(data.number + 1);
    }
  }

  prevPage() {
    const data = this.userService.usersData();
    if (data && !data.first) {
      this.loadPage(data.number - 1);
    }
  }
}

