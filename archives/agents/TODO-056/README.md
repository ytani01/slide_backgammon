# TODO-056 の分担

見込みと実施の表は [archives/todo/](../../todo/) の TODO-056 のファイルにある。

| 担当 | 受け持ち | 報告 |
|------|----------|------|
| general-purpose（Sonnet） | Commons で写真の候補を探す | 無し（利用者が Gemini の画像を選んだので途中で止めた） |
| main | 差し替え、alt とクレジット | — |
| verifier（Sonnet） | 参照の検索、`ytslide check`、幅 1280px・412px での表示とスクリーンショット | [verifier-report.md](verifier-report.md) |

## 分担にした理由

- 写真探しは縮小版を 1 枚ずつ見る手間がかかるので、TODO-010 と同じく別の担当に出した
- 確認は実装と分ける決まりなので verifier に回した。分岐の変更が無いので reviewer は入れなかった
