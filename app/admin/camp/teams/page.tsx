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
  icon: string;
  members: number[];
};

const teamIcons = [
  { icon: "🔴", color: "#ef4444" },
  { icon: "🟠", color: "#f97316" },
  { icon: "🟡", color: "#eab308" },
  { icon: "🟢", color: "#22c55e" },
  { icon: "🔵", color: "#3b82f6" },
  { icon: "🟣", color: "#a855f7" },
  { icon: "🩷", color: "#ec4899" },
  { icon: "⚫", color: "#000000" },
  { icon: "⚪", color: "#f8fafc" },
];

export default function AdminCampTeamsPage() {
  const [teamName, setTeamName] = useState("");
  const [teamColor, setTeamColor] = useState("#ef4444");
  const [teamIcon, setTeamIcon] = useState("🔴");
  const [teams, setTeams] = useState<Team[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);

  useEffect(() => {
    const savedTeams: Team[] = JSON.parse(
      localStorage.getItem("campTeams") || "[]"
    );

    const savedMembers: Member[] = JSON.parse(
      localStorage.getItem("campMembers") || "[]"
    );

    setTeams(
      savedTeams.map((team) => ({
        ...team,
        icon: team.icon || "🔴",
      }))
    );

    setMembers(savedMembers);
  }, []);

  const saveTeams = (updatedTeams: Team[]) => {
    localStorage.setItem("campTeams", JSON.stringify(updatedTeams));
    setTeams(updatedTeams);
  };

  const selectIcon = (icon: string, color: string) => {
    setTeamIcon(icon);
    setTeamColor(color);
  };

  const toggleMember = (memberId: number) => {
    if (selectedMembers.includes(memberId)) {
      setSelectedMembers(selectedMembers.filter((id) => id !== memberId));
    } else {
      setSelectedMembers([...selectedMembers, memberId]);
    }
  };

  const saveTeam = () => {
    if (!teamName) return;

    const newTeam: Team = {
      id: Date.now(),
      name: teamName,
      color: teamColor,
      icon: teamIcon,
      members: selectedMembers,
    };

    saveTeams([...teams, newTeam]);

    setTeamName("");
    setTeamColor("#ef4444");
    setTeamIcon("🔴");
    setSelectedMembers([]);
  };

  const deleteTeam = (id: number) => {
    saveTeams(teams.filter((team) => team.id !== id));
  };

  const getMember = (memberId: number) => {
    return members.find((member) => member.id === memberId);
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6">
      <section className="mx-auto max-w-md">
        <a href="/admin/camp" className="font-bold text-blue-600">
          ← 合宿管理へ戻る
        </a>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          👥 チーム管理
        </h1>

        <div className="mt-6 rounded-3xl bg-white p-5 shadow">
          <label className="block">
            <span className="font-bold text-slate-900">チーム名</span>
            <input
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="mt-2 w-full rounded-2xl border px-4 py-3"
              placeholder="例：赤チーム"
            />
          </label>

          <div className="mt-5">
            <p className="font-bold text-slate-900">チームアイコン</p>

            <div className="mt-3 grid grid-cols-5 gap-3">
              {teamIcons.map((item) => (
                <button
                  key={item.icon}
                  type="button"
                  onClick={() => selectIcon(item.icon, item.color)}
                  className={`rounded-2xl border bg-white p-3 text-3xl ${
                    teamIcon === item.icon ? "ring-4 ring-slate-400" : ""
                  }`}
                >
                  {item.icon}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="font-bold text-slate-900">メンバーを選択</h2>

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
            onClick={saveTeam}
            className="mt-6 w-full rounded-2xl bg-blue-600 py-3 font-bold text-white"
          >
            チームを保存する
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {teams.map((team) => (
            <div key={team.id} className="rounded-3xl bg-white p-5 shadow">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{team.icon || "🔴"}</div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {team.name}
                  </h2>
                  <p className="text-sm text-slate-600">
                    メンバー {team.members.length}人
                  </p>
                </div>
              </div>

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

              <a
                href={`/admin/camp/teams/edit/${team.id}`}
                className="mt-4 block w-full rounded-2xl bg-slate-800 py-2 text-center font-bold text-white"
              >
                編集する
              </a>

              <button
                type="button"
                onClick={() => deleteTeam(team.id)}
                className="mt-3 w-full rounded-2xl bg-red-500 py-2 font-bold text-white"
              >
                チームを削除する
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
