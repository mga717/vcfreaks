"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../../../../../lib/supabase";

type Game = {
  id: number;
  name: string;
  score_type: string;
};

export default function ManualSettingPage() {
  const { campId, gameId } = useParams();
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    fetchGame();
  }, []);

  const fetchGame = async () => {
    const { data, error } = await supabase
      .from("games")
      .select("*")
      .eq("id", Number(gameId))
      .single();

    if (error) {
      console.error(error);
      alert("ゲームの取得に失敗しました");
      return;
    }

    setGame(data);
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6">
      <section className="mx-auto max-w-md">
        <a
          href={`/admin/camp/${campId}/games`}
          className="font-bold text-blue-600"
        >
          ← ゲーム一覧へ戻る
        </a>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          ✏️ 手動入力設定
        </h1>

        <div className="mt-6 rounded-3xl bg-white p-5 shadow">
          <h2 className="text-xl font-bold text-slate-900">
            {game?.name || "読み込み中..."}
          </h2>

          <p className="mt-3 text-slate-600">
            手動入力方式は、追加設定はありません。
          </p>

          <p className="mt-2 text-slate-600">
            得点入力画面で、各チームの点数を直接入力します。
          </p>

          <a
            href={`/admin/camp/${campId}/games/${gameId}/score`}
            className="mt-6 block rounded-2xl bg-green-600 py-3 text-center font-bold text-white"
          >
            得点を入力する
          </a>
        </div>
      </section>
    </main>
  );
}

