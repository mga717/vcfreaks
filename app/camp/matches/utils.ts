import { Match, MatchSettings, Round, Team } from "./types";

export function createRounds(
  teamList: Team[],
  courtCount: number
): Round[] {
  const allMatches: Match[] = [];

  for (let i = 0; i < teamList.length; i++) {
    for (let j = i + 1; j < teamList.length; j++) {
      allMatches.push({
        id: `${teamList[i].id}-${teamList[j].id}`,
        roundNumber: 0,
        courtNumber: 0,
        teamAId: teamList[i].id,
        teamBId: teamList[j].id,
      });
    }
  }

  const remainingMatches = [...allMatches];
  const rounds: Round[] = [];

  let roundNumber = 1;

  while (remainingMatches.length > 0) {
    const usedTeamIds: number[] = [];
    const matches: Match[] = [];

    let court = 1;

    for (let i = 0; i < remainingMatches.length; i++) {
      const match = remainingMatches[i];

      if (
        !usedTeamIds.includes(match.teamAId) &&
        !usedTeamIds.includes(match.teamBId) &&
        court <= courtCount
      ) {
        matches.push({
          ...match,
          roundNumber,
          courtNumber: court,
        });

        usedTeamIds.push(match.teamAId);
        usedTeamIds.push(match.teamBId);

        remainingMatches.splice(i, 1);
        i--;
        court++;
      }
    }

    rounds.push({
      roundNumber,
      matches,
    });

    roundNumber++;
  }

  return rounds;
}

export function getRoundTime(
  roundIndex: number,
  settings: MatchSettings
) {
  const [hour, minute] = settings.startTime
    .split(":")
    .map(Number);

  const start = new Date();

  start.setHours(hour);
  start.setMinutes(
    minute +
      roundIndex *
        (settings.matchMinutes + settings.breakMinutes)
  );

  const end = new Date(start);

  end.setMinutes(
    end.getMinutes() + settings.matchMinutes
  );

  const format = (date: Date) =>
    date.toTimeString().slice(0, 5);

  return `${format(start)}〜${format(end)}`;
}
