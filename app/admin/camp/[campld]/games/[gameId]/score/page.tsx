"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../../../../../lib/supabase";

type Game = {
  id: number;
  name: string;
  score_type: "rank" | "check" | "manual";
  point_multiplier: number | null;
};

type Team = {
  id: number;
  name: string;
  icon: string;
};

type RankPoint = {
  rank: number;
  point: number;
};

type CheckItem = {
  id: number;
  item_number: number;
};

export default function GameScorePage() {
  const { campId, gameId } = useParams();

  const [game, setGame] = useState<Game | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [rankPoints, setRankPoints] = useState<RankPoint[]>([]);
  const [checkItems, setCheckItems] = useState<CheckItem[]>([]);

  const [ranks, setRanks] = useState<{ [teamId: number]: number }>({});
  const [manualScores, setManualScores] = useState<{ [teamId: number]: number }>(
    {}
  );
  const [checks, setChecks] = useState<{ [teamId: number]: number[] }>({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: gameData } = await supabase
      .from("games")
      .select("*")
      .eq("id", Number(gameId))
      .single();

    setGame(gameData);

    const { data: teamData } = await supabase
      .from("teams")
      .select("id,name,icon")
      .eq("camp_id", Number(campId))
      .order("created_at", { ascending: true });

    setTeams(teamData || []);

    const { data: rankData } = await supabase
      .from("game_rank_points")
      .select("rank,point")
      .eq("game_id", Number(gameId))
      .order("rank", { ascending: true });

    setRankPoints(rankData || []);

    const { data: itemData } = await supabase
      .from("game_check_items")
      .select("id,item_number")
      .eq("game_id", Number(gameId))
      .order("item_number", { ascending: true });

    setCheckItems(itemData || []);
  };

  const getRankPoint = (rank: number) => {
    return rankPoints.find((item) => item.rank === rank)?.point || 0;
  };

  const toggleCheck = (teamId: number, itemId: number) => {
    const current = checks[teamId] || [];

    if (current.includes(itemId)) {
      setChecks({
        ...checks,
        [teamId]: current.filter((id) => id !== itemId),
      });
    } else {
      setChecks({
        ...checks,
        [teamId]: [...current, itemId],
      });
    }
  };

  const getTeamScore = (teamId: number) => {
    if (!game) return 0;

    if (game.score_type === "rank") {
      return getRankPoint(ranks[teamId] || 0);
    }

    if (game.score_type === "check") {
      const checkedCount = checks[teamId]?.length || 0;
      return checkedCount * (game.point_multiplier || 0);
    }

    return manualScores[teamId] || 0;
  };

  const saveScores = async () => {
    if (!game) return;

    setLoading(true);

    await supabase.from("game_scores").delete().eq("game_id", Number(gameId));
    await supabase
      .from("game_check_results")
      .delete()
      .eq("game_id", Number(gameId));

    const scoreRows = teams.map((team) => ({
      game_id: Number(gameId),
      team_id: team.id,
      rank: game.score_type === "rank" ? ranks[team.id] || null : null,
      score: getTeamScore(team.id),
    }));

    const { error: scoreError } = await supabase
      .from("game_scores")
      .insert(scoreRows);

    if (scoreError) {
      setLoading(false);
      console.error(scoreError);
      alert("得点の保存に失敗しました");
      return;
    }

    if (game.score_type === "check") {
      const checkRows = teams.flatMap((team) =>
        checkItems.map((item) => ({
          game_id: Number(gameId),
          team_id: team.id,
          item_id: item.id,
          checked: checks[team.id]?.includes(item.id) || false,
        }))
      );

      const { error: checkError } = await supabase
        .from("game_check_results")
        .insert(checkRows);

      if (checkError) {
        setLoading(false);
        console.error(checkError);
        alert("チェック結果の保存に失敗しました");
        return;
      }
    }

    setLoading(false);
    alert("得点を保存しました！");
  };

  if (!game) {
    return (
      <main className="min-h-screen bg-slate-100 px-4 py-6">
        <section className="mx-auto max-w-md">
          <p>読み込み中...</p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6">
      <section className="mx-auto max-w-md">
        <a href={`/admin/camp/${campId}/games`} className="font-bold text-blue-600">
          ← ゲーム一覧へ戻る
        </a>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          🏆 得点入力
        </h1>

        <p className="mt-2 text-slate-600">{game.name}</p>

        <div className="mt-6 space-y-4">
          {teams.map((team) => (
            <div key={team.id} className="rounded-3xl bg-white p-5 shadow">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{team.icon}</span>
                <h2 className="text-xl font-bold text-slate-900">
                  {team.name}
                </h2>
              </div>

              {game.score_type === "rank" && (
                <select
                  value={ranks[team.id] || ""}
                  onChange={(e) =>
                    setRanks({
                      ...ranks,
                      [team.id]: Number(e.target.value),
                    })
                  }
                  className="mt-4 w-full rounded-2xl border px-4 py-3"
                >
                  <option value="">順位を選択</option>
                  {rankPoints.map((item) => (
                    <option key={item.rank} value={item.rank}>
                      {item.rank}位：{item.point}点
                    </option>
                  ))}
                </select>
              )}

              {game.score_type === "check" && (
                <div className="mt-4">
                  <div className="grid grid-cols-5 gap-2">
                    {checkItems.map((item) => {
                      const checked = checks[team.id]?.includes(item.id) || false;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => toggleCheck(team.id, item.id)}
                          className={`rounded-xl border py-3 font-bold ${
                            checked
                              ? "bg-green-500 text-white"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {item.item_number}
                        </button>
                      );
                    })}
                  </div>

                  <p className="mt-3 text-sm font-bold text-slate-600">
                    チェック数：{checks[team.id]?.length || 0}個 ×{" "}
                    {game.point_multiplier || 0}点
                  </p>
                </div>
              )}

              {game.score_type === "manual" && (
                <input
                  type="number"
                  value={manualScores[team.id] || 0}
                  onChange={(e) =>
                    setManualScores({
                      ...manualScores,
                      [team.id]: Number(e.target.value),
                    })
                  }
                  className="mt-4 w-full rounded-2xl border px-4 py-3"
                  placeholder="点数"
                />
              )}

              <p className="mt-4 rounded-2xl bg-yellow-50 p-3 text-center text-xl font-bold text-yellow-700">
                {getTeamScore(team.id)}点
              </p>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={saveScores}
          disabled={loading}
          className="mt-6 w-full rounded-2xl bg-blue-600 py-3 font-bold text-white disabled:bg-slate-400"
        >
          {loading ? "保存中..." : "得点を保存する"}
        </button>
      </section>
    </main>
  );
}

