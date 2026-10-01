# TODO-072 の分担

- main: `slides/backgammon.js` の「バックギャモンとは」の矢印を、SMIL から `requestAnimationFrame` で動かす `rulesBattle()` に置き換えた（1 ファイルの中の変更なので、実装を分けなかった）
- reviewer（Opus 5.5 / high）: 状態の移り変わり（進む・ぶつかる・戦う・出直す・ゴールで止まる）の分岐と、動かし始め・止めるところを見る。分岐や条件式が新しく入るので入れた
- verifier（Sonnet 5.5 / medium）: reviewer のあとで、Playwright で動きを測る。CLAUDE.md の規約で、ファイルを変える項目は確認を別の担当に分ける

報告: [reviewer-report.md](reviewer-report.md)、[verifier-report.md](verifier-report.md)。verifier の測定スクリプトは [verifier-measure.js](verifier-measure.js)（node から Playwright で動かす）
