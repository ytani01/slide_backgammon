# TODO-026 の分担

この項目の担当: 確認（選手カード）。

TODO-020〜031 の 12 件は、利用者が判断を main に任せ、並行して進めるよう指示した。
そこで次のように組んだ。

- 調べものの要る項目（020・021・024・025・027・030）は、general-purpose（Sonnet 5.5）に
  調査を任せ、4 つを並行して走らせた。その間に main は調べものの要らない項目を実装した
- 確認は verifier（Sonnet 5.5 / medium）1 つを起こし、SendMessage で項目ごとに続けて頼んだ。
  main が作業ツリーで次の項目を編集していても崩れないよう、コミットを worktree に取り出して
  測らせた。計測スクリプトは TODO-031 で作った `archives/agents/TODO-031/measure.py` を使い回した
- レビューの担当は入れなかった。スライドの文言と見た目だけで、分岐や条件式は変わらない

## 報告

- 確認: [verifier-report.md](verifier-report.md)

確認の担当が撮ったスクリーンショットは、量が多い（13 件で 133 枚・42MB）ので残していない。
`archives/agents/TODO-031/measure.py <コミット> <ポート>` で撮り直せる。
