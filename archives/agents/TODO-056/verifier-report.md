# TODO-056 verifier-report

- 1. `rg -n "bg-portable" -g '!archives'` 0 件。`bg-friends` は slides/backgammon.js:282 の 1 件のみ: 一致
- 2. `ytslide check`（`--slides backgammon` が要る）: 終了コード 0、`slides/backgammon.js: 問題なし`
- 3. 変更ファイル: slides/backgammon.js（alt・画像名・クレジットの 4 行）、TODO.md、images/bg-portable.jpg 削除、images/bg-friends.jpg 追加（未追跡）。指示の範囲内。未追跡の Gemini_Generated_Image_*.jpeg は対象外
- 4. 実測（Playwright、player.html?slides=backgammon#6。`#6` で直接出た。8000 番は止めていない）
  - 1280x720 / 412x915 とも: currentSrc=http://localhost:8000/images/bg-friends.jpg、naturalWidth=1376、complete=true、表示中
  - クレジット文字列: 「背景: AI 生成（Gemini）」（2 条件とも）
- 5. スクリーンショット（Read で確認）: archives/agents/TODO-056/slide6-1280.png, slide6-412.png
  - 背景に人物 3 人が写り、欠けなし。札 3 枚（ルール・1 ゲーム 15 分・ボード）の文字は 1280 で読める。412 でも読める（小さいが判読可）
  - クレジットは右下に出ている（412 では小さく、判読はぎりぎり）
- 6. コンソール: 1280 で 404 が 1 件（"Failed to load resource ... 404"）。412 は 0 件。URL は取れなかったが、/favicon.ico が 404（curl 実測）で、player.html に favicon の記述も無いので、favicon と推定（推定）。画像の 404 は response 監視で出ていない
- 判断が要る点: 無し。Playwright MCP が使えなかったため、playwright-core を /tmp/pw に入れて同じ Chromium で実測した（リポジトリは無変更）
