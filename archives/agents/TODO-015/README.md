# TODO-015 の分担

見込みと実施の表は [archives/todo/](../../todo/TODO-015.%20「世界中で日本人が大活躍」のスライドを足す.md) にある。

| 担当 | 受け持ち | 報告 |
|------|----------|------|
| general-purpose（Sonnet 5.5） | 「望月プロ」が誰かの確認、二人の優勝歴（出典付き）と写真の調査（TODO-013 の担当が 3 項目分をまとめて調べた） | [../TODO-013/search-report.md](../TODO-013/search-report.md) の B 節 |
| main | 載せる優勝歴の選定（世界選手権だけ）、写真と背景の取得、`pro()` とスライドの追加、ナレーション、読みの規則、試し撮り | — |
| verifier（Sonnet 5.5。TODO-013・014 から続けて） | `ytslide check`、4 枚目の見た目とはみ出し、優勝歴と出典の突き合わせ、duration と読み、後ろのスライドがずれただけか | [verifier-report.md](verifier-report.md) |

## 分担にした理由

- 優勝歴は事実の誤りが出やすいので、調べる担当と突き合わせる担当を分けた
- 確認は実装と分ける決まりなので verifier に回した。分岐の変更が無いので reviewer は入れなかった
