# TODO-013 verifier 報告

- `ytslide check --slides backgammon`: 終了コード 0（「問題なし」）
- 測定: `archives/agents/TODO-013/verify.py`（Playwright、http://localhost:8715/、`renderSlide(N-1)` の 2.5 秒後）。実行は `/home/ytani/work/ytsched/.venv/bin/python verify.py [N...]`（この repo の python には playwright が無いため）。サーバーは止めていない。
- スクリーンショット: `slide{1,2,3,4}-1280.png`、`slide{1,2,3,4}-412.png`（同じディレクトリ。2 も撮った）

## 測定値（背景 img、本文の下端）

| 枚 | 背景 | naturalWidth | opacity | 本文最下端 / 枠の下端 (1280) | 同 (412) |
|---|---|---|---|---|---|
| 1 | bg-cover.jpg | 1920 | 0.3 | 475.7 / 580.4 | 228 / 272.9 |
| 2 | bg-worldmap.jpg | 1920 | 0.3 | 525 / 580.4 | 248.3 / 272.9 |
| 3 | bg-nightearth.jpg | 1920 | 0.7 | 532.4 / 580.4 | 251.6 / 272.9 |
| 4 | bg-gambling.jpg | 1920 | 0.3 | 549.2 / 580.4 | 258.5 / 272.9 |

- 全枚とも本文は枠の内側。画像は全部読み込み済み（naturalWidth 1920）。

## スクリーンショット目視

- 1 枚目: 背景のダイスと盤が見える。題名・サブタイトルは読める。欠け・余計なものなし。クレジット「背景: Clint Budd (CC BY 2.0)／Wikimedia Commons」は右下に出ている。1280 幅で文字 9.6px・色 rgb(100,116,139)（slate-500）、暗い背景の上で読めるが薄い。412 幅は実寸 10px だが縮小表示で判読困難（画像上は潰れて読めない）。
- 3 枚目: 夜の地球の地図が暗く見える（opacity 0.7 でも暗い紺）。見出し・カード・数字は読める。写真の左に黒い帯があるが、これは元の bg-crowd.png のもの（今回の差分外）。
- 4 枚目: 賭博室の白黒写真が薄く見える。見出し・4 つのカード・浮世絵・下の文は読める。欠けなし。
- 412 幅: 3・4 枚目とも構造は 1280 と同じで欠けなし。

## 2 枚目（TODO-012 との比較）

- 点の中心 x（1280）: 205.8 / 482.99 / 760.16。TODO-012「4 回目」の 205.80 / 482.99 / 760.16 と一致。
- 点の中心 x（412）: 90.97 / 206 / 321.03。前は 90.97 / 206.00 / 321.02 で一致（差 0.01）。
- h2 の rect（1280）: [75, 208, 891, 249.6]。TODO-012 の報告に h2 の値が無く、数値の比較はできない。
- slide2-1280.png を archives/agents/TODO-012/slide2-1280.png と目視で並べた: 見出し・3 枚の図・時間軸・説明文の位置は同じに見えた（画素単位の差分は取っていない）。違いはチャプター一覧の枚数（5→7、TODO-014 の作業のため）と再生位置の表示のみ。

## 差分（1〜4 枚目）

- narration・duration・title: 1〜4 枚目に変更なし（差分にこれらの行が出るのは 5 枚目以降、範囲外）。
- 3・4 枚目: 本文 HTML の行は、`body: \`` が `render: function() { return bgSlide(...\`` に、末尾 `\`,` が `\`, {opacity:70}); },` / `\`); },` に変わった行のみ。中身の HTML 行の増減なし。
- 2 枚目: 背景 div の組み立てが bgSlide に移った。`opacity-30` が `style="opacity: 0.3"` に変わっている（同値）。
- 変更ファイル: `slides/backgammon.js`、`TODO.md`（main の作業）。未追跡は images/bg-*.jpg 3 枚と archives/agents/TODO-013/。指示に無いファイルの変更なし。

## クレジット

- 表紙: Clint Budd / CC BY 2.0。search-report.md の表（`Backgammon_52600594028`、Clint Budd、CC BY 2.0）と一致。
- 3・4 枚目: 表の DMSP（NASA GSFC / NOAA NGDC）・Gilletta は Public domain。クレジット無しで合っている。
- 確かめられなかったこと: bg-nightearth.jpg が表のどの画像か（表の DMSP は 2560x1280、実ファイルは幅 1920）。ファイル名・作者の対応は未確認。PD なら影響なし。

## 判断が要る点

- 表紙のクレジットが小さく薄い（slate-500、9.6px）。CC BY の表示として十分かは判断できない。
