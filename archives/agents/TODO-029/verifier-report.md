# TODO-029 verifier 報告（コミット bb84ad2。TODO-029 の差分は d26b77e）

測定: `N=10 archives/agents/TODO-031/measure.py bb84ad2 8771`（終了コード 0）。スクリーンショットは `archives/agents/TODO-029/shots/s1〜s10.png`。

## 1. はみ出し・画像・見出し
- 10 枚とも scrollHeight = clientHeight = 428。読み込めていない img は無し。h2 上端は 2〜10 枚目すべて 24.828125 px。一致。

## 2. 8 枚目の目視
- 真ん中の箱「点数を 2 倍にする／「ダブル」の駆け引き」は 2 行で収まり、変な折れは無い。3 つの箱の高さも揃っている。欠け・重なり無し。

## 3. 言葉の残り・意味
- `rg -n "掛け点|かけ点|吊り上げ|ポーカー" slides/`: 該当なし。
- ナレーション: 「途中で『点数を2倍にしよう』と持ちかける、ダブルという駆け引きもあります。」
- 出典: Wikipedia "Backgammon" (https://en.wikipedia.org/wiki/Backgammon)、ダブリングキューブの節（API で本文を取得）:「Their opponent must either accept ("take") the doubled stakes or resign ("drop") the game immediately.」。倍の点数を提案し、相手は受けるか負けを認める、という一般的な説明で、スライドの「途中で点数を 2 倍にしようと持ちかける＝ダブル」と食い違わない。
- 境界線上（報告だけ。実害は未確認）: スライドとナレーションには、相手が受けるか降りるかの選択が書かれていない。「持ちかける」までで、「駆け引き」と言える理由（相手が断ることもある）は伝わらない。
- ナレーションの 2 文字目以降にダブリングキューブの説明を足すかは、主催者の判断。

## 4. duration
- `ytslide measure --slides backgammon --all`（書き込みなし。git status 変化なし）: スライド 8 は原文 114 字 / 読み 114 字 / 実測 25.560s / 1.4 倍速 18.26s -> duration: 18。ファイルの値 18 と一致。

## 差分の範囲
- d26b77e: TODO.md と slides/backgammon.js（8 枚目のナレーション・duration・中央の箱の文言）だけ。
