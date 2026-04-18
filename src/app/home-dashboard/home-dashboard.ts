import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-dashboard.html',
  styleUrl: './home-dashboard.css',
})
export class HomeDashboard {

}
