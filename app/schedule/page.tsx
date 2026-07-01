"use client";

import { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";
import { supabase } from "../../lib/supabase";

type Schedule = {
  id: number;
  title: string;
  date: string;
  start_time: string;
  end_time: string;
  place: string;
  station: string;
  memo: string;
  allow_participation: boolean;
};

export default function SchedulePage() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    const { data, error } = await supabase
      .from("schedules")
      .select("*")
      .order("date", { ascending: true })
      .order("start_time", { ascending: true });

    if (error) {
      console.error(error);
      alert("予定の取得に失敗しました。");
      return;
    }

    setSchedules(data || []);
  };

  return (
    <main className="min-h-screen bg-slate-100 pb-24 px-4 py-6">
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
              <div key={schedule.id} className="rounded-3xl bg-white p-5 shadow">
                <p className="text-sm font-bold text-blue-600">
                  {schedule.title}
                </p>

                <h2 className="mt-2 text-xl font-bold text-slate-900">
                  {schedule.date}
                </h2>

                <p className="mt-2 text-slate-700">
                  {schedule.start_time}〜{schedule.end_time}
                </p>

                <p className="mt-2 text-slate-700">📍 {schedule.place}</p>
                <p className="mt-1 text-slate-700">🚉 {schedule.station}</p>

                {schedule.memo && (
                  <p className="mt-3 rounded-2xl bg-slate-100 p-3 text-slate-700">
                    {schedule.memo}
                  </p>
                )}

                {schedule.allow_participation ? (
                  <a
                    href={`/schedule/${schedule.id}`}
                    className="mt-4 block w-full rounded-2xl bg-green-600 py-3 text-center font-bold text-white"
                  >
                    参加・詳細を見る
                  </a>
                ) : (
                  <a
                    href={`/schedule/${schedule.id}`}
                    className="mt-4 block w-full rounded-2xl bg-blue-600 py-3 text-center font-bold text-white"
                  >
                    詳細を見る
                  </a>
                )}
              </div>
            ))
          )}
        </div>
      </section>

      <BottomNav />
    </main>
  );
}


