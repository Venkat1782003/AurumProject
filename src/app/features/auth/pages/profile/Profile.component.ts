import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DropdownOption } from '../../../../core/models/category.interfaces';
import {
  ROLE_LABELS, SUB1_BY_ROLE, SUB2_BY_SUB1, SUB3_OPTIONS,
  PROJECT_TYPE_LABELS, ROLE_OPTIONS
} from '../../../../core/constants/category.constants';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './Profile.component.html',
  styleUrl: './Profile.component.scss'
})
export class ProfileComponent implements OnInit {
  profile = { name: '', company: '', role: '', phone: '' };

  selectedRole = '';
  roleOptions: DropdownOption[] = ROLE_OPTIONS;
  sub3Options: DropdownOption[] = SUB3_OPTIONS;

  // Which Sub1 values the user has clicked (ordered, for display)
  selectedSub1: string[] = [];

  // Currently "active" Sub1 and Sub2 — determines which Sub3 grid is shown
  activeSub1: string | null = null;
  activeSub2: string | null = null;

  // Nested selections: sub1 → sub2[] → sub3[]
  // selections[sub1][sub2] = string[] of selected sub3 values
  selections: Record<string, Record<string, string[]>> = {};

  // Photos: photos[sub1][sub2][sub3] = base64 string[]
  photos: Record<string, Record<string, Record<string, string[]>>> = {};

  saving = false;
  error = '';
  userId: string | null = null;

  private apiBase = 'https://aurum-development-production.up.railway.app/api';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');

    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      const p = JSON.parse(storedProfile);
      this.profile = { name: p.name || '', company: p.company || '', role: p.role || '', phone: p.phone || '' };
      this.selectedRole = p.role || '';
    }

    const storedDraft = localStorage.getItem('signupDraft');
    if (storedDraft) {
      const d = JSON.parse(storedDraft);
      if (!this.selectedRole) this.selectedRole = d.role || '';
      if (!this.profile.name) this.profile.name = d.fullName || '';
    }

    const storedCareer = localStorage.getItem('profileCareer');
    if (storedCareer) {
      const c = JSON.parse(storedCareer);
      this.selectedSub1 = c.selectedSub1 || [];
      this.selections = c.selections || {};
      this.photos = c.photos || {};
      this.activeSub1 = c.activeSub1 || null;
      this.activeSub2 = c.activeSub2 || null;
    }

    if (!this.selectedRole) this.selectedRole = '';
  }

  // ── Role ───────────────────────────────────────────────────────────────────

  changeRole(role: string): void {
    this.selectedRole = role;
    this.selectedSub1 = [];
    this.selections = {};
    this.photos = {};
    this.activeSub1 = null;
    this.activeSub2 = null;
    this.persist();
  }

  get availableSub1Options(): DropdownOption[] {
    return SUB1_BY_ROLE[this.selectedRole] || [];
  }

  // ── Sub1 ───────────────────────────────────────────────────────────────────

  selectSub1(sub1: string): void {
    if (!this.selectedSub1.includes(sub1)) {
      this.selectedSub1.push(sub1);
      this.selections[sub1] = this.selections[sub1] || {};
      this.photos[sub1] = this.photos[sub1] || {};
    }
    this.activeSub1 = sub1;
    // when switching Sub1, clear activeSub2 so user picks Sub2 fresh for this Sub1
    this.activeSub2 = null;
    this.persist();
  }

  getSub2Options(sub1: string): DropdownOption[] {
    return SUB2_BY_SUB1[sub1] || [];
  }

  getSub1Label(sub1: string): string {
    return this.availableSub1Options.find(o => o.value === sub1)?.label
      || Object.values(SUB1_BY_ROLE).flat().find(o => o.value === sub1)?.label
      || sub1;
  }

  // ── Sub2 ───────────────────────────────────────────────────────────────────

  selectSub2(sub1: string, sub2: string): void {
    if (!this.selections[sub1]) this.selections[sub1] = {};
    if (!this.selections[sub1][sub2]) this.selections[sub1][sub2] = [];
    if (!this.photos[sub1]) this.photos[sub1] = {};
    if (!this.photos[sub1][sub2]) this.photos[sub1][sub2] = {};

    this.activeSub1 = sub1;
    // toggle: if user taps the already-active Sub2, collapse Sub3 grid; else expand new one
    this.activeSub2 = this.activeSub2 === sub2 && this.activeSub1 === sub1 ? null : sub2;
    this.persist();
  }

  isSub2Selected(sub1: string, sub2: string): boolean {
    return !!(this.selections[sub1]?.[sub2]);
  }

  getSelectedSub2s(sub1: string): string[] {
    return Object.keys(this.selections[sub1] || {});
  }

  getSub2Label(sub2: string): string {
    return Object.values(SUB2_BY_SUB1).flat().find(o => o.value === sub2)?.label || sub2;
  }

  // ── Sub3 ───────────────────────────────────────────────────────────────────

  toggleSub3(sub1: string, sub2: string, sub3: string): void {
    if (!this.selections[sub1]) this.selections[sub1] = {};
    if (!this.selections[sub1][sub2]) this.selections[sub1][sub2] = [];

    const arr = this.selections[sub1][sub2];
    const idx = arr.indexOf(sub3);
    if (idx > -1) {
      arr.splice(idx, 1);
    } else {
      arr.push(sub3);
    }
    this.persist();
  }

  isSub3Selected(sub1: string, sub2: string, sub3: string): boolean {
    return this.selections[sub1]?.[sub2]?.includes(sub3) || false;
  }

  getSelectedSub3s(sub1: string, sub2: string): string[] {
    return this.selections[sub1]?.[sub2] || [];
  }

  getProjectTypeLabel(value: string): string {
    return PROJECT_TYPE_LABELS[value] || value;
  }

  getSub3Icon(value: string): string {
    const map: Record<string, string> = {
      RESIDENTIAL: '🏠', COMMERCIAL: '🏢', HEALTHCARE: '🏥',
      HOSPITALITY: '🏨', EDUCATIONAL: '🏫', INDUSTRIAL: '🏭',
      INFRASTRUCTURE: '🛣️', INSTITUTIONAL: '🏛️', CULTURAL: '🎭',
      WAREHOUSING: '🏬', MIXED_USE: '🏗️', TRANSPORTATION: '🚆',
      GOVERNMENT: '🏛', RECREATIONAL: '🎡', IT_CENTRES: '💻'
    };
    return map[value] || '🏗️';
  }

  // ── Photos ─────────────────────────────────────────────────────────────────

  handleFileInput(event: Event, sub1: string, sub2: string, sub3: string): void {
    const input = event.target as HTMLInputElement;
    const files = input?.files;
    if (!files) return;

    if (!this.photos[sub1]) this.photos[sub1] = {};
    if (!this.photos[sub1][sub2]) this.photos[sub1][sub2] = {};
    if (!this.photos[sub1][sub2][sub3]) this.photos[sub1][sub2][sub3] = [];

    const existing = this.photos[sub1][sub2][sub3];
    const slots = Math.max(0, 3 - existing.length);
    const toRead = Array.from(files).slice(0, slots);

    toRead.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        existing.push(e.target?.result as string);
        this.persist();
      };
      reader.readAsDataURL(file);
    });
    input.value = '';
  }

  getPhotos(sub1: string, sub2: string, sub3: string): string[] {
    return this.photos[sub1]?.[sub2]?.[sub3] || [];
  }

  removePhoto(sub1: string, sub2: string, sub3: string, index: number): void {
    this.photos[sub1]?.[sub2]?.[sub3]?.splice(index, 1);
    this.persist();
  }

  // ── Persistence ────────────────────────────────────────────────────────────

  private persist(): void {
    localStorage.setItem('profileCareer', JSON.stringify({
      selectedSub1: this.selectedSub1,
      selections: this.selections,
      photos: this.photos,
      activeSub1: this.activeSub1,
      activeSub2: this.activeSub2
    }));
  }

  // ── Save ───────────────────────────────────────────────────────────────────

  saveProfile(): void {
    this.saving = true;
    this.error = '';
    this.profile.role = ROLE_LABELS[this.selectedRole] || this.selectedRole;
    localStorage.setItem('profile', JSON.stringify(this.profile));
    this.persist();

    if (this.userId) {
      const payload = { yearsOfExperience: null, projectSize: null, projectSizeUnit: null };
      this.http.put(`${this.apiBase}/profile/${this.userId}`, payload).subscribe({
        next: () => { this.saving = false; this.router.navigate(['/home']); },
        error: () => { this.saving = false; this.router.navigate(['/home']); }
      });
    } else {
      this.saving = false;
      this.router.navigate(['/home']);
    }
  }

  skipForNow(): void {
    this.router.navigate(['/home']);
  }
}