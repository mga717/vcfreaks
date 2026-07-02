"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../../../../lib/supabase";

type ScoreType = "rank" | "check" | "manual";

export default function NewGamePage() {
  const { campId } = useParams();

  const [name, setName] = useState("");
  const [scoreType, setScoreType] = useState<ScoreType>("rank");
  const [pointMultiplier, setPointMultiplier] = useState(15);
  const [loading, setLoading] = useState(false);

  const saveGame = async () => {
    if (!name) {
      alert("ゲーム名を入力してください");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("games")
      .insert({
        camp_id: Number(campId),
        name,
        score_type: scoreType,
        point_multiplier: scoreType === "check" ? pointMultiplier : null,
      })
      .select()
      .single();

    setLoading(false);

    if (error || !data) {
      console.error(error);
      alert("ゲームの保存に失敗しました");
      return;
    }

    if (scoreType === "rank") {
      window.location.href = `/admin/camp/${campId}/games/${data.id}/rank`;
      return;
    }

    if (scoreType === "check") {
      window.location.href = `/admin/camp/${campId}/games/${data.id}/check`;
      return;
    }

    window.location.href = `/admin/camp/${campId}/games/${data.id}/manual`;
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6">
      <section className="mx-auto max-w-md">
        <a
          href={`/admin/camp/${campId}/games`}
          className="font-bold text-blue-600"
        >
          ← ゲーム管理へ戻る
        </a>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          🎮 ゲームを追加
        </h1>

        <div className="mt-6 rounded-3xl bg-white p-5 shadow">
          <label className="block">
            <span className="font-bold text-slate-900">ゲーム名</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-2xl border px-4 py-3"
              placeholder="例：フリークスクイズ"
            />
          </label>

          <label className="mt-4 block">
            <span className="font-bold text-slate-900">得点方式</span>
            <select
              value={scoreType}
              onChange={(e) => setScoreType(e.target.value as ScoreType)}
              className="mt-2 w-full rounded-2xl border px-4 py-3"
            >
              <option value="rank">順位制</option>
              <option value="check">チェック方式</option>
              <option value="manual">手動入力</option>
            </select>
          </label>

          {scoreType === "check" && (
            <label className="mt-4 block">
              <span className="font-bold text-slate-900">
                チェック1個あたりの点数
              </span>
              <input
                type="number"
                value={pointMultiplier}
                onChange={(e) => setPointMultiplier(Number(e.target.value))}
                className="mt-2 w-full rounded-2xl border px-4 py-3"
                placeholder="例：15"
              />
            </label>
          )}

          <div className="mt-5 rounded-2xl bg-slate-100 p-4 text-sm text-slate-600">
            {scoreType === "rank" && (
              <p>
                順位制は、チーム数に合わせて1位〜最下位までの点数を設定します。
              </p>
            )}

            {scoreType === "check" && (
              <p>
                チェック方式は、問題数を設定して、○の数 × 点数で合計点を計算します。
              </p>
            )}

            {scoreType === "manual" && (
              <p>
                手動入力は、各チームの点数をそのまま入力します。
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={saveGame}
            disabled={loading}
            className="mt-6 w-full rounded-2xl bg-blue-600 py-3 font-bold text-white disabled:bg-slate-400"
          >
            {loading ? "保存中..." : "ゲームを作成する"}
          </button>
        </div>
      </section>
    </main>
  );
}