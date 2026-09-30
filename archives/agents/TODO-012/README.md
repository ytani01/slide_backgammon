# TODO-012 の分担

見込みと実施の表は [archives/todo/](../../todo/TODO-012.%20バックギャモンの「歴史は古い」に時間軸の矢印を入れる.md) にある。

| 担当 | 受け持ち | 報告 |
|------|----------|------|
| main | `slides/backgammon.js` の 2 枚目に時間軸を足す。太さ・文字の大きさ・配置は試し撮りを利用者に見せて決めた | — |
| verifier（Sonnet 5.5） | `ytslide check`、1280x720 と 412x915 での点・図・説明文の位置合わせ、矢じりと線のずれ、はみ出し、説明文の行数、スクリーンショット、差分が指示の範囲だけか | [verifier-report.md](verifier-report.md)（1〜4 回目の節。[slide2-1280.png](slide2-1280.png)、[slide2-412.png](slide2-412.png)） |

## 分担にした理由

- 変更は 1 枚のレイアウトだけなので、実装は main が持った
- 確認は実装と分ける決まりなので verifier に回した。分岐の変更が無いので reviewer は入れなかった
- 見た目を直すたびに、同じ verifier に続けて頼んだ
