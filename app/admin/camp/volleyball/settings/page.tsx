"use client";

import { useEffect, useState } from "react";

type VolleyballSettings = {
  setCount: number;
  pointPerSet: number;
  rankingRule: string;
};

export default function VolleyballSettingsPage() {
  const [setCount, setSetCount] = useState(1);
  const [pointPerSet, setPointPerSet] = useState(25);
  const [rankingRule, setRankingRule] = useState("wins-pointDiff-totalPoints");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedSettings: VolleyballSettings | null = JSON.parse(
      localStorage.getItem("volleyballSettings") || "null"
    );

    if (!savedSettings) return;

    setSetCount(savedSettings.setCount);
    setPointPerSet(savedSettings.pointPerSet);
    setRankingRule(savedSettings.rankingRule);
  }, []);

  const saveSettings = () => {
    const settings = {
      setCount,
      pointPerSet,
      rankingRule,
    };

    localStorage.setItem("volleyballSettings", JSON.stringify(settings));
    setMessage("バレー設定を保存しました！");
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6">
      <section className="mx-auto max-w-md">
        <a href="/admin/camp" className="font-bold text-blue-600">
          ← 合宿管理へ戻る
        </a>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          🏐 バレー設定
        </h1>
        <p className="mt-1 text-slate-600">
          セット数・1セットの点数・順位決定方法を設定します
        </p>

        <div className="mt-6 rounded-3xl bg-white p-5 shadow">
          <label className="block">
            <span className="font-bold text-slate-900">何セット制</span>
            <select
              value={setCount}
              onChange={(e) => setSetCount(Number(e.target.value))}
              className="mt-2 w-full rounded-2xl border px-4 py-3"
            >
              <option value={1}>1セット制</option>
              <option value={3}>3セット制</option>
            </select>
          </label>

          <label className="mt-5 block">
            <span className="font-bold text-slate-900">1セットの点数</span>
            <select
              value={pointPerSet}
              onChange={(e) => setPointPerSet(Number(e.target.value))}
              className="mt-2 w-full rounded-2xl border px-4 py-3"
            >
              <option value={15}>15点</option>
              <option value={21}>21点</option>
              <option value={25}>25点</option>
            </select>
          </label>

          <label className="mt-5 block">
            <span className="font-bold text-slate-900">順位決定方法</span>
            <select
              value={rankingRule}
              onChange={(e) => setRankingRule(e.target.value)}
              className="mt-2 w-full rounded-2xl border px-4 py-3"
            >
              <option value="wins-pointDiff-totalPoints">
                勝利数 → 得失点差 → 総得点
              </option>
            </select>
          </label>

          <div className="mt-5 rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">
            <p className="font-bold text-slate-900">現在の設定</p>
            <p className="mt-2">・{setCount}セット制</p>
            <p>・1セット {pointPerSet}点</p>
            <p>・順位は「勝利数 → 得失点差 → 総得点」で決定</p>
          </div>

          <button
            type="button"
            onClick={saveSettings}
            className="mt-6 w-full rounded-2xl bg-blue-600 py-3 font-bold text-white"
          >
            設定を保存する
          </button>

          {message && (
            <p className="mt-4 rounded-2xl bg-blue-50 p-4 font-bold text-blue-700">
              {message}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

