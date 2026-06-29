"use client";

import { useParams } from "next/navigation";
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
  participants: string[];
};

export default function ScheduleDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const savedName = localStorage.getItem("userName") || "";
    setUserName(savedName);

    const schedules: Schedule[] = JSON.parse(
      localStorage.getItem("schedules") || "[]"
    );

    const foundSchedule = schedules.find((schedule) => schedule.id === id);

    if (foundSchedule) {
      setSchedule({
        ...foundSchedule,
        participants: Array.isArray(foundSchedule.participants)
          ? foundSchedule.participants
          : [],
      });
    }
  }, [id]);

  const joinSchedule = () => {
    if (!schedule || !userName) return;

    if (schedule.participants.includes(userName)) return;

    const updatedSchedule = {
      ...schedule,
      participants: [...schedule.participants, userName],
    };

    const schedules: Schedule[] = JSON.parse(
      localStorage.getItem("schedules") || "[]"
    );

    const updatedSchedules = schedules.map((item) =>
      item.id === id ? updatedSchedule : item
    );

    localStorage.setItem("schedules", JSON.stringify(updatedSchedules));
    setSchedule(updatedSchedule);
  };

  const leaveSchedule = () => {
    if (!schedule || !userName) return;

    const updatedSchedule = {
      ...schedule,
      participants: schedule.participants.filter((name) => name !== userName),
    };

    const schedules: Schedule[] = JSON.parse(
      localStorage.getItem("schedules") || "[]"
    );

    const updatedSchedules = schedules.map((item) =>
      item.id === id ? updatedSchedule : item
    );

    localStorage.setItem("schedules", JSON.stringify(updatedSchedules));
    setSchedule(updatedSchedule);
  };

  if (!schedule) {
    return (
      <main className="min-h-screen bg-slate-100 px-4 py-6">
        <section className="mx-auto max-w-md">
          <p>予定が見つかりません。</p>
        </section>
      </main>
    );
  }

  const isJoined = schedule.participants.includes(userName);

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6">
      <section className="mx-auto max-w-md">
        <a href="/schedule" className="font-bold text-blue-600">
          ← 予定一覧へ戻る
        </a>

        <div className="mt-6 rounded-3xl bg-white p-5 shadow">
          <p className="text-sm font-bold text-blue-600">{schedule.title}</p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            {schedule.date}
          </h1>

          <p className="mt-3 text-slate-700">
            {schedule.startTime}〜{schedule.endTime}
          </p>
          <p className="mt-3 text-slate-700">📍 {schedule.place}</p>
          <p className="mt-1 text-slate-700">🚉 {schedule.station}</p>

          {schedule.memo && (
            <p className="mt-4 rounded-2xl bg-slate-100 p-4 text-slate-700">
              {schedule.memo}
            </p>
          )}

          <p className="mt-5 font-bold text-slate-900">
            👥 参加予定 {schedule.participants.length}人
          </p>

          {!userName ? (
            <a
              href="/profile"
              className="mt-5 block w-full rounded-2xl bg-slate-800 py-3 text-center font-bold text-white"
            >
              名前を登録して参加する
            </a>
          ) : isJoined ? (
            <div className="mt-5 space-y-3">
              <p className="rounded-2xl bg-green-50 p-3 text-center font-bold text-green-700">
                ✓ 参加中
              </p>

              <button
                type="button"
                onClick={leaveSchedule}
                className="w-full rounded-2xl bg-red-500 py-3 font-bold text-white"
              >
                参加を取り消す
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={joinSchedule}
              className="mt-5 w-full rounded-2xl bg-green-600 py-3 font-bold text-white"
            >
              参加する
            </button>
          )}
        </div>

        <div className="mt-5 rounded-3xl bg-white p-5 shadow">
          <h2 className="text-xl font-bold text-slate-900">参加者一覧</h2>

          {schedule.participants.length === 0 ? (
            <p className="mt-3 text-slate-600">まだ参加者はいません。</p>
          ) : (
            <ul className="mt-3 space-y-2 text-slate-700">
              {schedule.participants.map((name) => (
                <li key={name}>・{name}</li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}

