# TODO-070 verifier 報告

## 静的
- 差分は 4 点のみ（節見出しコメント、題、アプリの li 削除、ナレーション、duration 13→9）。一致
- ボードの 2 行・写真・figcaption は差分に無く、元のまま。一致
- `rg -n -e 'アプリ' -e 'スマホ' -e '身近' -e 'fa-mobile-screen' slides/backgammon.js`: 0 件（rg 終了コード 1）。一致
- `node --check slides/backgammon.js`: 終了コード 0
- 変更ファイルは slides/backgammon.js のみ（TODO.md・images/k-arena1.jpeg は対象外）

## 実測（Playwright、1280x720、127.0.0.1:8765 の http.server）
- → キー 7 回で「SLIDE 08 / 9 魅力③ おしゃれ」に到達
- 表示中の li（全件）: `["カラフルでおしゃれなボード","部屋に飾れる、\nインテリアのようなボードも"]` の 2 件のみ。一致
- 表示中の img: bg-cafe.jpg(1920) / bg-board1.jpg(1090) / bg-board2.jpg(1280) / bg-board3.jpg(1215)。背景 + 写真 3 枚、読み込み成功
- コンソールエラー・pageerror: 0 件
- スクリーンショット ~/tmp/playwright-mcp/todo-070.png: 2 行と写真 3 枚が欠けず表示。文字は読める
- 境界線上（報告のみ）: 2 行目の枠の右端が左下の写真に少し重なる（枠が写真の手前）。文字には掛かっておらず読める。元の設計の「重なってよい」の範囲と思われるが、良し悪しは判断しない

## 後始末
自分が立てた 8765 番のサーバーは PID で kill 済み。8000 番には触れていない。
