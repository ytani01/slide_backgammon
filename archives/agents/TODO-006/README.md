# TODO-006 の分担

見込みと実施の表は [archives/todo/](../../todo/TODO-006.%20バックギャモンの表紙から個人名を消す.md) にある。

| 担当 | 受け持ち | 報告 |
|------|----------|------|
| main | `slides/backgammon.js` の表示・ナレーション・読みの削除、`ytslide update` | — |
| verifier（Sonnet） | `ytslide check`、`rg 谷林`、`duration` の測り直し、表紙の 1280x720 での実測とスクリーンショット | [verifier-report.md](verifier-report.md) |

## 分担にした理由

- 消すものは利用者と決めてあり、文言の削除だけなので main がやった
- 確認は実装と分ける決まりなので verifier に回した。分岐や挙動の変更が無いので
  reviewer は入れなかった
