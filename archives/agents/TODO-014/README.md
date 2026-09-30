# TODO-014 の分担

見込みと実施の表は [archives/todo/](../../todo/TODO-014.%20バックギャモンの「魅力」を%203%20枚に分けて膨らませる.md) にある。

| 担当 | 受け持ち | 報告 |
|------|----------|------|
| general-purpose（Sonnet 5.5） | 背景の候補探し（TODO-013 の担当が 3 項目分をまとめて探した） | [../TODO-013/search-report.md](../TODO-013/search-report.md) |
| main | 3 枚への分割、ナレーション、`ytslide measure` での duration、背景の選定と取得、試し撮り | — |
| verifier（Sonnet 5.5。TODO-013 から続けて） | `ytslide check`、5〜7 枚目の背景・はみ出し・行数、利用者の挙げた中身と旧版の文言が残っているか、duration、クレジット | [verifier-report.md](verifier-report.md) |

## 分担にした理由

- 実装は 1 ファイルで、`bgSlide()` と `step()`・`li()` を使い回せたので main が持った
- 確認は実装と分ける決まりなので verifier に回した。分岐の変更が無いので reviewer は入れなかった
- ナレーションの読みは、利用者が「判断は任せる、直すなら別の TODO にする」と決めたので、利用者の確認を待たずに verifier に回した
