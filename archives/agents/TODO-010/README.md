# TODO-010 の分担

見込みと実施の表は [archives/todo/](../../todo/TODO-010.%20バックギャモンの魅力のスライドの写真を差し替える.md) にある。

| 担当 | 受け持ち | 報告 |
|------|----------|------|
| general-purpose（Sonnet） | Commons で写真の候補を探し、縮小版を目で見て条件に合うかを確かめる | [search-report.md](search-report.md)（縮小版は [candidates/](candidates/)） |
| main | 候補を利用者に見せる、3 枚を選んで切り出す、`slides/backgammon.js` の alt とクレジット | — |
| verifier（Sonnet） | `ytslide check`、5 枚目のはみ出しと naturalWidth、スクリーンショット、クレジットと Commons の突き合わせ、旧写真が残っていないか | [verifier-report.md](verifier-report.md) |

## 分担にした理由

- 利用者から「並行してできる作業は並行して進めて」と指示があったので、候補探しを
  別の担当に出し、main は TODO-007・TODO-011 を進めた
- 確認は実装と分ける決まりなので verifier に回した。TODO-007・TODO-011 を確認した
  verifier に続けて頼んだ。分岐の変更が無いので reviewer は入れなかった
