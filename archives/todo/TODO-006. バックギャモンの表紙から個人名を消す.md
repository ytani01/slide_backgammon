# TODO-006. バックギャモンの表紙から個人名を消す

|      | main | 担当 |
|------|------|------|
| 見込み | Opus 5.5 / effort medium | main（実装）+ verifier（Sonnet 5.5 / medium） |
| 実施 | Opus 5.5 / effort 不明 | main（実装）+ verifier（Sonnet / medium） |

| 担当 | モデル | effort | input | output | cache_creation | cache_read | 割合 |
|------|--------|--------|-------|--------|----------------|------------|------|
| main | Opus 5.5 | 不明 | 不明 | 不明 | 不明 | 不明 | 不明 |
| verifier | Sonnet | medium | 不明 | 不明 | 不明 | 不明 | 不明 |
| 合計 |  |  |  |  |  |  | 計 不明（verifier は 21,859） |

- git リポジトリではないので `token-usage.py` が動かなかった（`git log` が終了コード
  128。TODO-004 と同じ）。完了通知に出た verifier の合計だけを記録する
- verifier は Agent ツールで `sonnet` を指定した。effort は定義ファイルの `medium`
- main の effort は記録に残っていないので「不明」とした
- TODO-005・TODO-007 と同じセッションで進めた

## きっかけ

2026-09-30 に利用者の依頼で立てた。表紙の個人名を、表示とナレーションの両方から消す。

## やったこと

`slides/backgammon.js` を直した。

- 表紙の「谷林 陽一」の行（`<p>`）を消した
- 表紙のナレーションの「谷林陽一です。」を消した
- 使わなくなった `rules` の「谷林 → たにばやし」を消した
- `ytslide update --slides backgammon` で表紙の `duration` を 9 → 8 にした

## 確かめたこと

- `ytslide check --slides backgammon`: 「問題なし」
- `rg 谷林 slides/backgammon.js`: 該当なし
- `ytslide measure`（書き込みなし）の表紙の値がファイルの `duration: 8` と一致した
- 1280x720 で表紙の `#slide-canvas` は scrollHeight / clientHeight が 428 / 428。
  スクリーンショットでも文字の切れや重なりは無く、名前の行を消した跡の余白も
  目立たない（中身は縦中央に寄る）
- 詳細は [archives/agents/TODO-006/](../agents/TODO-006/README.md)

## 分担の振り返り

- **verifier が見つけたこと**: 食い違いは無かった
- **見込みとの食い違い**: 無かった
- **次に同じ規模なら**: 1 行消すだけの項目でも、表紙の見た目の確認は要るので
  この組み方（main の実装 + Sonnet の verifier 1 回）のままでよい。同じスライド
  ファイルを直す項目が並ぶときは、verifier をまとめて 1 回にすれば
  起動と環境の立ち上げが 1 回で済む
