# TODO-047. 「日本での不遇の歴史」のスライドを省く

|      | main | 担当 |
|------|------|------|
| 見込み | Opus 5.5 / effort medium | main（実装）+ verifier（Sonnet 5.5 / medium） |
| 実施 | Opus 5.5 / effort medium | main（実装）+ verifier（Sonnet 5.5 / medium） |

| 担当 | モデル | effort | input | output | cache_creation | cache_read | 割合 |
|------|--------|--------|-------|--------|----------------|------------|------|
| main | Opus 5.5 | medium | 28 | 4,350 | 10,411 | 972,165 | 81% |
| verifier | Sonnet 5.5 | medium | 20 | 154 | 24,256 | 204,497 | 19% |
| 合計 |  |  | 48 | 4,504 | 34,667 | 1,176,662 | 計 1,215,881 |

- verifier は定義（`~/.claude/agents/verifier.md`）のまま。model sonnet、effort medium
- 終点のコミット前に集計したので、決着の作業の分は入っていない

## きっかけ

利用者の指摘（2026-09-30）: 「日本での不遇の歴史」はネガティブな内容なので省く。

決めたこと:

- 「世界中でプレーされている」の書き出しはこの項目で直す。そのあとの文は TODO-046 で扱う
- 最後の「関内バックギャモンの会で始めよう」の「日本では、まだ知る人の少ないバックギャモンですが」は残す

## やったこと

- `slides/backgammon.js` から「日本での不遇の歴史」のスライドを消した（10 枚 → 9 枚）
- このスライドでしか使っていなかった画像 `images/bg-hikone.jpg`・`bg-edo.png`・`bg-print.png` と、
  部品の `arrow` を消した
- 「世界中でプレーされている」の書き出し「でも、海外に目を向けると、」を「そしていま、」にし、
  前の歴史のスライド（「世界中に広がりました」）から続く形にした。コメントも合わせた
- `ytslide measure` で 16.13 秒と出たので、`duration` を 17 → 16 にした

## 確かめたこと

verifier の報告は [archives/agents/TODO-047/verifier-report.md](../agents/TODO-047/verifier-report.md)。

- 消した画像・部品・「不遇」への参照は 0 件。残る `images/` の参照はすべて実在する
- `player.html?slides=backgammon` を幅 1280px で開き、コンソールエラー 0 件、9 枚、
  3 枚目（歴史）の次が「世界中でプレーされている」。4 枚目のスクリーンショットに欠けは無い
- `duration: 16` は実測と一致

## 分担の振り返り

- verifier: 参照切れ・表示・`duration` のいずれも問題を見つけなかった。書き出しの「そしていま、」は、
  直前の日本書紀の話からの戻りがやや唐突に聞こえる余地がある、という意見が出た（問題とはしていない）
- 見込みとの食い違いは無い
- 次にスライドを 1 枚消すだけの項目も同じ組み方でよい。verifier の依頼では `index.html` が
  一覧ページなので、最初から `player.html?slides=backgammon#N` を名指しすると迷わせずに済む
