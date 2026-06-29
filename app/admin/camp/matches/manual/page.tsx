"use client";

import { useEffect, useState } from "react";

type Team = {
  id: number;
  name: string;
  color: string;
  members: number[];
};

type ManualMatch = {
  id: number;
  roundNumber: number;
  courtNumber: number;
  teamAId: number;
  teamBId: number;
};

export default function ManualMatchesPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [manualMatches, setManualMatches] = useState<ManualMatch[]>([]);

  const [roundNumber, setRoundNumber] = useState(1);
  const [courtNumber, setCourtNumber] = useState(1);
  const [teamAId, setTeamAId] = useState("");
  const [teamBId, setTeamBId] = useState("");

  useEffect(() => {
    const savedTeams: Team[] = JSON.parse(
      localStorage.getItem("campTeams") || "[]"
    );

    const savedMatches: ManualMatch[] = JSON.parse(
      localStorage.getItem("manualMatches") || "[]"
    );

    setTeams(savedTeams);
    setManualMatches(savedMatches);
  }, []);

  const saveManualMatches = (updatedMatches: ManualMatch[]) => {
    localStorage.setItem("manualMatches", JSON.stringify(updatedMatches));
    setManualMatches(updatedMatches);
  };

  const addMatch = () => {
    if (!teamAId || !teamBId) return;

    if (teamAId === teamBId) {
      alert("同じチーム同士は登録できません。");
      return;
    }

    const newMatch: ManualMatch = {
      id: Date.now(),
      roundNumber,
      courtNumber,
      teamAId: Number(teamAId),
      teamBId: Number(teamBId),
    };

    saveManualMatches([...manualMatches, newMatch]);

    setTeamAId("");
    setTeamBId("");
  };

  const deleteMatch = (id: number) => {
    const updatedMatches = manualMatches.filter((match) => match.id !== id);
    saveManualMatches(updatedMatches);
  };

  const getTeam = (teamId: number) => {
    return teams.find((team) => team.id === teamId);
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6">
      <section className="mx-auto max-w-md">
        <a href="/admin/camp/matches" className="font-bold text-blue-600">
          ← 対戦設定へ戻る
        </a>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          ✍️ 手入力対戦表
        </h1>
        <p className="mt-1 text-slate-600">
          ラウンド・コート・対戦チームを手動で登録します
        </p>

        <div className="mt-6 rounded-3xl bg-white p-5 shadow">
          <label className="block">
            <span className="font-bold text-slate-900">ラウンド番号</span>
            <input
              type="number"
              min={1}
              value={roundNumber}
              onChange={(e) => setRoundNumber(Number(e.target.value))}
              className="mt-2 w-full rounded-2xl border px-4 py-3"
            />
          </label>

          <label className="mt-4 block">
            <span className="font-bold text-slate-900">コート番号</span>
            <input
              type="number"
              min={1}
              value={courtNumber}
              onChange={(e) => setCourtNumber(Number(e.target.value))}
              className="mt-2 w-full rounded-2xl border px-4 py-3"
            />
          </label>

          <label className="mt-4 block">
            <span className="font-bold text-slate-900">チームA</span>
            <select
              value={teamAId}
              onChange={(e) => setTeamAId(e.target.value)}
              className="mt-2 w-full rounded-2xl border px-4 py-3"
            >
              <option value="">選択してください</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </label>

          <label className="mt-4 block">
            <span className="font-bold text-slate-900">チームB</span>
            <select
              value={teamBId}
              onChange={(e) => setTeamBId(e.target.value)}
              className="mt-2 w-full rounded-2xl border px-4 py-3"
            >
              <option value="">選択してください</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            onClick={addMatch}
            className="mt-6 w-full rounded-2xl bg-blue-600 py-3 font-bold text-white"
          >
            試合を追加する
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {manualMatches.length === 0 ? (
            <div className="rounded-3xl bg-white p-5 shadow">
              <p className="text-slate-600">
                まだ手入力の試合が登録されていません。
              </p>
            </div>
          ) : (
            manualMatches
              .slice()
              .sort((a, b) => {
                if (a.roundNumber !== b.roundNumber) {
                  return a.roundNumber - b.roundNumber;
                }

                return a.courtNumber - b.courtNumber;
              })
              .map((match) => {
                const teamA = getTeam(match.teamAId);
                const teamB = getTeam(match.teamBId);

                return (
                  <div
                    key={match.id}
                    className="rounded-3xl bg-white p-5 shadow"
                  >
                    <p className="text-sm font-bold text-blue-600">
                      第{match.roundNumber}ラウンド / コート
                      {match.courtNumber}
                    </p>

                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="flex flex-1 items-center gap-2">
                        <div
                          className="h-5 w-5 rounded-full"
                          style={{ backgroundColor: teamA?.color || "#94a3b8" }}
                        />
                        <p className="font-bold text-slate-900">
                          {teamA?.name || "不明なチーム"}
                        </p>
                      </div>

                      <p className="font-bold text-slate-500">VS</p>

                      <div className="flex flex-1 items-center justify-end gap-2">
                        <p className="font-bold text-slate-900">
                          {teamB?.name || "不明なチーム"}
                        </p>
                        <div
                          className="h-5 w-5 rounded-full"
                          style={{ backgroundColor: teamB?.color || "#94a3b8" }}
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => deleteMatch(match.id)}
                      className="mt-4 w-full rounded-2xl bg-red-500 py-2 font-bold text-white"
                    >
                      削除する
                    </button>
                  </div>
                );
              })
          )}
        </div>
      </section>
    </main>
  );
}

