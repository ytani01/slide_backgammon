# TODO-063 の分担

- main（Opus 5.5）: 実装と、`ytslide measure --write` での duration の書き直し
- verifier（Sonnet 5.5 / medium）: ナイトへの言及が残っていないか、`ytslide check` と duration の一致、1280x800 と幅 412px での配置の実測。報告は [verifier-report.md](verifier-report.md)

画面の配置が変わる項目なので、実装と確認を分けた。分岐や条件式は変わらないので reviewer は入れていない。
