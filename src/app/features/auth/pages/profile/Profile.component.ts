import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  profile = {
    name: '',
    company: '',
    role: '',
    phone: ''
  };

  saving = false;
  error = '';

  constructor(private router: Router, private http: HttpClient) {}

  saveProfile() {
    this.saving = true;
    this.error = '';

    // TODO: replace with your actual backend endpoint once available
    // e.g. this.http.post('https://aurum-development-production.up.railway.app/api/profile', this.profile)
    localStorage.setItem('profile', JSON.stringify(this.profile));
    this.saving = false;
    this.router.navigate(['/home']);
  }

  skipForNow() {
    this.router.navigate(['/home']);
  }
}