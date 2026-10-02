# TODO-092. ナレーションの尺を測り直して、合わない duration を直す

|      | main | 担当 |
|------|------|------|
| 見込み | Opus 5.5 / effort medium | main（実装）+ verifier（Sonnet 5.5 / medium） |
| 実施 | Opus 5.5 / effort 記録なし | main（実装）+ verifier（Sonnet 5.5 / medium） |

| 担当 | モデル | effort | input | output | cache_creation | cache_read | 割合 |
|------|--------|--------|-------|--------|----------------|------------|------|
| main | Opus 5.5 | 記録なし | 22 | 2,121 | 6,538 | 804,503 | 93% |
| verifier | Sonnet 5.5 | medium | 6 | 35 | 22,922 | 36,645 | 7% |
| 合計 |  |  | 28 | 2,156 | 29,460 | 841,148 | 計 872,792 |

- 範囲は項目を立てたコミットから。立てる前に main が全 9 枚を測った分は入っていない
- main の effort は記録が残っていない

## きっかけ

利用者の指示（2026-10-02）: ナレーションの時間を再調整する。

## やったこと

`ytslide measure --all --slides backgammon` で全 9 枚を測り（Online TTS の秒を 1.4 で割った値）、今の値と違った 2 枚だけを `ytslide measure --write 2 8` で書き戻した（`slides/backgammon.js`）。

- 「バックギャモンとは」: 14 → 13（13.22 秒）。14 は TODO-053 で文字数から見積もった値のままだった
- 「魅力③ おしゃれ」: 9 → 8（8.31 秒）

ほかの 7 枚は実測と合っていたので変えていない。強調や矢印を出す秒は読み始めからの秒で、`duration` とは別なので変えていない。

## 確かめたこと

verifier が確かめた（[verifier-report.md](../agents/TODO-092/verifier-report.md)。分担は [README.md](../agents/TODO-092/README.md)）。

- 変わったのは `duration` の 2 行（と `TODO.md` のチェック欄）だけ
- 書き戻さずに測り直して、全 9 枚の `duration` が実測と一致
- `ytslide check --slides backgammon` は問題なし

## 分担の振り返り

- verifier は食い違いを見つけなかった。測り直した値は main の値と、スライド 4 の 26.928 → 26.904 秒のほかは同じだった
- 見込みどおりの編成で、食い違いは無かった
- 次に `duration` を測り直すだけの項目でも、verifier（Sonnet）1 人に `ytslide measure --all`（書き戻さない）と `ytslide check` だけを頼む。見た目の確認は入れない
