import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Agent {
  uuid: string;
  displayName: string;
  description: string;
  displayIcon: string;
  fullPortrait: string;
  background: string;
  backgroundGradientColors: string[];
  role: {
    displayName: string;
    displayIcon: string;
  };
  abilities: Array<{
    displayName: string;
    description: string;
    displayIcon: string;
  }>;
  isPlayableCharacter?: boolean;
  developerName: string;
}

export interface Weapon {
  uuid: string;
  displayName: string;
  displayIcon: string;
  shopData: {
    cost: number;
    category: string;
  };
  skins: Array<{
    displayName: string;
    displayIcon: string;
  }>;
}

export interface Map {
  uuid: string;
  displayName: string;
  coordinates: string;
  displayIcon: string;
  splash: string;
}

export interface CompetitiveTier {
  uuid: string;
  tierName: string;
  divisionName: string;
  color: string;
  backgroundColor: string;
  smallIcon: string;
  largeIcon: string;
  rankTriangleDownIcon: string;
  rankTriangleUpIcon: string;
}

export interface CompetitiveTiers {
  uuid: string;
  assetObjectName: string;
  tiers: CompetitiveTier[];
}

@Injectable({
  providedIn: 'root'
})
export class ValorantApiService {
  private baseUrl = 'https://valorant-api.com/v1';

  constructor(private http: HttpClient) { }

  // Agents
  getAgents(): Observable<{ data: Agent[] }> {
    return this.http.get<{ data: Agent[] }>(`${this.baseUrl}/agents`);
  }

  getAgentByUuid(uuid: string): Observable<{ data: Agent }> {
    return this.http.get<{ data: Agent }>(`${this.baseUrl}/agents/${uuid}`);
  }

  // Weapons
  getWeapons(): Observable<{ data: Weapon[] }> {
    return this.http.get<{ data: Weapon[] }>(`${this.baseUrl}/weapons`);
  }

  getWeaponByUuid(uuid: string): Observable<{ data: Weapon }> {
    return this.http.get<{ data: Weapon }>(`${this.baseUrl}/weapons/${uuid}`);
  }

  // Maps
  getMaps(): Observable<{ data: Map[] }> {
    return this.http.get<{ data: Map[] }>(`${this.baseUrl}/maps`);
  }

  getMapByUuid(uuid: string): Observable<{ data: Map }> {
    return this.http.get<{ data: Map }>(`${this.baseUrl}/maps/${uuid}`);
  }

  // Competitive Tiers
  getCompetitiveTiers(): Observable<{ data: CompetitiveTiers[] }> {
    return this.http.get<{ data: CompetitiveTiers[] }>(`${this.baseUrl}/competitivetiers`);
  }

  getCompetitiveTierByUuid(uuid: string): Observable<{ data: CompetitiveTiers }> {
    return this.http.get<{ data: CompetitiveTiers }>(`${this.baseUrl}/competitivetiers/${uuid}`);
  }
}