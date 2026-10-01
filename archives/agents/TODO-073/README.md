# TODO-073 の分担

- main: `slides/backgammon.js` の「バックギャモンの歴史は古い」に、時間軸の線を伸ばす `historyGrow()` を足した（1 ファイルの中の変更なので、実装を分けなかった）。伸ばし始める秒は、Online TTS の音声を文の区切りまで取って測った
- reviewer（Opus 5.5 / high）: 経過秒から線の長さと矢じりの表示を決める分岐、動かし始め・止めるところを見る。分岐や条件式が新しく入るので入れた
- verifier（Sonnet 5.5 / medium）: reviewer のあとで、Playwright で線の伸び方を測る。CLAUDE.md の規約で、ファイルを変える項目は確認を別の担当に分ける

報告: [reviewer-report.md](reviewer-report.md)、[verifier-report.md](verifier-report.md)
