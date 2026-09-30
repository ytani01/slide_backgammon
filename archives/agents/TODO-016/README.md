# TODO-016・017 の分担

見込みと実施の表は [archives/todo/](../../todo/TODO-016.%20バックギャモンの「魅力②」「魅力③」の背景を差し替える.md) にある。
TODO-017 も同じスライドのファイルを触るので、確認は 1 回にまとめた。

| 担当 | 受け持ち | 報告 |
|------|----------|------|
| main | 背景の選定（利用者から任された）、画像の取得、書き換え、試し撮り | — |
| verifier（Sonnet 5.5） | `ytslide check`、横 1280px とスマホでの背景の naturalWidth・opacity・はみ出し、写真の切れ方、クレジットと Commons の照合、消した画像への参照 | [verifier-report.md](verifier-report.md)（測定は TODO-013 の [verify.py](../TODO-013/verify.py) を使い回した） |

## 分担にした理由

- 画像探しは前回の候補と Commons の検索で足りたので、main が自分で済ませた
- 確認は実装と分ける決まりなので verifier に回した。分岐の変更が無いので reviewer は入れなかった
