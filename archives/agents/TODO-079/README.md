# TODO-078〜083 の分担

6 件とも `slides/backgammon.js` の中の変更なので、main がまとめて実装し、確認の担当も 1 人ずつで全件を見た（利用者の指示「残りの TODO 項目を、もっともトークン消費が少ないやり方で」）。
TODO-079〜081 はナレーションに合わせて動かすので、TODO-073 の `historyGrow` から秒の数え方を `narrationClock` に切り出し、3 件で使い回した。

- main: 5 件の実装。秒は [tts-cues.js](tts-cues.js) で Online TTS の音声を区切りまで取って測った
- reviewer（Opus 5.5 / high）: `narrationClock` の切り出しで `historyGrow` の挙動が変わっていないか、強調・落とす・数え上げの条件式。分岐や条件式が変わるので入れた
- verifier（Sonnet 5.5 / medium）: reviewer のあとで、Playwright で 5 件を測る。TODO-083（他のスライドへの強調）も同じ担当に続けて測らせた。CLAUDE.md の規約で、ファイルを変える項目は確認を別の担当に分ける

報告: [reviewer-report.md](reviewer-report.md)、[verifier-report.md](verifier-report.md)

TODO-083 は TODO-078〜082 の確認の途中で利用者が足した。強調の作り（`cueSay`）は変えず、印を足すだけなので reviewer は立てなかった。
