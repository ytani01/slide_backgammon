# TODO-061. README.md に GitHub Pages の URL を書く

|      | main | 担当 |
|------|------|------|
| 見込み | Opus 5.5 / effort medium | main（文書）+ verifier（Haiku 4.5。書いた URL が開くか） |
| 実施 | Opus 5.5 / effort medium | main（文書）+ verifier（Haiku 4.5） |

| 担当 | モデル | effort | input | output | cache_creation | cache_read | 割合 |
|------|--------|--------|-------|--------|----------------|------------|------|
| main | Opus 5.5 | medium | 8 | 978 | 1,699 | 496,350 | 73% |
| verifier | Haiku 4.5 | 記載なし | 76 | 1,093 | 16,415 | 167,092 | 27% |
| 合計 |  |  | 84 | 2,071 | 18,114 | 663,442 | 計 683,711 |

- verifier は定義のモデルが sonnet。`curl` で状態コードを見るだけなので Haiku 4.5 に上書きした。Haiku は effort に対応しないので「記載なし」
- 立ててから着手まで空いたので、着手した時刻から `--since '2026-10-01 03:53:07'` で数えた（終点のコミット前なので、存在しない番号 `TODO-999` を渡して現在時刻まで）

## きっかけ

TODO-060 で GitHub Pages に公開した。利用者の要望で、その URL を `README.md` に書く。`README.md` はそれまで無かった。

## やったこと

- `README.md` を作り、スライドの説明と、一覧とスライドの URL を書いた

## 確かめたこと

verifier が、README に書いた 2 つの URL がどちらも 200 で返ることを確かめた（`archives/agents/TODO-061/verifier-report.md`）。

## 分担の振り返り

- **見つけたこと**: verifier は食い違いなし。見つけたものは無い
- **見込みとの食い違い**: 無い
- **次に同じ規模なら**: 同じ組み方でよい
