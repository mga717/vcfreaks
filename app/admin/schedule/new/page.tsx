"use client";

import { useState } from "react";
import { supabase } from "../../../../lib/supabase";

export default function NewSchedulePage() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [place, setPlace] = useState("");
  const [station, setStation] = useState("");
  const [memo, setMemo] = useState("");
  const [allowParticipation, setAllowParticipation] = useState(true);
  const [loading, setLoading] = useState(false);

  const saveSchedule = async () => {
    if (!title || !date || !startTime || !endTime) {
      alert("タイトル・日付・開始時間・終了時間を入力してください。");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("schedules").insert({
      title,
      date,
      start_time: startTime,
      end_time: endTime,
      place,
      station,
      memo,
      allow_participation: allowParticipation,
    });

    setLoading(false);

    if (error) {
      console.error(error);
      alert("予定の保存に失敗しました。");
      return;
    }

    alert("予定を保存しました！");

    setTitle("");
    setDate("");
    setStartTime("");
    setEndTime("");
    setPlace("");
    setStation("");
    setMemo("");
    setAllowParticipation(true);
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6">
      <section className="mx-auto max-w-md">
        <a href="/admin/schedule" className="font-bold text-blue-600">
          ← 予定一覧へ戻る
        </a>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          📅 予定を追加
        </h1>

        <div className="mt-6 rounded-3xl bg-white p-5 shadow">
          <label className="block">
            <span className="font-bold">タイトル</span>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-2 w-full rounded-2xl border px-4 py-3" />
          </label>

          <label className="mt-4 block">
            <span className="font-bold">日付</span>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-2 w-full rounded-2xl border px-4 py-3" />
          </label>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="rounded-2xl border px-4 py-3" />
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="rounded-2xl border px-4 py-3" />
          </div>

          <input value={place} onChange={(e) => setPlace(e.target.value)} placeholder="場所" className="mt-4 w-full rounded-2xl border px-4 py-3" />
          <input value={station} onChange={(e) => setStation(e.target.value)} placeholder="最寄り駅" className="mt-4 w-full rounded-2xl border px-4 py-3" />

          <textarea value={memo} onChange={(e) => setMemo(e.target.value)} placeholder="メモ" className="mt-4 w-full rounded-2xl border px-4 py-3" />

          <label className="mt-4 flex items-center gap-3 rounded-2xl bg-slate-100 px-4 py-3">
            <input
              type="checkbox"
              checked={allowParticipation}
              onChange={(e) => setAllowParticipation(e.target.checked)}
              className="h-5 w-5"
            />
            <span className="font-bold">参加登録を受け付ける</span>
          </label>

          <button
            onClick={saveSchedule}
            disabled={loading}
            className="mt-6 w-full rounded-2xl bg-blue-600 py-3 font-bold text-white disabled:bg-slate-400"
          >
            {loading ? "保存中..." : "保存する"}
          </button>
        </div>
      </section>
    </main>
  );
}



