# TODO-074・075・077 の分担

3 件とも `slides/backgammon.js` の小さな変更なので、まとめて進めた（利用者の指示「残りの TODO 項目を、もっともトークン消費が少ないやり方で」）。

- main: 3 件の実装。表紙の `duration` は、Online TTS の音声の長さ（8.112 秒）を 1.4 倍速で割って 6 にした
- verifier（Sonnet 5.5 / medium）: 3 件を 1 人でまとめて確認し、TODO-074 の測り直し 2 回も同じ担当に続けて頼んだ。計測スクリプトは [verifier-measure.js](verifier-measure.js) の 1 本。CLAUDE.md の規約で、ファイルを変える項目は確認を別の担当に分ける
- reviewer は立てなかった。3 件とも分岐や条件式が変わらない（クラスの付け替え、配置、ナレーションの文言）

報告: [verifier-report.md](verifier-report.md)（3 件分。TODO-074 は「2 回目」「3 回目」の節まで）
