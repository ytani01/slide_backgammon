# TODO-045 verifier 報告

スクリプト: archives/agents/TODO-045/check.js（`node archives/agents/TODO-045/check.js`、終了コード 0）。
slides/backgammon.js は vm で読み込み、player.html の SPEECH_RULES は正規表現で抜き出して使用。
規則を入れる前は `git show HEAD:slides/backgammon.js`。当てる順は prepareSpeechText と同じ（slidesConfig.rules → SPEECH_RULES）。

- 変更範囲: `git diff HEAD -- slides/backgammon.js` は 1 行追加のみ。git status の変更は TODO.md と slides/backgammon.js（TODO.md は未確認、指示範囲外の可能性は管理者が判断）
- 1. 全 10 スライド（規則 25 → 26）に適用: 実行できた
- 2. 「バックギャモンとは」に「させたほうが勝ち」: 一致
- 3. 規則の前後で差が出たのは 1 スライドの 1 か所だけ（上記と同じ「させた方が勝ち」→「させたほうが勝ち」）。ほかに当たった文は無し
- 4. 適用後に残る「方」は 1 件: スライド 9「関内バックギャモンの会で始めよう」 `のかたには、遊び方を丁寧に教えます`（「遊び方」の方）。判断はしていない
- 5. 生の narration（字幕側）は変更前と完全一致

食い違い: なし。確かめられなかったこと: 特になし（壊して落ちるかの確認は、テストを追加していない項目なので対象外）。
