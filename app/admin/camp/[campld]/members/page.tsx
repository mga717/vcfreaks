"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../../../lib/supabase";

type Member = {
  id: number;
  camp_id: number;
  name: string;
  grade: string;
  gender: string;
  created_at?: string;
};

export default function CampMembersPage() {
  const { campId } = useParams();

  const [members, setMembers] = useState<Member[]>([]);
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("1年");
  const [gender, setGender] = useState("未回答");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const { data, error } = await supabase
      .from("members")
      .select("*")
      .eq("camp_id", Number(campId))
      .order("created_at", { ascending: true });

    if (error) {
      console.error(error);
      alert("参加者の取得に失敗しました");
      return;
    }

    setMembers(data || []);
  };

  const addMember = async () => {
    if (!name) {
      alert("名前を入力してください");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("members").insert({
      camp_id: Number(campId),
      name,
      grade,
      gender,
    });

    setLoading(false);

    if (error) {
      console.error(error);
      alert("参加者の追加に失敗しました");
      return;
    }

    setName("");
    setGrade("1年");
    setGender("未回答");

    fetchMembers();
  };

  const deleteMember = async (id: number) => {
    if (!confirm("この参加者を削除しますか？")) return;

    const { error } = await supabase.from("members").delete().eq("id", id);

    if (error) {
      console.error(error);
      alert("削除に失敗しました");
      return;
    }

    fetchMembers();
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6">
      <section className="mx-auto max-w-md">
        <a href={`/admin/camp/${campId}`} className="font-bold text-blue-600">
          ← 合宿管理へ戻る
        </a>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          👥 参加者管理
        </h1>

        <div className="mt-6 rounded-3xl bg-white p-5 shadow">
          <label className="block">
            <span className="font-bold text-slate-900">名前</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-2xl border px-4 py-3"
              placeholder="例：松本桜奈"
            />
          </label>

          <label className="mt-4 block">
            <span className="font-bold text-slate-900">学年</span>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
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
            <span className="font-bold text-slate-900">性別</span>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="mt-2 w-full rounded-2xl border px-4 py-3"
            >
              <option value="未回答">未回答</option>
              <option value="男性">男性</option>
              <option value="女性">女性</option>
              <option value="その他">その他</option>
            </select>
          </label>

          <button
            type="button"
            onClick={addMember}
            disabled={loading}
            className="mt-6 w-full rounded-2xl bg-blue-600 py-3 font-bold text-white disabled:bg-slate-400"
          >
            {loading ? "追加中..." : "参加者を追加する"}
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {members.length === 0 ? (
            <div className="rounded-3xl bg-white p-5 shadow">
              <p className="text-slate-600">
                まだ参加者が登録されていません。
              </p>
            </div>
          ) : (
            members.map((member) => (
              <div key={member.id} className="rounded-3xl bg-white p-5 shadow">
                <h2 className="text-xl font-bold text-slate-900">
                  {member.name}
                </h2>

                <p className="mt-2 text-slate-600">
                  {member.grade} / {member.gender}
                </p>

                <button
                  type="button"
                  onClick={() => deleteMember(member.id)}
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

