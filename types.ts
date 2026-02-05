
export type Page = 'Login' | 'PlayerList' | 'Arena' | 'Scout' | 'Profile' | 'CreateMatch' | 'Teams' | 'Matches';

export interface PlayerStats {
  pac: number;
  sho: number;
  pas: number;
  dri: number;
  def: number;
  phy: number;
}

export interface Player {
  id: number;
  name: string;
  position: string;
  level?: 'Pro' | 'Elite';
  team: string;
  jerseyNumber?: number;
  isConfirmed: boolean;
  avatarUrl: string;
  goals: number;
  rank: number;
  stats: PlayerStats;
  rating: number;
}
