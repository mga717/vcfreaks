"use client";

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
  allowParticipation?: boolean;
};

export default function SchedulePage() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    const savedSchedules: Schedule[] = JSON.parse(
      localStorage.getItem("schedules") || "[]"
    );

    const fixedSchedules = savedSchedules.map((schedule) => ({
      ...schedule,
      participants: Array.isArray(schedule.participants)
        ? schedule.participants
        : [],
      allowParticipation: schedule.allowParticipation ?? true,
    }));

    setSchedules(fixedSchedules);
  }, []);

  const deleteSchedule = (id: number) => {
    if (!confirm("この予定を削除しますか？")) return;

    const updatedSchedules = schedules.filter(
      (schedule) => schedule.id !== id
    );

    localStorage.setItem("schedules", JSON.stringify(updatedSchedules));
    setSchedules(updatedSchedules);
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6">
      <section className="mx-auto max-w-md">
        <a href="/admin" className="font-bold text-blue-600">
          ← 管理者ホームへ戻る
        </a>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          📅 管理者：予定一覧
        </h1>

        <p className="mt-1 text-slate-600">
          予定の追加・編集・削除を行います。
        </p>

        <a
          href="/admin/schedule/new"
          className="mt-6 block w-full rounded-2xl bg-blue-600 py-3 text-center font-bold text-white"
        >
          ＋ 予定を追加する
        </a>

        <div className="mt-6 space-y-4">
          {schedules.length === 0 ? (
            <div className="rounded-3xl bg-white p-5 shadow">
              <p className="text-slate-600">
                まだ予定が登録されていません。
              </p>
            </div>
          ) : (
            schedules.map((schedule) => (
              <div
                key={schedule.id}
                className="rounded-3xl bg-white p-5 shadow"
              >
                <p className="text-sm font-bold text-blue-600">
                  {schedule.title}
                </p>

                <h2 className="mt-2 text-xl font-bold text-slate-900">
                  {schedule.date}
                </h2>

                <p className="mt-2 text-slate-700">
                  {schedule.startTime}〜{schedule.endTime}
                </p>

                <p className="mt-2 text-slate-700">📍 {schedule.place}</p>
                <p className="mt-1 text-slate-700">🚉 {schedule.station}</p>

                {schedule.memo && (
                  <p className="mt-3 rounded-2xl bg-slate-100 p-3 text-slate-700">
                    {schedule.memo}
                  </p>
                )}

                <p className="mt-3 font-semibold text-slate-900">
                  👥 参加予定 {schedule.participants.length}人
                </p>

                <p className="mt-2 text-sm">
                  {schedule.allowParticipation ? (
                    <span className="font-bold text-green-600">
                      ✅ 参加受付中
                    </span>
                  ) : (
                    <span className="font-bold text-slate-500">
                      参加登録なし
                    </span>
                  )}
                </p>

                <a
                  href={`/admin/schedule/edit/${schedule.id}`}
                  className="mt-4 block w-full rounded-2xl bg-slate-800 py-3 text-center font-bold text-white"
                >
                  編集する
                </a>

                <a
                  href={`/schedule/${schedule.id}`}
                  className="mt-3 block w-full rounded-2xl bg-blue-600 py-3 text-center font-bold text-white"
                >
                  参加者画面で確認
                </a>

                <button
                  type="button"
                  onClick={() => deleteSchedule(schedule.id)}
                  className="mt-3 w-full rounded-2xl bg-red-500 py-3 font-bold text-white"
                >
                  削除する
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

