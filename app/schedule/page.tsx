
"use client";

import BottomNav from "../components/BottomNav";
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
  
  export default function SchedulePage() {
    const deleteSchedule = (id: number) => {
        const updatedSchedules = schedules.filter((schedule) => schedule.id !== id);
      
        localStorage.setItem("schedules", JSON.stringify(updatedSchedules));
      
        setSchedules(updatedSchedules);
      };


    const [schedules, setSchedules] = useState<Schedule[]>([]);
  
    useEffect(() => {
      const savedSchedules = JSON.parse(
        localStorage.getItem("schedules") || "[]"
      );
  
      setSchedules(savedSchedules);
    }, []);
  
    return (
      <main className="min-h-screen bg-slate-100 px-4 py-6">
        <section className="mx-auto max-w-md">
          <h1 className="text-3xl font-bold text-slate-900">📅 予定一覧</h1>
          <p className="mt-1 text-slate-600">今後のサークル予定</p>
  
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
                  <p className="mt-3 font-semibold text-slate-900">
                    👥 参加予定 {schedule.participants}人
                  </p>
                  <button
  onClick={() => deleteSchedule(schedule.id)}
  className="mt-4 w-full rounded-2xl bg-red-500 py-2 font-bold text-white"
>
  削除する
</button>

<a
  href={`/admin/schedule/edit/${schedule.id}`}
  className="mt-3 block w-full rounded-2xl bg-slate-800 py-2 text-center font-bold text-white"
>
  編集する
</a>

<a
  href={`/schedule/${schedule.id}`}
  className="mt-3 block w-full rounded-2xl bg-blue-600 py-2 text-center font-bold text-white"
>
  詳細を見る
</a>







                </div>
              ))
            )}
          </div>
        </section>
        <BottomNav />
      </main>
    );
  }

  

