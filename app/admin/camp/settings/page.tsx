"use client";

import { useEffect, useState } from "react";

type CampSettings = {
  campName: string;
  startDate: string;
  endDate: string;
};

export default function CampSettingsPage() {
  const [campName, setCampName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedSettings: CampSettings | null = JSON.parse(
      localStorage.getItem("campSettings") || "null"
    );

    if (savedSettings) {
      setCampName(savedSettings.campName);
      setStartDate(savedSettings.startDate);
      setEndDate(savedSettings.endDate);
    }
  }, []);

  const saveSettings = () => {
    const settings = {
      campName,
      startDate,
      endDate,
    };

    localStorage.setItem("campSettings", JSON.stringify(settings));
    setMessage("合宿設定を保存しました！");
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6">
      <section className="mx-auto max-w-md">
        <a href="/camp" className="font-bold text-blue-600">
          ← 合宿ホームへ戻る
        </a>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          ⚙️ 合宿設定
        </h1>
        <p className="mt-1 text-slate-600">
          合宿名・開始日・終了日を設定します
        </p>

        <div className="mt-6 rounded-3xl bg-white p-5 shadow">
          <label className="block">
            <span className="font-bold text-slate-900">合宿名</span>
            <input
              value={campName}
              onChange={(e) => setCampName(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
              placeholder="例：2026夏合宿"
            />
          </label>

          <label className="mt-4 block">
            <span className="font-bold text-slate-900">開始日</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
            />
          </label>

          <label className="mt-4 block">
            <span className="font-bold text-slate-900">終了日</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
            />
          </label>

          <button
            type="button"
            onClick={saveSettings}
            className="mt-6 w-full rounded-2xl bg-blue-600 py-3 font-bold text-white"
          >
            保存する
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

