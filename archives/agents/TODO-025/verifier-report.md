# TODO-025 verifier 報告（コミット da7488c。TODO-025 の差分は 44df167）

測定: `N=10 archives/agents/TODO-031/measure.py da7488c 8771`（終了コード 0）。スクリーンショットは `archives/agents/TODO-025/shots/s1〜s10.png`。

## 1. はみ出し・画像・見出し
- 10 枚とも scrollHeight = clientHeight = 428。読み込めていない img は無し。
- h2 上端: 2〜10 枚目すべて 24.828125 px。一致。

## 2. 4 枚目の目視
- 写真は枠いっぱいで、左右の黒い帯は無い。手前の盤が 1 つ見え、ほかにも奥に対局している人がいる。チェスなど別のゲームは目立たない。
- 文字の欠け・重なりは無い。右の 2 つの箱、キャプション（チェコの大会の会場（2008 年））、クレジットも読める。
- 気づいた点（実害は未確認）: 手前の人物の背中が大きく、盤は写真の下半分に寄っている（調査報告にも同じ記述あり）。

## 3. 事実・写真のクレジット
- 「約 3 億人」「日本バックギャモン協会による」: 報告の出典（協会の説明、ja.wikipedia）と一致。「遊ぶ人」に直っている。
- 世界選手権 1979 年から毎年、モナコ・モンテカルロ: 報告の出典 1 と一致。
- 「チェコの大会 2008 年」: 報告の写真の説明（Deskohraní 2008、チェコ）と一致。
- クレジット「Matěj Baťha (CC BY-SA 3.0)／Wikimedia Commons」: 報告の作者・ライセンスと一致。
- `rg -n "10億|10 億|競技人口|趣味レベル" slides/`: 該当なし（本文・ナレーションとも残っていない）。
- 報告に無い事実は見当たらない。ナレーションの「言われます」は報告の「といわれています」に沿っている。

## 4. bg-crowd.png の参照
- `rg -n bg-crowd --glob '!archives/**'`: slides/backgammon.js の bg-crowd2.jpg だけ（bg-crowd.png への参照は無し）。images/ に bg-crowd.png は無い。
- archives/agents/TODO-013/verifier-report.md に文字列が残るが、過去の報告。

## 5. duration
- `ytslide measure --slides backgammon --all`（書き込みなし。git status 変化なし）: スライド 4 は原文 95 字 / 読み 98 字 / 実測 21.816s / 1.4 倍速 15.58s -> duration: 16。ファイルの値 16 と一致。

## 差分の範囲
- 44df167: TODO.md、images/bg-crowd.png（削除）、images/bg-crowd2.jpg（追加）、slides/backgammon.js（4 枚目のみ）。指示の範囲と合っている。

---

# 再確認（コミット 81e9926。TODO-025 の差分は a91025a）

測定: `N=10 archives/agents/TODO-031/measure.py 81e9926 8771`。5 枚目のスクリーンショットは `archives/agents/TODO-025/shots/s5-after.png`。

## 1. 5 枚の写真
- イラン・ジョージア・チュニジア・ペルー・チェコの 5 枚とも欠けず、盤や対局の様子が見える。国名の札（イラン、ジョージア、チュニジア、ペルー、チェコ）は 5 枚全部が読める。
- 写真は右端が 476px（canvas 868px）で、右の数字の箱（約 525px から）とは重ならない。5 枚は傾けて互いに少し重なるが、札は隠れていない。
- 写真の下端は 239・226・234・366・379 px で、いずれも canvas の高さ 428 以内。`OUTSIDE: []`。
- 10 枚とも scrollHeight = clientHeight = 428、読み込めない img 無し、h2 上端 24.828125 px。

## 2. 作者・ライセンス
- クレジット行: 「写真: Adam Jones、Marcin Konsek、Monaam Ben Fredj、Alex Proimos、Matěj Baťha（CC BY / BY-SA）／Wikimedia Commons」。5 人の名前が全部ある。1 行に収まっている（s5-after.png の右下）。
- world-photos-report.md と照合: イラン Adam Jones（CC BY-SA 2.0）、ジョージア Marcin Konsek（CC BY-SA 4.0）、チュニジア Monaam Ben Fredj（CC BY-SA 4.0）、ペルー Alex Proimos（CC BY 2.0）、チェコ Matěj Baťha（CC BY-SA 3.0）。名前は一致。
- 境界線上（報告だけ）:
  - ライセンスは「CC BY / BY-SA」とまとめてあり、版（2.0・3.0・4.0）は書かれていない。
  - イランの写真は切り出し（改変）で、報告は「一部を切り出して使用」と添えるのが安全としている。クレジットには無い。
  - ペルー・チュニジアは、報告に「国以外の場所は Commons に書かれていない」とあり、ペルーは「カテゴリが Men of Peru で場所は不明」。札の「ペルー」が確かかは判断できない。
  - 国名の札の字は小さくない（読める）。クレジットの字は小さく薄い。

## 3. duration
- 5 枚目は原文 107 字 / 読み 113 字 / 実測 24.264s / 1.4 倍速 17.33s -> duration: 17。ファイルの値 17 と一致（10 枚全部一致）。
