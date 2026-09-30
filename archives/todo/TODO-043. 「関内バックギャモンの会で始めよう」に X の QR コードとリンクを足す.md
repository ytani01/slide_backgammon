# TODO-043. 「関内バックギャモンの会で始めよう」に X の QR コードとリンクを足す

|      | main | 担当 |
|------|------|------|
| 見込み | Opus 5.5 / effort medium | main（実装）+ verifier（Sonnet 5.5 / medium、表示とリンク） |
| 実施 | Opus 5.5 / effort medium | main（実装）+ verifier（Sonnet 5.5 / medium、表示とリンク。直したあと 1 回追加） |

| 担当 | モデル | effort | input | output | cache_creation | cache_read | 割合 |
|------|--------|--------|-------|--------|----------------|------------|------|
| main | Opus 5.5 | medium | 62 | 10,728 | 54,389 | 1,855,609 | 86% |
| verifier | Sonnet 5.5 | medium | 24 | 409 | 34,330 | 267,945 | 14% |
| 合計 |  |  | 86 | 11,137 | 88,719 | 2,123,554 | 計 2,223,496 |

## きっかけ

利用者の依頼。置き方は「QR を縦に 2 枚」に決めた。X の URL（https://x.com/lppcn5b6mw94np2）は公式サイトのフッターのリンクから取った。

## やったこと

- `qrencode -s 10 -m 2` で `images/x-qr.png` を作った
- `slides/backgammon.js` に札を作る `qrCard()` を足し、右の札を上下 2 段にした。上が公式サイト、下が X。
  どちらも札ごと `<a>`（`onclick="event.stopPropagation()"` 付き。TODO-041 と同じ）
- 札を縦に 2 枚積むと高さが足りないので、札の中を「QR を左、文字を右」にした
- 幅 412px で「日程・申し込み / は / 公式サイトで」と「は」だけの行ができたので、「申し込みは」を `whitespace-nowrap` で囲んだ

## 確かめたこと

verifier（`archives/agents/TODO-043/verifier-report.md`）が Playwright で測った。

- 2 つの QR 画像をデコードした URL が、それぞれのリンク先と一致する
- 幅 1280px と 412px で、札のはみ出し、札同士・一覧・タイトル・クレジットとの重なりが無い
- X の札のクリックで新しいタブが開き、`isPlaying` は変わらない
- `ytslide check --slides backgammon` が通る

## 残ること

- 実機のスマホでの見え方と、QR の実機での読み取りは確かめていない

## 分担の振り返り

- verifier は、幅 412px で「は」だけの行ができるのを見つけた。直したあと同じ担当に続けて頼み、測り直させた
- 見込みとの食い違いは、直したあとの確認を 1 回足したことだけ
- 次に同じ規模をやるなら、同じ組み方でよい。ただし札の文言は、幅 412px で折り返しを先に main が見てから verifier に回す
