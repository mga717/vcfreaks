"use client";

import { useEffect, useState } from "react";

type CampSchedule = {
  id: number;
  day: string;
  startTime: string;
  endTime: string;
  title: string;
  place: string;
  description: string;
};

export default function CampSchedulePage() {
  const [schedules, setSchedules] = useState<CampSchedule[]>([]);

  useEffect(() => {
    const savedSchedules: CampSchedule[] = JSON.parse(
      localStorage.getItem("campSchedules") || "[]"
    );

    setSchedules(savedSchedules);
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6">
      <section className="mx-auto max-w-md">
        <a href="/camp" className="font-bold text-blue-600">
          ← 合宿ホームへ戻る
        </a>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          🗓️ 合宿スケジュール
        </h1>
        <p className="mt-1 text-slate-600">合宿中の流れを確認できます</p>

        <a
          href="/admin/camp/schedule/new"
          className="mt-5 block w-full rounded-2xl bg-slate-900 py-3 text-center font-bold text-white"
        >
          管理者：予定を追加する
        </a>

        <div className="mt-6 space-y-4">
          {schedules.length === 0 ? (
            <div className="rounded-3xl bg-white p-5 shadow">
              <p className="text-slate-600">
                まだ合宿スケジュールが登録されていません。
              </p>
            </div>
          ) : (
            schedules.map((schedule) => (
              <div
                key={schedule.id}
                className="rounded-3xl bg-white p-5 shadow"
              >
                <p className="text-sm font-bold text-purple-600">
                  {schedule.day}
                </p>

                <h2 className="mt-2 text-xl font-bold text-slate-900">
                  {schedule.title}
                </h2>

                <p className="mt-2 font-semibold text-slate-700">
                  ⏰ {schedule.startTime}〜{schedule.endTime}
                </p>

                {schedule.place && (
                  <p className="mt-2 text-slate-700">📍 {schedule.place}</p>
                )}

                {schedule.description && (
                  <p className="mt-4 rounded-2xl bg-slate-100 p-4 text-slate-700">
                    {schedule.description}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}


