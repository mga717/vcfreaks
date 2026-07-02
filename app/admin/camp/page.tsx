"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

type Camp = {
  id: number;
  name: string;
  year: number;
  season: string;
  start_date: string;
  end_date: string;
  is_published: boolean;
};

export default function AdminCampPage() {
  const [camps, setCamps] = useState<Camp[]>([]);
  const [name, setName] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [season, setSeason] = useState("autumn");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isPublished, setIsPublished] = useState(true);

  useEffect(() => {
    fetchCamps();
  }, []);

  const fetchCamps = async () => {
    const { data, error } = await supabase
      .from("camps")
      .select("*")
      .order("year", { ascending: false })
      .order("start_date", { ascending: false });

    if (error) {
      console.error(error);
      alert("合宿の取得に失敗しました");
      return;
    }

    setCamps(data || []);
  };

  const createCamp = async () => {
    if (!name || !startDate || !endDate) {
      alert("合宿名・開始日・終了日を入力してください");
      return;
    }

    const { error } = await supabase.from("camps").insert({
      name,
      year,
      season,
      start_date: startDate,
      end_date: endDate,
      is_published: isPublished,
    });

    if (error) {
      console.error(error);
      alert("合宿の作成に失敗しました");
      return;
    }

    setName("");
    setYear(new Date().getFullYear());
    setSeason("autumn");
    setStartDate("");
    setEndDate("");
    setIsPublished(true);

    fetchCamps();
  };

  const deleteCamp = async (id: number) => {
    if (!confirm("この合宿を削除しますか？")) return;

    const { error } = await supabase.from("camps").delete().eq("id", id);

    if (error) {
      console.error(error);
      alert("削除に失敗しました");
      return;
    }

    fetchCamps();
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6">
      <section className="mx-auto max-w-md">
        <a href="/admin" className="font-bold text-blue-600">
          ← 管理者ホームへ戻る
        </a>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          🏕️ 合宿管理
        </h1>

        <p className="mt-1 text-slate-600">
          年度ごとの合宿を作成・管理します。
        </p>

        <div className="mt-6 rounded-3xl bg-white p-5 shadow">
          <h2 className="text-xl font-bold text-slate-900">
            ＋ 合宿を作成
          </h2>

          <label className="mt-4 block">
            <span className="font-bold text-slate-900">合宿名</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-2xl border px-4 py-3"
              placeholder="例：2026年 秋合宿"
            />
          </label>

          <label className="mt-4 block">
            <span className="font-bold text-slate-900">年度</span>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="mt-2 w-full rounded-2xl border px-4 py-3"
            />
          </label>

          <label className="mt-4 block">
            <span className="font-bold text-slate-900">種類</span>
            <select
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              className="mt-2 w-full rounded-2xl border px-4 py-3"
            >
              <option value="spring">春合宿</option>
              <option value="summer">夏合宿</option>
              <option value="autumn">秋合宿</option>
              <option value="sports">運動会合宿</option>
            </select>
          </label>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <label>
              <span className="font-bold text-slate-900">開始日</span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-2 w-full rounded-2xl border px-4 py-3"
              />
            </label>

            <label>
              <span className="font-bold text-slate-900">終了日</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-2 w-full rounded-2xl border px-4 py-3"
              />
            </label>
          </div>

          <label className="mt-4 flex items-center gap-3 rounded-2xl bg-slate-100 px-4 py-3">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="h-5 w-5"
            />
            <span className="font-bold text-slate-900">
              参加者側に公開する
            </span>
          </label>

          <button
            type="button"
            onClick={createCamp}
            className="mt-6 w-full rounded-2xl bg-blue-600 py-3 font-bold text-white"
          >
            合宿を作成する
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {camps.length === 0 ? (
            <div className="rounded-3xl bg-white p-5 shadow">
              <p className="text-slate-600">
                まだ合宿が作成されていません。
              </p>
            </div>
          ) : (
            camps.map((camp) => (
              <div key={camp.id} className="rounded-3xl bg-white p-5 shadow">
                <p className="text-sm font-bold text-orange-600">
                  {camp.year}年
                </p>

                <h2 className="mt-2 text-xl font-bold text-slate-900">
                  {camp.name}
                </h2>

                <p className="mt-2 text-slate-700">
                  {camp.start_date} 〜 {camp.end_date}
                </p>

                <p className="mt-2 text-sm">
                  {camp.is_published ? (
                    <span className="font-bold text-green-600">
                      ✅ 公開中
                    </span>
                  ) : (
                    <span className="font-bold text-slate-500">
                      非公開
                    </span>
                  )}
                </p>

                <a
                  href={`/admin/camp/${camp.id}`}
                  className="mt-4 block rounded-2xl bg-blue-600 py-3 text-center font-bold text-white"
                >
                  この合宿を管理する
                </a>

                <button
                  type="button"
                  onClick={() => deleteCamp(camp.id)}
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

