import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValorantApiService, Map } from '../../services/valorant-api';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './maps.html',
  styleUrl: './maps.css'
})
export class MapsComponent implements OnInit {
  maps: Map[] = [];
  loading = true;
  error = '';

  constructor(private valorantApi: ValorantApiService) { }

  ngOnInit(): void {
    this.loadMaps();
  }

  loadMaps(): void {
    this.valorantApi.getMaps().subscribe({
      next: (response) => {
        // Filter out non-playable maps
        this.maps = response.data.filter(map => 
          map.displayName !== 'The Range' && 
          map.displayName !== 'Poveglia' &&
          map.splash // Only include maps that have splash art
        );
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load maps';
        this.loading = false;
        console.error('Error loading maps:', error);
      }
    });
  }

  handleImageError(event: any): void {
    event.target.style.display = 'none';
  }
}