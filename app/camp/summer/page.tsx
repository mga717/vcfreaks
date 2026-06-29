import BottomNav from "../../components/BottomNav";

export default function AutumnCampPage() {
  return (
    <main className="min-h-screen bg-slate-100 pb-24">
      <section className="mx-auto max-w-md px-4 py-6">
        <a href="/camp" className="font-bold text-blue-600">
          ← 合宿一覧へ戻る
        </a>

        <div className="mt-6 rounded-[32px] bg-orange-200 p-6 shadow">
          <p className="text-sm font-bold text-orange-700">
            AUTUMN CAMP
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            🍁 秋合宿
          </h1>

          <p className="mt-2 text-slate-700">
            秋合宿のスケジュールや試合結果を確認できます。
          </p>
        </div>

        <div className="mt-6 space-y-4">

          <a
            href="/camp/schedule"
            className="block rounded-3xl bg-white p-5 shadow transition hover:shadow-lg"
          >
            <p className="text-sm font-bold text-violet-600">
              SCHEDULE
            </p>

            <h2 className="mt-2 text-xl font-bold text-slate-900">
              📅 スケジュール
            </h2>

            <p className="mt-2 text-slate-600">
              合宿全体のスケジュールを確認します。
            </p>
          </a>

          <a
            href="/camp/teams"
            className="block rounded-3xl bg-white p-5 shadow transition hover:shadow-lg"
          >
            <p className="text-sm font-bold text-pink-600">
              TEAM
            </p>

            <h2 className="mt-2 text-xl font-bold text-slate-900">
              👥 チーム発表
            </h2>

            <p className="mt-2 text-slate-600">
              チーム分けやメンバーを確認します。
            </p>
          </a>

          <a
            href="/camp/summer/freaks-cup"
            className="block roundeds-3xl bg-white p-5 shadow transition hover:shadow-lg"
          >
            <p className="text-sm font-bold text-blue-600">
              FREAKS CUP
            </p>

            <h2 className="mt-2 text-xl font-bold text-slate-900">
              🏐 フリークスカップ
            </h2>

            <p className="mt-2 text-slate-600">
              対戦表・試合結果・順位表・決勝トーナメント
            </p>
          </a>

          <a
            href="/camp/autumn/recreation"
            className="block rounded-3xl bg-white p-5 shadow transition hover:shadow-lg"
          >
            <p className="text-sm font-bold text-yellow-600">
              RECREATION
            </p>

            <h2 className="mt-2 text-xl font-bold text-slate-900">
              🎲 レクリエーション
            </h2>

            <p className="mt-2 text-slate-600">
              各レクリエーションの得点を確認します。
            </p>
          </a>

          <a
            href="/camp/autumn/overall-ranking"
            className="block rounded-3xl bg-white p-5 shadow transition hover:shadow-lg"
          >
            <p className="text-sm font-bold text-green-600">
              OVERALL RANKING
            </p>

            <h2 className="mt-2 text-xl font-bold text-slate-900">
              🏆 総合順位
            </h2>

            <p className="mt-2 text-slate-600">
              フリークスカップ＋レクリエーションの合計順位
            </p>
          </a>

        </div>
      </section>

      <BottomNav />
    </main>
  );
}

