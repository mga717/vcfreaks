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
  participants: string[] | number;
  allowParticipation?: boolean;
};

export default function SchedulePage() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const savedName = localStorage.getItem("userName") || "";
    setUserName(savedName);

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

  const updateSchedule = (updatedSchedule: Schedule) => {
    const updatedSchedules = schedules.map((schedule) =>
      schedule.id === updatedSchedule.id ? updatedSchedule : schedule
    );

    localStorage.setItem("schedules", JSON.stringify(updatedSchedules));
    setSchedules(updatedSchedules);
  };

  const joinSchedule = (schedule: Schedule) => {
    if (!userName) {
      window.location.href = "/mypage";
      return;
    }

    const participants = Array.isArray(schedule.participants)
      ? schedule.participants
      : [];

    if (participants.includes(userName)) return;

    updateSchedule({
      ...schedule,
      participants: [...participants, userName],
    });
  };

  const leaveSchedule = (schedule: Schedule) => {
    if (!userName) return;

    const participants = Array.isArray(schedule.participants)
      ? schedule.participants
      : [];

    updateSchedule({
      ...schedule,
      participants: participants.filter((name) => name !== userName),
    });
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
            schedules.map((schedule) => {
              const participants = Array.isArray(schedule.participants)
                ? schedule.participants
                : [];

              const isJoined = userName
                ? participants.includes(userName)
                : false;

              return (
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
                    👥 参加予定 {participants.length}人
                  </p>

                  {schedule.allowParticipation === false ? (
                    <p className="mt-4 rounded-2xl bg-slate-100 p-3 text-center font-bold text-slate-500">
                      この予定は参加登録なし
                    </p>
                  ) : isJoined ? (
                    <button
                      type="button"
                      onClick={() => leaveSchedule(schedule)}
                      className="mt-4 w-full rounded-2xl bg-red-500 py-3 font-bold text-white"
                    >
                      参加を取り消す
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => joinSchedule(schedule)}
                      className="mt-4 w-full rounded-2xl bg-green-600 py-3 font-bold text-white"
                    >
                      参加する
                    </button>
                  )}

                  <a
                    href={`/schedule/${schedule.id}`}
                    className="mt-3 block w-full rounded-2xl bg-blue-600 py-2 text-center font-bold text-white"
                  >
                    詳細を見る
                  </a>
                </div>
              );
            })
          )}
        </div>
      </section>

      <BottomNav />
    </main>
  );
}


