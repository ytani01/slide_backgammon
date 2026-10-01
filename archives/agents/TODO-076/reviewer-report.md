# TODO-076 reviewer の報告

対象: `git diff -- slides/backgammon.js`（`KARENA_LIGHTS`・`karenaLights`・`karenaTwinkle`・`bgSlide` の `overlay`・`data-credit`・最後のスライドの render）。
プロジェクトの `CLAUDE.md` は無い（リポジトリにも `.claude/` にも無い）ので、利用者全体の `CLAUDE.md` と、同じファイルの `rulesBattle` / `historyGrow` の作りに照らした。

実測は Playwright（chromium、`http://localhost:8000/player.html?slides=backgammon`、`renderSlide(slideData.length - 1)` で最後のスライドを出す）。
画面は幅 1280px・1920px・915px（横向き）・412px（縦向き）、動きを減らす設定は幅 1280px で見た。

## 要修正

なし。

## 検討

### 1. `slides/backgammon.js:340`（`bgSlide` の `data-credit`）と `:240` の `[data-credit]`: 今の座標ではクレジットに重なる明かりが 1 つも無い

- 内容: クレジットを外すために、共有の `bgSlide` に `data-credit` を足している（クレジットを使う他のスライドの HTML にも付く）。ところが実測では、クレジットで外れる明かりは 0 件。いちばん近い明かりとの隙間は、幅 1280px で 63px、幅 412px で 27.6px（明かり 1 つの幅は 36.9px / 15.3px）で、明かり 1 つ分以上離れている。利用者の要件（TODO.md）も「箇条書き・QR の札」で、クレジットは挙がっていない
- 実害: 無い（動作は正しい）。`data-credit` を参照しているのはこの 1 か所だけで、他のスライドの見た目は変わらない（静的に確認）。防御として残すか、`bgSlide` を触らずに済ませるかは管理者の判断
- 参考: `a`（QR の札）で外れる明かりも 0 件（隙間は 43.7px / 19.6px）。ただし QR の札は要件に挙がっているうえ、セレクタ 1 語で済み共有の関数を触らないので、こちらは残してよいと考える

### 2. `slides/backgammon.js:240`（`h2`）: 見出しの箱は横幅いっぱいなので、見出しの文字の右側の明かりも外れる

- 内容: `h2` は `flex` で横幅いっぱいの箱になる（幅 1280px で、箱 816px に対して文字は 492px）。見出しの文字には重ならないのに、見出しの箱にだけ重なって外れる明かりが、幅 1280px・1920px で 4 個、幅 915px・412px で 3 個あった（光る候補は全体で 16〜18 個）
- 実害: 未確認（見た目の判断）。「見出しと重なる」を箱で見るか文字で見るかの違いで、境界線上の判断なので報告だけにする

## 好みの範囲

なし。

## 問題なしの観点

- 表示範囲の外を外す条件: 中心が SVG の箱の外にある明かりを外しており、幅 1280px で 90 個中 15 個が外れた。`overflow` で切られる範囲と一致する
- opacity 0 の要素への `getBoundingClientRect()`: opacity は箱に影響せず、正しい箱が返る（実測で幅 36.9px、外枠の `translate` の位置と中心が一致）
- `hit` の判定: 開いた区間どうしの重なり判定で正しい。候補は h2 で 14 個、ul で 45 個が外れた（幅 1280px）
- 拡大と回転の中心: 光っている途中（25% の時点）で止めて測ると、内側の `g` の箱の中心と外側の `g` の位置の差は 0.00001px 未満。明かりの上で回る
- 同時に光る数: 200ms ごとに 5 秒間、`getAnimations({ subtree: true })` を数えて最大 3（幅 1280px・412px とも）
- `active` の増減の漏れ: `active--` は `onfinish` だけで、漏れるのは animation が cancel されたときだが、`backgammon.js` と `player.html` に `cancel()` / `finish()` / `getAnimations` を呼ぶ箇所は無い（`rg` で確認）。スライドを描き直すと `innerHTML` で SVG ごと作り直され、`active` も新しいクロージャで 0 から始まるので、前の値は持ち越さない。ページが非表示のときの挙動は未確認だが、`onfinish` が遅れても候補を増やさないだけで、増え続ける経路は無い
- 止め方と二重起動: 前のスライドへ移って戻り、続けて同じスライドを描き直した（`renderSlide(last, false)`）あとも、同時に光る数は最大 3 で二重に走っていない。古いループは `svg.isConnected` で次の tick に止まる。`rulesBattle` / `historyGrow` と同じ作り（`dataset.running`・`isConnected`・render から `setTimeout`、画像の確認で呼ばれても画面に無ければ何もしない）
- `preserveAspectRatio="xMidYMid slice"` と `object-cover`: 90 個の明かりについて、SVG の座標から出した画面上の位置と、`img` の箱から `object-cover`（中央）の計算で出した位置の差は最大 0.000003px（4 つの幅すべて）。画像の大きさも 1600×1200 で `viewBox` と一致
- 動きを減らす設定: 5 秒間、光った数は常に 0。描き直したあとも 0
- 他のスライド: `overlay` の既定は空文字で、増えるのは空白だけ。`data-credit` の属性を参照する CSS / JS はこの 1 か所だけ
- コメント: 「なぜ」（slice で敷く理由、重なりを毎回見る理由）を書いている
- 範囲: 指示に無い変更は無い。`player.html` は変えていない
- テスト: このリポジトリに自動テストは無く、確認は verifier の Playwright の担当

## 作り込みすぎ

- `slides/backgammon.js:340`・`:240`: delete: `data-credit` 属性と `[data-credit]` セレクタ。実測で外れる明かりが 0 件。無くても同じ（上の「検討 1」と同じ指摘）

net: -0 lines possible（属性 1 つとセレクタ 1 語）。
