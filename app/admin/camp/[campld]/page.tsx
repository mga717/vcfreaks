"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../../lib/supabase";

type Camp = {
  id: number;
  name: string;
  year: number;
  start_date: string;
  end_date: string;
};

export default function CampHomePage() {
  const { campId } = useParams();

  const [camp, setCamp] = useState<Camp | null>(null);

  useEffect(() => {
    fetchCamp();
  }, []);

  const fetchCamp = async () => {
    const { data } = await supabase
      .from("camps")
      .select("*")
      .eq("id", campId)
      .single();

    if (data) {
      setCamp(data);
    }
  };

  if (!camp) return null;

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6">
      <section className="mx-auto max-w-md">

        <a
          href="/admin/camp"
          className="font-bold text-blue-600"
        >
          ← 合宿一覧へ戻る
        </a>

        <h1 className="mt-6 text-3xl font-bold">
          🏕️ {camp.name}
        </h1>

        <p className="mt-2 text-slate-600">
          {camp.start_date}〜{camp.end_date}
        </p>

        <div className="mt-8 space-y-4">

          <a
            href={`/admin/camp/${camp.id}/schedule`}
            className="block rounded-3xl bg-white p-5 shadow"
          >
            <p className="text-sm font-bold text-blue-600">
              スケジュール
            </p>

            <h2 className="mt-2 text-xl font-bold">
              合宿予定を管理する
            </h2>
          </a>

          <a
            href={`/admin/camp/${camp.id}/members`}
            className="block rounded-3xl bg-white p-5 shadow"
          >
            <p className="text-sm font-bold text-pink-600">
              参加者
            </p>

            <h2 className="mt-2 text-xl font-bold">
              参加者を管理する
            </h2>
          </a>

          <a
            href={`/admin/camp/${camp.id}/teams`}
            className="block rounded-3xl bg-white p-5 shadow"
          >
            <p className="text-sm font-bold text-purple-600">
              チーム
            </p>

            <h2 className="mt-2 text-xl font-bold">
              チームを作成する
            </h2>
          </a>

          <a
            href={`/admin/camp/${camp.id}/games`}
            className="block rounded-3xl bg-white p-5 shadow"
          >
            <p className="text-sm font-bold text-orange-600">
              レクリエーション
            </p>

            <h2 className="mt-2 text-xl font-bold">
              ゲームを管理する
            </h2>
          </a>

          <a
            href={`/admin/camp/${camp.id}/recreation`}
            className="block rounded-3xl bg-white p-5 shadow"
          >
            <p className="text-sm font-bold text-yellow-600">
              得点入力
            </p>

            <h2 className="mt-2 text-xl font-bold">
              レク得点を入力する
            </h2>
          </a>

          <a
            href={`/admin/camp/${camp.id}/matches`}
            className="block rounded-3xl bg-white p-5 shadow"
          >
            <p className="text-sm font-bold text-blue-600">
              フリークスカップ
            </p>

            <h2 className="mt-2 text-xl font-bold">
              対戦表を管理する
            </h2>
          </a>

          <a
            href={`/admin/camp/${camp.id}/overall-ranking`}
            className="block rounded-3xl bg-white p-5 shadow"
          >
            <p className="text-sm font-bold text-green-600">
              総合順位
            </p>

            <h2 className="mt-2 text-xl font-bold">
              総合順位を見る
            </h2>
          </a>

        </div>
      </section>
    </main>
  );
}

