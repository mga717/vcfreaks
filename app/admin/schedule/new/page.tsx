"use client";

import { useState } from "react";

type Schedule = {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  place: string;
  station: string;
  memo: string;
  participants: string[];
  allowParticipation: boolean;
};

export default function NewSchedulePage() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [place, setPlace] = useState("");
  const [station, setStation] = useState("");
  const [memo, setMemo] = useState("");
  const [allowParticipation, setAllowParticipation] = useState(true);

  const saveSchedule = () => {
    if (!title || !date || !startTime || !endTime) {
      alert("タイトル・日付・開始時間・終了時間を入力してください。");
      return;
    }

    const schedules: Schedule[] = JSON.parse(
      localStorage.getItem("schedules") || "[]"
    );

    const newSchedule: Schedule = {
      id: Date.now(),
      title,
      date,
      startTime,
      endTime,
      place,
      station,
      memo,
      participants: [],
      allowParticipation,
    };

    localStorage.setItem(
      "schedules",
      JSON.stringify([...schedules, newSchedule])
    );

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
            <span className="font-bold text-slate-900">タイトル</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
              placeholder="例：通常練習"
            />
          </label>

          <label className="mt-4 block">
            <span className="font-bold text-slate-900">日付</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
            />
          </label>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <label className="block">
              <span className="font-bold text-slate-900">開始時間</span>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
              />
            </label>

            <label className="block">
              <span className="font-bold text-slate-900">終了時間</span>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
              />
            </label>
          </div>

          <label className="mt-4 block">
            <span className="font-bold text-slate-900">場所</span>
            <input
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
              placeholder="例：体育館"
            />
          </label>

          <label className="mt-4 block">
            <span className="font-bold text-slate-900">最寄り駅</span>
            <input
              value={station}
              onChange={(e) => setStation(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
              placeholder="例：〇〇駅"
            />
          </label>

          <label className="mt-4 block">
            <span className="font-bold text-slate-900">メモ</span>
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
              placeholder="例：動ける服装で来てください"
            />
          </label>

          <label className="mt-4 flex items-center gap-3 rounded-2xl bg-slate-100 px-4 py-3">
            <input
              type="checkbox"
              checked={allowParticipation}
              onChange={(e) => setAllowParticipation(e.target.checked)}
              className="h-5 w-5"
            />
            <span className="font-bold text-slate-900">
              この予定は参加登録を受け付ける
            </span>
          </label>

          <button
            type="button"
            onClick={saveSchedule}
            className="mt-6 w-full rounded-2xl bg-blue-600 py-3 font-bold text-white"
          >
            保存する
          </button>
        </div>
      </section>
    </main>
  );
}




