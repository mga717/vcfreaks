import { Match, MatchResult, SetScore, Team } from "../../../camp/matches/types";
import MatchInputCard from "./MatchInputCard";

type Props = {
  roundNumber: number;
  time: string;
  matches: Match[];
  teams: Team[];
  results: MatchResult[];
  setCount: number;
  onSave: (matchId: string, sets: SetScore[]) => void;
};

export default function RoundInputCard({
  roundNumber,
  time,
  matches,
  teams,
  results,
  setCount,
  onSave,
}: Props) {
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

      <p className="mt-1 font-bold text-blue-600">{time}</p>

      <div className="mt-4 space-y-4">
        {matches.map((match) => {
          const result = getResult(match.id);

          return (
            <MatchInputCard
              key={match.id}
              match={match}
              teamA={getTeam(match.teamAId)}
              teamB={getTeam(match.teamBId)}
              setCount={setCount}
              defaultSets={result?.sets ?? []}
              finished={result?.finished ?? false}
              onSave={onSave}
            />
          );
        })}
      </div>
    </div>
  );
}


