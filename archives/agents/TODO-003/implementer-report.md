# TODO-003 実装報告

## 作ったもの
- `slides/backgammon.js`（新規、6 枚）。template.js の配色・部品（表紙・図解・数字・引用・画像・箇条書き）のみ使用。
  1 表紙(render) / 2 歴史(画像3枚を横並び+キャプション) / 3 世界中(画像+数字2つ) /
  4 不遇の歴史(4 箱の流れ+画像2枚) / 5 日本では(引用) / 6 まとめ(箇条書き6行)
- 画像パスは `images/bg-*.png`（template.js の記述どおり player.html からの相対）。
- rules: 中区・関内・奈良時代・賭博・禁止令・東急ハンズ・駆け引き・3億人。
- ナレーションは最長 163 字（180 以内）。画面にある事実のみ。

## 実行結果
- `node --check slides/backgammon.js` -> ok
- `ytslide update --slides backgammon` -> 成功。duration を 9/11/9/8/7/24 に更新、index.html に反映（3 件）
- `ytslide check --slides backgammon` -> 「問題なし」（画像 6 枚とも 200）

## 判断・懸念
- 「谷林 陽一」の読みは rules に入れていない（正しい読みが不明）。誤読するなら指示がほしい。
- 表紙の英字バッジ「BACKGAMMON」とアイコンは template.js の表紙の書式に合わせて足した（動画の文字には無い）。
  不要なら削除可。
- 画像の縦横比は未確認。`object-cover` + `max-h` で揃えたため、切れる可能性がある（見た目の実測は別担当）。
- 「5,000 年前」は画面表記、ナレーションは読み間違い防止で「5000年前」。
