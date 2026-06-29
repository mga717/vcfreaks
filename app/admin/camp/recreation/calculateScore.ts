import { CampGame, TeamScoreInput } from "./types";

export function calculateScore(game: CampGame, input: TeamScoreInput) {
  if (game.scoreType === "rank") {
    if (input.rank === 1) return game.settings.firstPoint || 0;
    if (input.rank === 2) return game.settings.secondPoint || 0;
    if (input.rank === 3) return game.settings.thirdPoint || 0;
    if (input.rank === 4) return game.settings.fourthPoint || 0;

    return 0;
  }

  if (game.scoreType === "actual") {
    return (input.actualCount || 0) * (game.settings.pointPerCorrect || 0);
  }

  if (game.scoreType === "win") {
    if (input.result === "win") return game.settings.winPoint || 0;
    if (input.result === "draw") return game.settings.drawPoint || 0;
    if (input.result === "lose") return game.settings.losePoint || 0;

    return 0;
  }

  if (game.scoreType === "check") {
    return (input.checkCount || 0) * (game.settings.pointPerCheck || 0);
  }

  if (game.scoreType === "manual") {
    return input.manualPoint || 0;
  }

  return 0;
}
