"use client";

import { CampGame, Team, TeamScoreInput } from "./types";

type Props = {
  game: CampGame;
  teams: Team[];
  inputs: { [teamId: number]: TeamScoreInput };
  onChange: (teamId: number, input: TeamScoreInput) => void;
};

export default function ScoreInput({ game, teams, inputs, onChange }: Props) {
  const updateInput = (
    teamId: number,
    newValues: Partial<TeamScoreInput>
  ) => {
    onChange(teamId, {
      teamId,
      ...inputs[teamId],
      ...newValues,
    });
  };

  return (
    <div className="mt-5 space-y-3">
      {teams.map((team) => {
        const input = inputs[team.id] || { teamId: team.id };

        return (
          <div
            key={team.id}
            className="rounded-2xl bg-slate-100 px-4 py-3"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">{team.icon || "🔴"}</span>
              <span className="font-bold text-slate-900">{team.name}</span>
            </div>

            {game.scoreType === "rank" && (
              <select
                value={input.rank || ""}
                onChange={(e) =>
                  updateInput(team.id, { rank: Number(e.target.value) })
                }
                className="mt-3 w-full rounded-xl border px-3 py-2"
              >
                <option value="">順位を選択</option>
                <option value={1}>1位</option>
                <option value={2}>2位</option>
                <option value={3}>3位</option>
                <option value={4}>4位</option>
              </select>
            )}

            {game.scoreType === "actual" && (
              <input
                type="number"
                value={input.actualCount || 0}
                onChange={(e) =>
                  updateInput(team.id, {
                    actualCount: Number(e.target.value),
                  })
                }
                className="mt-3 w-full rounded-xl border px-3 py-2"
                placeholder="正解数など"
              />
            )}

            {game.scoreType === "win" && (
              <select
                value={input.result || ""}
                onChange={(e) =>
                  updateInput(team.id, {
                    result: e.target.value as "win" | "draw" | "lose",
                  })
                }
                className="mt-3 w-full rounded-xl border px-3 py-2"
              >
                <option value="">結果を選択</option>
                <option value="win">勝ち</option>
                <option value="draw">引き分け</option>
                <option value="lose">負け</option>
              </select>
            )}

            {game.scoreType === "check" && (
              <input
                type="number"
                value={input.checkCount || 0}
                onChange={(e) =>
                  updateInput(team.id, {
                    checkCount: Number(e.target.value),
                  })
                }
                className="mt-3 w-full rounded-xl border px-3 py-2"
                placeholder="チェック数"
              />
            )}

            {game.scoreType === "manual" && (
              <input
                type="number"
                value={input.manualPoint || 0}
                onChange={(e) =>
                  updateInput(team.id, {
                    manualPoint: Number(e.target.value),
                  })
                }
                className="mt-3 w-full rounded-xl border px-3 py-2"
                placeholder="点数"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

