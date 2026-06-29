"use client";

import { useState } from "react";
import { Match, SetScore, Team } from "../../../camp/matches/types";

type Props = {
  match: Match;
  teamA?: Team;
  teamB?: Team;
  setCount: number;
  defaultSets: SetScore[];
  finished: boolean;
  onSave: (matchId: string, sets: SetScore[]) => void;
};

export default function MatchInputCard({
  match,
  teamA,
  teamB,
  setCount,
  defaultSets,
  finished,
  onSave,
}: Props) {
  const [sets, setSets] = useState<SetScore[]>(() => {
    if (defaultSets.length > 0) return defaultSets;

    return Array.from({ length: setCount }, () => ({
      teamA: 0,
      teamB: 0,
    }));
  });

  const changeScore = (
    index: number,
    team: "teamA" | "teamB",
    value: number
  ) => {
    const copied = [...sets];

    copied[index] = {
      ...copied[index],
      [team]: value,
    };

    setSets(copied);
  };

  return (
    <div className="rounded-2xl bg-slate-100 p-4">
      <p className="text-sm font-bold text-blue-600">
        コート{match.courtNumber}
      </p>

      {finished && (
        <p className="mt-2 text-sm font-bold text-green-700">試合終了</p>
      )}

      <div className="mt-4 rounded-2xl bg-white p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <div
              className="h-4 w-4 shrink-0 rounded-full"
              style={{ backgroundColor: teamA?.color || "#94a3b8" }}
            />
            <p className="truncate text-sm font-bold text-slate-900">
              {teamA?.name || "A"}
            </p>
          </div>

          <p className="shrink-0 text-sm font-bold text-slate-500">VS</p>

          <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
            <p className="truncate text-right text-sm font-bold text-slate-900">
              {teamB?.name || "B"}
            </p>
            <div
              className="h-4 w-4 shrink-0 rounded-full"
              style={{ backgroundColor: teamB?.color || "#94a3b8" }}
            />
          </div>
        </div>

        <div className="mt-5 space-y-4">
          {Array.from({ length: setCount }).map((_, index) => (
            <div key={index} className="rounded-xl bg-slate-50 p-3">
              <p className="text-center text-sm font-bold text-slate-700">
                第{index + 1}セット
              </p>

              <div className="mt-3 flex items-center justify-center gap-3">
              <input
  type="text"
  inputMode="numeric"
  value={sets[index]?.teamA ?? 0}
  onChange={(e) =>
    changeScore(index, "teamA", Number(e.target.value))
  }
  className="h-10 min-w-0 rounded-xl border text-center text-lg font-bold"
  style={{ width: "145px" }}
/>
                <span className="text-2xl font-bold text-slate-600">−</span>
                <input
  type="text"
  inputMode="numeric"
  value={sets[index]?.teamB ?? 0}
  onChange={(e) =>
    changeScore(index, "teamB", Number(e.target.value))
  }
  className="h-10 min-w-0 rounded-xl border text-center text-lg font-bold"
  style={{ width: "145px" }}
/>

              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => onSave(match.id, sets)}
        className="mt-4 w-full rounded-2xl bg-blue-600 py-3 font-bold text-white"
      >
        得点を保存する
      </button>
    </div>
  );
}

