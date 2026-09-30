# TODO-020 調査報告

## 動画の要点

対象: https://youtu.be/xEzWfahBAaE 「バックギャモンをやってみよう!」（約 59 秒。yt-dlp で取得）

- 説明欄: 「バックギャモンを知らない人向けに、基本ルールを1分間にギュッと凝縮」。雰囲気やうんちくは省き、基本ルールに専念。「簡単そう」「ちょっとやってみようかな」と思ってもらうのが狙い。
- 字幕は無い（自動字幕・手動字幕とも `has no subtitles`）。音声の文字起こしはしていない（whisper が無い）。**下は動画を 4 秒ごとに抜いたフレームの字幕テロップから読んだもの。ナレーションの内容は未確認。**
- 動画のテロップが挙げる点（順に）:
  1. 対戦型のスゴロク? 交互にダイスを振って、自分の駒を進めゴールを目指す
  2. ダイスを 2 個振る（画面の左メニューにも「駒 15個」「ダイス 2個」と常時表示）
  3. 駒を 2 個選んで動かす（ダイスの目の数だけ進める。出た目 2 つを別々の駒に使ってよい）
  4. 進行方向（自分は黒、相手は赤。盤を U 字に一周してゴールへ、の矢印）
  5. 全ての持ち駒をゴールさせたら勝ち!
  6. 孤立した相手の駒はヒットできる（振り出しに戻せる）
  7. 相手の駒が重なっているところには動かせない（ブロック）
  8. 勝利の鍵は「作戦 + 運」
- 3〜5 個への要約案: (a) 2 人で交互にダイスを 2 個振る、(b) 出た目だけ自分の駒（15 個）を進める、(c) 全部ゴールさせたら勝ち、(d) 1 個だけの相手駒はヒット（振り出しへ戻す）、(e) 勝敗は作戦 + 運。
- 動画は「ブロック」（2 個以上重なった所へは進めない）も挙げているが、スライドでは (a)〜(d) で足りる（判断は main）。

## 事実と出典

| 点 | 結果 | 出典 |
|----|------|------|
| 2 人対戦 | 確認 | https://en.wikipedia.org/wiki/Backgammon 「Backgammon is a two-player board game played with counters and dice on tables boards.」／ https://ja.wikipedia.org/wiki/バックギャモン 「基本的に2人で遊ぶボードゲームの一種」 |
| ダイス 2 個 | 確認 | https://backgammon.or.jp/?page_id=69051 （日本バックギャモン協会「ルール（基本編）」）「2個のダイス（サイコロ）を振ってコマ（チェッカー）を進め」／ ja.wikipedia 「2つのサイコロを振り、出た目の数だけ前方に駒を動かす」 |
| 各 15 個の駒 | 確認 | en.wikipedia 「Each player begins with fifteen pieces」／ JBA 同ページ「15枚ずつのコマ」／ ja.wikipedia 「双方15個の駒」 |
| 全部盤から出したら勝ち（ベアオフ） | 確認 | en.wikipedia 「be first to bear off, i.e., remove them from the board」／ JBA 同ページ「自分のすべてのコマをゴールさせることが目的」 |
| 1 個だけの所に止まるとヒット | 確認 | en.wikipedia 「a point occupied by exactly one opposing piece, or 'blot'. … the blot has been 'hit' and is placed in the middle of the board on the bar.」／ JBA 「1枚だけのコマはヒットできる」「ヒットして、ふり出しであるバーの上に戻す」／ ja.wikipedia 「敵の駒が1つだけあるポイントに駒を移動した場合、それまであった敵の駒を一時的にゲームから取り除かれる。これを**ヒット**という」 |
| 盤双六はバックギャモンの仲間 | 確認 | https://ja.wikipedia.org/wiki/盤双六 「盤双六は、バックギャモンの古い形」。ja.wikipedia バックギャモン: 世界最古のボードゲームとされるテーブルズの一種で「西洋双六」ともいい、飛鳥時代に日本へ伝来して「雙六」の名で流行し、賭博として遊ばれたため朝廷に禁止された。en.wikipedia 「Ban-sugoroku is a Japanese game that is a close relative of backgammon. It utilizes the same starting position but has slightly different rules.」 |

注意:
- 引用は WebFetch（要約モデル）経由で取ったもの。文字どおりの一致は未確認。スライドに引用符付きで載せるなら原文を再確認すること。
- 「盤双六」の読み（ばんすごろく）は ja.wikipedia の記事名から。JBA の公式ページには載っていなかった（ https://backgammon.or.jp/?page_id=746 は 404）。
- 「同系統」の言い方: en は "close relative"、ja は「古い形」。「バックギャモンの仲間（先祖にあたる遊び）」と書くのが両方に合う。
- ヒットされた駒は「振り出し（バー）に戻る」。スライドでは動画と同じ「振り出しに戻す」でよい。

## 画像

採用: **Backgammon Layout.jpg**（真上から。初期配置。2 人分 15 個ずつ確認できる）
- 保存先: `/home/ytani/work/slide_ytsched/images/bg-rules-board.jpg`（1600x1200、原画 4000x3000 を縮小、476KB）
- 作者: TaurusEmerald（own work, 2020-05-22）
- ライセンス: CC BY-SA 4.0 https://creativecommons.org/licenses/by-sa/4.0
- 元ページ: https://commons.wikimedia.org/wiki/File:Backgammon_Layout.jpg
- 原画: https://upload.wikimedia.org/wikipedia/commons/4/40/Backgammon_Layout.jpg
- クレジット案: 「Backgammon Layout.jpg / TaurusEmerald / CC BY-SA 4.0 / Wikimedia Commons」
- 保存後に開いて確認した: 盤全体が写っている。透かしや説明文字は無い。背景はカーペット、左上と右下にダイスカップ、盤の左端に小さな製造元ロゴ「REISS」、右端に小さな立方体「2」（ダブリングキューブ）が写っている。盤の外にカーペットが多いので、使うときはトリミングする方がよい（盤とカップを含めて概ね x 230〜1370, y 170〜880 / 1600x1200 上）。CSS の `object-fit`/`object-position` でもよい。

候補（他）:
2. Backgammon lg.jpg — 公有（Public domain）、作者 Ptkfgs（2007-03-26）、1500x1000。白背景で切り抜き風。斜めから撮っていて、盤の奥が小さい。中盤の並び（初期配置ではない）。 https://commons.wikimedia.org/wiki/File:Backgammon_lg.jpg
3. Backgammon board.jpg — CC BY-SA 3.0、作者は Commons の情報欄が空（未確認）、1024x768。初期配置だが斜めから撮っていて、ダイスカップが駒に重なる。 https://commons.wikimedia.org/wiki/File:Backgammon_board.jpg

参考（採らなかった）: Backgammon--Tavola e pedine ad inizio gioco.jpg（CC BY-SA 3.0、1120x1260、初期配置の図だがイタリア語の文字入り）。 https://commons.wikimedia.org/wiki/File:Backgammon--Tavola_e_pedine_ad_inizio_gioco.jpg

## 未確認

- 動画のナレーションの内容（テロップのみ確認）
- WebFetch の引用の文字どおりの一致
- Backgammon board.jpg の作者
- 初期配置が正しい並びかの厳密な検証（目視で各 15 個・24/13/8/6 番ポイントの 2・5・3・5 に見えるが、数え直してはいない）
