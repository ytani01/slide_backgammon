# TODO-005 の分担

見込みと実施の表は [archives/todo/](../../todo/TODO-005.%20バックギャモンの最後のスライドを「魅力」にして写真を入れる.md) にある。

| 担当 | 受け持ち | 報告 |
|------|----------|------|
| main | 写真の候補探しと利用者への提示、`images/bg-board*.jpg` の取得、`slides/backgammon.js` の最後のスライドの書き換え、`ytslide update` | — |
| verifier（Sonnet） | `ytslide check`、`duration` の測り直し、「まとめ」の残りの確認、1280x720 と 412x915 での実測とスクリーンショット、Commons のライセンスとクレジットの突き合わせ | [verifier-report.md](verifier-report.md) |

## 分担にした理由

- 写真を選ぶのに利用者とのやり取りが続くので、候補探しと実装は main がやった
- 確認は実装と分ける決まりなので verifier に回した。分岐や挙動の変更が無いので
  reviewer は入れなかった
