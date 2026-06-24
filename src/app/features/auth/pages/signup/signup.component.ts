import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service'; 
//import { FindLabelPipe } from '../../../../shared/pipes/find-label.pipe';
import {
  Role
} from '../../../../core/models/category.enums';
/*import {
  DropdownOption,
  SubCategory1Selection
} from '../../../../core/models/category.interfaces';*/
import {
  ROLE_LABELS,
 //SUB1_BY_ROLE,
 // SUB2_BY_SUB1,
  //SUB3_OPTIONS
} from '../../../../core/constants/category.constants';
import {
  COUNTRY_CODES
} from '../../../../shared/constants/country.constants';

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirm = control.get('confirmPassword');
  if (password && confirm && password.value !== confirm.value) {
    return { passwordMismatch: true };
  }
  return null;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    //FindLabelPipe
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  isLoading = false;
  errorMsg = '';
  showPwd = false;
  showConfirmPwd = false;
 
  // Dropdown open states
  openDropdown: string | null = null;
 
  // Data
  roles = Object.values(Role);
  roleLabels = ROLE_LABELS;
  countryCodes = COUNTRY_CODES;
  selectedCountryCode = COUNTRY_CODES[0]; // India default
  countryDropdownOpen = false;
  units = ['Thousand', 'Lakh', 'Crore'];
 
  //sub1Options: DropdownOption[] = [];
 // sub3Options: DropdownOption[] = SUB3_OPTIONS;

  //selectedSub1: string[] = [];

  //categoryHierarchy: SubCategory1Selection[] = [];
 
  get role(): string { return this.form?.get('role')?.value || ''; }
  get isProfessional(): boolean { return this.role !== 'CUSTOMER' && this.role !== ''; }
  
 
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private elRef: ElementRef,
    private authService: AuthService
  ) {}
 
  ngOnInit(): void {
    this.form = this.fb.group({
      fullName:          ['', [Validators.required, Validators.minLength(2)]],
      email:             ['', [Validators.required, Validators.email]],
      phoneNumber:       ['', [Validators.required, Validators.pattern(/^\d{7,15}$/)]],
      password:          ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword:   ['', Validators.required],
      role:              ['', Validators.required],
      yearsOfExperience: [null],
      //categoryHierarchy: [[]],
      projectSize:       [null],
      projectSizeUnit:   ['Crore'],
    }, { validators: passwordMatchValidator });
 
    /*this.form.get('role')?.valueChanges.subscribe(val => {
      this.onRoleChange(val);
    });*/
  }
 
  /*onRoleChange(role: string): void {
    //this.sub1Options = SUB1_BY_ROLE[role] || [];
    //this.selectedSub1 = [];
   // this.categoryHierarchy = [];

    this.form.patchValue({
      categoryHierarchy: []
    });
    this.updateProfessionalValidators(role);
  }*/
 
  updateProfessionalValidators(role: string): void {
    const yoe = this.form.get('yearsOfExperience');
    //const hierarchy = this.form.get('categoryHierarchy');
    const ps  = this.form.get('projectSize');
 
    if (role && role !== 'CUSTOMER') {
      yoe?.setValidators([Validators.required, Validators.min(0), Validators.max(999)]);
      //hierarchy?.setValidators(Validators.required);
      ps?.setValidators([Validators.required, Validators.min(0)]);
    } else {
      [yoe, ps].forEach(c => c?.clearValidators());
    }
    [yoe, ps].forEach(c => c?.updateValueAndValidity());
  }
 /*toggleSub1(sub1: string): void {

  const idx = this.selectedSub1.indexOf(sub1);

  if (idx > -1) {

    this.selectedSub1.splice(idx, 1);

    this.categoryHierarchy =
      this.categoryHierarchy.filter(
        x => x.subCategory1 !== sub1
      );

  } else {

    this.selectedSub1.push(sub1);

    this.categoryHierarchy.push({
      subCategory1: sub1,
      subCategory2Selections: []
    });

  }

  this.syncHierarchy();
}
getSub2Options(sub1: string): DropdownOption[] {
  return SUB2_BY_SUB1[sub1] || [];
}

toggleSub2(sub1: string, sub2: string): void {

  const group =
    this.categoryHierarchy.find(
      x => x.subCategory1 === sub1
    );

  if (!group) return;

  const existing =
    group.subCategory2Selections.find(
      x => x.subCategory2 === sub2
    );

  if (existing) {

    group.subCategory2Selections =
      group.subCategory2Selections.filter(
        x => x.subCategory2 !== sub2
      );

  } else {

    group.subCategory2Selections.push({
      subCategory2: sub2,
      projectTypes: []
    });

  }

  this.syncHierarchy();
}

toggleProjectType(
  sub1: string,
  sub2: string,
  projectType: string
): void {

  const group =
    this.categoryHierarchy.find(
      x => x.subCategory1 === sub1
    );

  if (!group) return;

  const sub2Group =
    group.subCategory2Selections.find(
      x => x.subCategory2 === sub2
    );

  if (!sub2Group) return;

  const idx =
    sub2Group.projectTypes.indexOf(projectType);

  if (idx > -1) {

    sub2Group.projectTypes.splice(idx, 1);

  } else {

    sub2Group.projectTypes.push(projectType);

  }

  this.syncHierarchy();
}

isSub1Selected(sub1: string): boolean {
  return this.selectedSub1.includes(sub1);
}

isSub2Selected(
  sub1: string,
  sub2: string
): boolean {

  const group =
    this.categoryHierarchy.find(
      x => x.subCategory1 === sub1
    );

  return !!group?.subCategory2Selections.some(
    x => x.subCategory2 === sub2
  );
}

isProjectTypeSelected(
  sub1: string,
  sub2: string,
  projectType: string
): boolean {

  const group =
    this.categoryHierarchy.find(
      x => x.subCategory1 === sub1
    );

  const sub2Group =
    group?.subCategory2Selections.find(
      x => x.subCategory2 === sub2
    );

  return !!sub2Group?.projectTypes.includes(
    projectType
  );
}

private syncHierarchy(): void {

  this.form.patchValue({
    categoryHierarchy:
      this.categoryHierarchy
  });

}*/
 
  // ── Dropdown toggle ────────────────────────────────────────────────────────
 
  toggleDropdown(name: string, event: Event): void {
    event.stopPropagation();
    this.openDropdown = this.openDropdown === name ? null : name;
    this.countryDropdownOpen = false;
  }
 
  toggleCountryDropdown(event: Event): void {
    event.stopPropagation();
    this.countryDropdownOpen = !this.countryDropdownOpen;
    //this.openDropdown = null;
  }
 
  selectCountry(c: typeof COUNTRY_CODES[0]): void {
    this.selectedCountryCode = c;
    this.countryDropdownOpen = false;
  }
 
  @HostListener('document:click')
  closeAll(): void {
    //this.openDropdown = null;
    this.countryDropdownOpen = false;
  }
 
  // ── Form helpers ───────────────────────────────────────────────────────────
 
  err(field: string, error: string): boolean {
    const c = this.form.get(field);
    return !!(c?.hasError(error) && c?.touched);
  }
 
  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.isLoading = true;
    this.errorMsg = '';
 
    const { confirmPassword, ...payload } = this.form.value;
    payload.phoneNumber = `${this.selectedCountryCode.code}${payload.phoneNumber}`;
    console.log('Payload:', JSON.stringify(payload, null, 2));

    const signupDraft = {
      role: payload.role,
      fullName: payload.fullName,
      email: payload.email
    };
    localStorage.setItem('signupDraft', JSON.stringify(signupDraft));

    // TODO: call this.authService.signUp(payload)
    this.authService.signUp(payload)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.router.navigate(['/auth/profile']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMsg =
            error.error?.message ??
            'Signup failed';
        }
      });
  }

}