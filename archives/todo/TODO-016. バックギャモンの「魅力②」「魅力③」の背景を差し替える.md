# TODO-016. バックギャモンの「魅力②」「魅力③」の背景を差し替える

|      | main | 担当 |
|------|------|------|
| 見込み | Opus 5.5 / effort medium | main（画像探し・実装）+ verifier（Sonnet 5.5 / medium。TODO-017 と 1 回にまとめる） |
| 実施 | Opus 5.5 / effort 不明 | main（画像探し・実装）+ verifier（Sonnet 5.5 / medium。TODO-017 と 1 回にまとめた） |

| 担当 | モデル | effort | input | output | cache_creation | cache_read | 割合 |
|------|--------|--------|-------|--------|----------------|------------|------|
| main | Opus 5.5 | 不明 | 112 | 29,001 | 120,188 | 6,791,931 | 98% |
| verifier | Sonnet 5.5 | medium | 12 | 672 | 32,486 | 126,297 | 2% |
| 合計 |  |  | 124 | 29,673 | 152,674 | 6,918,228 | 計 7,100,699 |

- 項目を立てる前に画像を探したので、`--since '2026-09-30 10:17:39'`（TODO-015 のコミットの直後）から数えた
- TODO-017 と、途中で立てて着手を取り消した TODO-018 の分もこの表に入っている
- verifier は定義のモデル（sonnet）のまま。effort は定義の値

## きっかけ

2026-09-30 に利用者の依頼で立てた。②の白いダイス 2 個（TODO-014）はゲームらしさが薄く、
③の傘はバックギャモンと関係がない。選定は main に任されていた。

## やったこと

`slides/backgammon.js` の 2 枚の背景を差し替え、使わなくなった画像を消した。

| スライド | 前 | 後 |
|----------|----|----|
| 魅力② ゲームとしての面白さ | `bg-dice.jpg`（白いダイス 2 個、Jack Elliott、CC BY 2.0、opacity 50%） | `images/bg-feltdice.jpg`: [Backgammon Board, Close-up](https://commons.wikimedia.org/wiki/File:Backgammon_Board,_Close-up.jpg)（Donald Olszewski、CC BY 4.0）。緑のフェルトに赤白のダイスとダブリングキューブ。opacity は既定の 30% |
| 魅力③ おしゃれ | `bg-umbrellas.jpg`（色とりどりの傘、Ladhra、CC BY-SA 4.0） | `images/bg-cafe.jpg`: [Backgammon at the Café](https://commons.wikimedia.org/wiki/File:Jean_B%C3%A9raud,_1908-09c_-_Backgammon_at_the_Caf%C3%A9.jpg)（Jean Béraud、1908 年頃、PD）。絵が暗いので opacity 55% |

- ②はダイス（運）とキューブ（掛け点）が 1 枚に写っていて、カードの中身に合う。表紙の木目のボードとも見分けが付く
- ③はパリのカフェでバックギャモンを打つ客の絵で、ナレーションのカフェバーの話とつながる。
  PD なので、TODO-014 に残っていた BY-SA の懸念も無くなった
- ③の候補は Commons で探し直した（前回の候補の中には、バックギャモンにつながる「おしゃれ」の画像が無かった）
- 画像は Commons の 1920px の縮小版を JPEG で保存した（`bg-cafe.jpg` は quality 75）
- `images/bg-dice.jpg`・`images/bg-umbrellas.jpg` を消した

## 確かめたこと

- `ytslide check --slides backgammon`: 終了コード 0
- 横 1280px とスマホ（412x915）で、背景の naturalWidth は 1920、opacity は 0.3 / 0.55。
  本文の一番下とクレジットは表示枠の内側
- クレジットは Commons API の作者・ライセンスと一致した
- 消した画像への参照は残っていない
- 詳細は [archives/agents/TODO-016/](../agents/TODO-016/README.md)

## 分担の振り返り

- **verifier が見つけたこと**: 食い違いは無かった。画像の削除が TODO-018 を立てたコミットに
  紛れていたのを見つけた（main が `git rm` でステージしたまま `git add TODO.md` でコミットしたため）。
  利用者の了承を得て、そのコミットを TODO.md だけのものに作り直した
- **見込みとの食い違い**: 無い。ただし main が利用者の許可を待たずに TODO-016〜018 に着手した。
  016・017 は利用者が後から認め、018 は変更を戻した
- **次に同じ規模の項目をやるなら**: 背景を差し替えるだけならこの組み方でよい。TODO-013 の
  `verify.py` を使い回したので、verifier の分は全体の 2% で済んだ。`git rm` をしたら、
  次のコミットは `git add` するファイルを絞るのではなく、`git status` で残りのステージを見てから打つ
