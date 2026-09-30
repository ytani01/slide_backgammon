# TODO-056. 「魅力① 簡単で手軽」の背景を、遊んでいる人の写真にする

|      | main | 担当 |
|------|------|------|
| 見込み | Opus 5.5 / effort medium | general-purpose（Sonnet 5.5。組み込みで定義ファイルは無い。写真探し）+ main（実装）+ verifier（Sonnet 5.5 / medium） |
| 実施 | Opus 5.5 / effort low | general-purpose（Sonnet 5.5。途中で止めた）+ main（実装）+ verifier（Sonnet 5.5 / medium） |

| 担当 | モデル | effort | input | output | cache_creation | cache_read | 割合 |
|------|--------|--------|-------|--------|----------------|------------|------|
| main | Opus 5.5 | low | 56 | 9,566 | 74,534 | 2,196,961 | 38% |
| general-purpose | Sonnet 5.5 | 組み込み（指定なし） | 84 | 4,990 | 142,209 | 3,402,990 | 59% |
| verifier | Sonnet 5.5 | medium | 20 | 134 | 27,534 | 198,436 | 4% |
| 合計 |  |  | 160 | 14,690 | 244,277 | 5,798,387 | 計 6,057,514 |

- general-purpose は組み込みで定義ファイルが無い。モデルは Agent ツールで Sonnet に上書きした
- 立ててから着手まで空いたので、`--since '2026-10-01 04:03:00'` で集計した

## きっかけ

TODO-050 の報告で、スライド 6「魅力① 簡単で手軽」に遊んでいる様子が見えないとされた。

## やったこと

- Commons での候補探しを general-purpose に頼んだが、縮小版を 17 枚落として見比べる段階で長引いた。並行して利用者が Gemini で画像を 2 枚作り、そのうち部屋で 3 人が笑って遊ぶ 1 枚を選んだので、探索は途中で止めた（報告は無い。落とした縮小版は使わないので消した）
- `images/bg-friends.jpg`（1376x768）を置き、`slides/backgammon.js` のスライド 6 の背景・alt・クレジット（「背景: AI 生成（Gemini）」）を差し替えた
- 使わなくなった `images/bg-portable.jpg` を消した

生成画像の盤は、駒の数と置き方が正しくない。背景は不透明度 50% で札が載るので目立たないとして、そのまま使った。

## 確かめたこと

verifier の報告は [archives/agents/TODO-056/verifier-report.md](../agents/TODO-056/verifier-report.md)。

- `bg-portable` の参照が 0 件、`ytslide check --slides backgammon` が通る
- 幅 1280px と幅 412px で、背景が `bg-friends.jpg`（naturalWidth 1376）で読み込まれ、人物・札 3 枚・クレジットが見える。幅 412px ではクレジットの判読がぎりぎり（ほかのスライドと同じ大きさ）
- 画像の 404 は無い（favicon の 404 だけ）

## 分担の振り返り

- general-purpose: 候補を 17 枚落としたが、報告を書く前に止めたので何も残らなかった。消費の 59% がこの担当で、結果に使われなかった
- 見込みとの食い違い: 依頼に見比べる枚数の上限と打ち切りの基準が無く、「笑っている」「若い人・女性を優先」の条件もきつかったため、条件に合う写真を探し続けた
- 次に同じ規模の写真探しを頼むなら、見比べる枚数の上限（10 枚ほど）と、合う写真が無いときに打ち切る基準を依頼に書く。人物の表情のように Commons で見つけにくい条件なら、先に AI 生成を利用者に提案し、Commons は代わりにする
