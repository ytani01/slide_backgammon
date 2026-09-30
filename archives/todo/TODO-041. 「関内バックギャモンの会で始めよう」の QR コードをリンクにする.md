# TODO-041. 「関内バックギャモンの会で始めよう」の QR コードをリンクにする

|      | main | 担当 |
|------|------|------|
| 見込み | Opus 5.5 / effort medium | main（実装）+ reviewer（Opus 5.5 / high）+ verifier（Sonnet 5.5 / medium、クリックの挙動） |
| 実施 | Opus 5.5 / effort medium | main（実装）+ reviewer（Opus 5.5 / high、クリックの挙動も測った）+ verifier（Sonnet 5.5 / medium、表示） |

| 担当 | モデル | effort | input | output | cache_creation | cache_read | 割合 |
|------|--------|--------|-------|--------|----------------|------------|------|
| main | Opus 5.5 | medium | 146 | 28,646 | 164,266 | 7,246,397 | 82% |
| reviewer | Opus 5.5 | high | 44 | 3,458 | 96,206 | 731,963 | 9% |
| verifier | Sonnet 5.5 | medium | 52 | 1,262 | 88,650 | 657,021 | 8% |
| 合計 |  |  | 242 | 33,366 | 349,122 | 8,635,381 | 計 9,018,111 |

- TODO-038〜041 は同じファイルを続けて直したので、4 項目まとめて数えた（`token-usage.py TODO-038`、
  TODO-038 を立てたコミットから決着まで）。同じ表を 4 つのファイルに置いている
- この範囲には、TODO-037 の決着と TODO-042 を立てた分も入っている（切り分けられない）
- 途中で利用上限に当たり、担当が 2 回止まった。立て直した分も入っている

## きっかけ

利用者が「QR コードをリンクにもして」と言った。着手後に、表紙の「関内バックギャモンの会」も
公式サイトへのリンクにするよう足した。

## やったこと

- スライド 10 の QR コードの札を `<div>` から `<a>` にし、表紙の「関内バックギャモンの会」も `<a>` で囲んだ。
  どちらも `https://kannaibg.wixsite.com/kannai-backgammon` を新しいタブで開く
- `player.html` はスライドの枠のクリックで再生・一時停止を切り替えるので、`slides/template.js` のリンクと同じく
  `onclick="event.stopPropagation()"` を付けた

## 確かめたこと

- reviewer（`archives/agents/TODO-041/reviewer-report.md`）: Playwright の Chromium で、
  2 つのリンクのクリックとタップが再生・一時停止を切り替えないことを測った。スワイプ、動画の書き出し、字幕にも影響なし
- verifier（`archives/agents/TODO-041/verifier-report.md`）: リンクの文字に下線や色の変化が出ていない。
  `ytslide check` が通る

## 残ること

- リンクを押すとフォーカスがリンクに残り、`player.html` のキー操作（←→・Space・F・M）が
  枠をクリックするまで効かない。既存の `template.js` のリンクでも同じ。直すなら `player.html` 側（reviewer の報告）
- 公式サイトの URL が 4 か所（href 2 つ、札の文字、QR 画像）にある。URL が変わったら全部直す

## 分担の振り返り

- reviewer は、フォーカスがリンクに残ってキー操作が効かなくなる件を見つけた（既存の問題）
- 見込みでは verifier にクリックを測らせるつもりだったが、reviewer が測ったので verifier は表示だけにした。
  1 回目の reviewer は利用上限で止まり、立て直した
- 次に同じ規模をやるなら、クリックの挙動は reviewer の測定に任せ、verifier は表示の確認だけ頼む
