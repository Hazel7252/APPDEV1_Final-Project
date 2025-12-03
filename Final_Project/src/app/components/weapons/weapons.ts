import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValorantApiService, Weapon } from '../../services/valorant-api';

@Component({
  selector: 'app-weapons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weapons.html',
  styleUrl: './weapons.css'
})
export class WeaponsComponent implements OnInit {
  weapons: Weapon[] = [];
  loading = true;
  error = '';

  constructor(private valorantApi: ValorantApiService) { }

  ngOnInit(): void {
    this.loadWeapons();
  }

  loadWeapons(): void {
    this.valorantApi.getWeapons().subscribe({
      next: (response) => {
        this.weapons = response.data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load weapons';
        this.loading = false;
        console.error('Error loading weapons:', error);
      }
    });
  }

  getWeaponCategory(weapon: Weapon): string {
    return weapon.shopData?.category || 'Sidearm';
  }

  handleImageError(event: any): void {
    event.target.style.display = 'none';
  }
  getCategories(): string[] {
  const categories = this.weapons.map(weapon => this.getWeaponCategory(weapon));
  return [...new Set(categories)].filter(category => category !== 'Sidearm');
}

getWeaponsByCategory(category: string): Weapon[] {
  return this.weapons.filter(weapon => this.getWeaponCategory(weapon) === category);
}
}

