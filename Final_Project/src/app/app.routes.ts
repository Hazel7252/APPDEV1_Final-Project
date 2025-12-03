import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./components/home/home').then(m => m.HomeComponent)
  },
  { 
    path: 'home', 
    loadComponent: () => import('./components/home/home').then(m => m.HomeComponent)
  },
  { 
    path: 'agents', 
    loadComponent: () => import('./components/agents/agents').then(m => m.AgentsComponent)
  },
  { 
    path: 'weapons', 
    loadComponent: () => import('./components/weapons/weapons').then(m => m.WeaponsComponent)
  },
  { 
    path: 'competitive-tiers', 
    loadComponent: () => import('./components/competitive-tiers/competitive-tiers').then(m => m.CompetitiveTiersComponent)
  },
  { 
    path: 'maps', 
    loadComponent: () => import('./components/maps/maps').then(m => m.MapsComponent)
  },
  { 
    path: 'about', 
    loadComponent: () => import('./components/about/about').then(m => m.AboutComponent)
  },
  { 
    path: 'sign-in', 
    loadComponent: () => import('./components/sign-in/sign-in').then(m => m.SignInComponent)
  },
  { path: '**', redirectTo: '' }
];