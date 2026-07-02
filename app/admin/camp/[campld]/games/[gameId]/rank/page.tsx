"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../../../../../lib/supabase";

type Team = {
  id: number;
  name: string;
};

type RankPoint = {
  rank: number;
  point: number;
};

export default function RankSettingPage() {
  const { campId, gameId } = useParams();

  const [teamCount, setTeamCount] = useState(0);
  const [rankPoints, setRankPoints] = useState<RankPoint[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTeams();
  }, []);

  async function loadTeams() {
    const { data } = await supabase
      .from("teams")
      .select("id,name")
      .eq("camp_id", Number(campId));

    const count = data?.length || 0;

    setTeamCount(count);

    const initial = [];

    for (let i = 1; i <= count; i++) {
      initial.push({
        rank: i,
        point: (count - i + 1) * 10,
      });
    }

    setRankPoints(initial);
  }

  function updatePoint(rank: number, value: number) {
    setRankPoints((prev) =>
      prev.map((item) =>
        item.rank === rank
          ? { ...item, point: value }
          : item
      )
    );
  }

  async function save() {
    setLoading(true);

    await supabase
      .from("game_rank_points")
      .delete()
      .eq("game_id", Number(gameId));

    const rows = rankPoints.map((item) => ({
      game_id: Number(gameId),
      rank: item.rank,
      point: item.point,
    }));

    const { error } = await supabase
      .from("game_rank_points")
      .insert(rows);

    setLoading(false);

    if (error) {
      console.error(error);
      alert("保存に失敗しました");
      return;
    }

    alert("順位設定を保存しました！");

    window.location.href = `/admin/camp/${campId}/games`;
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6">
      <section className="mx-auto max-w-md">

        <a
          href={`/admin/camp/${campId}/games`}
          className="font-bold text-blue-600"
        >
          ← ゲーム一覧へ戻る
        </a>

        <h1 className="mt-6 text-3xl font-bold">
          🏆 順位制設定
        </h1>

        <p className="mt-2 text-slate-600">
          チーム数：{teamCount}チーム
        </p>

        <div className="mt-6 rounded-3xl bg-white p-5 shadow">

          {rankPoints.map((item) => (

            <div
              key={item.rank}
              className="mb-4 flex items-center justify-between"
            >

              <span className="font-bold">
                {item.rank}位
              </span>

              <input
                type="number"
                value={item.point}
                onChange={(e) =>
                  updatePoint(
                    item.rank,
                    Number(e.target.value)
                  )
                }
                className="w-28 rounded-xl border px-3 py-2 text-right"
              />

            </div>

          ))}

          <button
            onClick={save}
            disabled={loading}
            className="mt-6 w-full rounded-2xl bg-blue-600 py-3 font-bold text-white"
          >
            {loading ? "保存中..." : "順位設定を保存"}
          </button>

        </div>

      </section>
    </main>
  );
}

