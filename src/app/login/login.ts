import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = 'Admin@example.com';
  password = '';

  onSubmit() {
    console.log('Login attempt:', { email: this.email, password: this.password });
    // Add login logic here
  }
}
