import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValorantApiService, Agent } from '../../services/valorant-api';

@Component({
  selector: 'app-agents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agents.html',
  styleUrl: './agents.css'
})
export class AgentsComponent implements OnInit {
  agents: Agent[] = [];
  filteredAgents: Agent[] = [];
  loading = true;
  error = '';
  selectedRole: string = 'all';

  // Define available roles
  roles = [
    { id: 'all', name: 'All Agents' },
    { id: 'Duelist', name: 'Duelist' },
    { id: 'Controller', name: 'Controller' },
    { id: 'Initiator', name: 'Initiator'},
    { id: 'Sentinel', name: 'Sentinel'}
  ];

  constructor(private valorantApi: ValorantApiService) { }

  ngOnInit(): void {
    this.loadAgents();
  }

  loadAgents(): void {
    this.valorantApi.getAgents().subscribe({
      next: (response) => {
        // Filter out non-playable characters and duplicates
        this.agents = response.data.filter(agent => 
          this.isPlayableAgent(agent)
        );
        this.filteredAgents = [...this.agents];
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load agents';
        this.loading = false;
        console.error('Error loading agents:', error);
      }
    });
  }

  // Method to check if agent is playable
  private isPlayableAgent(agent: Agent): boolean {
    // Filter out agents that are not playable characters
    if (agent.isPlayableCharacter === false) {
      return false;
    }

    // Filter out duplicates and non-standard agents by developer name
    const excludedAgents = [
      'Sova_C',
      'Hunter_NPE',
      'Base'
    ];

    if (excludedAgents.some(name => agent.developerName?.includes(name))) {
      return false;
    }

    // Make sure the agent has required properties
    return !!(agent.displayName && agent.displayIcon && agent.role);
  }

  // Filter agents by role
  filterByRole(roleId: string): void {
    this.selectedRole = roleId;
    
    if (roleId === 'all') {
      this.filteredAgents = [...this.agents];
    } else {
      this.filteredAgents = this.agents.filter(agent => 
        agent.role?.displayName === roleId
      );
    }
  }

  getRoleDisplayName(role: any): string {
    if (!role || !role.displayName) return 'Controller';
    return role.displayName;
  }

  handleImageError(event: any): void {
    event.target.style.display = 'none';
  }

  // Get role color for styling - handle undefined role names
  getRoleColor(roleName: string | undefined): string {
    if (!roleName) return '#8b978f'; // Default color for undefined roles
    
    switch (roleName) {
      case 'Duelist': return '#ff4655';
      case 'Controller': return '#6b8cff';
      case 'Initiator': return '#ffd166';
      case 'Sentinel': return '#06d6a0';
      default: return '#8b978f';
    }
  }

  // Get the display name of the selected role
  getSelectedRoleName(): string {
    const role = this.roles.find(r => r.id === this.selectedRole);
    return role ? role.name : 'All';
  }
}