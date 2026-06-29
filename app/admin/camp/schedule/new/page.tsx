"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewCampSchedulePage() {
  const router = useRouter();

  const [campDays, setCampDays] = useState<string[]>([]);
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem("campSettings") || "null");

    if (!settings) return;

    const start = new Date(settings.startDate);
    const end = new Date(settings.endDate);

    const days: string[] = [];
    const current = new Date(start);
    let dayCount = 1;

    while (current <= end) {
      const month = current.getMonth() + 1;
      const date = current.getDate();

      days.push(`${dayCount}日目（${month}/${date}）`);

      current.setDate(current.getDate() + 1);
      dayCount++;
    }

    setCampDays(days);
  }, []);

  const saveSchedule = () => {
    const newSchedule = {
      id: Date.now(),
      day,
      startTime,
      endTime,
      title,
      place,
      description,
    };

    const schedules = JSON.parse(
      localStorage.getItem("campSchedules") || "[]"
    );

    localStorage.setItem(
      "campSchedules",
      JSON.stringify([...schedules, newSchedule])
    );

    router.push("/camp/schedule");
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6">
      <section className="mx-auto max-w-md">
        <a href="/camp/schedule" className="font-bold text-blue-600">
          ← 合宿スケジュールへ戻る
        </a>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          🗓️ 合宿予定を追加
        </h1>
        <p className="mt-1 text-slate-600">
          合宿中の予定・場所・説明を登録します
        </p>

        <form className="mt-6 rounded-3xl bg-white p-5 shadow">
          <label className="block">
            <span className="font-bold text-slate-900">日程</span>

            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
            >
              <option value="">選択してください</option>

              {campDays.map((campDay) => (
                <option key={campDay} value={campDay}>
                  {campDay}
                </option>
              ))}
            </select>
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
            <span className="font-bold text-slate-900">タイトル</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
              placeholder="例：集合"
            />
          </label>

          <label className="mt-4 block">
            <span className="font-bold text-slate-900">場所</span>
            <input
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
              placeholder="例：宿泊施設ロビー"
            />
          </label>

          <label className="mt-4 block">
            <span className="font-bold text-slate-900">詳細・説明</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
              placeholder="例：時間厳守。遅れる場合は幹事に連絡してください。"
            />
          </label>

          <button
            type="button"
            onClick={saveSchedule}
            className="mt-6 w-full rounded-2xl bg-blue-600 py-3 font-bold text-white"
          >
            保存する
          </button>
        </form>
      </section>
    </main>
  );
}

