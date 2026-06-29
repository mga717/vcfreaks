"use client";

import { useEffect, useState } from "react";

type Member = {
  id: number;
  name: string;
  grade: string;
};

type Team = {
  id: number;
  name: string;
  color: string;
  members: number[];
};

export default function CampTeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const savedTeams: Team[] = JSON.parse(
      localStorage.getItem("campTeams") || "[]"
    );

    const savedMembers: Member[] = JSON.parse(
      localStorage.getItem("campMembers") || "[]"
    );

    setTeams(savedTeams);
    setMembers(savedMembers);
  }, []);

  const getMember = (memberId: number) => {
    return members.find((member) => member.id === memberId);
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6">
      <section className="mx-auto max-w-md">
        <a href="/camp" className="font-bold text-blue-600">
          ← 合宿ホームへ戻る
        </a>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          👥 チーム発表
        </h1>
        <p className="mt-1 text-slate-600">
          合宿のチーム分けを確認できます
        </p>

        <div className="mt-6 space-y-4">
          {teams.length === 0 ? (
            <div className="rounded-3xl bg-white p-5 shadow">
              <p className="text-slate-600">
                まだチームが発表されていません。
              </p>
            </div>
          ) : (
            teams.map((team) => (
              <div key={team.id} className="rounded-3xl bg-white p-5 shadow">
                <div className="flex items-center gap-3">
                <div className="text-4xl">
  {team.icon || "🔴"}
</div>

                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {team.name}
                    </h2>
                    <p className="text-sm text-slate-600">
                      メンバー {team.members.length}人
                    </p>
                  </div>
                </div>

                {team.members.length === 0 ? (
                  <p className="mt-4 text-slate-600">
                    メンバーはまだ登録されていません。
                  </p>
                ) : (
                  <ul className="mt-4 space-y-2 text-slate-700">
                    {team.members.map((memberId) => {
                      const member = getMember(memberId);

                      if (!member) return null;

                      return (
                        <li
                          key={memberId}
                          className="rounded-2xl bg-slate-100 px-4 py-2"
                        >
                          ・{member.name}　{member.grade}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}