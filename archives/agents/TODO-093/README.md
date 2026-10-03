# TODO-093 の分担

- main: `cueSay` の `data-say-show`（年を隠す）を `data-say-pop`（膨らませて光らせる）に置き換えた
- reviewer（Opus 5.5 / high）: 分岐（最後の形・シーク・強調が外れたとき）と、膨らんだ年がはみ出すかを読んだ。報告は [reviewer-report.md](reviewer-report.md)
- verifier（Sonnet 5.5 / medium）: Playwright で、年が最初から見えるか、膨らみの頂点で札からはみ出すか、終わりに元に戻るかを測った。報告は [verifier-report.md](verifier-report.md)

強調の分岐が変わるので reviewer を入れた。reviewer がはみ出す見込みを挙げたので、verifier に頂点で測らせた。
