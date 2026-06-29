import MatchCard from "./MatchCard";
import { Match, MatchResult, Team } from "./types";

type RoundCardProps = {
  roundNumber: number;
  time: string;
  matches: Match[];
  teams: Team[];
  results: MatchResult[];
};

export default function RoundCard({
  roundNumber,
  time,
  matches,
  teams,
  results,
}: RoundCardProps) {
  const getTeam = (id: number) => {
    return teams.find((team) => team.id === id);
  };

  const getResult = (matchId: string) => {
    return results.find((result) => result.matchId === matchId);
  };

  return (
    <div className="rounded-3xl bg-white p-5 shadow">
      <h2 className="text-xl font-bold text-slate-900">
        第{roundNumber}ラウンド
      </h2>

      <p className="mt-1 font-bold text-blue-600">
        {time}
      </p>

      <div className="mt-4 space-y-4">
        {matches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            teamA={getTeam(match.teamAId)}
            teamB={getTeam(match.teamBId)}
            result={getResult(match.id)}
          />
        ))}
      </div>
    </div>
  );
}

