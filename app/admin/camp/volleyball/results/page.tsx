export default function VolleyballResultsPage() {
    return (
      <main className="min-h-screen bg-slate-100 px-4 py-6">
        <section className="mx-auto max-w-md">
          <a href="/admin/camp" className="font-bold text-blue-600">
            ← 合宿管理へ戻る
          </a>
  
          <h1 className="mt-6 text-3xl font-bold text-slate-900">
            🏐 バレー結果
          </h1>
  
          <div className="mt-6 rounded-3xl bg-white p-5 shadow">
            <p className="text-slate-600">
              バレー結果入力は「フリークスカップ管理」に統合しました。
            </p>
  
            <a
              href="/admin/camp/matches"
              className="mt-4 block rounded-2xl bg-blue-600 py-3 text-center font-bold text-white"
            >
              フリークスカップ管理へ
            </a>
          </div>
        </section>
      </main>
    );
  }

  