"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Schedule = {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  place: string;
  station: string;
  memo: string;
  participants: number;
};

export default function EditSchedulePage() {
  const params = useParams();
  const router = useRouter();

  const id = Number(params.id);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [place, setPlace] = useState("");
  const [station, setStation] = useState("");
  const [memo, setMemo] = useState("");

  useEffect(() => {
    const schedules: Schedule[] = JSON.parse(
      localStorage.getItem("schedules") || "[]"
    );

    const schedule = schedules.find((schedule) => schedule.id === id);

    if (!schedule) return;

    setTitle(schedule.title);
    setDate(schedule.date);
    setStartTime(schedule.startTime);
    setEndTime(schedule.endTime);
    setPlace(schedule.place);
    setStation(schedule.station);
    setMemo(schedule.memo);
  }, [id]);

  const updateSchedule = () => {
    const schedules: Schedule[] = JSON.parse(
      localStorage.getItem("schedules") || "[]"
    );

    const updatedSchedules = schedules.map((schedule) => {
      if (schedule.id === id) {
        return {
          ...schedule,
          title,
          date,
          startTime,
          endTime,
          place,
          station,
          memo,
        };
      }

      return schedule;
    });

    localStorage.setItem("schedules", JSON.stringify(updatedSchedules));

    router.push("/schedule");
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6">
      <section className="mx-auto max-w-md">
        <h1 className="text-3xl font-bold text-slate-900">✏️ 予定を編集</h1>
        <p className="mt-1 text-slate-600">登録済みの予定を変更します</p>

        <form className="mt-6 rounded-3xl bg-white p-5 shadow">
          <label className="block">
            <span className="font-bold text-slate-900">予定名</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
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
            />
          </label>

          <label className="mt-4 block">
            <span className="font-bold text-slate-900">最寄り駅</span>
            <input
              value={station}
              onChange={(e) => setStation(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
            />
          </label>

          <label className="mt-4 block">
            <span className="font-bold text-slate-900">メモ</span>
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
            />
          </label>

          <button
            type="button"
            onClick={updateSchedule}
            className="mt-6 w-full rounded-2xl bg-blue-600 py-3 font-bold text-white"
          >
            更新する
          </button>
        </form>
      </section>
    </main>
  );
}


