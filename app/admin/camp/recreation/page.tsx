"use client";

import { useEffect, useState } from "react";
import { calculateScore } from "./calculateScore";
import ScoreInput from "./ScoreInput";
import { CampGame, RecreationScore, Team, TeamScoreInput } from "./types";

export default function AdminRecreationPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [games, setGames] = useState<CampGame[]>([]);
  const [selectedGameId, setSelectedGameId] = useState("");
  const [inputs, setInputs] = useState<{ [teamId: number]: TeamScoreInput }>(
    {}
  );
  const [scores, setScores] = useState<RecreationScore[]>([]);

  useEffect(() => {
    const savedTeams: Team[] = JSON.parse(
      localStorage.getItem("campTeams") || "[]"
    );

    const savedGames: CampGame[] = JSON.parse(
      localStorage.getItem("campGames") || "[]"
    );

    const savedScores: RecreationScore[] = JSON.parse(
      localStorage.getItem("recreationScores") || "[]"
    );

    setTeams(savedTeams);
    setGames(savedGames);
    setScores(savedScores);
  }, []);

  const selectedGame = games.find(
    (game) => game.id === Number(selectedGameId)
  );

  const saveScore = () => {
    if (!selectedGame) return;

    const newScore: RecreationScore = {
      id: Date.now(),
      gameId: selectedGame.id,
      gameName: selectedGame.name,
      scoreType: selectedGame.scoreType,
      scores: teams.map((team) => ({
        teamId: team.id,
        point: calculateScore(
          selectedGame,
          inputs[team.id] || { teamId: team.id }
        ),
      })),
    };

    const updatedScores = [...scores, newScore];

    localStorage.setItem("recreationScores", JSON.stringify(updatedScores));
    setScores(updatedScores);
    setSelectedGameId("");
    setInputs({});
  };

  const deleteScore = (id: number) => {
    const updatedScores = scores.filter((score) => score.id !== id);

    localStorage.setItem("recreationScores", JSON.stringify(updatedScores));
    setScores(updatedScores);
  };

  const getTeam = (teamId: number) => {
    return teams.find((team) => team.id === teamId);
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6">
      <section className="mx-auto max-w-md">
        <a href="/admin/camp" className="font-bold text-blue-600">
          ← 合宿管理へ戻る
        </a>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          🎲 レクリエーション得点
        </h1>

        <div className="mt-6 rounded-3xl bg-white p-5 shadow">
          <label className="block">
            <span className="font-bold text-slate-900">ゲームを選択</span>
            <select
              value={selectedGameId}
              onChange={(e) => {
                setSelectedGameId(e.target.value);
                setInputs({});
              }}
              className="mt-2 w-full rounded-2xl border px-4 py-3"
            >
              <option value="">選択してください</option>
              {games.map((game) => (
                <option key={game.id} value={game.id}>
                  {game.name}
                </option>
              ))}
            </select>
          </label>

          {!selectedGame ? (
            <p className="mt-4 rounded-2xl bg-slate-100 p-4 text-slate-600">
              先にゲーム管理でゲームを作成してください。
            </p>
          ) : (
            <>
              <div className="mt-4 rounded-2xl bg-blue-50 p-4 text-sm text-blue-700">
                得点方式：{selectedGame.scoreType}
              </div>

              <ScoreInput
                game={selectedGame}
                teams={teams}
                inputs={inputs}
                onChange={(teamId, input) =>
                  setInputs({
                    ...inputs,
                    [teamId]: input,
                  })
                }
              />

              <button
                type="button"
                onClick={saveScore}
                className="mt-6 w-full rounded-2xl bg-blue-600 py-3 font-bold text-white"
              >
                得点を保存する
              </button>
            </>
          )}
        </div>

        <div className="mt-6 space-y-4">
          {scores.map((score) => (
            <div key={score.id} className="rounded-3xl bg-white p-5 shadow">
              <h2 className="text-xl font-bold text-slate-900">
                {score.gameName}
              </h2>

              <div className="mt-4 space-y-2">
                {score.scores.map((item) => {
                  const team = getTeam(item.teamId);

                  return (
                    <div
                      key={item.teamId}
                      className="flex items-center justify-between rounded-2xl bg-slate-100 px-4 py-2"
                    >
                      <span className="font-bold text-slate-900">
                        {team?.icon || "🔴"} {team?.name || "不明"}
                      </span>

                      <span className="font-bold text-blue-600">
                        {item.point}点
                      </span>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => deleteScore(score.id)}
                className="mt-4 w-full rounded-2xl bg-red-500 py-2 font-bold text-white"
              >
                削除する
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

