# TODO-003 の分担

見込みと実施の表は [archives/todo/](../../todo/TODO-003.%20バックギャモンのススメのスライドを作る.md) にある。

| 担当 | 受け持ち | 報告 |
|------|----------|------|
| main | 動画の取得、画像 6 枚の切り出し、実装後の手直し（読み、`object-contain`） | — |
| implementer（Sonnet） | `slides/backgammon.js` の実装、`ytslide update`・`ytslide check` | [implementer-report.md](implementer-report.md) |
| general-purpose（Sonnet、確認） | `ytslide check`、Playwright MCP で 2 つの画面サイズの実測、画像の目視、動画の文字との突き合わせ | [verifier-report.md](verifier-report.md)、スクリーンショット `verifier-s2〜s4.png` |

## 分担にした理由

- 画像の切り出しは、フレームを見ながら範囲を決める作業で、文脈を持っている
  main がやるのが早い
- 実装は `template.js` を写して中身を差し替える作業なので Sonnet で足りる
- 確認は Playwright MCP が要るので `general-purpose` にした（TODO-001 と同じ）。
  挙動の変更が無いので `reviewer` は入れなかった
