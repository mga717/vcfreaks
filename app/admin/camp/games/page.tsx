"use client";

import { useEffect, useState } from "react";

type ScoreType = "rank" | "actual" | "win" | "check" | "manual";
type PublishType = "now" | "time" | "manual";

type CampGame = {
  id: number;
  name: string;
  scoreType: ScoreType;
  publishType: PublishType;
  publishDate: string;
  publishTime: string;
  isPublished: boolean;
  settings: {
    firstPoint: number;
    secondPoint: number;
    thirdPoint: number;
    fourthPoint: number;
    winPoint: number;
    drawPoint: number;
    losePoint: number;
    pointPerCorrect: number;
    pointPerCheck: number;
  };
};

export default function GamePage() {
  const [games, setGames] = useState<CampGame[]>([]);

  const [gameName, setGameName] = useState("");
  const [scoreType, setScoreType] = useState<ScoreType>("rank");

  const [publishType, setPublishType] = useState<PublishType>("now");
  const [publishDate, setPublishDate] = useState("");
  const [publishTime, setPublishTime] = useState("");

  const [firstPoint, setFirstPoint] = useState(100);
  const [secondPoint, setSecondPoint] = useState(80);
  const [thirdPoint, setThirdPoint] = useState(60);
  const [fourthPoint, setFourthPoint] = useState(40);

  const [winPoint, setWinPoint] = useState(30);
  const [drawPoint, setDrawPoint] = useState(10);
  const [losePoint, setLosePoint] = useState(0);

  const [pointPerCorrect, setPointPerCorrect] = useState(10);
  const [pointPerCheck, setPointPerCheck] = useState(2);

  useEffect(() => {
    const savedGames: CampGame[] = JSON.parse(
      localStorage.getItem("campGames") || "[]"
    );

    setGames(savedGames);
  }, []);

  const saveGame = () => {
    if (!gameName) {
      alert("ゲーム名を入力してください");
      return;
    }

    if (publishType === "time" && (!publishDate || !publishTime)) {
      alert("公開日と公開時間を入力してください");
      return;
    }

    const newGame: CampGame = {
      id: Date.now(),
      name: gameName,
      scoreType,
      publishType,
      publishDate,
      publishTime,
      isPublished: publishType === "now",
      settings: {
        firstPoint,
        secondPoint,
        thirdPoint,
        fourthPoint,
        winPoint,
        drawPoint,
        losePoint,
        pointPerCorrect,
        pointPerCheck,
      },
    };

    const updatedGames = [...games, newGame];

    localStorage.setItem("campGames", JSON.stringify(updatedGames));
    setGames(updatedGames);

    setGameName("");
    setScoreType("rank");
    setPublishType("now");
    setPublishDate("");
    setPublishTime("");

    alert("ゲームを保存しました！");
  };

  const deleteGame = (id: number) => {
    const updatedGames = games.filter((game) => game.id !== id);
    localStorage.setItem("campGames", JSON.stringify(updatedGames));
    setGames(updatedGames);
  };

  const publishGame = (id: number) => {
    const updatedGames = games.map((game) =>
      game.id === id ? { ...game, isPublished: true } : game
    );

    localStorage.setItem("campGames", JSON.stringify(updatedGames));
    setGames(updatedGames);
  };

  const getScoreTypeLabel = (type: ScoreType) => {
    if (type === "rank") return "順位型";
    if (type === "actual") return "実得点加算型";
    if (type === "win") return "勝敗型";
    if (type === "check") return "チェック数型";
    return "手動入力";
  };

  const getPublishLabel = (game: CampGame) => {
    if (game.publishType === "now") return "公開中";
    if (game.publishType === "time") {
      return `日時指定：${game.publishDate} ${game.publishTime}`;
    }
    return game.isPublished ? "公開中" : "手動公開待ち";
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6">
      <section className="mx-auto max-w-md">
        <a href="/admin/camp" className="font-bold text-blue-600">
          ← 合宿管理へ戻る
        </a>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          🎮 ゲーム管理
        </h1>
        <p className="mt-1 text-slate-600">
          ゲームの得点方式と公開設定を管理します
        </p>

        <div className="mt-6 rounded-3xl bg-white p-5 shadow">
          <label className="block">
            <span className="font-bold text-slate-900">ゲーム名</span>
            <input
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
              className="mt-2 w-full rounded-2xl border px-4 py-3"
              placeholder="例：ドッジボール"
            />
          </label>

          <label className="mt-5 block">
            <span className="font-bold text-slate-900">得点方式</span>
            <select
              value={scoreType}
              onChange={(e) => setScoreType(e.target.value as ScoreType)}
              className="mt-2 w-full rounded-2xl border px-4 py-3"
            >
              <option value="rank">順位で点数をつける</option>
              <option value="actual">実際の得点を加算</option>
              <option value="win">勝敗で点数をつける</option>
              <option value="check">チェック数で点数</option>
              <option value="manual">手動入力</option>
            </select>
          </label>

          {scoreType === "rank" && (
            <div className="mt-6 rounded-2xl bg-slate-50 p-4">
              <h2 className="font-bold text-slate-900">順位ごとの点数</h2>

              <label className="mt-4 block">
                1位
                <input
                  type="number"
                  value={firstPoint}
                  onChange={(e) => setFirstPoint(Number(e.target.value))}
                  className="mt-2 w-full rounded-xl border px-3 py-2"
                />
              </label>

              <label className="mt-3 block">
                2位
                <input
                  type="number"
                  value={secondPoint}
                  onChange={(e) => setSecondPoint(Number(e.target.value))}
                  className="mt-2 w-full rounded-xl border px-3 py-2"
                />
              </label>

              <label className="mt-3 block">
                3位
                <input
                  type="number"
                  value={thirdPoint}
                  onChange={(e) => setThirdPoint(Number(e.target.value))}
                  className="mt-2 w-full rounded-xl border px-3 py-2"
                />
              </label>

              <label className="mt-3 block">
                4位
                <input
                  type="number"
                  value={fourthPoint}
                  onChange={(e) => setFourthPoint(Number(e.target.value))}
                  className="mt-2 w-full rounded-xl border px-3 py-2"
                />
              </label>
            </div>
          )}

          {scoreType === "actual" && (
            <div className="mt-6 rounded-2xl bg-slate-50 p-4">
              <h2 className="font-bold text-slate-900">実得点の倍率</h2>
              <p className="mt-2 text-sm text-slate-600">
                例：クイズ正解数 × 10点
              </p>

              <label className="mt-4 block">
                1点あたり
                <input
                  type="number"
                  value={pointPerCorrect}
                  onChange={(e) => setPointPerCorrect(Number(e.target.value))}
                  className="mt-2 w-full rounded-xl border px-3 py-2"
                />
              </label>
            </div>
          )}

          {scoreType === "win" && (
            <div className="mt-6 rounded-2xl bg-slate-50 p-4">
              <h2 className="font-bold text-slate-900">勝敗ごとの点数</h2>

              <label className="mt-4 block">
                勝ち
                <input
                  type="number"
                  value={winPoint}
                  onChange={(e) => setWinPoint(Number(e.target.value))}
                  className="mt-2 w-full rounded-xl border px-3 py-2"
                />
              </label>

              <label className="mt-3 block">
                引き分け
                <input
                  type="number"
                  value={drawPoint}
                  onChange={(e) => setDrawPoint(Number(e.target.value))}
                  className="mt-2 w-full rounded-xl border px-3 py-2"
                />
              </label>

              <label className="mt-3 block">
                負け
                <input
                  type="number"
                  value={losePoint}
                  onChange={(e) => setLosePoint(Number(e.target.value))}
                  className="mt-2 w-full rounded-xl border px-3 py-2"
                />
              </label>
            </div>
          )}

          {scoreType === "check" && (
            <div className="mt-6 rounded-2xl bg-slate-50 p-4">
              <h2 className="font-bold text-slate-900">
                チェック数ごとの点数
              </h2>

              <label className="mt-4 block">
                チェック1つにつき
                <input
                  type="number"
                  value={pointPerCheck}
                  onChange={(e) => setPointPerCheck(Number(e.target.value))}
                  className="mt-2 w-full rounded-xl border px-3 py-2"
                />
              </label>
            </div>
          )}

          {scoreType === "manual" && (
            <div className="mt-6 rounded-2xl bg-slate-50 p-4">
              <h2 className="font-bold text-slate-900">手動入力</h2>
              <p className="mt-2 text-sm text-slate-600">
                得点入力時に、運営がチームごとに自由に点数を入力します。
              </p>
            </div>
          )}

          <div className="mt-6 rounded-2xl bg-slate-50 p-4">
            <h2 className="font-bold text-slate-900">公開設定</h2>

            <label className="mt-4 block">
              公開方法
              <select
                value={publishType}
                onChange={(e) => setPublishType(e.target.value as PublishType)}
                className="mt-2 w-full rounded-xl border px-3 py-2"
              >
                <option value="now">すぐ公開</option>
                <option value="time">日時指定で公開</option>
                <option value="manual">手動公開</option>
              </select>
            </label>

            {publishType === "time" && (
              <div className="mt-4 space-y-3">
                <label className="block">
                  公開日
                  <input
                    type="date"
                    value={publishDate}
                    onChange={(e) => setPublishDate(e.target.value)}
                    className="mt-2 w-full rounded-xl border px-3 py-2"
                  />
                </label>

                <label className="block">
                  公開時間
                  <input
                    type="time"
                    value={publishTime}
                    onChange={(e) => setPublishTime(e.target.value)}
                    className="mt-2 w-full rounded-xl border px-3 py-2"
                  />
                </label>
              </div>
            )}

            {publishType === "manual" && (
              <p className="mt-3 text-sm text-slate-600">
                管理者があとで公開ボタンを押すまで、参加者には表示されません。
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={saveGame}
            className="mt-6 w-full rounded-2xl bg-blue-600 py-3 font-bold text-white"
          >
            ゲームを保存する
          </button>
        </div>

        <div className="mt-6 rounded-3xl bg-white p-5 shadow">
          <h2 className="text-xl font-bold text-slate-900">登録済みゲーム</h2>

          {games.length === 0 ? (
            <p className="mt-3 text-slate-600">
              まだゲームが登録されていません。
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {games.map((game) => (
                <div key={game.id} className="rounded-2xl bg-slate-50 p-4">
                  <h3 className="font-bold text-slate-900">{game.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    得点方式：{getScoreTypeLabel(game.scoreType)}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    公開設定：{getPublishLabel(game)}
                  </p>

                  <div className="mt-3 flex gap-2">
                    {game.publishType === "manual" && !game.isPublished && (
                      <button
                        type="button"
                        onClick={() => publishGame(game.id)}
                        className="flex-1 rounded-xl bg-green-600 py-2 text-sm font-bold text-white"
                      >
                        公開する
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => deleteGame(game.id)}
                      className="flex-1 rounded-xl bg-red-500 py-2 text-sm font-bold text-white"
                    >
                      削除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

