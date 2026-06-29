"use client";

import { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";

type Profile = {
  name: string;
  grade: string;
  position: string;
  practiceCount: number;
};

export default function MyPage() {
  const [profile, setProfile] = useState<Profile>({
    name: "",
    grade: "1年",
    position: "未定",
    practiceCount: 0,
  });

  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const savedProfile: Profile | null = JSON.parse(
      localStorage.getItem("profile") || "null"
    );

    if (savedProfile) {
      setProfile(savedProfile);
    }
  }, []);

  const saveProfile = () => {
    localStorage.setItem("profile", JSON.stringify(profile));

    // 以前の参加ボタンで使っていた userName も一緒に更新
    localStorage.setItem("userName", profile.name);

    setSavedMessage("プロフィールを保存しました！");
  };

  return (
    <main className="min-h-screen bg-slate-100 pb-24">
      <section className="mx-auto max-w-md px-4 py-6">
        <h1 className="text-3xl font-bold text-slate-900">👤 My Page</h1>
        <p className="mt-1 text-slate-600">プロフィールを登録できます</p>

        <div className="mt-6 rounded-3xl bg-white p-5 shadow">
          <label className="block">
            <span className="font-bold text-slate-900">名前</span>
            <input
              value={profile.name}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
              className="mt-2 w-full rounded-2xl border px-4 py-3"
              placeholder="例：松本桜奈"
            />
          </label>

          <label className="mt-4 block">
            <span className="font-bold text-slate-900">学年</span>
            <select
              value={profile.grade}
              onChange={(e) =>
                setProfile({ ...profile, grade: e.target.value })
              }
              className="mt-2 w-full rounded-2xl border px-4 py-3"
            >
              <option value="1年">1年</option>
              <option value="2年">2年</option>
              <option value="3年">3年</option>
              <option value="4年">4年</option>
              <option value="OB・OG">OB・OG</option>
            </select>
          </label>

          <label className="mt-4 block">
            <span className="font-bold text-slate-900">ポジション</span>
            <select
              value={profile.position}
              onChange={(e) =>
                setProfile({ ...profile, position: e.target.value })
              }
              className="mt-2 w-full rounded-2xl border px-4 py-3"
            >
              <option value="未定">未定</option>
              <option value="レフト">レフト</option>
              <option value="センター">センター</option>
              <option value="ライト">ライト</option>
              <option value="セッター">セッター</option>
              <option value="リベロ">リベロ</option>
            </select>
          </label>

          <label className="mt-4 block">
            <span className="font-bold text-slate-900">練習参加回数</span>
            <input
              type="number"
              min={0}
              value={profile.practiceCount}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  practiceCount: Number(e.target.value),
                })
              }
              className="mt-2 w-full rounded-2xl border px-4 py-3"
            />
          </label>

          <button
            type="button"
            onClick={saveProfile}
            className="mt-6 w-full rounded-2xl bg-blue-600 py-3 font-bold text-white"
          >
            保存する
          </button>

          {savedMessage && (
            <p className="mt-4 rounded-2xl bg-blue-50 p-4 font-bold text-blue-700">
              {savedMessage}
            </p>
          )}
        </div>

        <div className="mt-6 rounded-3xl bg-white p-5 shadow">
          <h2 className="text-xl font-bold text-slate-900">登録情報</h2>
          <p className="mt-3 text-slate-700">名前：{profile.name || "未登録"}</p>
          <p className="mt-1 text-slate-700">学年：{profile.grade}</p>
          <p className="mt-1 text-slate-700">ポジション：{profile.position}</p>
          <p className="mt-1 text-slate-700">
            練習参加回数：{profile.practiceCount}回
          </p>
        </div>
      </section>

      <BottomNav />
    </main>
  );
}

