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
};

type Team = {
  id: number;
  camp_id: number;
  name: string;
  color: string;
  icon: string;
};

type TeamMember = {
  id: number;
  team_id: number;
  member_id: number;
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

export default function CampTeamsPage() {
  const { campId } = useParams();

  const [members, setMembers] = useState<Member[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  const [teamName, setTeamName] = useState("");
  const [teamIcon, setTeamIcon] = useState("🔴");
  const [teamColor, setTeamColor] = useState("#ef4444");
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMembers();
    fetchTeams();
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

  const fetchTeams = async () => {
    const { data: teamsData, error: teamsError } = await supabase
      .from("teams")
      .select("*")
      .eq("camp_id", Number(campId))
      .order("created_at", { ascending: true });

    if (teamsError) {
      console.error(teamsError);
      alert("チームの取得に失敗しました");
      return;
    }

    const { data: teamMembersData, error: teamMembersError } = await supabase
      .from("team_members")
      .select("*");

    if (teamMembersError) {
      console.error(teamMembersError);
      alert("チームメンバーの取得に失敗しました");
      return;
    }

    setTeams(teamsData || []);
    setTeamMembers(teamMembersData || []);
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

    const { data: newTeam, error: teamError } = await supabase
      .from("teams")
      .insert({
        camp_id: Number(campId),
        name: teamName,
        color: teamColor,
        icon: teamIcon,
      })
      .select()
      .single();

    if (teamError || !newTeam) {
      setLoading(false);
      console.error(teamError);
      alert("チームの保存に失敗しました");
      return;
    }

    if (selectedMembers.length > 0) {
      const rows = selectedMembers.map((memberId) => ({
        team_id: newTeam.id,
        member_id: memberId,
      }));

      const { error: memberError } = await supabase
        .from("team_members")
        .insert(rows);

      if (memberError) {
        setLoading(false);
        console.error(memberError);
        alert("チームメンバーの保存に失敗しました");
        return;
      }
    }

    setLoading(false);
    setTeamName("");
    setTeamIcon("🔴");
    setTeamColor("#ef4444");
    setSelectedMembers([]);

    fetchTeams();
  };

  const deleteTeam = async (teamId: number) => {
    if (!confirm("このチームを削除しますか？")) return;

    await supabase.from("team_members").delete().eq("team_id", teamId);

    const { error } = await supabase.from("teams").delete().eq("id", teamId);

    if (error) {
      console.error(error);
      alert("チームの削除に失敗しました");
      return;
    }

    fetchTeams();
  };

  const getTeamMembers = (teamId: number) => {
    const memberIds = teamMembers
      .filter((item) => item.team_id === teamId)
      .map((item) => item.member_id);

    return members.filter((member) => memberIds.includes(member.id));
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6">
      <section className="mx-auto max-w-md">
        <a href={`/admin/camp/${campId}`} className="font-bold text-blue-600">
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
            )}
          </div>

          <button
            type="button"
            onClick={saveTeam}
            disabled={loading}
            className="mt-6 w-full rounded-2xl bg-blue-600 py-3 font-bold text-white disabled:bg-slate-400"
          >
            {loading ? "保存中..." : "チームを保存する"}
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {teams.length === 0 ? (
            <div className="rounded-3xl bg-white p-5 shadow">
              <p className="text-slate-600">
                まだチームが作成されていません。
              </p>
            </div>
          ) : (
            teams.map((team) => {
              const currentMembers = getTeamMembers(team.id);

              return (
                <div key={team.id} className="rounded-3xl bg-white p-5 shadow">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{team.icon}</div>

                    <div>
                      <h2 className="text-xl font-bold text-slate-900">
                        {team.name}
                      </h2>
                      <p className="text-sm text-slate-600">
                        メンバー {currentMembers.length}人
                      </p>
                    </div>
                  </div>

                  <ul className="mt-4 space-y-2">
                    {currentMembers.map((member) => (
                      <li
                        key={member.id}
                        className="rounded-2xl bg-slate-100 px-4 py-2 text-slate-700"
                      >
                        ・{member.name}　{member.grade}
                      </li>
                    ))}
                  </ul>


                  <a
  href={`/admin/camp/${campId}/teams/edit/${team.id}`}
  className="mt-3 block w-full rounded-2xl bg-slate-800 py-2 text-center font-bold text-white"
>
  編集する
</a>


                  <button
                    type="button"
                    onClick={() => deleteTeam(team.id)}
                    className="mt-4 w-full rounded-2xl bg-red-500 py-2 font-bold text-white"
                  >
                    チームを削除する
                  </button>

    

                </div>
              );
            })
          )}
        </div>
      </section>
    </main>
  );
}
