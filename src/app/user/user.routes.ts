import { LoginComponent } from './login.component';
import { ProfileComponent } from './profile.component';

export const userRoutes = [
  { path: 'profile', component: ProfileComponent}, // route wil be user/profile,
  { path: 'login', component: LoginComponent}
];
