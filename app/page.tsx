"use client";

import { useEffect, useState } from "react";
import BottomNav from "./components/BottomNav";
import { supabase } from "../lib/supabase";

type Schedule = {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  place?: string;
  memo?: string;
};

type Notice = {
  id: number;
  title: string;
  text: string;
  deadline: string | null;
  pinned: boolean;
};

export default function HomePage() {
  const [nextSchedules, setNextSchedules] = useState<Schedule[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    fetchNotices();
    fetchSchedules();
  }, []);

  const fetchNotices = async () => {
    const today = new Date().toISOString().slice(0, 10);

    const { data, error } = await supabase
      .from("notices")
      .select("*")
      .or(`deadline.is.null,deadline.gte.${today}`)
      .order("pinned", { ascending: false })
      .order("deadline", { ascending: true })
      .order("id", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setNotices(data || []);
  };

  const fetchSchedules = () => {
    const savedSchedules: Schedule[] = JSON.parse(
      localStorage.getItem("schedules") || "[]"
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcoming = savedSchedules
      .filter((schedule) => {
        const scheduleDate = new Date(schedule.date);
        scheduleDate.setHours(0, 0, 0, 0);
        return scheduleDate >= today;
      })
      .sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.startTime}`);
        const dateB = new Date(`${b.date}T${b.startTime}`);
        return dateA.getTime() - dateB.getTime();
      })
      .slice(0, 2);

    setNextSchedules(upcoming);
  };

  return (
    <main className="min-h-screen bg-slate-100 pb-24">
      <section className="mx-auto max-w-md px-4 py-6">
        <div className="rounded-[32px] bg-yellow-300 p-6 shadow">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-slate-900">
              V.C.Freaks!!
            </h1>

            <button className="rounded-full bg-white/70 px-4 py-3 text-2xl">
              ☰
            </button>
          </div>

          <p className="mt-2 text-sm font-bold text-slate-700">
            Circle App
          </p>

          <div className="mt-8 space-y-4">
            <a
              href="/schedule"
              className="block rounded-3xl border border-white/70 bg-white/50 p-5 text-center"
            >
              <p className="text-sm font-bold text-emerald-600">SCHEDULE</p>
              <h2 className="mt-2 text-xl font-bold text-slate-900">
                今日の予定を見る
              </h2>
            </a>

            <a
              href="/camp"
              className="block rounded-3xl border border-white/70 bg-white/50 p-5 text-center"
            >
              <p className="text-sm font-bold text-orange-500">CAMP</p>
              <h2 className="mt-2 text-xl font-bold text-slate-900">
                合宿ページ
              </h2>
            </a>

            <a
              href="/movie"
              className="block rounded-3xl border border-white/70 bg-white/50 p-5 text-center"
            >
              <p className="text-sm font-bold text-purple-500">MOVIE</p>
              <h2 className="mt-2 text-xl font-bold text-slate-900">
                サークル動画
              </h2>
            </a>
          </div>
        </div>

        <div className="mt-6 rounded-[32px] bg-white p-6 shadow">
          <h2 className="text-2xl font-bold text-slate-900">
            📢 お知らせ
          </h2>

          {notices.length === 0 ? (
            <p className="mt-4 text-slate-500">
              現在お知らせはありません。
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {notices.map((notice) => (
                <div
                  key={notice.id}
                  className="rounded-2xl border-l-4 border-yellow-400 bg-yellow-50 p-4"
                >
                  {notice.pinned && (
                    <p className="mb-1 text-xs font-bold text-red-500">
                      📌 重要
                    </p>
                  )}

                  <p className="font-bold text-slate-900">
                    {notice.title}
                  </p>

                  <p className="mt-1 text-sm text-slate-600">
                    {notice.text}
                  </p>

                  {notice.deadline && (
                    <p className="mt-2 text-sm font-bold text-orange-600">
                      締切：{notice.deadline}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 rounded-[32px] bg-white p-6 shadow">
          <h2 className="text-2xl font-bold text-slate-900">
            📅 次の予定
          </h2>

          {nextSchedules.length === 0 ? (
            <p className="mt-3 text-slate-600">
              直近の予定はまだ登録されていません。
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {nextSchedules.map((schedule) => (
                <a
                  key={schedule.id}
                  href="/schedule"
                  className="block rounded-2xl bg-slate-100 p-4"
                >
                  <p className="text-sm font-bold text-blue-600">
                    {schedule.date}　{schedule.startTime}〜{schedule.endTime}
                  </p>

                  <h3 className="mt-1 text-lg font-bold text-slate-900">
                    {schedule.title}
                  </h3>

                  {schedule.place && (
                    <p className="mt-1 text-sm text-slate-600">
                      場所：{schedule.place}
                    </p>
                  )}

                  {schedule.memo && (
                    <p className="mt-1 text-sm text-slate-600">
                      {schedule.memo}
                    </p>
                  )}
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 rounded-[32px] bg-white p-6 shadow">
          <h2 className="text-3xl font-bold text-slate-900">Movie</h2>
          <p className="mt-3 text-slate-600">
            サークルメンバーで作成した動画をここに表示します。
          </p>
        </div>
      </section>

      <BottomNav />
    </main>
  );
}

