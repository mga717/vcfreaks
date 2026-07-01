"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import BottomNav from "../../components/BottomNav";
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

type Participant = {
  id: number;
  schedule_id: number;
  user_name: string;
  created_at?: string;
};

export default function ScheduleDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedName = localStorage.getItem("userName") || "";
    setUserName(savedName);

    fetchSchedule();
    fetchParticipants();
  }, []);

  const fetchSchedule = async () => {
    const { data, error } = await supabase
      .from("schedules")
      .select("*")
      .eq("id", id)
      .single();

    setLoading(false);

    if (error) {
      console.error(error);
      return;
    }

    setSchedule(data);
  };

  const fetchParticipants = async () => {
    const { data, error } = await supabase
      .from("schedule_participants")
      .select("*")
      .eq("schedule_id", id)
      .order("created_at", { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    setParticipants(data || []);
  };

  const joinSchedule = async () => {
    if (!userName) {
      window.location.href = "/mypage";
      return;
    }

    const alreadyJoined = participants.some(
      (participant) => participant.user_name === userName
    );

    if (alreadyJoined) return;

    const { error } = await supabase.from("schedule_participants").insert({
      schedule_id: id,
      user_name: userName,
    });

    if (error) {
      console.error(error);
      alert("参加登録に失敗しました。");
      return;
    }

    fetchParticipants();
  };

  const leaveSchedule = async () => {
    if (!userName) return;

    const { error } = await supabase
      .from("schedule_participants")
      .delete()
      .eq("schedule_id", id)
      .eq("user_name", userName);

    if (error) {
      console.error(error);
      alert("参加取り消しに失敗しました。");
      return;
    }

    fetchParticipants();
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-100 pb-24 px-4 py-6">
        <section className="mx-auto max-w-md">
          <p className="text-slate-600">読み込み中...</p>
        </section>

        <BottomNav />
      </main>
    );
  }

  if (!schedule) {
    return (
      <main className="min-h-screen bg-slate-100 pb-24 px-4 py-6">
        <section className="mx-auto max-w-md">
          <p>予定が見つかりません。</p>
        </section>

        <BottomNav />
      </main>
    );
  }

  const isJoined = participants.some(
    (participant) => participant.user_name === userName
  );

  return (
    <main className="min-h-screen bg-slate-100 pb-24 px-4 py-6">
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
            {schedule.start_time}〜{schedule.end_time}
          </p>

          <p className="mt-3 text-slate-700">📍 {schedule.place}</p>
          <p className="mt-1 text-slate-700">🚉 {schedule.station}</p>

          {schedule.memo && (
            <p className="mt-4 rounded-2xl bg-slate-100 p-4 text-slate-700">
              {schedule.memo}
            </p>
          )}

          <p className="mt-5 font-bold text-slate-900">
            👥 参加予定 {participants.length}人
          </p>

          {schedule.allow_participation ? (
            !userName ? (
              <a
                href="/mypage"
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
            )
          ) : (
            <p className="mt-5 rounded-2xl bg-slate-100 p-3 text-center font-bold text-slate-500">
              この予定は参加登録なし
            </p>
          )}
        </div>

        <div className="mt-5 rounded-3xl bg-white p-5 shadow">
          <h2 className="text-xl font-bold text-slate-900">参加者一覧</h2>

          {participants.length === 0 ? (
            <p className="mt-3 text-slate-600">まだ参加者はいません。</p>
          ) : (
            <ul className="mt-3 space-y-2 text-slate-700">
              {participants.map((participant) => (
                <li key={participant.id}>・{participant.user_name}</li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <BottomNav />
    </main>
  );
}

