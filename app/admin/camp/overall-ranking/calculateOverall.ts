type Team = {
    id: number;
    name: string;
    color: string;
    icon: string;
    members: number[];
  };
  
  type RecreationScore = {
    id: number;
    gameId: number;
    gameName: string;
    scoreType: string;
    scores: {
      teamId: number;
      point: number;
    }[];
  };
  
  export type OverallScore = {
    teamId: number;
    name: string;
    color: string;
    icon: string;
    freaksCupPoint: number;
    recreationPoint: number;
    totalPoint: number;
  };
  
  export function calculateOverallScores(
    teams: Team[],
    recreationScores: RecreationScore[]
  ): OverallScore[] {
    const overallScores: OverallScore[] = teams.map((team) => {
      const recreationPoint = recreationScores.reduce((sum, game) => {
        const teamScore = game.scores.find((score) => score.teamId === team.id);
        return sum + (teamScore?.point || 0);
      }, 0);
  
      return {
        teamId: team.id,
        name: team.name,
        color: team.color,
        icon: team.icon,
        freaksCupPoint: 0,
        recreationPoint,
        totalPoint: recreationPoint,
      };
    });
  
    return overallScores.sort((a, b) => b.totalPoint - a.totalPoint);
  }

  