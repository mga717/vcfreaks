"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedName = localStorage.getItem("userName") || "";
    setName(savedName);
  }, []);

  const saveName = () => {
    localStorage.setItem("userName", name);
    setMessage("名前を保存しました！");
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6">
      <section className="mx-auto max-w-md">
        <h1 className="text-3xl font-bold text-slate-900">👤 マイページ</h1>
        <p className="mt-1 text-slate-600">参加者名を登録します</p>

        <div className="mt-6 rounded-3xl bg-white p-5 shadow">
          <label className="block">
            <span className="font-bold text-slate-900">名前</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
              placeholder="例：松本桜奈"
            />
          </label>

          <button
            type="button"
            onClick={saveName}
            className="mt-6 w-full rounded-2xl bg-blue-600 py-3 font-bold text-white"
          >
            保存する
          </button>

          {message && (
            <p className="mt-4 rounded-2xl bg-blue-50 p-4 font-bold text-blue-700">
              {message}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}


