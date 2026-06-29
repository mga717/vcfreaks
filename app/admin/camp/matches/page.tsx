"use client";

import { useEffect, useState } from "react";
import RoundInputCard from "./RoundInputCard";
import {
  ManualMatch,
  Match,
  MatchResult,
  MatchSettings,
  Round,
  SetScore,
  Team,
} from "../../../camp/matches/types";
import { createRounds, getRoundTime } from "../../../camp/matches/utils";

type VolleyballSettings = {
  setCount: number;
  pointPerSet: number;
  rankingRule: string;
};

export default function AdminMatchesPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [results, setResults] = useState<MatchResult[]>([]);

  const [settings, setSettings] = useState<MatchSettings>({
    matchType: "league",
    createMode: "auto",
    courtCount: 2,
    startTime: "09:00",
    matchMinutes: 20,
    breakMinutes: 5,
  });

  const [volleyballSettings, setVolleyballSettings] =
    useState<VolleyballSettings>({
      setCount: 1,
      pointPerSet: 25,
      rankingRule: "wins-pointDiff-totalPoints",
    });

  useEffect(() => {
    const savedTeams: Team[] = JSON.parse(
      localStorage.getItem("campTeams") || "[]"
    );

    const savedSettings: MatchSettings | null = JSON.parse(
      localStorage.getItem("matchSettings") || "null"
    );

    const savedVolleyballSettings: VolleyballSettings | null = JSON.parse(
      localStorage.getItem("volleyballSettings") || "null"
    );

    const savedResults: MatchResult[] = JSON.parse(
      localStorage.getItem("matchResults") || "[]"
    );

    const savedManualMatches: ManualMatch[] = JSON.parse(
      localStorage.getItem("manualMatches") || "[]"
    );

    const currentSettings = savedSettings || settings;

    setTeams(savedTeams);
    setSettings(currentSettings);
    setResults(savedResults);

    if (savedVolleyballSettings) {
      setVolleyballSettings(savedVolleyballSettings);
    }

    if (currentSettings.createMode === "manual") {
      const manualMatches: Match[] = savedManualMatches.map((match) => ({
        id: String(match.id),
        roundNumber: match.roundNumber,
        courtNumber: match.courtNumber,
        teamAId: match.teamAId,
        teamBId: match.teamBId,
      }));

      setRounds(groupMatchesByRound(manualMatches));
    } else {
      setRounds(createRounds(savedTeams, currentSettings.courtCount));
    }
  }, []);

  const saveSettings = () => {
    localStorage.setItem("matchSettings", JSON.stringify(settings));

    if (settings.createMode === "auto") {
      setRounds(createRounds(teams, settings.courtCount));
    }

    alert("対戦設定を保存しました！");
  };

  const saveResult = (matchId: string, sets: SetScore[]) => {
    const updatedResults = results.filter(
      (result) => result.matchId !== matchId
    );

    const newResult: MatchResult = {
      matchId,
      sets,
      finished: true,
    };

    const savedResults = [...updatedResults, newResult];

    localStorage.setItem("matchResults", JSON.stringify(savedResults));
    setResults(savedResults);
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6">
      <section className="mx-auto max-w-md">
        <a href="/admin/camp" className="font-bold text-blue-600">
          ← 合宿管理へ戻る
        </a>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          🏐 対戦設定・試合結果入力
        </h1>

        <div className="mt-6 rounded-3xl bg-white p-5 shadow">
          <label className="block">
            <span className="font-bold text-slate-900">対戦方式</span>
            <select
              value={settings.matchType}
              onChange={(e) =>
                setSettings({ ...settings, matchType: e.target.value })
              }
              className="mt-2 w-full rounded-2xl border px-4 py-3"
            >
              <option value="league">総当たり</option>
              <option value="tournament">トーナメント</option>
            </select>
          </label>

          <label className="mt-5 block">
            <span className="font-bold text-slate-900">作成方法</span>
            <select
              value={settings.createMode}
              onChange={(e) =>
                setSettings({ ...settings, createMode: e.target.value })
              }
              className="mt-2 w-full rounded-2xl border px-4 py-3"
            >
              <option value="auto">自動生成</option>
              <option value="manual">手入力</option>
            </select>
          </label>

          <label className="mt-5 block">
            <span className="font-bold text-slate-900">コート数</span>
            <select
              value={settings.courtCount}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  courtCount: Number(e.target.value),
                })
              }
              className="mt-2 w-full rounded-2xl border px-4 py-3"
            >
              <option value={1}>1コート</option>
              <option value={2}>2コート</option>
              <option value={3}>3コート</option>
              <option value={4}>4コート</option>
              <option value={5}>5コート</option>
            </select>
          </label>

          <label className="mt-5 block">
            <span className="font-bold text-slate-900">開始時間</span>
            <input
              type="time"
              value={settings.startTime}
              onChange={(e) =>
                setSettings({ ...settings, startTime: e.target.value })
              }
              className="mt-2 w-full rounded-2xl border px-4 py-3"
            />
          </label>

          <label className="mt-5 block">
            <span className="font-bold text-slate-900">試合時間（分）</span>
            <input
              type="number"
              min={1}
              value={settings.matchMinutes}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  matchMinutes: Number(e.target.value),
                })
              }
              className="mt-2 w-full rounded-2xl border px-4 py-3"
            />
          </label>

          <label className="mt-5 block">
            <span className="font-bold text-slate-900">休憩時間（分）</span>
            <input
              type="number"
              min={0}
              value={settings.breakMinutes}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  breakMinutes: Number(e.target.value),
                })
              }
              className="mt-2 w-full rounded-2xl border px-4 py-3"
            />
          </label>

          <div className="mt-5 rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">
            <p className="font-bold text-slate-900">バレー設定</p>
            <p className="mt-2">
              ・{volleyballSettings.setCount}セット制
            </p>
            <p>・1セット {volleyballSettings.pointPerSet}点</p>
          </div>

          <button
            type="button"
            onClick={saveSettings}
            className="mt-6 w-full rounded-2xl bg-blue-600 py-3 font-bold text-white"
          >
            設定を保存する
          </button>

          {settings.createMode === "manual" && (
            <a
              href="/admin/camp/matches/manual"
              className="mt-4 block w-full rounded-2xl bg-slate-900 py-3 text-center font-bold text-white"
            >
              手入力の対戦表を作る
            </a>
          )}
        </div>

        <div className="mt-6 space-y-5">
          {rounds.length === 0 ? (
            <div className="rounded-3xl bg-white p-5 shadow">
              <p className="text-slate-600">まだ対戦表がありません。</p>
            </div>
          ) : (
            rounds.map((round, index) => (
              <RoundInputCard
                key={round.roundNumber}
                roundNumber={round.roundNumber}
                time={getRoundTime(index, settings)}
                matches={round.matches}
                teams={teams}
                results={results}
                setCount={volleyballSettings.setCount}
                onSave={saveResult}
              />
            ))
          )}
        </div>
      </section>
    </main>
  );
}

function groupMatchesByRound(matches: Match[]): Round[] {
  return matches
    .slice()
    .sort((a, b) => {
      if (a.roundNumber !== b.roundNumber) {
        return a.roundNumber - b.roundNumber;
      }

      return a.courtNumber - b.courtNumber;
    })
    .reduce<Round[]>((groups, match) => {
      const group = groups.find(
        (item) => item.roundNumber === match.roundNumber
      );

      if (group) {
        group.matches.push(match);
      } else {
        groups.push({
          roundNumber: match.roundNumber,
          matches: [match],
        });
      }

      return groups;
    }, []);
}

