"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../../../lib/supabase";

type Game = {
  id: number;
  camp_id: number;
  name: string;
  score_type: "rank" | "check" | "manual";
  point_multiplier: number | null;
  created_at?: string;
};

const scoreTypeLabel = {
  rank: "順位制",
  check: "チェック方式",
  manual: "手動入力",
};

export default function CampGamesPage() {
  const { campId } = useParams();
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    const { data, error } = await supabase
      .from("games")
      .select("*")
      .eq("camp_id", Number(campId))
      .order("created_at", { ascending: true });

    if (error) {
      console.error(error);
      alert("ゲームの取得に失敗しました");
      return;
    }

    setGames(data || []);
  };

  const deleteGame = async (gameId: number) => {
    if (!confirm("このゲームを削除しますか？")) return;

    await supabase.from("game_rank_points").delete().eq("game_id", gameId);
    await supabase.from("game_check_items").delete().eq("game_id", gameId);
    await supabase.from("game_check_results").delete().eq("game_id", gameId);
    await supabase.from("game_scores").delete().eq("game_id", gameId);

    const { error } = await supabase.from("games").delete().eq("id", gameId);

    if (error) {
      console.error(error);
      alert("ゲームの削除に失敗しました");
      return;
    }

    fetchGames();
  };

  const getSettingHref = (game: Game) => {
    if (game.score_type === "rank") {
      return `/admin/camp/${campId}/games/${game.id}/rank`;
    }

    if (game.score_type === "check") {
      return `/admin/camp/${campId}/games/${game.id}/check`;
    }

    return `/admin/camp/${campId}/games/${game.id}/manual`;
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6">
      <section className="mx-auto max-w-md">
        <a href={`/admin/camp/${campId}`} className="font-bold text-blue-600">
          ← 合宿管理へ戻る
        </a>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          🎮 ゲーム管理
        </h1>

        <p className="mt-1 text-slate-600">
          レクリエーションやフリークスカップの得点方式を管理します。
        </p>

        <a
          href={`/admin/camp/${campId}/games/new`}
          className="mt-6 block rounded-2xl bg-blue-600 py-3 text-center font-bold text-white"
        >
          ＋ ゲームを追加する
        </a>

        <div className="mt-6 space-y-4">
          {games.length === 0 ? (
            <div className="rounded-3xl bg-white p-5 shadow">
              <p className="text-slate-600">
                まだゲームが登録されていません。
              </p>
            </div>
          ) : (
            games.map((game) => (
              <div key={game.id} className="rounded-3xl bg-white p-5 shadow">
                <p className="text-sm font-bold text-orange-600">
                  {scoreTypeLabel[game.score_type]}
                </p>

                <h2 className="mt-2 text-xl font-bold text-slate-900">
                  {game.name}
                </h2>

                {game.score_type === "check" && (
                  <p className="mt-2 text-slate-600">
                    チェック数 × {game.point_multiplier || 0}点
                  </p>
                )}

                <a
                  href={getSettingHref(game)}
                  className="mt-4 block rounded-2xl bg-slate-800 py-3 text-center font-bold text-white"
                >
                  得点方式を設定する
                </a>

                <a
                  href={`/admin/camp/${campId}/games/${game.id}/score`}
                  className="mt-3 block rounded-2xl bg-green-600 py-3 text-center font-bold text-white"
                >
                  得点を入力する
                </a>

                <button
                  type="button"
                  onClick={() => deleteGame(game.id)}
                  className="mt-3 w-full rounded-2xl bg-red-500 py-3 font-bold text-white"
                >
                  削除する
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

