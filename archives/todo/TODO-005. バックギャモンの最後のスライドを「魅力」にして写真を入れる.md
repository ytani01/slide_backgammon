# TODO-005. バックギャモンの最後のスライドを「魅力」にして写真を入れる

|      | main | 担当 |
|------|------|------|
| 見込み | Opus 5.5 / effort medium | main（写真探しと実装）+ verifier（Sonnet 5.5 / medium） |
| 実施 | Opus 5.5 / effort 不明 | main（写真探しと実装）+ verifier（Sonnet / medium） |

| 担当 | モデル | effort | input | output | cache_creation | cache_read | 割合 |
|------|--------|--------|-------|--------|----------------|------------|------|
| main | Opus 5.5 | 不明 | 不明 | 不明 | 不明 | 不明 | 不明 |
| verifier | Sonnet | medium | 不明 | 不明 | 不明 | 不明 | 不明 |
| 合計 |  |  |  |  |  |  | 計 不明（verifier は 22,761） |

- git リポジトリではないので `token-usage.py` が動かなかった（`git log` が終了コード
  128。TODO-004 と同じ）。完了通知に出た verifier の合計だけを記録する
- verifier は Agent ツールで `sonnet` を指定した。effort は定義ファイルの `medium`
- main の effort は記録に残っていないので「不明」とした
- TODO-006・TODO-007 と同じセッションで進めた

## きっかけ

2026-09-30 に利用者の依頼で立てた。最後のスライドを「まとめ」から「魅力」にし、
カラフルでおしゃれな感じが伝わる写真を入れる。写真の出所（Wikimedia Commons）と
配置（左に箇条書き、右に写真）は、立てるときに利用者と決めた。

## やったこと

- Wikimedia Commons で候補を探し、4 枚を利用者に見せた。1 枚に絞らず、
  いろいろなデザインがあると分かるよう、3 枚を並べることに決まった
  （1 枚に何枚ものボードが写った写真は、トビリシの市場のものくらいで、
  色味が地味なので候補から外した）
  - `images/bg-board1.jpg`: 「Backgammon (12666371505).jpg」Tim Reckmann、CC BY 2.0
  - `images/bg-board2.jpg`: 「Detail of Persian Backgammon board made in Khatam technique.jpg」
    Nikos Kitsakis、CC BY 4.0
  - `images/bg-board3.jpg`: 「Tavli Board with slots C.jpg」Nikos Kitsakis、CC BY 4.0
  - どれも幅 1280 の縮小版を落とした
- `slides/backgammon.js` の最後のスライドを直した
  - タイトルを「バックギャモンの魅力」、ナレーションの書き出しを
    「バックギャモンの魅力です。」にした
  - 左 3/5 に箇条書き、右 2/5 に写真（上に 1 枚を横長、下に 2 枚を並べる。
    `object-cover` で高さを揃えた）。バブル期の補足は 3 行に折り返す
  - 写真の下に「写真: Tim Reckmann (CC BY 2.0)、Nikos Kitsakis (CC BY 4.0)／
    Wikimedia Commons」を小さく入れた
- `ytslide update --slides backgammon` を実行した（`duration` は 24 のまま）

## 確かめたこと

- `ytslide check --slides backgammon`: 「問題なし」
- `ytslide measure`（書き込みなし）の 6 枚目がファイルの `duration: 24` と一致した
- 「まとめ」は本文・ナレーションに残っていない
- 1280x720 で `#slide-canvas` は 428 / 428、412x915 で 456 / 456 で、はみ出しは無い。
  3 枚とも naturalWidth は 1280。スクリーンショットでも写真の欠け、文字の切れや
  重なりは無い
- Commons の API で引いたライセンスと作者が、3 枚ともクレジットと一致した
- 412 幅ではクレジットが小さすぎて読めなかった。412 幅ではスライド全体が縮小されて
  表示されるので、箇条書きも含めて全体が小さくなる。動画は 1280x720 で書き出し、
  そのサイズでは読めるので、このままにした
- 詳細は [archives/agents/TODO-005/](../agents/TODO-005/README.md)

## 分担の振り返り

- **verifier が見つけたこと**: 412 幅でクレジットが読めないことを報告した
  （上のとおり、そのままにした）。ほかに食い違いは無かった
- **見込みとの食い違い**: 写真が 1 枚から 3 枚になったが、担当の組み方は変わらなかった
- **次に同じ規模なら**: 写真の候補探しは利用者とのやり取りが続くので main がやり、
  配置が決まってから verifier を 1 回だけ起こす、この組み方のままでよい。
  クレジットの読みやすさを確認項目に入れるなら、どの画面サイズで読めればよいかを
  依頼に書いておく（今回は書いておらず、412 幅で読めないことが判断待ちになった）
