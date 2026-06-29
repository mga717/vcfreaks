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
  
  export type MatchResult = {
    matchId: string;
    scoreA: number;
    scoreB: number;
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

