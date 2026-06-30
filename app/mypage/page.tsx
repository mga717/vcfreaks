"use client";

import { useState } from "react";
import BottomNav from "../components/BottomNav";

const ADMIN_PASSWORD = "vcfreaks-admin";

export default function MyPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginAdmin = () => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("isAdmin", "true");
      window.location.href = "/admin";
    } else {
      setError("パスワードが違います。");
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 pb-24">
      <section className="mx-auto max-w-md px-4 py-6">
        <h1 className="text-3xl font-bold text-slate-900">
          マイページ
        </h1>

        <div className="mt-6 rounded-3xl bg-white p-6 shadow">
          <h2 className="text-xl font-bold text-slate-900">
            👤 プロフィール
          </h2>

          <div className="mt-4 space-y-2">
            <p>
              <span className="font-bold">名前：</span>
              未設定
            </p>

            <p>
              <span className="font-bold">学年：</span>
              未設定
            </p>

            <p>
              <span className="font-bold">ポジション：</span>
              未設定
            </p>

            <p>
              <span className="font-bold">練習参加回数：</span>
              0回
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-3xl bg-white p-6 shadow">
          <h2 className="text-xl font-bold text-slate-900">
            🔑 管理者ログイン
          </h2>

          <input
            type="password"
            placeholder="管理者パスワード"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            className="mt-4 w-full rounded-2xl border border-slate-300 px-4 py-3"
          />

          {error && (
            <p className="mt-3 text-sm font-bold text-red-500">
              {error}
            </p>
          )}

          <button
            onClick={loginAdmin}
            className="mt-5 w-full rounded-2xl bg-blue-600 py-3 font-bold text-white"
          >
            管理者画面へ
          </button>
        </div>
      </section>

      <BottomNav />
    </main>
  );
}

