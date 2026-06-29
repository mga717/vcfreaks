const camps = [
  {
    name: "秋合宿",
    href: "/camp/autumn",
    icon: "🍁",
    status: "open",
  },
  {
    name: "夏合宿",
    href: "/camp/summer",
    icon: "🌻",
    status: "open",
  },
  {
    name: "春合宿",
    href: "#",
    icon: "🌸",
    status: "coming",
  },
  {
    name: "運動会合宿",
    href: "/camp/sports",
    icon: "🏃‍♀️",
    status: "open",
  },
];

export default function CampPage() {
  return (
    <main className="min-h-screen bg-slate-100 pb-24">
      <section className="mx-auto max-w-md px-4 py-6">
        <a href="/" className="font-bold text-blue-600">
          ← ホームへ戻る
        </a>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          🏕️ 合宿
        </h1>
        <p className="mt-1 text-slate-600">
          合宿ページを選択してください
        </p>

        <div className="mt-6 grid grid-cols-2 gap-4">
          {camps.map((camp) =>
            camp.status === "coming" ? (
              <div
                key={camp.name}
                className="rounded-3xl bg-white p-5 text-center opacity-60 shadow"
              >
                <div className="text-4xl">{camp.icon}</div>
                <h2 className="mt-3 text-lg font-bold text-slate-900">
                  {camp.name}
                </h2>
                <p className="mt-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-500">
                  Coming Soon
                </p>
              </div>
            ) : (
              <a
                key={camp.name}
                href={camp.href}
                className="rounded-3xl bg-white p-5 text-center shadow"
              >
                <div className="text-4xl">{camp.icon}</div>
                <h2 className="mt-3 text-lg font-bold text-slate-900">
                  {camp.name}
                </h2>
                <p className="mt-2 text-sm font-bold text-blue-600">
                  開く →
                </p>
              </a>
            )
          )}
        </div>
      </section>
    </main>
  );
}

