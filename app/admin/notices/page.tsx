"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

type Notice = {
  id: number;
  title: string;
  text: string;
  deadline: string | null;
  pinned: boolean;
  created_at?: string;
};

export default function AdminNoticesPage() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [deadline, setDeadline] = useState("");
  const [pinned, setPinned] = useState(false);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    const { data, error } = await supabase
      .from("notices")
      .select("*")
      .order("pinned", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      alert("お知らせの取得に失敗しました");
      console.error(error);
      return;
    }

    setNotices(data || []);
  };

  const saveNotice = async () => {
    if (!title || !text) {
      alert("タイトルと本文を入力してください。");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("notices").insert({
      title,
      text,
      deadline: deadline || null,
      pinned,
    });

    setLoading(false);

    if (error) {
      alert("保存に失敗しました");
      console.error(error);
      return;
    }

    setTitle("");
    setText("");
    setDeadline("");
    setPinned(false);

    fetchNotices();
  };

  const deleteNotice = async (id: number) => {
    if (!confirm("このお知らせを削除しますか？")) return;

    const { error } = await supabase.from("notices").delete().eq("id", id);

    if (error) {
      alert("削除に失敗しました");
      console.error(error);
      return;
    }

    fetchNotices();
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6">
      <section className="mx-auto max-w-md">
        <a href="/admin" className="font-bold text-blue-600">
          ← 管理者ホームへ戻る
        </a>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          📢 お知らせ管理
        </h1>

        <div className="mt-6 rounded-3xl bg-white p-5 shadow">
          <label className="block">
            <span className="font-bold text-slate-900">タイトル</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 w-full rounded-2xl border px-4 py-3"
              placeholder="例：秋合宿の入金締め切り"
            />
          </label>

          <label className="mt-4 block">
            <span className="font-bold text-slate-900">本文</span>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="mt-2 w-full rounded-2xl border px-4 py-3"
              placeholder="例：締め切りは7月10日です。"
            />
          </label>

          <label className="mt-4 block">
            <span className="font-bold text-slate-900">締切日</span>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="mt-2 w-full rounded-2xl border px-4 py-3"
            />
          </label>

          <label className="mt-4 flex items-center gap-3 rounded-2xl bg-slate-100 px-4 py-3">
            <input
              type="checkbox"
              checked={pinned}
              onChange={(e) => setPinned(e.target.checked)}
              className="h-5 w-5"
            />
            <span className="font-bold text-slate-900">
              重要なお知らせとして上に表示する
            </span>
          </label>

          <button
            type="button"
            onClick={saveNotice}
            disabled={loading}
            className="mt-6 w-full rounded-2xl bg-blue-600 py-3 font-bold text-white disabled:bg-slate-400"
          >
            {loading ? "保存中..." : "保存する"}
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {notices.length === 0 ? (
            <div className="rounded-3xl bg-white p-5 shadow">
              <p className="text-slate-600">まだお知らせはありません。</p>
            </div>
          ) : (
            notices.map((notice) => (
              <div key={notice.id} className="rounded-3xl bg-white p-5 shadow">
                {notice.pinned && (
                  <p className="mb-2 text-sm font-bold text-red-500">
                    📌 重要
                  </p>
                )}

                <h2 className="text-xl font-bold text-slate-900">
                  {notice.title}
                </h2>

                <p className="mt-2 text-slate-600">{notice.text}</p>

                {notice.deadline && (
                  <p className="mt-2 text-sm font-bold text-orange-600">
                    締切：{notice.deadline}
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => deleteNotice(notice.id)}
                  className="mt-4 w-full rounded-2xl bg-red-500 py-2 font-bold text-white"
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
