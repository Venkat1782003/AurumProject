import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface RecentItem {
  id: number;
  name: string;
  type: string;
  viewedAt: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  userName: string = 'User';
  recentItems: RecentItem[] = [];

  modules = [
    { name: 'Projects', locked: true },
    { name: 'Directory', locked: true },
    { name: 'Tenders', locked: true },
    { name: 'Analytics', locked: true },
    { name: 'Messages', locked: true },
    { name: 'Connections', locked: true },
  ];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      this.userName = profile.name || 'User';
    }

    // TODO: replace with real backend endpoint, e.g. GET /api/projects/recent
    const cached = localStorage.getItem('recentItems');
    this.recentItems = cached ? JSON.parse(cached) : [];
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
}