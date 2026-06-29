import { Match, MatchResult, Team } from "./types";

type MatchCardProps = {
  match: Match;
  teamA?: Team;
  teamB?: Team;
  result?: MatchResult;
};

export default function MatchCard({
  match,
  teamA,
  teamB,
  result,
}: MatchCardProps) {
  const isFinished = result?.finished === true;

  let teamASetWins = 0;
  let teamBSetWins = 0;

  if (isFinished && result?.sets) {
    result.sets.forEach((set) => {
      if (set.teamA > set.teamB) {
        teamASetWins++;
      } else if (set.teamB > set.teamA) {
        teamBSetWins++;
      }
    });
  }

  return (
    <div className="rounded-2xl bg-white p-4 shadow">
      <p className="text-sm font-bold text-blue-600">
        コート{match.courtNumber}
      </p>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex min-w-0 flex-1 flex-col items-center">
        <div className="text-4xl">
  {teamA?.icon || "🔴"}
</div>

<p className="mt-2 max-w-[110px] truncate text-center text-base font-bold text-slate-900">
            {teamA?.name || "A"}
          </p>
        </div>

        {!isFinished ? (
          <div className="shrink-0 text-4xl font-bold text-slate-900">
            ×
          </div>
        ) : (
          <div className="shrink-0 text-center">
            <p className="text-4xl font-bold text-slate-900">
              {teamASetWins}-{teamBSetWins}
            </p>

            <div className="mt-2 space-y-1">
              {result?.sets?.map((set, index) => (
                <p
                  key={index}
                  className="text-sm font-bold leading-4 text-slate-700"
                >
                  {set.teamA}-{set.teamB}
                </p>
              ))}
            </div>
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col items-center">
        <div className="text-4xl">
  {teamB?.icon || "🔵"}
</div>
<p className="mt-2 max-w-[110px] truncate text-center text-base font-bold text-slate-900">
            {teamB?.name || "B"}
          </p>
        </div>
      </div>
    </div>
  );
}

