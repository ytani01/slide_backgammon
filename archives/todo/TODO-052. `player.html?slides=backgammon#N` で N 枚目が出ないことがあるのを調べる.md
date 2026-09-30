# TODO-052. `player.html?slides=backgammon#N` で N 枚目が出ないことがあるのを調べる

|      | main | 担当 |
|------|------|------|
| 見込み | Opus 5.5 / effort medium | main（調査と実装）+ reviewer（Opus 5.5 / high）+ verifier（Sonnet 5.5 / medium） |
| 実施 | Opus 5.5 / effort medium | main のみ |

| 担当 | モデル | effort | input | output | cache_creation | cache_read | 割合 |
|------|--------|--------|-------|--------|----------------|------------|------|
| main | Opus 5.5 | medium | 44 | 5,129 | 61,505 | 1,515,041 | 100% |
| 合計 |  |  | 44 | 5,129 | 61,505 | 1,515,041 | 計 1,581,719 |

- 調べただけで、このリポジトリのコードは変えていない。reviewer と verifier は起こしていない
- 立ててから着手まで空いたので、`--since '2026-10-01 08:00:00'` で数えた

## きっかけ

TODO-050 の担当が Playwright で `player.html?slides=backgammon#N` を開くと、
N に関係なく前に見ていたスライドが出た。

## やったこと

原因を調べた。前に見ていた位置を覚える仕組みは無い（`localStorage` に入れて
いるのは再生の設定だけ）。

`player.html` は `#N` を起動時に `startIndexFromHash()` で 1 回だけ読み、
`hashchange` を受け取っていない。`#` の後ろだけが変わってもブラウザは
ページを読み直さないので、同じページのまま `#4` → `#7` と移っても表示は
4 枚目のままになる。最初から `#N` 付きで開いたとき、読み直したときは正しく出る。

「原因に応じて直す」は、このリポジトリでは直さない。`player.html` は yt_slide の
`fd74b1d` と同じもので、`#N` を読む処理も yt_slide で入ったものなので、
yt_slide の TODO-120 として立てた（yt_slide の `658748b`）。直ったら
`player.html` を yt_slide から揃える。

## 確かめたこと

Playwright で `#4` を開いてから `#7` へ移ると、URL は `#7`、表示は `04`、
ページの読み込みは 1 回だけだった。

## 残ること

- yt_slide の TODO-120 が済んだら、`player.html` を yt_slide の最新版に揃える。
  それまでは、確認の担当への依頼文に「スライドはチャプター一覧で移る」と書く
