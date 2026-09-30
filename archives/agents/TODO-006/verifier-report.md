# TODO-006 確認報告（verifier）

1. `ytslide check --slides backgammon`: 終了コード 0、最後の行 `slides/backgammon.js: 問題なし`
2. `rg 谷林 slides/backgammon.js`: 出力なし（終了コード 1 = 該当なし）。一致
3. `ytslide measure --all --slides backgammon`（書き込みなし）1 枚目: 実測 10.848s、1.4 倍速 7.75s -> duration: 8。ファイルの `duration: 8`（50 行目）と一致
4. 表紙 1280x720（Python playwright / chromium、`http://localhost:8765/player.html?slides=backgammon`、`renderSlide(0)`）
   - `#slide-canvas` scrollHeight/clientHeight = 428/428、scrollWidth/clientWidth = 868/868（はみ出しなし）
   - スクショ: ~/tmp/playwright-mcp/TODO-006-1.png
   - 目視: BACKGAMMON バッジ、タイトル、区切り線、「横浜市中区 なか区民活動センター登録団体」「関内バックギャモンの会」の 2 行。文字の切れ・重なりなし。名前の行を消した跡の不自然な余白は見当たらない（内容は縦中央に収まっている）

変更ファイルの範囲: git 管理外のため差分は取っていない（指示どおり）。
判断が要る点: なし。確かめられなかったこと: 表紙ナレーションの読み上げ音声そのもの（測定は文字数と実測秒のみ）。
