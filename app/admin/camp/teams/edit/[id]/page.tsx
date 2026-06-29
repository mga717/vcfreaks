"use client";

import { useParams, useRouter } from "next/navigation";
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

export default function EditTeamPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [teamName, setTeamName] = useState("");
  const [teamColor, setTeamColor] = useState("#ef4444");
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const savedTeams: Team[] = JSON.parse(
      localStorage.getItem("campTeams") || "[]"
    );

    const savedMembers: Member[] = JSON.parse(
      localStorage.getItem("campMembers") || "[]"
    );

    const team = savedTeams.find((team) => team.id === id);

    if (!team) return;

    setTeamName(team.name);
    setTeamColor(team.color);
    setSelectedMembers(team.members);
    setMembers(savedMembers);
  }, [id]);

  const toggleMember = (memberId: number) => {
    if (selectedMembers.includes(memberId)) {
      setSelectedMembers(selectedMembers.filter((id) => id !== memberId));
    } else {
      setSelectedMembers([...selectedMembers, memberId]);
    }
  };

  const updateTeam = () => {
    const savedTeams: Team[] = JSON.parse(
      localStorage.getItem("campTeams") || "[]"
    );

    const updatedTeams = savedTeams.map((team) => {
      if (team.id === id) {
        return {
          ...team,
          name: teamName,
          color: teamColor,
          members: selectedMembers,
        };
      }

      return team;
    });

    localStorage.setItem("campTeams", JSON.stringify(updatedTeams));

    router.push("/admin/camp/teams");
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6">
      <section className="mx-auto max-w-md">
        <a href="/admin/camp/teams" className="font-bold text-blue-600">
          ← チーム管理へ戻る
        </a>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          ✏️ チーム編集
        </h1>

        <div className="mt-6 rounded-3xl bg-white p-5 shadow">
          <label className="block">
            <span className="font-bold text-slate-900">チーム名</span>
            <input
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="mt-2 w-full rounded-2xl border px-4 py-3"
            />
          </label>

          <label className="mt-4 block">
            <span className="font-bold text-slate-900">チームカラー</span>

            <div className="mt-3 grid grid-cols-4 gap-3">
              {[
                "#ef4444",
                "#3b82f6",
                "#22c55e",
                "#eab308",
                "#a855f7",
                "#f97316",
                "#ec4899",
                "#000000",
              ].map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setTeamColor(color)}
                  className={`h-12 rounded-full ${
                    teamColor === color ? "ring-4 ring-slate-400" : ""
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </label>

          <div className="mt-6">
            <h2 className="font-bold text-slate-900">メンバーを編集</h2>

            {members.length === 0 ? (
              <p className="mt-3 rounded-2xl bg-slate-100 p-4 text-slate-600">
                まだ参加者が登録されていません。
              </p>
            ) : (
              <div className="mt-3 space-y-2">
                {members.map((member) => (
                  <label
                    key={member.id}
                    className="flex items-center justify-between rounded-2xl bg-slate-100 px-4 py-3"
                  >
                    <div>
                      <p className="font-bold text-slate-900">{member.name}</p>
                      <p className="text-sm text-slate-600">{member.grade}</p>
                    </div>

                    <input
                      type="checkbox"
                      checked={selectedMembers.includes(member.id)}
                      onChange={() => toggleMember(member.id)}
                      className="h-5 w-5"
                    />
                  </label>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={updateTeam}
            className="mt-6 w-full rounded-2xl bg-blue-600 py-3 font-bold text-white"
          >
            変更を保存する
          </button>
        </div>
      </section>
    </main>
  );
}

