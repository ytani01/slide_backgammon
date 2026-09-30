# TODO-065 の分担

- main: プロンプト、画像のトリミング、実装（`slides/backgammon.js` の `step` とスライド 7 だけの変更なので、実装は分けなかった）
- verifier（Sonnet 5.5 / medium）: 幅 1280px と幅 412px で、絵の読み込み・カードが枠に収まるか・クレジットと重ならないか・説明文の行数を Playwright で実測し、スクリーンショットで絵の見え方を確かめる。同じ担当に 4 回続けて頼んだ。報告は [verifier-report.md](verifier-report.md)
