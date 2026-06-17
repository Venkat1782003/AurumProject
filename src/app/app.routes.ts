import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/signin',
    pathMatch: 'full'
  },
  {
    path: 'auth/signup',
    loadComponent: () =>
      import('./features/auth/pages/signup/signup.component')
        .then(m => m.SignupComponent)
  },
  {
    path: 'auth/signin',
    loadComponent: () =>
      import('./features/auth/pages/signin/signin.component')
        .then(m => m.SigninComponent)
  },
  {
  path: 'auth/google-success',
  loadComponent: () =>
    import('./features/auth/pages/google-success/google-success.component')
      .then(m => m.GoogleSuccessComponent)
 },
  {
  path: 'auth/dashboard',
  loadComponent: () =>
    import('./features/dashboard/pages/dashboard/dashboard.component')
      .then(m => m.DashboardComponent)
},
  {
    path: 'auth/profile',
    loadComponent: () =>
      import('./features/profile/profile.component')
        .then(m => m.ProfileComponent)
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component')
        .then(m => m.HomeComponent)
  }
];