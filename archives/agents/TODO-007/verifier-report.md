# TODO-007 verifier-report（2 枚目）

- 1. `ytslide check --slides backgammon`: 終了コード 0、最後の行 `slides/backgammon.js: 問題なし`
- 3. はみ出し（#slide-canvas、scrollHeight/clientHeight、scrollWidth/clientWidth）
  - 1280x720: 428/428、868/868 → 無し
  - 412x915: 456/456、910/910 → 無し
  - 全 img の naturalWidth: worldmap.jpg 1920、egypt 236、medieval 424、nara 322 → すべて 0 でない
- 4. スクリーンショット: `slide2-1280.png`
  - 地図は背景として全面に見える（左右の半球図。膜で暗い）
  - 3 枚の絵と下の説明文（起源は約 5,000 年前（中東）／世界中に拡散・定着／日本には飛鳥時代）は読める
  - 見出しは地図の上で読める
  - 文字の切れ・絵の欠けなし
- 確かめられなかったこと: 無し。デザインの良し悪しは見ていない
