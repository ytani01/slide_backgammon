# TODO-043 確認報告

スクリプト: `verifier-probe.py`（file:// で実行、Playwright）。スクリーンショット: `shot-pc.png`（1280x900）、`shot-sp.png`（412x915）。

## 結果
- `ytslide check --slides backgammon`: 「問題なし」、終了コード 0
- QR デコード（opencv 5.0.0 の QRCodeDetector。ytslide の環境に無いため scratchpad の一時 venv に入れた。リポジトリは未変更）
  - images/kannai-qr.png -> `https://kannaibg.wixsite.com/kannai-backgammon` 一致
  - images/x-qr.png -> `https://x.com/lppcn5b6mw94np2` 一致
- 2 つの `<a>`（PC・スマホとも同じ値）: href は上記 2 つと一致、target=_blank、rel=noopener、text-decoration-line=none、札内 scrollWidth==clientWidth（PC 234/234、スマホ 246/246）
- X の札を 1 回クリック: PC・スマホとも新しいタブが開き（url=https://x.com/lppcn5b6mw94np2、スタブ応答）、`isPlaying` は false のまま。true にしてから押しても true のまま（`isPlaying = true` を直接代入。実際の再生は開始していない）

## 位置（getBoundingClientRect、left, top, right, bottom）
| | PC 1280x900 | スマホ 412x915 |
|---|---|---|
| #slide-canvas | 49, 152, 917, 580.4 | 25.9, 92.4, 386.1, 272.9 |
| 札 上（公式） | 656.6, 275.5, 891, 388.3 | 278, 145, 375.3, 191.8 |
| 札 下（X） | 656.6, 397, 891, 509.8 | 278, 195.4, 375.3, 242.2 |
| li 1〜5 | x 75〜635.8、y 219.8〜565.6 | x 36.7〜269.4、y 121.9〜265.2 |
| タイトル | 75, 176.8, 891, 218.5 | 36.7, 102.6, 375.3, 119.9 |
| クレジット | 719.6, 555, 906.6, 569.4 | 307.8, 262.5, 381.8, 268.4 |

- 札が canvas 内: 両条件とも 2 枚とも True
- 札同士、札と li 5 つ（10 組）、札とタイトル、札とクレジットの重なり: 両条件とも全部 False（札の下端 509.8 / 242.2 に対しクレジット上端 555 / 262.5）

## スクリーンショットを見て
- PC: 欠け・余計なもの・文字の切れなし。
- スマホ: 欠けなし。ただし 1 点だけ報告（境界線上、判断はしない）。上の札の文言「日程・申し込みは公式サイトで」が、狭い札の中で「日程・申し込み / は / 公式サイトで」と 3 行に折り返され、「は」だけの行ができている。X の札の URL 表記（x.com/ lppcn5b6mw94np2）は PC・スマホとも 2 行で収まっている。実害（読めない、はみ出す）は未確認。スマホの文字は小さい（元から縮小表示）。

## 変更ファイル
- `git status`: `M slides/backgammon.js`、`?? images/x-qr.png`、`M TODO.md`（着手前から。中身は見ていない）。`git diff` は最後のスライドの札の部分と `qrCard` 追加だけで、左の 5 行の li、ナレーション、duration は差分に無い。指示の範囲と合っている。
- 追加で `?? archives/agents/TODO-043/` は確認担当の成果物。

## 確かめなかったこと
- 実機のスマホでの見え方、QR の実機読み取り（デコードは画像ファイルに対してのみ）。

## 追記: 「は」だけの行の修正後（412x915 のみ再測定）
`verifier-probe.py sp`（label の行数取得を追加）と、4 倍の拡大スクリーンショット `shot-sp-cards-zoom.png`（`shot-sp-after.png` も同じ状態）で確認。
- 上の札の文言は「日程・ / 申し込みは / 公式サイトで」の 3 行。「は」だけの行は無くなった。行数を数える evaluate の値（lines=1.19、rectTops=3）は当てにならず、行の判断は拡大画像による。
- 札の位置は修正前と同じ（上 278, 145, 375.3, 191.8、下 278, 195.4, 375.3, 242.2）。canvas 内、scrollWidth==clientWidth（246/246）。
- 札同士・札と li 5 つ・札とタイトル・札とクレジットの重なり: 全部 False。
- 欠け・文字の切れなし。X の札は「最新情報は / X で」と URL が 2 行で、変化なし。
- X の札のクリック: 新しいタブが開き、`isPlaying` は false・true とも変化なし。
- `ytslide check --slides backgammon`: 問題なし。
- 判断が要る点: なし（札の高さは変わっていない。上の札の文言が 2 行から 3 行になった分は、札の高さ 46.8px のまま QR の高さに収まっている）。
