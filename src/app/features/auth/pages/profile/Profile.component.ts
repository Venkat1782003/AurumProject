import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DropdownOption } from '../../../../core/models/category.interfaces';
import { ROLE_LABELS, SUB1_BY_ROLE, SUB2_BY_SUB1, SUB3_OPTIONS, PROJECT_TYPE_LABELS } from '../../../../core/constants/category.constants';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './Profile.component.html',
  styleUrl: './Profile.component.scss'
})
export class ProfileComponent implements OnInit {
  profile = {
    name: '',
    company: '',
    role: '',
    phone: ''
  };

  selectedRole = '';
  roleLabel = '';
  categoryOptions: DropdownOption[] = [];
  selectedSub1: string[] = [];
  activeSub1: string | null = null;
  activeSub2: string | null = null;
  uiStage: 'sub1' | 'sub2' | 'sub3' = 'sub1';
  categorySelections: Record<string, { sub2: string[]; sub3: Record<string, string[]>; photos?: Record<string, Record<string, string[]>> }> = {};
  sub3Options = SUB3_OPTIONS;

  saving = false;
  error = '';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    const storedProfile = localStorage.getItem('profile');
    const storedDraft = localStorage.getItem('signupDraft');
    const storedCareer = localStorage.getItem('profileCareer');

    if (storedProfile) {
      const profileData = JSON.parse(storedProfile);
      this.profile = {
        name: profileData.name || '',
        company: profileData.company || '',
        role: profileData.role || '',
        phone: profileData.phone || ''
      };
      this.selectedRole = profileData.role || this.selectedRole;
    }

    if (storedDraft) {
      const draft = JSON.parse(storedDraft);
      this.selectedRole = draft.role || this.selectedRole;
      this.profile.name = this.profile.name || draft.fullName || '';
    }

    if (storedCareer) {
      const careerData = JSON.parse(storedCareer);
      this.selectedRole = careerData.role || this.selectedRole;
      this.selectedSub1 = careerData.selectedSub1 || [];
      this.categorySelections = careerData.categorySelections || {};
      this.activeSub1 = careerData.activeSub1 || this.selectedSub1[0] || null;
      this.activeSub2 = careerData.activeSub2 || null;
    }

    // Ensure a sensible default while backend isn't integrated
    if (!this.selectedRole) {
      this.selectedRole = 'CONSULTANTS';
    }
    this.loadCategoryOptions();
    if (!this.activeSub1 && this.selectedSub1.length) {
      this.activeSub1 = this.selectedSub1[0];
    }
    // determine ui stage from existing selections
    if (this.activeSub2) {
      this.uiStage = 'sub3';
    } else if (this.activeSub1) {
      this.uiStage = 'sub2';
    } else {
      this.uiStage = 'sub1';
    }

    if (!this.profile.role && this.roleLabel) {
      this.profile.role = this.roleLabel;
    }
  }

  private loadCategoryOptions(): void {
    if (this.selectedRole && SUB1_BY_ROLE[this.selectedRole]) {
      this.categoryOptions = SUB1_BY_ROLE[this.selectedRole];
      this.roleLabel = ROLE_LABELS[this.selectedRole] || this.selectedRole;
    } else {
      this.categoryOptions = [];
      this.roleLabel = '';
    }
  }

  get availableSub1Options(): DropdownOption[] {
    return this.categoryOptions;
  }

  get availableSub2Options(): DropdownOption[] {
    return this.activeSub2Options.filter(option => !this.selectedSub2ForActive.includes(option.value));
  }

  get allSub2Options(): DropdownOption[] {
    return this.activeSub2Options;
  }

  goBackToSub1(): void {
    this.activeSub1 = null;
    this.activeSub2 = null;
    this.uiStage = 'sub1';
  }

  goBackToSub2(): void {
    this.activeSub2 = null;
    this.uiStage = 'sub2';
  }

  get activeSub2Options(): DropdownOption[] {
    if (!this.activeSub1) return [];
    return SUB2_BY_SUB1[this.activeSub1] || [];
  }

  get selectedSub2ForActive(): string[] {
    if (!this.activeSub1) return [];
    return this.categorySelections[this.activeSub1]?.sub2 || [];
  }

  get selectedSub3ForActive(): string[] {
    if (!this.activeSub1 || !this.activeSub2) return [];
    const current = this.categorySelections[this.activeSub1];
    return current?.sub3?.[this.activeSub2] || [];
  }

  get breadcrumbs(): string {
    if (!this.selectedRole) {
      return '';
    }

    const parts = [this.roleLabel];
    if (this.activeSub1) {
      parts.push(this.getSub1Label(this.activeSub1));
    }
    if (this.activeSub2) {
      parts.push(this.getSub2Label(this.activeSub2));
    }
    return parts.join(' › ');
  }

  selectSub1(sub1: string): void {
    if (!this.selectedSub1.includes(sub1)) {
      this.selectedSub1.push(sub1);
      if (!this.categorySelections[sub1]) {
        this.categorySelections[sub1] = { sub2: [], sub3: {}, photos: {} };
      }
    }

    this.activeSub1 = sub1;
    this.activeSub2 = null;
    this.uiStage = 'sub2';
    this.persistCareerState();
  }

  openSub1(sub1: string): void {
    this.activeSub1 = sub1;
    this.activeSub2 = this.selectedSub2ForActive[0] || null;
    this.uiStage = 'sub2';
  }

  selectSub2(sub2: string): void {
    if (!this.activeSub1) return;
    const group = this.categorySelections[this.activeSub1];
    if (!group) return;

    if (!group.sub2.includes(sub2)) {
      group.sub2.push(sub2);
      group.sub3[sub2] = group.sub3[sub2] || [];
      group.photos = group.photos || {};
      group.photos[sub2] = group.photos[sub2] || {};
    }

    this.activeSub2 = sub2;
    this.uiStage = 'sub3';
    this.persistCareerState();
  }

  toggleSub3(projectType: string): void {
    if (!this.activeSub1 || !this.activeSub2) return;
    const group = this.categorySelections[this.activeSub1];
    if (!group) return;
    const sub3List = group.sub3[this.activeSub2] || [];
    const idx = sub3List.indexOf(projectType);

    if (idx > -1) {
      sub3List.splice(idx, 1);
    } else {
      sub3List.push(projectType);
    }

    group.sub3[this.activeSub2] = sub3List;
    // ensure photos container exists for this projectType
    group.photos = group.photos || {};
    group.photos[this.activeSub2] = group.photos[this.activeSub2] || {};
    group.photos[this.activeSub2][projectType] = group.photos[this.activeSub2][projectType] || [];
    this.persistCareerState();
  }

  handleFileInput(event: Event, projectType: string): void {
    const input = event.target as HTMLInputElement | null;
    const files = input?.files || null;
    this.addPhotos(projectType, files);
  }

  addPhotos(projectType: string, files: FileList | null): void {
    if (!files || !this.activeSub1 || !this.activeSub2) return;
    const group = this.categorySelections[this.activeSub1];
    if (!group) return;

    group.photos = group.photos || {};
    group.photos[this.activeSub2] = group.photos[this.activeSub2] || {};
    const targetArr = group.photos[this.activeSub2][projectType] || [];

    const maxAllowed = 6;
    const toRead = Array.from(files).slice(0, Math.max(0, maxAllowed - targetArr.length));

    const readers = toRead.map((file) => new Promise<string | null>((resolve) => {
      const reader = new FileReader();
      reader.onload = (ev: ProgressEvent<FileReader>) => {
        const result = ev.target?.result as string;
        resolve(result || null);
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    }));

    Promise.all(readers).then(results => {
      results.forEach(r => { if (r) targetArr.push(r); });
      group.photos![this.activeSub2!][projectType] = targetArr.slice(0, maxAllowed);
      this.persistCareerState();
      // After upload flow, return to sub2 list and show tiny Designer (activeSub1)
      this.activeSub2 = null;
      this.uiStage = 'sub2';
    });
  }

  getPhotos(projectType: string): string[] {
    if (!this.activeSub1 || !this.activeSub2) return [];
    const group = this.categorySelections[this.activeSub1];
    return (group?.photos?.[this.activeSub2]?.[projectType]) || [];
  }

  removePhoto(projectType: string, index: number): void {
    if (!this.activeSub1 || !this.activeSub2) return;
    const group = this.categorySelections[this.activeSub1];
    if (!group?.photos?.[this.activeSub2]?.[projectType]) return;
    group.photos[this.activeSub2][projectType].splice(index, 1);
    this.persistCareerState();
  }

  isSub3Selected(projectType: string): boolean {
    return this.selectedSub3ForActive.includes(projectType);
  }

  getSub1Label(value: string): string {
    return this.categoryOptions.find(option => option.value === value)?.label || value;
  }

  getSub2Label(value: string): string {
    const option = Object.values(SUB2_BY_SUB1).flat().find(item => item.value === value);
    return option?.label || value;
  }

  getProjectTypeLabel(value: string): string {
    return PROJECT_TYPE_LABELS[value] || value;
  }

  getSub3Icon(value: string): string {
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

  private persistCareerState(): void {
    const careerData = {
      role: this.selectedRole,
      selectedSub1: this.selectedSub1,
      categorySelections: this.categorySelections,
      activeSub1: this.activeSub1,
      activeSub2: this.activeSub2
    };
    localStorage.setItem('profileCareer', JSON.stringify(careerData));
  }

  saveProfile(): void {
    this.saving = true;
    this.error = '';
    this.profile.role = this.roleLabel || this.selectedRole;

    localStorage.setItem('profile', JSON.stringify(this.profile));
    this.persistCareerState();

    this.saving = false;
    this.router.navigate(['/home']);
  }

  skipForNow(): void {
    this.router.navigate(['/home']);
  }
}
