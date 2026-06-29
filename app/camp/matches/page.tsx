"use client";

import { useEffect, useState } from "react";
import RoundCard from "./RoundCard";
import {
  ManualMatch,
  Match,
  MatchResult,
  MatchSettings,
  Round,
  Team,
} from "./types";
import { createRounds, getRoundTime } from "./utils";

export default function CampMatchesPage() {
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

  useEffect(() => {
    const savedTeams: Team[] = JSON.parse(
      localStorage.getItem("campTeams") || "[]"
    );

    const savedSettings: MatchSettings | null = JSON.parse(
      localStorage.getItem("matchSettings") || "null"
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

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6">
      <section className="mx-auto max-w-md">
        <a href="/camp" className="font-bold text-blue-600">
          ← 合宿ホームへ戻る
        </a>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          🏐 対戦表
        </h1>

        <div className="mt-6 rounded-3xl bg-white p-5 shadow">
          <p className="font-bold text-slate-900">
            対戦方式：
            {settings.matchType === "league" ? "総当たり" : "トーナメント"}
          </p>
          <p className="mt-1 text-slate-700">
            作成方法：
            {settings.createMode === "auto" ? "自動生成" : "手入力"}
          </p>
          <p className="mt-1 text-slate-700">
            コート数：{settings.courtCount}コート
          </p>
          <p className="mt-1 text-slate-700">
            試合時間：{settings.matchMinutes}分
          </p>
          <p className="mt-1 text-slate-700">
            休憩時間：{settings.breakMinutes}分
          </p>
        </div>

        {rounds.length === 0 ? (
          <div className="mt-6 rounded-3xl bg-white p-5 shadow">
            <p className="text-slate-600">
              まだ対戦表がありません。
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-5">
            {rounds.map((round, index) => (
              <RoundCard
                key={round.roundNumber}
                roundNumber={round.roundNumber}
                time={getRoundTime(index, settings)}
                matches={round.matches}
                teams={teams}
                results={results}
              />
            ))}
          </div>
        )}
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


