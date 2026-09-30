# TODO-007 の分担

見込みと実施の表は [archives/todo/](../../todo/TODO-007.%20バックギャモンの歴史のスライドの背景に古い世界地図を入れる.md) にある。

| 担当 | 受け持ち | 報告 |
|------|----------|------|
| main | 地図の候補探し、利用者への提示、`slides/backgammon.js` の 2 枚目の書き換え | — |
| verifier（Sonnet） | `ytslide check`、2 枚目のはみ出しと naturalWidth、スクリーンショットで地図と文字を見る | [verifier-report.md](verifier-report.md) |

## 分担にした理由

- 地図の候補探しは利用者とのやり取りが続くので main がやった。実装も 1 枚の書き換えなので main
- 確認は実装と分ける決まりなので verifier に回した。分岐の変更が無いので reviewer は入れなかった
- 同じファイルを直した TODO-011 の確認と 1 つの verifier にまとめた（報告は項目ごとに分けた）
