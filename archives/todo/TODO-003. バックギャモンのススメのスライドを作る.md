# TODO-003. バックギャモンのススメのスライドを作る

|      | main | 担当 |
|------|------|------|
| 見込み | Opus 5.5 / effort medium | main（画像の切り出し）+ implementer（Sonnet 5.5 / medium）+ general-purpose（Sonnet 5.5 / 組み込み、確認） |
| 実施 | Opus 5.5 / effort 不明 | main（画像の切り出し、読みと画像の表示方法の手直し）+ implementer（Sonnet / medium）+ general-purpose（Sonnet / 組み込み、確認） |

| 担当 | モデル | effort | input | output | cache_creation | cache_read | 割合 |
|------|--------|--------|-------|--------|----------------|------------|------|
| main | Opus 5.5 | 不明 | 不明 | 不明 | 不明 | 不明 | 不明 |
| implementer | Sonnet | medium | 不明 | 不明 | 不明 | 不明 | 不明 |
| general-purpose（確認） | Sonnet | 組み込み | 不明 | 不明 | 不明 | 不明 | 不明 |
| 合計 |  |  |  |  |  |  | 計 不明（サブエージェント 2 つの合計は 128,846） |

- git リポジトリではないので `token-usage.py` が動かなかった（`git log` が終了コード
  128。TODO-001 と同じ）。完了通知に出た合計だけを記録する: implementer 61,404、
  確認 67,442
- general-purpose は Agent ツールで `sonnet` を指定した。組み込みで定義ファイルが
  無いので effort は指定していない
- main の effort は記録に残っていないので「不明」とした

## きっかけ

YouTube の動画「バックギャモンのススメ」（https://youtu.be/Ts2kC-kdUMY 、61 秒、
関内バックギャモンの会・谷林 陽一）をもとに、新しいスライドを作ってほしいという依頼。
動画にナレーションは無く（whisper でも無音）、中身は画面の文字から取った。

利用者と決めたこと: 中身は動画の内容だけにする（事実を足さない）。写真と絵は
動画のフレームから切り出す。

## やったこと

- `uvx yt-dlp` で動画（1280x720）を取り、フレームから画像 6 枚を切り出して
  `images/bg-{egypt,medieval,nara,edo,print,crowd}.png` に置いた。画像は動画の中で
  重なって出てくるので、それぞれが隠れていない時刻のフレームから取った
- `slides/backgammon.js` を作った（6 枚: 表紙／歴史は古い／世界中でプレーされている／
  不遇の歴史／日本では／まとめ）。`template.js` の書式を使った
- implementer の実装のあと、main が 2 点直した。`rules` に「谷林 → たにばやし」を
  足した（チャンネル名の Tanibayashi から）。画像の `object-cover` を
  `object-contain` にした（`max-h` で高さを抑えると画像の端が切れるため）
- `ytslide update --slides backgammon` で `duration` と `index.html` を更新した

## 確かめたこと

- `ytslide check --slides backgammon`: 「問題なし」。画像 6 枚が 200 で返る
- 確認担当（Playwright MCP）: 1280x720 と 412x915 で、6 枚とも scrollHeight と
  clientHeight が一致した。枠の外に出たのは表紙の飾りの円だけ（意図したもの）。
  画像 6 枚は naturalWidth が 0 でなく、2〜4 枚目のスクリーンショットでも
  欠けや他の画像の切れ端は無かった
- 本文とナレーションは、動画の文字と食い違いが無く、動画に無い事実も
  足されていなかった
- 詳細は [archives/agents/TODO-003/](../agents/TODO-003/README.md)

## 分担の振り返り

- **implementer が見つけたこと**: 「谷林」の読みが分からないこと、`object-cover`
  だと画像が切れるかもしれないことを、判断の要る点として報告した。どちらも main が
  直した。表紙に「BACKGAMMON」の札を足したことも報告した（template の表紙の書式どおり）
- **確認が見つけたこと**: 食い違いは見つからなかった。「谷林」の読みは動画から
  確かめられないこと、「10億人」が `rules` に無いことを、実害は未確認として挙げた
- **見込みと食い違った点**: main が実装のあとに 2 点直した（上の「やったこと」）。
  依頼の段階で画像の表示方法（切らない）と人名の読みを書いておけば、この手直しは
  要らなかった
- **次に同じ規模の項目をやるなら**:
  1. 画像を載せるスライドの依頼には「画像は切らない（`object-contain`）」と書く
  2. 固有名詞の読みは、依頼を書く時点で分かるものを `rules` の案として渡す
  3. 確認は今回と同じく general-purpose（Sonnet）1 回で足りた。前回の反省どおり
     `ytslide check` が先に動くことを確かめてあったので、やり直しは無かった

## 残ること

- 「谷林」を「たにばやし」と読ませているが、実際の読み上げでは聞いて確かめていない
- 動画のフレームから切り出したので、画像は 720p 相当の画質（最大 474x356）
