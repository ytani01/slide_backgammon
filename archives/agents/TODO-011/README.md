# TODO-011 の分担

見込みと実施の表は [archives/todo/](../../todo/TODO-011.%20バックギャモンの「不遇の歴史」と「日本では」を%201%20枚にまとめる.md) にある。

| 担当 | 受け持ち | 報告 |
|------|----------|------|
| main | 見せ方の案を利用者に出す、`slides/backgammon.js` の 2 枚をまとめる、`ytslide update` | — |
| verifier（Sonnet） | `ytslide check`、`duration` の測り直し、4 枚目のはみ出しと naturalWidth、スクリーンショット、ナレーションと表示の突き合わせ、枚数 | [verifier-report.md](verifier-report.md) |

## 分担にした理由

- 見せ方は利用者が選び、書き換えも 1 ファイルなので main がやった
- 確認は実装と分ける決まりなので verifier に回した。分岐の変更が無いので reviewer は入れなかった
- 同じファイルを直した TODO-007 の確認と 1 つの verifier にまとめた（報告は項目ごとに分けた）
