export type Team = {
    id: number;
    name: string;
    color: string;
    icon: string;
    members: number[];
  };
  
  export type Match = {
    id: string;
    roundNumber: number;
    courtNumber: number;
    teamAId: number;
    teamBId: number;
  };
  
  export type ManualMatch = {
    id: number;
    roundNumber: number;
    courtNumber: number;
    teamAId: number;
    teamBId: number;
  };
  
  export type Round = {
    roundNumber: number;
    matches: Match[];
  };
  
  export type SetScore = {
    teamA: number;
    teamB: number;
  };
  
  export type MatchResult = {
    matchId: string;
    sets: SetScore[];
    finished: boolean;
  };
  
  export type MatchSettings = {
    matchType: string;
    createMode: string;
    courtCount: number;
    startTime: string;
    matchMinutes: number;
    breakMinutes: number;
  };
  
