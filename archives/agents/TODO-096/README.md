# TODO-096 の分担

- main: 実装（`slides/backgammon.js` の `rulesTrack` / `rulesArrow` / `rulesBattle` と、スライドの SVG）
- reviewer（Opus 5.5 / high）: 分岐（待ち・ゴールでの停止・戦いの判定）が変わるので、意味が崩れていないかを見る
- verifier（Sonnet 5.5 / medium）: Playwright で、3 本が重ならずに並び、ばらばらに動いて戦うかを実測する

reviewer を先、verifier を後に回す（reviewer の指摘で実装が変わると、実測が古い差分に対するものになるため）。
