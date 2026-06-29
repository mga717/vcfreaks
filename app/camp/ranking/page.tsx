"use client";

import { useEffect, useState } from "react";
import BottomNav from "../../components/BottomNav";

type Team = {
  id: number;
  name: string;
  color: string;
  members: number[];
};

type SetScore = {
  teamA: number;
  teamB: number;
};

type MatchResult = {
  matchId: string;
  sets: SetScore[];
  finished: boolean;
};

type Match = {
  id: string;
  roundNumber: number;
  courtNumber: number;
  teamAId: number;
  teamBId: number;
};

type ManualMatch = {
  id: number;
  roundNumber: number;
  courtNumber: number;
  teamAId: number;
  teamBId: number;
};

type RankingTeam = {
  id: number;
  name: string;
  color: string;
  wins: number;
  losses: number;
  pointsFor: number;
  pointsAgainst: number;
  pointDiff: number;
};

export default function RankingPage() {
  const [ranking, setRanking] = useState<RankingTeam[]>([]);

  useEffect(() => {
    const teams: Team[] = JSON.parse(localStorage.getItem("campTeams") || "[]");
    const results: MatchResult[] = JSON.parse(
      localStorage.getItem("matchResults") || "[]"
    );
    const manualMatches: ManualMatch[] = JSON.parse(
      localStorage.getItem("manualMatches") || "[]"
    );

    const matches: Match[] = manualMatches.map((match) => ({
      id: String(match.id),
      roundNumber: match.roundNumber,
      courtNumber: match.courtNumber,
      teamAId: match.teamAId,
      teamBId: match.teamBId,
    }));

    const rankingData: RankingTeam[] = teams.map((team) => ({
      id: team.id,
      name: team.name,
      color: team.color,
      wins: 0,
      losses: 0,
      pointsFor: 0,
      pointsAgainst: 0,
      pointDiff: 0,
    }));

    results.forEach((result) => {
      if (!result.finished) return;

      const match = matches.find((match) => match.id === result.matchId);
      if (!match) return;

      const teamA = rankingData.find((team) => team.id === match.teamAId);
      const teamB = rankingData.find((team) => team.id === match.teamBId);

      if (!teamA || !teamB) return;

      let teamASetWins = 0;
      let teamBSetWins = 0;

      result.sets.forEach((set) => {
        teamA.pointsFor += set.teamA;
        teamA.pointsAgainst += set.teamB;

        teamB.pointsFor += set.teamB;
        teamB.pointsAgainst += set.teamA;

        if (set.teamA > set.teamB) {
          teamASetWins++;
        } else if (set.teamB > set.teamA) {
          teamBSetWins++;
        }
      });

      if (teamASetWins > teamBSetWins) {
        teamA.wins++;
        teamB.losses++;
      } else if (teamBSetWins > teamASetWins) {
        teamB.wins++;
        teamA.losses++;
      }
    });

    const sortedRanking = rankingData
      .map((team) => ({
        ...team,
        pointDiff: team.pointsFor - team.pointsAgainst,
      }))
      .sort((a, b) => {
        if (b.wins !== a.wins) return b.wins - a.wins;
        if (b.pointDiff !== a.pointDiff) return b.pointDiff - a.pointDiff;
        return b.pointsFor - a.pointsFor;
      });

    setRanking(sortedRanking);
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 pb-24">
      <section className="mx-auto max-w-md px-4 py-6">
        <a href="/camp" className="font-bold text-blue-600">
          ← 合宿へ戻る
        </a>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">🏆 順位表</h1>
        <p className="mt-1 text-slate-600">
          勝利数 → 得失点差 → 総得点の順で順位を決めます
        </p>

        <div className="mt-6 space-y-4">
          {ranking.length === 0 ? (
            <div className="rounded-3xl bg-white p-5 shadow">
              <p className="text-slate-600">
                まだチームが登録されていません。
              </p>
            </div>
          ) : (
            ranking.map((team, index) => (
              <div
                key={team.id}
                className="rounded-3xl bg-white p-5 shadow"
              >
                <div className="flex items-center gap-3">
                  <p className="text-2xl font-bold">
                    {index === 0
                      ? "🥇"
                      : index === 1
                      ? "🥈"
                      : index === 2
                      ? "🥉"
                      : `${index + 1}位`}
                  </p>

                  <div
                    className="h-8 w-8 rounded-full"
                    style={{ backgroundColor: team.color }}
                  />

                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      {team.name}
                    </h2>
                    <p className="text-sm text-slate-600">
                      {team.wins}勝 {team.losses}敗
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-2xl bg-slate-100 p-3">
                    <p className="text-xs font-bold text-slate-500">得失点差</p>
                    <p className="text-lg font-bold text-slate-900">
                      {team.pointDiff}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-100 p-3">
                    <p className="text-xs font-bold text-slate-500">総得点</p>
                    <p className="text-lg font-bold text-slate-900">
                      {team.pointsFor}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-100 p-3">
                    <p className="text-xs font-bold text-slate-500">失点</p>
                    <p className="text-lg font-bold text-slate-900">
                      {team.pointsAgainst}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <BottomNav />
    </main>
  );
}

