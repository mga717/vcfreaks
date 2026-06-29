export type Team = {
    id: number;
    name: string;
    color: string;
    icon: string;
    members: number[];
  };
  
  export type ScoreType =
    | "rank"
    | "actual"
    | "win"
    | "check"
    | "manual";
  
  export type CampGame = {
    id: number;
    name: string;
    scoreType: ScoreType;
    settings: {
      firstPoint?: number;
      secondPoint?: number;
      thirdPoint?: number;
      fourthPoint?: number;
  
      winPoint?: number;
      drawPoint?: number;
      losePoint?: number;
  
      pointPerCorrect?: number;
      pointPerCheck?: number;
    };
  };
  
  export type TeamScoreInput = {
    teamId: number;
  
    rank?: number;
    actualCount?: number;
    result?: "win" | "draw" | "lose";
    checkCount?: number;
    manualPoint?: number;
  };
  
  export type RecreationScore = {
    id: number;
    gameId: number;
    gameName: string;
    scoreType: ScoreType;
    scores: {
      teamId: number;
      point: number;
    }[];
  };

  