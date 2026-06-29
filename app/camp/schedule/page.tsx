
    export default function CampSchedulePage() {
        return (
          <main className="min-h-screen bg-slate-100 px-4 py-6">
            <section className="mx-auto max-w-md">
              <a href="/camp" className="font-bold text-blue-600">
                ← 合宿ホームへ戻る
              </a>
      
              <h1 className="mt-6 text-3xl font-bold text-slate-900">
                🗓️ 合宿スケジュール
              </h1>
              <p className="mt-1 text-slate-600">合宿中の流れを確認できます</p>
      
              <div className="mt-6 space-y-4">
                <div className="rounded-3xl bg-white p-5 shadow">
                  <p className="text-sm font-bold text-purple-600">1日目</p>
                  <h2 className="mt-2 text-xl font-bold text-slate-900">
                    集合・移動・練習
                  </h2>
      
                  <div className="mt-4 space-y-3 text-slate-700">
                    <p>09:00　集合</p>
                    <p>10:00　移動</p>
                    <p>12:00　昼食</p>
                    <p>14:00　体育館練習</p>
                    <p>18:00　夕食</p>
                    <p>20:00　レクリエーション</p>
                  </div>
                </div>
      
                <div className="rounded-3xl bg-white p-5 shadow">
                  <p className="text-sm font-bold text-purple-600">2日目</p>
                  <h2 className="mt-2 text-xl font-bold text-slate-900">
                    フリークスカップ
                  </h2>
      
                  <div className="mt-4 space-y-3 text-slate-700">
                    <p>08:00　朝食</p>
                    <p>09:30　アップ</p>
                    <p>10:00　フリークスカップ開始</p>
                    <p>12:30　昼食</p>
                    <p>14:00　順位決定戦</p>
                    <p>17:00　表彰</p>
                    <p>19:00　夕食</p>
                  </div>
                </div>
      
                <div className="rounded-3xl bg-white p-5 shadow">
                  <p className="text-sm font-bold text-purple-600">3日目</p>
                  <h2 className="mt-2 text-xl font-bold text-slate-900">
                    片付け・解散
                  </h2>
      
                  <div className="mt-4 space-y-3 text-slate-700">
                    <p>08:00　朝食</p>
                    <p>10:00　片付け</p>
                    <p>11:00　チェックアウト</p>
                    <p>12:00　解散</p>
                  </div>
                </div>
              </div>
            </section>
          </main>
        );
      }

      