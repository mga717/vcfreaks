"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../../../../../lib/supabase";

type CheckItem = {
  id: number;
  game_id: number;
  item_number: number;
};

export default function CheckSettingPage() {
  const { campId, gameId } = useParams();

  const [itemCount, setItemCount] = useState(10);
  const [items, setItems] = useState<CheckItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from("game_check_items")
      .select("*")
      .eq("game_id", Number(gameId))
      .order("item_number", { ascending: true });

    if (error) {
      console.error(error);
      alert("チェック項目の取得に失敗しました");
      return;
    }

    setItems(data || []);

    if (data && data.length > 0) {
      setItemCount(data.length);
    }
  };

  const saveItems = async () => {
    if (itemCount <= 0) {
      alert("問題数を1以上にしてください");
      return;
    }

    setLoading(true);

    await supabase
      .from("game_check_items")
      .delete()
      .eq("game_id", Number(gameId));

    const rows = Array.from({ length: itemCount }, (_, index) => ({
      game_id: Number(gameId),
      item_number: index + 1,
    }));

    const { error } = await supabase.from("game_check_items").insert(rows);

    setLoading(false);

    if (error) {
      console.error(error);
      alert("保存に失敗しました");
      return;
    }

    alert("チェック項目を保存しました！");
    fetchItems();
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6">
      <section className="mx-auto max-w-md">
        <a
          href={`/admin/camp/${campId}/games`}
          className="font-bold text-blue-600"
        >
          ← ゲーム一覧へ戻る
        </a>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          ✅ チェック方式設定
        </h1>

        <p className="mt-2 text-slate-600">
          問題数を設定すると、得点入力画面でチェック表を作れます。
        </p>

        <div className="mt-6 rounded-3xl bg-white p-5 shadow">
          <label className="block">
            <span className="font-bold text-slate-900">問題数</span>
            <input
              type="number"
              min={1}
              value={itemCount}
              onChange={(e) => setItemCount(Number(e.target.value))}
              className="mt-2 w-full rounded-2xl border px-4 py-3"
              placeholder="例：13"
            />
          </label>

          <button
            type="button"
            onClick={saveItems}
            disabled={loading}
            className="mt-6 w-full rounded-2xl bg-blue-600 py-3 font-bold text-white disabled:bg-slate-400"
          >
            {loading ? "保存中..." : "チェック項目を保存する"}
          </button>
        </div>

        <div className="mt-6 rounded-3xl bg-white p-5 shadow">
          <h2 className="text-xl font-bold text-slate-900">
            登録済みチェック項目
          </h2>

          {items.length === 0 ? (
            <p className="mt-3 text-slate-600">
              まだチェック項目が登録されていません。
            </p>
          ) : (
            <div className="mt-4 flex flex-wrap gap-2">
              {items.map((item) => (
                <span
                  key={item.id}
                  className="rounded-full bg-slate-100 px-4 py-2 font-bold text-slate-700"
                >
                  {item.item_number}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

