# TODO-031 verifier 報告（コミット adcea83）

測定: `archives/agents/TODO-031/measure.py adcea83 8771`（終了コード 0）。1280x720、1 枚ずつ about:blank を挟んで開き、1.3 秒待った。スクリーンショットは s1.png〜s8.png。

## 1. はみ出し・画像
- 8 枚とも scrollHeight = clientHeight = 428。はみ出し無し。
- 8 枚とも naturalWidth 0 の img は無し。

## 2. h2 上端（#slide-canvas 上端から）
- 2〜8 枚目すべて 24.828125 px。一致。

## 3. アイコン（6〜8 枚目）
| 枚 | クラス | i の幅 |
|---|---|---|
| 6 | fa-feather-pointed | 28 |
| 7 | fa-dice | 35 |
| 8 | fa-wand-magic-sparkles | 31 |
- 幅は 0 でなく、3 つ互いに違う。font-family は "Font Awesome 6 Free"。スクリーンショットでも 3 枚とも字形が出ている。

## 4. スクリーンショットの目視（デザインの良し悪しは評価しない）
- 8 枚とも、見出し・箱の中の文字は読める。欠け、余計なものは見当たらない。
- 気づいた点（実害は未確認）:
  - s3・s4・s8 は背景画像自体が暗く、全体としてはまだ暗い印象。s2・s5・s6・s7 は背景が見える。
  - s3 の写真の左に黒い帯がある（写真の縦横比によるもの。今回の差分の範囲かは判断できない）。

## 5. 差分
- `git show --stat adcea83`: TODO.md（チェック 3 つ）と slides/backgammon.js だけ。
- backgammon.js の変更は step の背景の濃さ、bgSlide（opacity 既定 30→50、暗幕のグラデーション、見出し固定と本文の中央寄せ、見出しの色と影）、魅力①②③の icon 3 つだけ。
- narration・title・duration・文言の変更は無し。指示の範囲と合っている。

## 確かめなかったこと
- 明るさの好みの判断（管理者と利用者の判断）。
- 変更前との h2 位置の比較（指示外）。
