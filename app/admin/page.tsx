export default function AdminPage() {
    return (
      <main className="min-h-screen bg-slate-100 px-4 py-6">
        <section className="mx-auto max-w-md">
          <h1 className="text-3xl font-bold text-slate-900">⚙️ 管理者ホーム</h1>
          <p className="mt-1 text-slate-600">V.C.Freaks!! 管理メニュー</p>
  
          <div className="mt-6 space-y-4">
            <a
              href="/admin/schedule/new"
              className="block rounded-3xl bg-white p-5 shadow"
            >
              <p className="text-sm font-bold text-blue-600">予定管理</p>
              <h2 className="mt-2 text-xl font-bold text-slate-900">
                予定を追加する
              </h2>
              <p className="mt-2 text-slate-600">
                練習日、時間、場所、最寄り駅を登録します。
              </p>
            </a>
  
            <a
              href="/admin/schedule"
              className="block rounded-3xl bg-white p-5 shadow"
            >
              <p className="text-sm font-bold text-green-600">予定管理</p>
              <h2 className="mt-2 text-xl font-bold text-slate-900">
                予定一覧を管理する
              </h2>
              <p className="mt-2 text-slate-600">
                登録済みの予定を編集・削除します。
              </p>
            </a>
  
            <a
              href="/admin/camp"
              className="block rounded-3xl bg-white p-5 shadow"
            >
              <p className="text-sm font-bold text-orange-600">合宿管理</p>
              <h2 className="mt-2 text-xl font-bold text-slate-900">
                合宿得点を管理する
              </h2>
              <p className="mt-2 text-slate-600">
                チーム、ゲーム、得点、ランキングを管理します。
              </p>
            </a>
          </div>
        </section>
      </main>
    );
  }

  