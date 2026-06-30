"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";


export default function NewSchedulePage() {
    const router = useRouter();

    const [title, setTitle] = useState("");
const [date, setDate] = useState("");
const [startTime, setStartTime] = useState("");
const [endTime, setEndTime] = useState("");
const [place, setPlace] = useState("");
const [station, setStation] = useState("");
const [memo, setMemo] = useState("");
const [savedMessage, setSavedMessage] = useState("");

    return (
      <main className="min-h-screen bg-slate-100 px-4 py-6">
        <section className="mx-auto max-w-md">
          <h1 className="text-3xl font-bold text-slate-900">📅 予定を追加</h1>
          <p className="mt-1 text-slate-600">練習やイベントの予定を登録します</p>
  
          <form className="mt-6 rounded-3xl bg-white p-5 shadow">
            <label className="block">
              <span className="font-bold text-slate-900">予定名</span>
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
  
            <label className="mt-4 block">
              <span className="font-bold text-slate-900">開始時間</span>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
              />
            </label>
  
            <label className="mt-4 block">
              <span className="font-bold text-slate-900">終了時間</span>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
              />
            </label>
  
            <label className="mt-4 block">
              <span className="font-bold text-slate-900">場所</span>
              <input
               value={place}
               onChange={(e) => setPlace(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
                placeholder="例：〇〇体育館"
              />
            </label>
  
            <label className="mt-4 block">
              <span className="font-bold text-slate-900">最寄り駅</span>
              <input
               value={station}
               onChange={(e) => setStation(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
                placeholder="例：尾山台駅"
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
  
            <button
  type="button"
  onClick={() => {
    const newSchedule = {
      id: Date.now(),
      title,
      date,
      startTime,
      endTime,
      place,
      station,
      memo,
      participants: 0,
    };

    const schedules = JSON.parse(
      localStorage.getItem("schedules") || "[]"
    );

    localStorage.setItem(
      "schedules",
      JSON.stringify([...schedules, newSchedule])
    );

    router.push("/schedule");
  }}
  className="mt-6 w-full rounded-2xl bg-blue-600 py-3 font-bold text-white"
>
  保存する
</button>
            
            {savedMessage && (
  <p className="mt-4 rounded-2xl bg-blue-50 p-4 font-bold text-blue-700">
    {savedMessage}
  </p>
)}

          </form>
        </section>
      </main>
    );
  }



