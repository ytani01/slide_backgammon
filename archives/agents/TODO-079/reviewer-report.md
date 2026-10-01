# TODO-078〜082 レビュー報告（reviewer）

対象: `git diff -- slides/backgammon.js`（`narrationClock`・`ease`・`cueDrop`・`cueSay`・`worldPlay`・`coverPlay`、`historyGrow` の切り出し、`snap`・`world`・`step`・`easy`・`pro` の引数、各スライドのテンプレート、`ul` の `w-fit`）。
プロジェクトの `CLAUDE.md` は無いので、ユーザー全体の `CLAUDE.md`、`TODO.md` の TODO-078〜082 の節、TODO-073 の記録と reviewer 報告、既存の `rulesBattle` / `karenaTwinkle` を基準にした。
依頼どおり実測はしていない（コードを読んだ範囲。Tailwind の CDN だけはソースを取ってきて読んだ）。

要修正: 0 件 / 検討: 2 件 / 好みの範囲: 2 件

## 検討

### 1. TODO-073 の `historyGrow` の説明が、`narrationClock` の上に付いたままになっている

- `slides/backgammon.js:165-175`
- 何が問題か: 「「バックギャモンの歴史は古い」の時間軸の線を…伸ばす（TODO-073）」で始まる 8 行のコメントの直後に `narrationClock` の説明が続き、その下が `narrationClock` の本体になっている。`HISTORY_STEPS` と `historyGrow`（`:199-`）には見出しのコメントが無い
- なぜ問題か: 8 行のうち、`speechRunId` で読み直しを見る理由・経過秒を使わない理由・`MAX_SPEECH_RATE` とミュートの扱いは `narrationClock` の話、「その後 8.3 秒、日本にも 12.5 秒」は `historyGrow` の話で、混ざっている。読む人は、歴史のスライドの説明が `narrationClock` に付いていると読む。理由の行は `narrationClock` に、秒の値と線の説明は `HISTORY_STEPS` の上に分けるとよい（中身を変える必要は無い）

### 2. `coverPlay` には二重起動の止めが無く、`ytslide check` の間に表紙を開いていると動きが最初からやり直しになる

- `slides/backgammon.js:317-323`（`coverPlay`）、`player.html:1797`（`runSlideCheck` の `slide.render()`）
- 何が問題か: `runSlideCheck` は全スライドの `render()` を呼ぶ。HTML は切り離した `div` に入れるが、`setTimeout(coverPlay)` は生きている文書で `getElementById('cover-line')` を引く。表紙を見ているときに `ytslide check` を流すと、同じ要素に 2 回目の `animate()` がかかり、線とダイスが頭から動き直す。他の 4 つ（`narrationClock` を通るもの）は `dataset.running` で止まる
- 実害: `ytslide check` は headless で流すので、目に見える害は無いと思われる（実害は未確認）。`rulesBattle` / `karenaTwinkle` と作りを揃えるなら `dataset.running` を足す、揃えないなら今のままでよい、のどちらか。Web Animations なので、`isConnected` で止める必要は無い（要素が外れればアニメーションも消える）

## 好みの範囲

### 3. 数え上げの終わりで「3.0億」から「3億」に変わる

- `slides/backgammon.js:312`
- `k` が 0.9833 を超えると `toFixed(1)` は「3.0」になり、`k` がちょうど 1 になったところで「3億」に変わる。1.5 秒のうち最後の約 0.19 秒は「3.0億」で、そのあと文字幅が縮む（計算値。目で分かるかは未確認）
- `n.textContent = \`${+(3 * k).toFixed(1)}億\`` の 1 行にすれば、末尾の「.0」が消えて分岐も要らない（0 は「0億」、終わりは「3億」で今の画面と同じ）。作り込みすぎの節の shrink と同じ

### 4. 引数の説明と字下げ

- `slides/backgammon.js:70` の `snap` の説明は「pos は位置と幅の class、deg は傾き」のままで、足した `cue` の説明が無い（`world` / `step` / `easy` / `pro` もコメントに引数の一覧が無いので、揃えるなら `snap` だけ）
- `slides/backgammon.js:563` で `<div id="japan-say">` で包んだが、中の行の字下げはそのまま。見た目には効かない

## 問題なし（1 行ずつ）

- `historyGrow` の挙動: 変わっていない。旧 `k = min(1, (t - start) / GROW)` と `if (k > 0)` は、新しい `if (t > start)` と `ease(t, start, GROW)` に一致する（`t > start` ⇔ `k > 0`、その範囲では `max(0, …)` が効かないので式も同じ）。動きを減らす設定は旧 `!reduce && t !== null` が `draw(reduce ? null : t)` に移っただけで、`p = 1` で rAF を回さないのも同じ。読み直し（`speechRunId`）・一時停止・ミュート・`MAX_SPEECH_RATE` の速さは、`frame` の中身が一字一句同じ。`dataset.running = '1'` を入れる時点が測る前から測った後に移ったが、同期処理の中なので差は無い
- `ease`: `t === null` で 1。`historyGrow` / `cueDrop` / `worldPlay` の t が null のときは、どれも最後の形になる
- `cueDrop` の最後の形: `k = 1` で `translateY(0cqw) scale(1) rotate(Ndeg)`、`opacity` は `''` で style から外れる。元の `rotate(Ndeg)` と見た目は同じ。元の transform は描く前に `el.style.transform` から取っていて、`snap` も `world` も `style="transform: rotate(…)"` に書いてあるので取れる。2 回目の呼び出しでは `base` を書き換え後の値で取り直すが、その `els` は `narrationClock` の `dataset.running` で捨てられるので害は無い
- `cueSay` の区間: `t >= at[i] && t < (at[i + 1] ?? end)`。最後の札は `end` 秒まで、`end` を過ぎると全部外れて今の画面に戻る。t が null（再生前・動きを減らす設定）では強調なし。札の秒は文書の順に並んでいる前提で、3 枚のスライドとも昇順になっている
- `data-say-show`: `t !== null && t < at[i]` の間だけ隠し、強調し始めてからは出したまま。t が null では出す。「その人を強調するときに出す」と合っている
- `worldPlay`: 写真と数字で別々に `narrationClock` を回しているが、要素が別なので `dataset.running` はぶつからない。t が null で「3億」になり、元の「3億」と同じ
- `coverPlay`: `fill: 'backwards'` なので、終わったら要素の元の style（変形なし・不透明）に戻る。動きを減らす設定では何もしない。`.fa-solid` は Font Awesome 6 で `inline-block`、しかも親が `inline-flex` なので、`<i>` に transform は効く
- 停止: どれも `narrationClock` の `isConnected` で止まる。シークや次のスライドで要素ごと作り直されると、古いループは次の rAF で止まり、新しい要素で付き直す（`renderSlide` は `innerHTML` で入れ替える。`player.html:1178`）
- 二重起動: `runSlideCheck` から呼ばれても、`narrationClock` を通る 4 つは `dataset.running` で止まる。`runSlideCheck` が `render()` で作った HTML は文書の外にあるので、`getElementById` はそちらを引かない
- 引数を足した 5 つの関数: `rg -n -e '\b(pro|easy|step|snap|world)\(' slides/backgammon.js` で呼び出しは 16 か所（world 5・pro 2・easy 3・step 3・snap 3）、全部に秒を渡している。ほかの呼び出し元は無い
- Tailwind のクラスを JS で付け外しすること: `player.html:15` は Play CDN（`https://cdn.tailwindcss.com`）。取ってきたソースで、`document.documentElement` を `attributeFilter: ["class"], subtree: true` で見張り、class が変わるたびに CSS を作り直すことを確かめた。`ring-4` などは最初に付いたときに作られる。`tailwind.config` に `safelist` は要らない。`ring-*` は `shadow-lg` と同じ `box-shadow` の変数で重ねるので、元の影は残る（Tailwind v3 の作り。画面での確認は verifier）
- 包んだ `<div id="japan-say">`: `bgSlide` の `flex flex-col justify-center` の子が 2 つから 1 つになったが、下の帯は自分の `mt-[1.6cqw]` で間を空けているので、並びは変わらない（コードを読んだ範囲）
- `ul` の `w-fit`（TODO-078）: `li` は縦並びの flex の子で、既定の `align-items: stretch` で ul の幅いっぱいに伸びるので、2 つの箱は同じ幅にそろう
- コメント: `narrationClock`（再生中に作られたら読み直しとみなす理由）、`cueDrop`（傾きの前に足す理由）、`coverPlay`（ナレーションに合わせない理由）は「なぜ」を書いている
- 範囲: 差分は `slides/backgammon.js` と `TODO.md` のチェックだけ。5 件の範囲を出ていない。`player.html` は変わっていない
- テスト: このリポジトリにテストの仕組みは無く、確認は verifier の Playwright に任せる形で従来どおり

## 作り込みすぎ

- `slides/backgammon.js:312`: shrink: `k >= 1 ? '3億' : …` の分岐。`` `${+(3 * k).toFixed(1)}億` ``、1 行で終わりの「3.0億」も消える（上の 3 と同じ。好みの範囲）

ほかは無し。`narrationClock` は 4 か所で使われ、`ease` は 3 か所、`SAY_CLASSES` は 1 か所だが名前で意味が分かるので残してよい。

net: -0 lines possible（式が短くなるだけ）。
