# TODO-092 の分担

- main: `ytslide measure --write` で 2 枚の `duration` を書き戻した
- verifier（Sonnet 5.5 / medium）: 書き戻さずに全 9 枚を測り直し、`duration` と突き合わせた。`ytslide check` も走らせた。報告は [verifier-report.md](verifier-report.md)

変えるのは数字 2 つだけで、挙動の分岐は変わらないので reviewer は入れなかった。確認は、実装した main と別の担当に測り直させるために分けた。
