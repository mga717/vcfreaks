export default function BottomNav() {
    return (
      <nav className="fixed bottom-0 left-0 right-0 border-t bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-md justify-around py-3 text-xs font-bold text-slate-500">
          <a href="/" className="text-emerald-700">
            <div className="text-2xl">🏠</div>
            Home
          </a>
  
          <a href="/movie">
            <div className="text-2xl">🎬</div>
            Movie
          </a>
  
          <a href="/schedule">
            <div className="text-2xl">📅</div>
            Schedule
          </a>
  
          <a href="/camp">
            <div className="text-2xl">🏕️</div>
            Camp
          </a>
  
          <a href="/mypage">
            <div className="text-2xl">👤</div>
            My Page
          </a>
        </div>
      </nav>
    );
  }

  