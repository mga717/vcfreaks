export default function CampMatchesPage() {
    return (
      <main className="min-h-screen bg-slate-100 px-4 py-6">
        <section className="mx-auto max-w-md">
          <a href="/camp" className="font-bold text-blue-600">
            ← 合宿ホームへ戻る
          </a>
  
          <h1 className="mt-6 text-3xl font-bold text-slate-900">
            🏐 フリークスカップ
          </h1>
          <p className="mt-1 text-slate-600">
            対戦表・試合順・結果を確認できます
          </p>
  
          <div className="mt-6 space-y-4">
            <div className="rounded-3xl bg-white p-5 shadow">
              <p className="text-sm font-bold text-red-600">第1試合</p>
  
              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="flex-1 rounded-2xl bg-red-50 p-4 text-center">
                  <p className="font-bold text-red-700">RED</p>
                </div>
  
                <p className="font-bold text-slate-500">VS</p>
  
                <div className="flex-1 rounded-2xl bg-blue-50 p-4 text-center">
                  <p className="font-bold text-blue-700">BLUE</p>
                </div>
              </div>
  
              <p className="mt-4 text-slate-700">時間：10:00〜10:20</p>
              <p className="mt-1 text-slate-700">コート：Aコート</p>
            </div>
  
            <div className="rounded-3xl bg-white p-5 shadow">
              <p className="text-sm font-bold text-red-600">第2試合</p>
  
              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="flex-1 rounded-2xl bg-green-50 p-4 text-center">
                  <p className="font-bold text-green-700">GREEN</p>
                </div>
  
                <p className="font-bold text-slate-500">VS</p>
  
                <div className="flex-1 rounded-2xl bg-yellow-50 p-4 text-center">
                  <p className="font-bold text-yellow-700">YELLOW</p>
                </div>
              </div>
  
              <p className="mt-4 text-slate-700">時間：10:25〜10:45</p>
              <p className="mt-1 text-slate-700">コート：Aコート</p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  