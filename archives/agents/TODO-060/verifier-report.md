# TODO-060 verifier 報告（公開 GitHub Pages の実測）

条件: playwright-core（headless chromium）、1280x720。スクリプト `/tmp/p60.js` `/tmp/p60b.js`。コードは変更していない。

- 一覧ページ: 一致。200、title「slide_backgammon - スライド一覧」。リンクは player.html?slides=backgammon の 1 件だけ
- リンクから player: 一致。クリックで `.../player.html?slides=backgammon#1` へ遷移
- スライド 1: 一致。img `bg-cover.jpg` naturalWidth 1920、文字あり
- スライド 4: 一致。img 6 枚すべて naturalWidth>0（1920/1200/1200/1200/1200/1600）、文字あり
- スライド 9: 一致。img `bg-kannai.jpg` 1600、`kannai-qr.png` 330、`x-qr.png` 290、文字あり
- スクリーンショット（目視）: スライド 4・9 は背景・写真・QR・文字とも表示。スライド 1 は画像と文字を evaluate で確認しただけで、目視していない。ファイルは同じディレクトリの pages-s1/s4/s9.png
- コンソールエラー: 0 件。warning 1 件のみ「cdn.tailwindcss.com should not be used in production」（Tailwind CDN の通常の警告）
- 失敗したリクエスト・4xx/5xx: 0 件
- Online Voice（select の値 online）で再生: `https://translate.google.com/translate_tts?ie=UTF-8&tl=ja&client=tw-ob&q=...` へリクエストが出て、応答は 200、content-type audio/mpeg。自動再生は止められなかった（音そのものは聞けていない）

## 判断が要る点・未確認
- 再生 6 秒後の `#audio-retry-btn` は display:inline-block だが offsetParent が null（親が非表示と推定。推定）。エラー表示は出ていない。境界線上の判断は報告だけ
- 実機（スマホ等）や他ブラウザでの TTS 再生は未確認
