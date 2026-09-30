# TODO-016・017 確認報告

## 検証
- `ytslide check --slides backgammon`: 終了コード 0（問題なし）
- verify.py（4 7 8）: 終了コード 0。サーバー 8715 は起動済み（200）

## 実測（横 1280px / 412x915）frameBottom 1280=580.4, 412=272.9
| 枚 | 幅 | bg src | nw | opacity | maxBottom | クレジット(top,bottom) |
|---|---|---|---|---|---|---|
| 4 | 1280 | bg-japan-night.jpg（変更なし） | 1920 | 0.6 | 476.1 | 555-569.4 |
| 4 | 412 | 同上 | 1920 | 0.6 | 228.2 | 262.5-268.4 |
| 7 | 1280 | bg-feltdice.jpg | 1920 | 0.3 | 454.4 | 555-569.4 |
| 7 | 412 | 同上 | 1920 | 0.3 | 219.2 | 262.5-268.4 |
| 8 | 1280 | bg-cafe.jpg | 1920 | 0.55 | 538.6 | 555-569.4 |
| 8 | 412 | 同上 | 1920 | 0.55 | 254.1 | 262.5-268.4 |
- 全て maxBottom < frameBottom、クレジットは全件表示。8 枚目の写真キャプション(下端 約537)とクレジット(上端 555)は重ならない
- 一致: 7 枚目 feltdice、8 枚目 cafe、opacity 55%（8 枚目）

## スクリーンショット
- 全 6 枚を開いて確認。背景は 7・8 枚目とも映っている。画像の欠けなし
- 4 枚目: 矢澤プロの写真は顔・上半身とも切れていない（1280・412 とも）
- クレジットは本文と重ならない

## 食い違い・注意
- 7 枚目の opacity は 0.3。差分で `opacity: 50` を消して既定値（30）になった結果。TODO-016 に「既定でよい」と書かれているか未確認（TODO.md は照合していない）。背景は暗めだが映っている。境界線上の判断は報告のみ

## 出典（Commons API）
- Backgammon Board, Close-up.jpg: CC BY 4.0 / Donald Olszewski → 一致
- Jean Béraud, 1908-09c - Backgammon at the Café.jpg: Public domain / Jean Béraud → 一致
- 4 枚目クレジット「本人の X（@akikoyazawa）」は出典を確かめていない（判断できない）

## 参照の残り
- `rg "bg-dice|bg-umbrellas" -g '!archives/**' .`: TODO.md:25 の記述のみ

## 変更ファイル
- `slides/backgammon.js` のみ変更（6 行追加・6 行削除、4・7・8 枚目の範囲）
- 未追跡: images/bg-cafe.jpg, bg-feltdice.jpg, pro-yazawa.jpg, archives/agents/TODO-016/
- bg-dice.jpg・bg-umbrellas.jpg は images/ に存在しない。削除は最新コミット e680d0a に含まれている（git log で確認）。指示の「未コミット」とは食い違うが、実害は無い
