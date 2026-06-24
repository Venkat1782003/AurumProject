import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm!: FormGroup;
  isLoading = false;

  errorMsg = '';

  showPwd = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.signinForm.invalid) {
      this.signinForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMsg = '';

    const payload = this.signinForm.value;

    this.authService.signIn(payload)
      .subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/auth/profile']);
        },
        error: (err) => {
          this.errorMsg =
            err.error?.message ||
            'Invalid email or password.';
          this.isLoading = false;
        }
      });
  }

  onGoogleSignIn(): void {
    this.authService.signInWithGoogle();
  }

  goToSignUp(): void {
    this.router.navigate(['/auth/signup']);
  }

  hasError(field: string, error: string): boolean {
    const ctrl = this.signinForm.get(field);
    return !!(ctrl?.hasError(error) && ctrl?.touched);
  }
}