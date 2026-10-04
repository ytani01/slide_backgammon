# TODO-096 verifier 報告

計測スクリプト: `probe096.mjs`（`NP=/home/ytani/work/star-base-defender/tests/node_modules node probe096.mjs`）。生データ `samples.json`（0.25 秒おき、30 秒、120 行）。コードは変更していない。

## 合っていたもの
1. U 字 3 本: `#rules-track-{-1,0,1}` の bbox（px, 1280x720）は左端 115.6 / 135.9 / 156.1、上端 316.6 / 336.9 / 357.2、下端 468.7 / 448.4 / 428.1 で入れ子、間隔は約 20px（SVG 上 60）。shot-board.png で 3 本は重ならず、盤の写真（左 76〜右 456）の内側に収まり、ゴールの札（右上・右下）も隠れていない。
2. ばらばら: 6 つの駒の平均速度（SVG 単位/秒）は white-1 139 / brown-1 252 / white0 167 / brown0 162 / white1 205 / brown1 165。表示開始時刻も揃わない（例 white-1 は 5.3, 8.3, 14.8, 18.1, 22.4 s、brown1 は 0.7, 10.8, 14.8, 18.4 s）。出番の長さは 1.5〜12 s で、停止（戦い・ゴール待ち）を含む。
3. 火花: 3 本とも出た（line 要素を含む標本数 -1:5 / 0:8 / 1:16）。壁: 3 本とも出た（rect 要素を含む標本数 -1:37 / 0:29 / 1:25）。壁の間は同じ U 字の 2 つの駒の transform が全標本で一致（凍結）。壁の長さ（標本間隔 0.25 s 込み）は 1.01〜2.02 s、全 15 回で heads-frozen=true。
4. reduced-motion: 6 つとも visible、2.5 秒空けた 2 回の読みが完全一致。例 `rules-head-white-0 translate(196.14 284.51)` / `brown-0 translate(196.14 465.49)`。shot-reduced.png あり。
5. pageerror: 0 件（通常・reduced 両方）。

## 判断できなかったこと（目視）
- 1280x720 では壁（幅 36・高さ 48 の SVG 単位、画面では約 12x16px）が小さく、shot-wall.png でも赤い小さな塊としか見えない。レンガの目地（3 段の互い違い）に見えるか、隣の駒と重なっていないかは、この解像度では判断できない。大きく見るには clip 付きのスクリーンショットか deviceScaleFactor を上げた再撮影が要る（未実施。要るなら依頼してほしい）。
- 同様に火花（shot-spark.png）も小さく、駒との重なりの良し悪しは判断できない。はみ出しや余計な物は見当たらない。
- 実害は未確認。

## 変更ファイル
`git status`: `TODO.md`、`slides/backgammon.js` が変更、`archives/agents/TODO-096/` が未追跡。指示の範囲内（slides/backgammon.js 184 行差分）。それ以外の変更なし。

## 保存物
shot-board.png, shot-spark.png, shot-wall.png, shot-reduced.png, samples.json, probe096.mjs
