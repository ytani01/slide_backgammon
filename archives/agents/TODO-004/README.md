# TODO-004 の分担

見込みと実施の表は [archives/todo/](../../todo/TODO-004.%20バックギャモンのスライドの事実の誤りを直す.md) にある。

| 担当 | 受け持ち | 報告 |
|------|----------|------|
| main | `slides/backgammon.js` の文言と読みの修正、`ytslide update`・`ytslide check` | — |
| verifier（Sonnet） | `ytslide check`、本文とナレーションの突き合わせ、1280x720 での実測、`duration` の測り直し | [verifier-report.md](verifier-report.md) |

## 分担にした理由

- 直し方は利用者と決めてあり、文言の置き換えだけなので main がやった
- 確認は実装と分ける決まりなので verifier に回した。分岐や挙動の変更が無いので
  reviewer は入れなかった
