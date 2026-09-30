# TODO-025 調査報告（数字の出典と写真）

調べた日: 2026-09-30。コードは直していない。追加したファイルは `images/bg-crowd2.jpg` だけ。

## A. 数字の出典

### 「3 億人」

| 出典 | 内容 | 確認の程度 |
|------|------|-----------|
| 日本語版 Wikipedia「バックギャモン」 https://ja.wikipedia.org/wiki/バックギャモン | 「日本バックギャモン協会によれば、現在、競技人口は欧米を中心に3億人ほどが存在するという。」注は『バックギャモン・ブック』p206（日本バックギャモン協会編著、2002 年 10 月 20 日初版） | ページを取得して本文と注を確認 |
| 日本バックギャモン協会「バックギャモンとは」 https://backgammon.or.jp/?page_id=746 | 「ボードゲームの中では世界で最も遊戯人口が多く、その数は約３億人といわれています。」 | 検索結果に出た本文で確認。ページ本体の取得は 404 で失敗（未確認） |
| goodus.jp https://goodus.jp/detail/1/7201 | 「世界に3億人のプレイヤーがいると言われています」 | 根拠の記載なし |
| Freakonomics のポッドキャスト https://freakonomics.com/podcast/can-backgammon-save-us-from-ourselves/ | 出演者が 3 億人と発言 | 検索結果の要約のみ。根拠の記載なし（原文は未確認） |

- 出どころは日本バックギャモン協会の説明で、元は 2002 年の協会編著の書籍。他の記事は
  これを写したものに見える（推測）。
- 数字の中身は「遊戯人口」（遊ぶ人）で、Wikipedia は「競技人口」と書き換えている。
  スライドの「競技人口」は言い過ぎ。協会の言い方は「遊戯人口」。
- 「欧米を中心に」とあるが、調査や推計の方法は書かれていない。約 24 年前の書籍の
  数字。独立した調査は見つからなかった。

### 「趣味レベル 10 億人超え」

- 出典は見つからなかった。日本語の検索、日本語版 Wikipedia、協会の説明文のどれにも
  無い（未確認ではなく、探した範囲では無い）。
- 出典が無いなら載せない方がよい。

### 代わりに使える確かな事実

1. 世界選手権は 1979 年からモナコのモンテカルロ（Fairmont Monte Carlo）で開かれ、
   世界各国から数百人が集まる。 https://en.wikipedia.org/wiki/World_Backgammon_Championship
   （日本語版も、モンテカルロで毎年開催と記述）
2. 東地中海の多くの国で国民的なゲームとされている（エジプト、トルコ、キプロス、シリア、
   イスラエル、パレスチナ、レバノン、ギリシャ、アルメニア）。呼び名はタブラ、タブリ、
   ナルドなど。 https://en.wikipedia.org/wiki/Backgammon （"national game in many
   countries of the Eastern Mediterranean"、注 96）
3. 「最大のオンライン・バックギャモン大会」のギネス世界記録: 21,940 人が参加、
   2020-08-16、イスタンブール（トルコ）、Backgammon Stars で開催。
   https://www.guinnessworldrecords.com/world-records/622038-largest-online-backgammon-tournament

参考（未確認）: 日本の競技者は推定 20 万人ほど、という記述が検索結果の要約にあった
（日本語版 Wikipedia らしいが、本文では確認していない）。

### 数字の扱いの選択肢（判断材料）

- 「3 億人」を残すなら「日本バックギャモン協会によれば約 3 億人が遊ぶ（2002 年の書籍）」
  と出典を添える。「競技人口」は「遊ぶ人」に直す。
- 「10 億人超え」は出典なしなので外す。
- 別案は上の 1〜3 を使い、数字を減らして事実で見せる。

## B. 写真

現在の `images/bg-crowd.png` は 474 x 356 px の PNG で、拡大すると粗い。

Wikimedia Commons の API で検索し、横 1200px 以上の約 150 枚から、縮小画像で見て絞った。
大会会場や大勢が写るものは少なく、良い候補は 3 枚だった。

### 採用: `images/bg-crowd2.jpg`（1600 x 1067、284 KB）

- 元ページ: https://commons.wikimedia.org/wiki/File:Deskohran%C3%AD_08s4_077_-_Backgammon.jpg
- 作者: Matěj Baťha
- ライセンス: CC BY-SA 3.0
- 説明: 「Deskohraní 2008 - turnaj ve Vrhcábech」（2008 年、チェコのボードゲームの催しでの
  バックギャモン大会）。撮影 2008-11-04（Commons のメタデータ）。元は 3150 x 2100 px。
- 保存後に開いて確認: 大会会場に 2 卓が手前、奥にも数組が対局している。盤は手前の 2 枚がはっきり
  見え、対局時計も写っている。チェスなど他のゲームは写っていない。壁の照明と鏡が目に入る
  程度。手前の人物の背中が大きく、盤は画面の下半分に寄っている。
- 気づいた点: 「大勢」は十数人で、街角の熱気のようなものはない。「大会で人が集まって
  打っている」ことは伝わる。CC BY-SA なので、スライドに作者・ライセンスの表記が要る
  （表記の置き場所は main が決める）。

### 他の候補

2. `File:Backgammon night (3468685282).jpg`（4000 x 3000、CC BY-SA 2.0、Henri Bergius、
   2009-04-18）。カフェで盤が並び、その後ろに大勢の客がいる。盤の並びは面白いが、手前は
   3 人が盤を覗き込む構図で、縮小画像でしか見ていない。
   https://commons.wikimedia.org/wiki/File:Backgammon_night_(3468685282).jpg
3. `File:Shibam people playing backgammon.JPG`（3264 x 2448、CC BY-SA 3.0、Aneta Ribarska、
   2006-08-04）。イエメンのシバームの広場で、大勢が 1 枚の盤を囲む。人数は多いが盤は 1 枚
   で、盤が小さく写る。縮小画像でしか見ていない。
   https://commons.wikimedia.org/wiki/File:Shibam_people_playing_backgammon.JPG

### 外したもの

- `File:Nyc union square backgammon game nov.2024.jpg`（CC0）: 手前にチェス盤が大きく写る
  （今の写真と同じ問題）。
- 街角の 2 人組（Backgammon in Nazareth、Iran など）: 「大勢」にならない。
- 盤だけの接写、絵画、集合写真のコラージュ: 目的に合わない。

## 未確認

- JBS の説明ページ本体（取得が 404）。検索結果の本文の引用のみ。
- 『バックギャモン・ブック』p206 の原文。数字の根拠が本に書かれているか。
- 「10 億人超え」の出どころ。
- Backgammon night と Shibam は縮小画像で見ただけ（採用しないので詳細は未確認）。
