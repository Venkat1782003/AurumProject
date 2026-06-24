import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { SUB3_OPTIONS } from '../../../../core/constants/category.constants';

interface RecentItem {
  id: number;
  name: string;
  type: string;
  viewedAt: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  userName: string = 'User';
  recentItems: RecentItem[] = [];
  sub3Options = SUB3_OPTIONS;
  searchQuery = '';

  modules = [
    { name: 'Projects', locked: true },
    { name: 'Directory', locked: true },
    { name: 'Tenders', locked: true },
    { name: 'Analytics', locked: true },
    { name: 'Messages', locked: true },
    { name: 'Connections', locked: true },
  ];

  constructor(private http: HttpClient, private router: Router, private auth: AuthService) {}

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
    this.router.navigate(['/auth/profile']);
  }

  goToSearch(type?: string) {
    const params = type ? { t: type } : {};
    this.router.navigate(['/search'], { queryParams: params });
  }

  signOut() {
    // clear auth state and local cached profile/recent items
    this.auth.logout();
    localStorage.removeItem('profile');
    localStorage.removeItem('recentItems');
    this.router.navigate(['/auth/signin']);
  }

  getProjectTypeIcon(value: string): string {
    const map: Record<string, string> = {
      RESIDENTIAL: '🏠',
      COMMERCIAL: '🏢',
      HEALTHCARE: '🏥',
      HOSPITALITY: '🏨',
      EDUCATIONAL: '🏫',
      INDUSTRIAL: '🏭',
      INFRASTRUCTURE: '🛣️',
      INSTITUTIONAL: '🏛️',
      CULTURAL: '🎭',
      WAREHOUSING: '🏬',
      MIXED_USE: '🏗️',
      TRANSPORTATION: '🚆',
      GOVERNMENT: '🏛',
      RECREATIONAL: '🎡',
      IT_CENTRES: '💻'
    };
    return map[value] || '🏗️';
  }
}