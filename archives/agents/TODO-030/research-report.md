# TODO-030 調査報告（魅力③ おしゃれ）

調べた日: 2026-09-30。コードは直していない。

## 1. 東急ハンズの社名変更

- 事実: 2022 年 10 月 1 日に、商号が「東急ハンズ」から「ハンズ」（HANDS INC.）に変わった。発表は 2022 年 9 月 26 日。
- 経緯: 2022 年 3 月 31 日に、ホームセンター大手のカインズが東急ハンズを買収（子会社化）した。「東急」「TOKYU」を含む標章は、2024 年 3 月末までにすべて使用を終える予定と発表された。
- 出典:
  - [fashionsnap（2022-09-26）](https://www.fashionsnap.com/article/2022-09-26/hands-cains-tradename/)（発表日・変更日を確認）
  - [日経（商号を「ハンズ」に、10 月から）](https://www.nikkei.com/article/DGXZQOUC263490W2A920C2000000/)（見出しのみ確認）
  - [ITmedia（2022-03-31、買収完了）](https://www.itmedia.co.jp/business/articles/2203/31/news154.html)（検索結果の要旨のみ）
- 注意: 2022 年 3 月時点では、店名・社名は変えないと発表されていた。スライドの「東急ハンズなどで販売されていた」（バブル期の話）は、当時の名前なので誤りではない。読みは `slides/backgammon.js` 15 行目の置換（`東急ハンズ` → `とうきゅうハンズ`）で対応済み。
- 未確認: バブル期にバックギャモンが東急ハンズで売られていた、という事実そのものの出典は今回探していない（スライドの前提）。

## 2. 今の楽しみ方

### アプリ・オンライン対戦（1 行ずつ）

- Backgammon Galaxy: 世界のプレイヤーとオンライン対戦できるアプリ。グランドマスターの Marc Olsen が創設、AI による解析つき。[App Store](https://apps.apple.com/us/app/backgammon-galaxy-play-online/id1606706936)、[Google Play](https://play.google.com/store/apps/details?id=com.backgammongalaxy.app&hl=en_US)（創設者の記述は検索結果の要約。本文の再確認はしていない）
- Backgammon - Lord of the Board: 世界の対戦相手と遊べる無料アプリ（ストアの説明文で「#1 Free Backgammon App」と自称）。[App Store](https://apps.apple.com/us/app/backgammon-lord-of-the-board/id1128669274)、[Google Play](https://play.google.com/store/apps/details?id=air.com.beachbumgammon&hl=en_US)
- 日本発のサービス（例: 日本バックギャモン協会のオンライン対戦）は今回調べていない。未確認。

### デザイン性の高いボード（インテリア）

- L'OBJET「Matis Backgammon」: 象嵌の天然木とスエードの裏地、手作り、米国価格 1,600 ドル。[商品ページ](https://www.l-objet.com/products/matis-backgammon)（本文を取得して確認）
- Louis Vuitton のバックギャモンセット（モノグラム）: 中古市場やオークションに出ている。価格は数千ドル前後（例: Wright のオークションで落札 2,304 ドル、見積り 2,000〜3,000 ドル）。[Wright 2026-07-30 Objet](https://www.wright20.com/auctions/2026/07/objet/169)、[1stDibs](https://www.1stdibs.com/furniture/decorative-objects/rare-louis-vuitton-backgammon-set/id-f_944496/)。検索結果の要約のみで、ページ本文は見ていない。現行品かは未確認。
- Hermès: 遊戯セットを出しているという記述はあったが、バックギャモンの具体的な商品は確認できなかった。**未確認**。

## 3. 使い方の提案（判断は main）

- 「ハンズ」の話をスライドに入れるなら、「東急ハンズは今は『ハンズ』」と 1 文で足りる（2022 年 10 月）。
- 高級ブランドの例は、L'OBJET のほうが商品ページの本文で確認できている。Louis Vuitton は現行品でなくオークション・中古の例として言うなら可。
