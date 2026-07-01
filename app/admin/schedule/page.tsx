"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

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

  const deleteSchedule = async (id: number) => {
    if (!confirm("この予定を削除しますか？")) return;

    const { error } = await supabase.from("schedules").delete().eq("id", id);

    if (error) {
      console.error(error);
      alert("削除に失敗しました。");
      return;
    }

    fetchSchedules();
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

        <a
          href="/admin/schedule/new"
          className="mt-6 block rounded-2xl bg-blue-600 py-3 text-center font-bold text-white"
        >
          ＋ 予定を追加する
        </a>

        <div className="mt-6 space-y-4">
          {schedules.length === 0 ? (
            <div className="rounded-3xl bg-white p-5 shadow">
              <p className="text-slate-600">まだ予定がありません。</p>
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

                <p className="mt-2 text-sm">
                  {schedule.allow_participation ? (
                    <span className="font-bold text-green-600">✅ 参加受付中</span>
                  ) : (
                    <span className="font-bold text-slate-500">参加登録なし</span>
                  )}
                </p>

                <button
                  onClick={() => deleteSchedule(schedule.id)}
                  className="mt-4 w-full rounded-2xl bg-red-500 py-3 font-bold text-white"
                >
                  削除する
                </button>

                <a
                  href={`/schedule/${schedule.id}`}
                  className="mt-3 block rounded-2xl bg-blue-600 py-3 text-center font-bold text-white"
                >
                  参加者画面で確認
                </a>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
