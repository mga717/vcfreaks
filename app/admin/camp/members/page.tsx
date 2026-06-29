"use client";

import { useEffect, useState } from "react";

type Member = {
  id: number;
  name: string;
  grade: string;
};

export default function AdminCampMembersPage() {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("1年");
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const savedMembers: Member[] = JSON.parse(
      localStorage.getItem("campMembers") || "[]"
    );

    setMembers(savedMembers);
  }, []);

  const saveMembers = (updatedMembers: Member[]) => {
    localStorage.setItem("campMembers", JSON.stringify(updatedMembers));
    setMembers(updatedMembers);
  };

  const addMember = () => {
    if (!name) return;

    const newMember = {
      id: Date.now(),
      name,
      grade,
    };

    saveMembers([...members, newMember]);
    setName("");
    setGrade("1年");
  };

  const deleteMember = (id: number) => {
    const updatedMembers = members.filter((member) => member.id !== id);
    saveMembers(updatedMembers);
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6">
      <section className="mx-auto max-w-md">
        <a href="/admin/camp" className="font-bold text-blue-600">
          ← 合宿管理へ戻る
        </a>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          👤 参加者管理
        </h1>
        <p className="mt-1 text-slate-600">
          合宿参加者の名前と学年を登録します
        </p>

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

          <button
            type="button"
            onClick={addMember}
            className="mt-6 w-full rounded-2xl bg-blue-600 py-3 font-bold text-white"
          >
            参加者を追加する
          </button>
        </div>

        <div className="mt-6 space-y-3">
          {members.length === 0 ? (
            <div className="rounded-3xl bg-white p-5 shadow">
              <p className="text-slate-600">
                まだ参加者が登録されていません。
              </p>
            </div>
          ) : (
            members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between rounded-3xl bg-white p-5 shadow"
              >
                <div>
                  <p className="text-lg font-bold text-slate-900">
                    {member.name}
                  </p>
                  <p className="text-sm text-slate-600">{member.grade}</p>
                </div>

                <button
                  type="button"
                  onClick={() => deleteMember(member.id)}
                  className="text-sm font-bold text-red-500"
                >
                  削除
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

