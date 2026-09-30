# TODO-057 verifier-report

変更ファイル: slides/backgammon.js（M）、images/bg-nard.jpg（D、staged）、images/bg-sokhta.jpg（新規、未追跡）、TODO.md（M）。指示の範囲と合っている（TODO.md は項目の更新と読めるが中身は未確認）。
差分は fig の figcaption の font-size、cap の font-size、3 枚目の左の絵の差し替え、credit、figcaption の <br> 追加のみ。<br> の追加（2 か所）は指示に明記が無いが、差分はこの範囲に収まっている。

## 1. 表示（測定スクリプト: archives/agents/TODO-057/measure.js、新規コンテキスト+no-cache、チャプター一覧ボタンで #3 を表示）
スライド枠は transform で縮小表示。下の値は縮小前の値（枠 = bgSlide 外枠）。
| 項目 | 1280x720 | 412x915 |
|---|---|---|
| figcaption font-size | 14.756px | 15.47px |
| cap font-size | 22.568px | 23.66px |
| 枠 (l,t,r,b) | 49,156,917,576.4 | 25.9,93.9,386.1,271.3 |
| figcaption 最大 bottom / right | 433.9 / 850.2 | 210.7 / 356.7 |
| cap 最大 bottom / right | 539.3 / 891 | 254.4 / 375.3 |
| credit (t,b,r) | 555,569.4,906.6 | 262.5,268.4,381.8 |
| credit と cap | cap bottom 539.3 < credit top 555: 重ならない | 254.4 < 262.5: 重ならない |
| 枠の scrollW/H と client | 868/420 = 868/420 | 910/448 = 910/448 |
| 左 img naturalWidth | 888 | 888 |
- 枠外へのはみ出し: なし（両サイズ。全要素が枠内）
- 写真: 黒い石の盤と、三角・四角の駒が展示ケースに並ぶ。欠け・重なり・余計なものなし（shot-pc.png, shot-sp.png）
- クレジットは右下、時代の説明の下に収まっている

### 食い違い（境界線上。判断は管理者）
- 1280x720 で中央の図の説明「中東から世界へ伝わった道（おおよそ）」が「（おおよ」「そ）」の 2 行に折り返し、「そ）」が 1 字だけ残る（shot-pc.png）。この行は今回 <br> を入れていない。文字を大きくした結果だと思われる（推定）。実害は未確認。
- 412px 幅では全体が縮小され、figcaption は実画面でおよそ 5px 相当と小さい。読みやすさは評価していない。

## 2. ライセンス
- Commons API: LicenseShortName = CC BY-SA 4.0、Artist = Cyrussis。クレジット「写真: Cyrussis (CC BY-SA 4.0)」と一致
- sha1: images/bg-sokhta.jpg = 91305d12dca844e591f39cbabe135589b395bec7。Commons の原本と同じ（888x485 も一致）

## 3. bg-nard
- `rg -n bg-nard --glob '!archives'` は 0 件

## 確かめられなかったこと
- CLAUDE.md が存在せず（プロジェクト直下に無い）、必須コマンドの節が読めなかった。検証コマンドは走らせていない（指示の項目のみ実施）。

## 追記: 折り返し修正の再確認（measure2.js、no-cache、両サイズ）
差分: 中央は '中東から世界へ<br>伝わった道（おおよそ）'、左は '…遺跡の<br>盤と駒・サイコロ'、右は '…挟む二人<br>（江戸時代ごろの絵）'。
- 1280x720: 3 つとも 2 行（高さ÷line-height）。各行の幅（em）左 15.2/8.1、中 7.1/11.2、右 12.2/10.2。1 字だけの行は無い。枠内、figcaption bottom 433.9、cap bottom 539.3 < credit top 555.0 で重ならない。shot2-pc.png でも「そ）」の孤立は解消。
- 412x915: スライドが縮小表示（約 0.39 倍）のため高さ÷line-height は 1 になるが、Range の行矩形は各 2 行（幅比は PC と同じ）。1 字だけの行は無い。枠内、cap bottom 254.4 < credit top 262.5。
- 食い違い: 無し。

## 追記2: ウルの盤への差し替え（measure3.js、nat.js、no-cache、両サイズ）
- 表示: 3 つの figcaption は両サイズとも 2 行。各行の幅（em）左 12.2/14.8、中 7.1/11.2、右 12.2/10.2。1 字だけの行は無い。全要素が枠内、cap bottom 539.3 < credit top 555.0（PC）、254.4 < 262.5（SP）。重なり無し。
- 左の img naturalWidth x naturalHeight = 960x765。
- 写真（shot3-pc.png, shot3-sp.png）: 貝殻の象眼の 20 マスの盤と、下に丸い駒が欠けずに映る。余計なものなし。
- Commons: LicenseShortName = CC0、Credit = BabelStone (Own work)。クレジット「写真: BabelStone（CC0）」と一致（Artist 欄は API に無く、Credit 欄で確認）。
- 縦横比: 原本 2716x2164 と thumb 960x765 は API の値。images/bg-ur.jpg は 960x765。2716/2164 = 1.2551、960/765 = 1.2549 で同じ比。
- `rg -n -e bg-sokhta -e bg-nard --glob '!archives/**'` は 0 件（終了コード 1）。git status: bg-sokhta.jpg は未追跡のまま消えており、bg-ur.jpg が未追跡で追加。
- 食い違い: 無し。

## 追記3: 中央の説明を 1 行にした（measure4.js、shot4-pc.png / shot4-sp.png、no-cache）
- はみ出し・重なり: 無し。全 img と figcaption が枠内、cap bottom 539.3 < credit top 555.0（PC）、254.4 < 262.5（SP）。中央は 1 行（幅 7.1em）。
- img の top / bottom（左 / 中央 / 右）
  - 1280x720: 246.0/393.6 / 264.5/412.0 / 246.0/393.6
  - 412x915（縮小表示の値）: 132.7/194.0 / 140.4/201.6 / 132.7/194.0
- 食い違い: 中央の img だけ下にずれている（PC で 18.4px、SP の縮小値で 7.7px）。左右は 2 行、中央は 1 行で figure の高さが違い、grid の items-end で下端の figcaption がそろうため（推定）。figcaption の bottom は 3 つとも 433.9 でそろう。ずれを許すかは管理者の判断。

## 追記4: 図の並びを items-start にした（measure5.js、shot5-pc.png / shot5-sp.png、no-cache）
- img の top / bottom: 3 つともそろう。1280x720 は 246.0/393.6 が 3 つ、412x915（縮小値）は 132.7/194.0 が 3 つ。
- はみ出し・重なり: 無し。全 img と figcaption が枠内、cap bottom 539.3 < credit top 555.0（PC）、254.4 < 262.5（SP）。
- 時間軸と説明（値は PC / SP 縮小値）
  - figcaption の最大 bottom 433.9 / 210.7。点の上端 444.3 / 215.0（リング 0.6cqw を足すと PC で約 439、SP で約 213）。重ならない。
  - 点の下端 468.6 / 225.1（リングを足すと PC で約 474、SP で約 227）。cap の最上端 477.3 / 228.7。重ならない。
  - 矢じり（t 440〜b 472.9 / 213.2〜226.9）も図の説明より下、cap より上で重ならない。
- 中央の説明は左右より短く（bottom 415.5 / 203.1 と、433.9 / 210.7）、説明の下端はそろわない（items-start の結果）。点との間隔は左右より中央が広い。
- 食い違い: 指示の 3 点については無し。
