# TODO-005 確認報告

1. `ytslide check --slides backgammon`: 終了コード 0、最後の行 `slides/backgammon.js: 問題なし`。
2. `ytslide measure --all --slides backgammon`（書き込みなし）: 6 枚目 `実測 33.504s / 1.4 倍速 23.93s -> duration: 24`。ファイルの `duration: 24`（164 行）と一致。
3. `rg -e まとめ -e 魅力`: 「まとめ」は 0 件。魅力は 6 行目 summary、160 行目コメント（`// ── 5. 魅力 ──`）、162 行目 title `バックギャモンの魅力`、165 行目 narration 書き出し `バックギャモンの魅力です。`。一致。
4. 画面測定（#slide-canvas は表示に合わせて縮尺されるため、値は下の通り）:
   - 1280x720: scrollHeight/clientHeight = 428/428、scrollWidth/clientWidth = 868/868、img naturalWidth = [1280,1280,1280]。あふれなし。
   - 412x915: 456/456、910/910、[1280,1280,1280]。あふれなし。
   - 目視（1280）: 写真 3 枚とも欠けず枠内。文字の切れ・重なりなし。クレジットは 2 行に折り返して全文入り、小さいが読める。
   - 目視（412）: 写真・箇条書きは欠け・重なりなし。クレジットは非常に小さく、この画像では判読できない（実害は未確認。実機の見え方は判断できない）。
   - 画像: ~/tmp/playwright-mcp/TODO-005-1280.png、TODO-005-412.png
5. Commons API:
   - Backgammon (12666371505).jpg: CC BY 2.0、Tim Reckmann。一致。
   - Detail of Persian Backgammon board...jpg: CC BY 4.0、Nikos Kitsakis。一致。
   - Tavli Board with slots C.jpg: CC BY 4.0、Nikos Kitsakis。一致。

変更ファイルの範囲確認: git 管理外のため git diff は不可。未確認。

判断が要る点: 412 幅でクレジットが極小（読めるかは実害未確認）。
