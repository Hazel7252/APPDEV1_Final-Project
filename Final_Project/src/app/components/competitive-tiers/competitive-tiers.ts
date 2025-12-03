import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValorantApiService, CompetitiveTiers, CompetitiveTier } from '../../services/valorant-api';

interface RankCategory {
  name: string;
  color: string;
  tiers: CompetitiveTier[];
}

interface RankCategories {
  [key: string]: RankCategory;
}

@Component({
  selector: 'app-competitive-tiers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './competitive-tiers.html',
  styleUrl: './competitive-tiers.css'
})
export class CompetitiveTiersComponent implements OnInit {
  competitiveTiers: CompetitiveTier[] = [];
  loading = true;
  error = '';

  // Group tiers by rank categories with proper typing
  rankCategories: RankCategories = {
    iron: { name: 'Iron', color: '#4A4A4A', tiers: [] },
    bronze: { name: 'Bronze', color: '#CD7F32', tiers: [] },
    silver: { name: 'Silver', color: '#C0C0C0', tiers: [] },
    gold: { name: 'Gold', color: '#FFD700', tiers: [] },
    platinum: { name: 'Platinum', color: '#00CED1', tiers: [] },
    diamond: { name: 'Diamond', color: '#B9F2FF', tiers: [] },
    ascendant: { name: 'Ascendant', color: '#1E8C4F', tiers: [] },
    immortal: { name: 'Immortal', color: '#B02626', tiers: [] },
    radiant: { name: 'Radiant', color: '#FFD166', tiers: [] }
  };

  constructor(private valorantApi: ValorantApiService) { }

  ngOnInit(): void {
    this.loadCompetitiveTiers();
  }

  loadCompetitiveTiers(): void {
    this.valorantApi.getCompetitiveTiers().subscribe({
      next: (response) => {
        // Get the latest competitive tier data (usually the last one in the array)
        const latestTiers = response.data[response.data.length - 1];
        this.competitiveTiers = latestTiers.tiers.filter(tier => 
          tier.tierName && tier.tierName !== 'Unused' && tier.tierName !== 'UNRANKED'
        );
        
        this.categorizeTiers();
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load competitive tiers';
        this.loading = false;
        console.error('Error loading competitive tiers:', error);
      }
    });
  }

  categorizeTiers(): void {
    // Reset categories
    for (const key in this.rankCategories) {
      this.rankCategories[key].tiers = [];
    }

    this.competitiveTiers.forEach(tier => {
      const tierName = tier.tierName?.toLowerCase() || '';
      
      if (tierName.includes('iron')) {
        this.rankCategories['iron'].tiers.push(tier);
      } else if (tierName.includes('bronze')) {
        this.rankCategories['bronze'].tiers.push(tier);
      } else if (tierName.includes('silver')) {
        this.rankCategories['silver'].tiers.push(tier);
      } else if (tierName.includes('gold')) {
        this.rankCategories['gold'].tiers.push(tier);
      } else if (tierName.includes('platinum')) {
        this.rankCategories['platinum'].tiers.push(tier);
      } else if (tierName.includes('diamond')) {
        this.rankCategories['diamond'].tiers.push(tier);
      } else if (tierName.includes('ascendant')) {
        this.rankCategories['ascendant'].tiers.push(tier);
      } else if (tierName.includes('immortal')) {
        this.rankCategories['immortal'].tiers.push(tier);
      } else if (tierName.includes('radiant')) {
        this.rankCategories['radiant'].tiers.push(tier);
      }
    });

    // Sort tiers within each category by tier number
    for (const key in this.rankCategories) {
      this.rankCategories[key].tiers.sort((a, b) => {
        const aNum = this.extractTierNumber(a.tierName || '');
        const bNum = this.extractTierNumber(b.tierName || '');
        return aNum - bNum;
      });
    }
  }

  private extractTierNumber(tierName: string): number {
    const match = tierName.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  }

  getRankCategoryKeys(): string[] {
    return Object.keys(this.rankCategories);
  }

  handleImageError(event: any): void {
    event.target.style.display = 'none';
  }
}