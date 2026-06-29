import BottomNav from "./components/BottomNav";
export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-100 pb-24">
      <section className="mx-auto max-w-md px-4 py-6">
        <div className="rounded-[32px] bg-lime-300 p-6 shadow">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-emerald-950">
              V.C.Freaks!!
            </h1>

            <button className="rounded-full bg-white/70 px-4 py-3 text-2xl">
              ☰
            </button>
          </div>

          <p className="mt-2 text-sm font-bold text-emerald-900">
            Circle App
          </p>

          <div className="mt-8 space-y-4">
            <a
              href="/schedule"
              className="block rounded-3xl border border-white/70 bg-white/50 p-5 text-center"
            >
              <p className="text-sm font-bold text-emerald-500">SCHEDULE</p>
              <h2 className="mt-2 text-xl font-bold text-emerald-950">
                今日の予定を見る
              </h2>
            </a>

            <a
              href="/camp"
              className="block rounded-3xl border border-white/70 bg-white/50 p-5 text-center"
            >
              <p className="text-sm font-bold text-orange-500">CAMP</p>
              <h2 className="mt-2 text-xl font-bold text-emerald-950">
                合宿ページ
              </h2>
            </a>

            <a
              href="/movie"
              className="block rounded-3xl border border-white/70 bg-white/50 p-5 text-center"
            >
              <p className="text-sm font-bold text-purple-500">MOVIE</p>
              <h2 className="mt-2 text-xl font-bold text-emerald-950">
                サークル動画
              </h2>
            </a>
          </div>
        </div>

        <div className="mt-8 rounded-[32px] bg-white p-6 shadow">
          <h2 className="text-3xl font-bold text-emerald-950">Movie</h2>
          <p className="mt-3 text-slate-600">
            サークルメンバーで作成した動画をここに表示します。
          </p>
        </div>
      </section>

      <BottomNav />

      
    </main>
  );
}

