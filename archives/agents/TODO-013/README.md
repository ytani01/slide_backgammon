# TODO-013 の分担

見込みと実施の表は [archives/todo/](../../todo/TODO-013.%20バックギャモンの各スライドに背景の画像を敷く.md) にある。
TODO-014・TODO-015 と並行して進めたので、画像探しと verifier は 3 項目で同じ担当を使った。

| 担当 | 受け持ち | 報告 |
|------|----------|------|
| general-purpose（Sonnet 5.5） | TODO-013〜015 の背景の候補（Commons）と、望月・矢澤両プロの優勝歴と写真の調査 | [search-report.md](search-report.md)（縮小版は [candidates/](candidates/)） |
| main | 背景の選定（利用者から任された）、画像の取得、`bgSlide()` と 1〜4 枚目の書き換え、試し撮り | — |
| verifier（Sonnet 5.5） | `ytslide check`、横 1280px とスマホでの背景の naturalWidth・opacity・はみ出し、2 枚目の位置が TODO-012 から変わっていないか、差分、クレジット | [verifier-report.md](verifier-report.md)（測定は [verify.py](verify.py)） |

## 分担にした理由

- 候補探しは Web を多く引くので、別の担当に出して main は TODO-012 を進めた。
  TODO-014・015 の分も 1 回にまとめた（利用者が決めた）
- 確認は実装と分ける決まりなので verifier に回した。分岐の変更が無いので reviewer は入れなかった
- 同じ verifier に TODO-014・015 の確認も続けて頼み、測定のスクリプトを使い回させた
