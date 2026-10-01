# TODO-076 の分担

- main: `slides/backgammon.js` に、夜景の明かりの上に光の粒を重ねる SVG（`karenaLights`）と、ランダムに明滅させる `karenaTwinkle()` を足し、`bgSlide` に `overlay` を足した（1 ファイルの中の変更なので、実装を分けなかった）。明かりの座標は [pick-lights.py](pick-lights.py) で画像から拾った
- reviewer（Opus 5.5 / high）: 光らせる明かりを選ぶ条件（切られて見えないもの、見出し・箇条書き・QR の札と重なるものを外す）、同時に光る数の上限、止め方を見る。分岐や条件式が新しく入るので入れた
- verifier（Sonnet 5.5 / medium）: reviewer のあとで、Playwright で幅を変えて、光が明かりに乗るか・札と重ならないか・動きを減らす設定で光らないかを測る。CLAUDE.md の規約で、ファイルを変える項目は確認を別の担当に分ける

報告: [reviewer-report.md](reviewer-report.md)、[verifier-report.md](verifier-report.md)
