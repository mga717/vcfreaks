import BottomNav from "../../components/BottomNav";

export default function SpringCampPage() {
  return (
    <main className="min-h-screen bg-slate-100 pb-24">
      <section className="mx-auto max-w-md px-4 py-6">
        <a href="/camp" className="font-bold text-blue-600">
          ← 合宿一覧へ戻る
        </a>

        <div className="mt-6 rounded-[32px] bg-pink-100 p-6 shadow">
          <p className="text-sm font-bold text-pink-600">SPRING CAMP</p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            🌸 春合宿
          </h1>

          <p className="mt-2 text-slate-700">
            春合宿はまだ準備中です。
          </p>
        </div>

        <div className="mt-6 rounded-3xl bg-white p-5 text-center shadow">
          <p className="text-4xl">🚧</p>
          <h2 className="mt-3 text-2xl font-bold text-slate-900">
            Coming Soon
          </h2>
          <p className="mt-2 text-slate-600">
            開催が決まり次第、スケジュールやチーム情報を公開します。
          </p>
        </div>
      </section>

      <BottomNav />
    </main>
  );
}
