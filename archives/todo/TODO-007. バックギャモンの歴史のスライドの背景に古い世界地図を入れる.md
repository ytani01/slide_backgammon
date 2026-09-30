# TODO-007. バックギャモンの歴史のスライドの背景に古い世界地図を入れる

|      | main | 担当 |
|------|------|------|
| 見込み | Opus 5.5 / effort medium | main（地図探しと実装）+ verifier（Sonnet 5.5 / medium） |
| 実施 | Opus 5.5 / effort 不明 | main（地図探しと実装）+ verifier（Sonnet / medium。TODO-011 と共用） |

| 担当 | モデル | effort | input | output | cache_creation | cache_read | 割合 |
|------|--------|--------|-------|--------|----------------|------------|------|
| main | Opus 5.5 | 不明 | 不明 | 不明 | 不明 | 不明 | 不明 |
| verifier | Sonnet | medium | 不明 | 不明 | 不明 | 不明 | 不明 |
| 合計 |  |  |  |  |  |  | 計 不明（verifier は TODO-011 と合わせて 30,363） |

- git リポジトリではないので `token-usage.py` が動かなかった（`git log` が終了コード
  128。TODO-005 と同じ）。完了通知に出た verifier の合計だけを記録する
- verifier は Agent ツールで `sonnet` を指定した。effort は定義ファイルの `medium`
- main の effort は記録に残っていないので「不明」とした
- TODO-009・TODO-010・TODO-011 と同じセッションで進めた

## きっかけ

2026-09-30 に利用者の依頼で立てた。古くから世界中に広まったことを強調するため、
表紙の次の「バックギャモンの歴史は古い」の背景に古い世界地図を薄く透かして入れる。

## やったこと

- Wikimedia Commons で 3 枚を利用者に見せた（Hondius 1630、Ortelius 1572、
  Mercator 1569。どれも Public domain）。利用者は Hondius を選んだ
  - `images/bg-worldmap.jpg`: 「Nova totius Terrarum Orbis geographica ac hydrographica
    tabula (Hendrik Hondius) balanced.jpg」Henricus Hondius II、Public domain。
    幅 1920 の縮小版を落とした
- `slides/backgammon.js` の 2 枚目を `body` から `render()` に書き換えた。
  地図を `absolute inset-0 object-cover opacity-30` で敷き、`bg-slate-950/40` の膜を
  重ねた。見出しは player.html の既定と同じ書式を写した。手前の 3 枚の絵と説明は変えていない
- Public domain で表記を求めないので、出典は入れなかった
- ナレーションは変えていないので `duration` は 13 のまま

## 確かめたこと

- `ytslide check --slides backgammon`: 「問題なし」
- `#slide-canvas` は 1280x720 で 428 / 428、412x915 で 456 / 456 で、はみ出しは無い。
  地図の naturalWidth は 1920
- スクリーンショットで、地図が背景として見え、見出しと 3 枚の説明が読める
- 詳細は [archives/agents/TODO-007/](../agents/TODO-007/README.md)

## 分担の振り返り

- **verifier が見つけたこと**: 食い違いは無かった
- **見込みとの食い違い**: 無い。同じファイルの TODO-011 と確認をまとめたのは見込みに無かった
- **次に同じ規模なら**: 候補探しは main、確認は verifier 1 回のままでよい。
  同じファイルの項目が並んでいるときは、今回のように確認を 1 つの担当にまとめる
  （計測の準備を 1 回で済ませられる）
