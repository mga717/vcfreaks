import BottomNav from "../../../components/BottomNav";

export default function FreaksCupPage() {
  return (
    <main className="min-h-screen bg-slate-100 pb-24">
      <section className="mx-auto max-w-md px-4 py-6">
        <a href="/camp/summer" className="font-bold text-blue-600">
          ← 秋合宿へ戻る
        </a>

        <div className="mt-6 rounded-[32px] bg-blue-200 p-6 shadow">
          <p className="text-sm font-bold text-blue-700">FREAKS CUP</p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            🏐 フリークスカップ
          </h1>

          <p className="mt-2 text-slate-700">
            対戦表・試合結果・順位表・決勝トーナメントを確認できます。
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <a href="/camp/matches" className="block rounded-3xl bg-white p-5 shadow">
            <p className="text-sm font-bold text-blue-600">MATCHES</p>
            <h2 className="mt-2 text-xl font-bold text-slate-900">
              📋 対戦表・試合結果
            </h2>
            <p className="mt-2 text-slate-600">
              試合スケジュールとセットごとの結果を確認します。
            </p>
          </a>

          <a href="/camp/ranking" className="block rounded-3xl bg-white p-5 shadow">
            <p className="text-sm font-bold text-green-600">QUALIFYING RANKING</p>
            <h2 className="mt-2 text-xl font-bold text-slate-900">
              📈 予選順位
            </h2>
            <p className="mt-2 text-slate-600">
              勝利数・得失点差・総得点から順位を確認します。
            </p>
          </a>

          <a
            href="/camp/autumn/freaks-cup/final"
            className="block rounded-3xl bg-white p-5 shadow"
          >
            <p className="text-sm font-bold text-orange-600">FINAL TOURNAMENT</p>
            <h2 className="mt-2 text-xl font-bold text-slate-900">
              🏆 決勝トーナメント
            </h2>
            <p className="mt-2 text-slate-600">
              予選順位をもとに決勝トーナメントを確認します。
            </p>
          </a>
        </div>
      </section>

      <BottomNav />
    </main>
  );
}

