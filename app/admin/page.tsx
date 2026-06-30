"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");

    if (isAdmin !== "true") {
      window.location.href = "/mypage";
      return;
    }

    setIsChecked(true);
  }, []);

  if (!isChecked) {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6">
      <section className="mx-auto max-w-md">
        <h1 className="text-3xl font-bold text-slate-900">
          管理者ホーム
        </h1>

        <p className="mt-2 text-slate-600">
          管理者メニューを選択してください。
        </p>

        <div className="mt-6 space-y-4">
          <a
            href="/admin/notices"
            className="block rounded-3xl bg-white p-5 shadow"
          >
            <p className="text-sm font-bold text-yellow-600">
              お知らせ
            </p>
            <h2 className="mt-2 text-xl font-bold text-slate-900">
              お知らせを管理する
            </h2>
          </a>

          <a
            href="/admin/camp"
            className="block rounded-3xl bg-white p-5 shadow"
          >
            <p className="text-sm font-bold text-green-600">
              合宿管理
            </p>
            <h2 className="mt-2 text-xl font-bold text-slate-900">
              合宿を管理する
            </h2>
          </a>

          <a
            href="/admin/schedule"
            className="block rounded-3xl bg-white p-5 shadow"
          >
            <p className="text-sm font-bold text-yellow-600">
             schedule
            </p>
            <h2 className="mt-2 text-xl font-bold text-slate-900">
              予定を管理する
            </h2>
          </a>

          <a
            href="/admin/members"
            className="block rounded-3xl bg-white p-5 shadow"
          >
            <p className="text-sm font-bold text-yellow-600">
             members
            </p>
            <h2 className="mt-2 text-xl font-bold text-slate-900">
              参加者を管理する
            </h2>
          </a>


        </div>

        <button
          type="button"
          onClick={() => {
            localStorage.removeItem("isAdmin");
            window.location.href = "/mypage";
          }}
          className="mt-8 w-full rounded-2xl bg-red-500 py-3 font-bold text-white"
        >
          ログアウト
        </button>
      </section>
    </main>
  );
}



  