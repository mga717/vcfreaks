import BottomNav from "../components/BottomNav";

export default function MoviePage() {
  return (
    <main className="min-h-screen bg-slate-100 pb-24">
      <section className="mx-auto max-w-md px-4 py-6">
        <h1 className="text-3xl font-bold text-slate-900">🎬 Movie</h1>
        <p className="mt-1 text-slate-600">サークル動画を見られます</p>

        <div className="mt-6 rounded-3xl bg-white p-5 shadow">
          <h2 className="text-xl font-bold text-slate-900">
            Coming Soon
          </h2>
          <p className="mt-2 text-slate-600">
            ここにサークルメンバーで作った動画を追加します。
          </p>
        </div>
      </section>

      <BottomNav />
    </main>
  );
}

