export default function AdminCampPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6">
      <section className="mx-auto max-w-md">
        <a href="/admin" className="font-bold text-blue-600">
          ← 管理者ホームへ戻る
        </a>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          🏕️ 合宿管理
        </h1>
        <p className="mt-1 text-slate-600">
          合宿・チーム・レクリエーション・フリークスカップを管理します
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">⚙️ 基本設定</h2>
            <div className="mt-2 h-1 w-20 rounded-full bg-purple-500" />
          </div>

          <a href="/admin/camp/settings" className="block rounded-3xl bg-white p-5 shadow">
            <p className="text-sm font-bold text-purple-600">合宿設定</p>
            <h2 className="mt-2 text-xl font-bold text-slate-900">
              合宿名・日程を設定する
            </h2>
            <p className="mt-2 text-slate-600">
              合宿名、開始日、終了日を登録します。
            </p>
          </a>

          <a href="/admin/camp/schedule/new" className="block rounded-3xl bg-white p-5 shadow">
            <p className="text-sm font-bold text-blue-600">スケジュール</p>
            <h2 className="mt-2 text-xl font-bold text-slate-900">
              合宿予定を追加する
            </h2>
            <p className="mt-2 text-slate-600">
              集合時間、練習、食事、レクなどを追加します。
            </p>
          </a>

          <a href="/camp/schedule" className="block rounded-3xl bg-white p-5 shadow">
            <p className="text-sm font-bold text-green-600">表示確認</p>
            <h2 className="mt-2 text-xl font-bold text-slate-900">
              合宿スケジュールを見る
            </h2>
            <p className="mt-2 text-slate-600">
              参加者側にどう表示されるか確認します。
            </p>
          </a>

          <div className="pt-4">
            <h2 className="text-lg font-bold text-slate-900">👥 チーム</h2>
            <div className="mt-2 h-1 w-20 rounded-full bg-pink-500" />
          </div>

          <a href="/admin/camp/members" className="block rounded-3xl bg-white p-5 shadow">
            <p className="text-sm font-bold text-pink-600">参加者管理</p>
            <h2 className="mt-2 text-xl font-bold text-slate-900">
              参加者を登録する
            </h2>
            <p className="mt-2 text-slate-600">
              名前・学年を登録します。
            </p>
          </a>

          <a href="/admin/camp/teams" className="block rounded-3xl bg-white p-5 shadow">
            <p className="text-sm font-bold text-pink-600">チーム発表</p>
            <h2 className="mt-2 text-xl font-bold text-slate-900">
              チームを作成する
            </h2>
            <p className="mt-2 text-slate-600">
              チーム名・アイコン・メンバーを登録します。
            </p>
          </a>

          <div className="pt-4">
            <h2 className="text-lg font-bold text-slate-900">
              🎮 レクリエーション
            </h2>
            <div className="mt-2 h-1 w-20 rounded-full bg-yellow-500" />
          </div>

          <a href="/admin/camp/games" className="block rounded-3xl bg-white p-5 shadow">
            <p className="text-sm font-bold text-orange-600">ゲーム作成</p>
            <h2 className="mt-2 text-xl font-bold text-slate-900">
              得点方式を作成する
            </h2>
            <p className="mt-2 text-slate-600">
              順位制・勝敗制・チェック数・手動入力などを設定します。
            </p>
          </a>

          <a href="/admin/camp/recreation" className="block rounded-3xl bg-white p-5 shadow">
            <p className="text-sm font-bold text-yellow-600">
              レクリエーション得点
            </p>
            <h2 className="mt-2 text-xl font-bold text-slate-900">
              レクリエーション得点を入力する
            </h2>
            <p className="mt-2 text-slate-600">
              作成したゲームの得点方式に従って得点を入力します。
            </p>
          </a>

          <div className="pt-4">
            <h2 className="text-lg font-bold text-slate-900">
              🏐 フリークスカップ
            </h2>
            <div className="mt-2 h-1 w-20 rounded-full bg-blue-500" />
          </div>

          <a href="/admin/camp/matches" className="block rounded-3xl bg-white p-5 shadow">
            <p className="text-sm font-bold text-blue-600">
              対戦表・得点入力
            </p>
            <h2 className="mt-2 text-xl font-bold text-slate-900">
              フリークスカップを管理する
            </h2>
            <p className="mt-2 text-slate-600">
              対戦設定・対戦表・セット得点を管理します。
            </p>
          </a>

          <a href="/admin/camp/volleyball/settings" className="block rounded-3xl bg-white p-5 shadow">
            <p className="text-sm font-bold text-blue-600">バレー設定</p>
            <h2 className="mt-2 text-xl font-bold text-slate-900">
              セット数・点数を設定する
            </h2>
            <p className="mt-2 text-slate-600">
              1セット制・3セット制・1セットの点数などを設定します。
            </p>
          </a>

          <div className="pt-4">
            <h2 className="text-lg font-bold text-slate-900">🏆 総合順位</h2>
            <div className="mt-2 h-1 w-20 rounded-full bg-green-500" />
          </div>

          <a href="/camp/autumn/overall-ranking" className="block rounded-3xl bg-white p-5 shadow">
            <p className="text-sm font-bold text-green-600">総合順位</p>
            <h2 className="mt-2 text-xl font-bold text-slate-900">
              総合順位を見る
            </h2>
            <p className="mt-2 text-slate-600">
              フリークスカップとレクリエーションの合計順位を確認します。
            </p>
          </a>
        </div>
      </section>
    </main>
  );
}
