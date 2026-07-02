"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../../../../../lib/supabase";

type Member = {
  id: number;
  camp_id: number;
  name: string;
  grade: string;
  gender: string;
};

type Team = {
  id: number;
  camp_id: number;
  name: string;
  color: string;
  icon: string;
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

export default function EditTeamPage() {
  const { campId, teamId } = useParams();

  const [members, setMembers] = useState<Member[]>([]);
  const [team, setTeam] = useState<Team | null>(null);
  const [teamName, setTeamName] = useState("");
  const [teamIcon, setTeamIcon] = useState("🔴");
  const [teamColor, setTeamColor] = useState("#ef4444");
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: teamData } = await supabase
      .from("teams")
      .select("*")
      .eq("id", Number(teamId))
      .single();

    if (teamData) {
      setTeam(teamData);
      setTeamName(teamData.name);
      setTeamIcon(teamData.icon);
      setTeamColor(teamData.color);
    }

    const { data: membersData } = await supabase
      .from("members")
      .select("*")
      .eq("camp_id", Number(campId))
      .order("created_at", { ascending: true });

    setMembers(membersData || []);

    const { data: teamMembersData } = await supabase
      .from("team_members")
      .select("*")
      .eq("team_id", Number(teamId));

    setSelectedMembers(
      teamMembersData?.map((item) => item.member_id) || []
    );
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

  const saveTeam = async () => {
    if (!teamName) {
      alert("チーム名を入力してください");
      return;
    }

    setLoading(true);

    const { error: teamError } = await supabase
      .from("teams")
      .update({
        name: teamName,
        icon: teamIcon,
        color: teamColor,
      })
      .eq("id", Number(teamId));

    if (teamError) {
      setLoading(false);
      alert("チームの更新に失敗しました");
      console.error(teamError);
      return;
    }

    await supabase.from("team_members").delete().eq("team_id", Number(teamId));

    if (selectedMembers.length > 0) {
      const rows = selectedMembers.map((memberId) => ({
        team_id: Number(teamId),
        member_id: memberId,
      }));

      const { error: memberError } = await supabase
        .from("team_members")
        .insert(rows);

      if (memberError) {
        setLoading(false);
        alert("メンバーの更新に失敗しました");
        console.error(memberError);
        return;
      }
    }

    setLoading(false);
    alert("チームを更新しました！");
    window.location.href = `/admin/camp/${campId}/teams`;
  };

  if (!team) {
    return (
      <main className="min-h-screen bg-slate-100 px-4 py-6">
        <section className="mx-auto max-w-md">
          <p className="text-slate-600">読み込み中...</p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6">
      <section className="mx-auto max-w-md">
        <a
          href={`/admin/camp/${campId}/teams`}
          className="font-bold text-blue-600"
        >
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

            <div className="mt-3 space-y-2">
              {members.map((member) => (
                <label
                  key={member.id}
                  className="flex items-center justify-between rounded-2xl bg-slate-100 px-4 py-3"
                >
                  <div>
                    <p className="font-bold text-slate-900">{member.name}</p>
                    <p className="text-sm text-slate-600">
                      {member.grade} / {member.gender}
                    </p>
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
          </div>

          <button
            type="button"
            onClick={saveTeam}
            disabled={loading}
            className="mt-6 w-full rounded-2xl bg-blue-600 py-3 font-bold text-white disabled:bg-slate-400"
          >
            {loading ? "保存中..." : "変更を保存する"}
          </button>
        </div>
      </section>
    </main>
  );
}

