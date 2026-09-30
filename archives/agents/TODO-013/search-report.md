# TODO-013・014・015 画像・優勝歴の調査報告

調査日: 2026-09-30。コードとスライドは変更していない。選定はしていない（判断材料のみ）。

- 候補画像の縮小版（幅 640）は `archives/agents/TODO-013/candidates/` にある。**下の背景候補は、すべて縮小版を実際に見た**（見て外したものは載せていない）。
- 寸法・作者・ライセンスは Commons API（imageinfo の extmetadata）の値。Commons の URL は説明ページ。
- 条件は「幅 1600px 以上・横長・Commons の PD / CC0 / CC BY / CC BY-SA のみ」。**すべて満たしている**（一番小さいのは Black Marble の 1920x1080）。
- 「見込み」は縮小版を見た印象で、opacity 30% + `bg-slate-950/40` を実際に重ねて測ったものではない。暗い画像は 30% だとほぼ見えなくなるので、opacity を上げる調整が要るかもしれない（実装時に main が測る）。
- ライセンスの注意: CC BY-SA の画像を加工して敷くと、その加工物にも BY-SA が及ぶ。クレジットだけで済む CC BY・CC0・PD のほうが扱いやすい。

## A. 背景の画像

### 1. 表紙「バックギャモンのススメ」

| 縮小版 | Commons | 作者 | ライセンス | 寸法 | 写っているもの | 見込み |
|---|---|---|---|---|---|---|
| s1-Backgammon_52600594028_jpg.jpg | https://commons.wikimedia.org/wiki/File:Backgammon_(52600594028).jpg | Clint Budd | CC BY 2.0 | 6000x4000 | 黒と木目の縞のボードに、象牙色と黒のダイスとダブリングキューブ（64・8・2）、駒 | 形が大きく細部が少ない。暗い茶〜黒が主で文字と競合しにくい。白い駒の丸だけ明るい |
| s1-Backgammon_Board_Close_up_jpg.jpg | https://commons.wikimedia.org/wiki/File:Backgammon_Board,_Close-up.jpg | Donald Olszewski | CC BY 4.0 | 7836x4408 | 緑のフェルトのボード、赤と白のダイス、ダブリングキューブ | 緑・赤の彩度が高く目立つ。薄くしても色は残る。表紙向きだが「6. ゲームの面白さ」にも使える |
| s1-Backgammon_Dice_49482395197_jpg.jpg | https://commons.wikimedia.org/wiki/File:Backgammon_Dice_(49482395197).jpg | Clint Budd | CC BY 2.0 | 4978x3815 | 象牙色と黒のダイス、16 のキューブのアップ | 単純な形で静か。背景は縞のボードでボケている |
| s1-An_elegant_interior_with_twelve_gentlema.jpg | https://commons.wikimedia.org/wiki/File:An_elegant_interior_with_twelve_gentleman_surrounded_by_paintings_and_leather_wall_coverings_with_a_game_of_backgammon_at_center_).webp | Gillis van Tilborgh | Public domain | 2880x1883 | 17 世紀の広間の絵。紳士 12 人がバックギャモンを囲む | 茶色で「歴史」のスライドの地図に雰囲気が近い。壁の模様と人物が細かく、少しうるさい（人物は小さい） |

（見て外したが縮小版は残してある: `s1-Tavli_Board_with_slots_B_jpg.jpg`（https://commons.wikimedia.org/wiki/File:Tavli_Board_with_slots_B.jpg、Nikos Kitsakis、CC BY 4.0、6502x4689）。ボードを真上から写し、盤面がほぼ画面全体で、上に載せる文字と重なる）

### 2. 「世界中でプレーされている」

| 縮小版 | Commons | 作者 | ライセンス | 寸法 | 写っているもの | 見込み |
|---|---|---|---|---|---|---|
| s2-Earth_s_City_Lights_by_DMSP_1994_1995_me.jpg | https://commons.wikimedia.org/wiki/File:Earth%27s_City_Lights_by_DMSP,_1994-1995_(medium).png | NASA GSFC / NOAA NGDC ほか | Public domain | 2560x1280 | 夜の地球の世界地図（大陸ごとに都市の光の点） | 全体が暗い紺。光の点が世界中に散り、「世界中」に合う。30% だとかなり暗くなる |
| s2-Night_lights_2012_the_black_marbel_jpg.jpg | https://commons.wikimedia.org/wiki/File:Night_lights_2012-the_black_marbel.jpg | NASA Earth Observatory（Robert Simmon） | Public domain | 1920x1080 | 夜の地球の半球（欧州・アフリカの光）。左寄りで右は黒 | 右が広く黒なので文字を右に置きやすい。ただし左の地球は 30% だと淡い |
| s2-City_Lights_of_Asia_and_Middle_East_2016.jpg | https://commons.wikimedia.org/wiki/File:City_Lights_of_Asia_and_Middle_East_2016.png | NASA Earth Observatory | Public domain | 4960x4000（縦横比 1.24） | 夜の地球の半球（アジア・中東の光） | 16:9 に cover で敷くと上下が切れる。地球は中央。アジア寄りで、次の日本人のスライドとつながる |

（見て外した: CIA の世界政治地図は国名の文字が細かく、うるさい。「歴史」の地図は古地図なので、現代の地図と対にはなる）

### 3. 「世界中で日本人が大活躍」（新規）

世界選手権の会場はモンテカルロのフェアモントホテル（JBA の記事による）。会場の雰囲気を写した自由なライセンスの写真は見つからなかった。

| 縮小版 | Commons | 作者 | ライセンス | 寸法 | 写っているもの | 見込み |
|---|---|---|---|---|---|---|
| s3-ISS_62_Japan_with_Tokyo_at_bottom_at_nig.jpg | https://commons.wikimedia.org/wiki/File:ISS-62_Japan_with_Tokyo_at_bottom_at_night.jpg | NASA | Public domain | 5568x3712 | 宇宙から見た夜の日本列島（下に東京）。青い大気の帯 | 暗い。「日本」がはっきり分かる。細かいうるささは無い |
| s3-ISS_46_Japan_at_night_jpg.jpg | https://commons.wikimedia.org/wiki/File:ISS-46_Japan_at_night.jpg | NASA / Scott Kelly | Public domain | 4928x3280 | 地平線と夜の日本列島（雲あり）。右上に ISS の太陽電池パネルが写る | 下半分が明るい灰色の雲で、文字と重なると 30% でも少し明るい。右上のパネルは写り込み |
| s3-Minato_City_Tokyo_Japan_Night_jpg.jpg | https://commons.wikimedia.org/wiki/File:Minato_City,_Tokyo,_Japan_(Night).jpg | David Kernan | CC BY 4.0 | 4622x2600 | 東京タワーと夜のビル群 | 濃紺で、赤い東京タワーだけ目立つ。ビルの窓の光はやや細かい |
| s3-Monaco_Hercule_Harbour_Panorama_jpg.jpg | https://commons.wikimedia.org/wiki/File:Monaco_Hercule_Harbour_Panorama.jpg | Gérard Kieffer | CC BY-SA 3.0 | 3580x1776 | モナコ（エルキュール港）の昼のパノラマ。青空と港、街並み | 世界選手権の開催地モナコを示せる。街並みの細部は多いが遠景。明るいので 30% でも淡い |
| s3-Monte_Carlo_Casino_north_facade_on_the_P.jpg | https://commons.wikimedia.org/wiki/File:Monte_Carlo_Casino_north_facade_on_the_Place_du_Casino_-_Jean_Gilletta_-_Leniaud_2003_p79.jpg | Jean Gilletta | Public domain | 4767x3684 | モンテカルロのカジノと庭園の古い白黒写真 | 白黒で静か、細部は遠く小さい。ただし会場はカジノではなくホテル。「モンテカルロ」の連想としてだけ |

### 4. 「不遇の歴史」（流行→賭博の横行→禁止令）

| 縮小版 | Commons | 作者 | ライセンス | 寸法 | 写っているもの | 見込み |
|---|---|---|---|---|---|---|
| s4-Gambling_Saloon_Monte_Carlo_A_Book_of_th.jpg | https://commons.wikimedia.org/wiki/File:Gambling_Saloon,_Monte_Carlo_-_A_Book_of_the_Riviera.jpg | Jean Gilletta | Public domain | 2386x1698 | モンテカルロの賭博室の白黒写真。円卓と椅子、壁画。人物なし | 賭博の連想があり、人物が写らない。白黒で静か。一番条件に合う |
| s4-Gentlemen_Smoking_and_Playing_Backgammon.jpg | https://commons.wikimedia.org/wiki/File:Gentlemen_Smoking_and_Playing_Backgammon_in_a_Tavern,_Dirck_Hals_1627.png | Dirck Hals（1627） | Public domain | 2540x1884 | 酒場でバックギャモンを打つ紳士 5 人の絵。黄・赤の服 | バックギャモンそのものが描かれている。ただし人物が主役で、色も鮮やか。薄くしても人物の顔が見える |
| s4-David_Teniers_De_Dobbelaars_jpg.jpg | https://commons.wikimedia.org/wiki/File:David_Teniers_-_De_Dobbelaars.jpg | David Teniers the Younger | Public domain | 2048x1549 | 暗い酒場でサイコロ賭博をする男たちの絵（題は「賭博師」） | 褐色で暗く、古い絵の雰囲気は「歴史」の地図に近い。人物は小さい |
| s4-The_revells_of_christendome_BM_1849_0315.jpg | https://commons.wikimedia.org/wiki/File:The_revells_of_christendome_(BM_1849,0315.10).jpg | Thomas Cockson ほか（大英博物館） | Public domain | 1600x1261 | 17 世紀の風刺版画。卓を囲んでバックギャモンをする教皇と王たち | 版画で古びた感じは合う。下部に細かい文字、全体も線が細かくうるさい。幅が下限ぎりぎり |

（見て外した: 鳥居清長の浮世絵「3 Brettspiele」（`3_Brettspiele.jpg`）は、絵の盤が双六か碁・将棋か確かめられず、外した。日本の盤双六の禁止令に合う画像は Commons で見つからなかった）

### 5. 「簡単で手軽」

| 縮小版 | Commons | 作者 | ライセンス | 寸法 | 写っているもの | 見込み |
|---|---|---|---|---|---|---|
| s5-Backgammon_293614687_jpg.jpg | https://commons.wikimedia.org/wiki/File:Backgammon_(293614687).jpg | Takuro Iwabuchi | CC BY 2.0 | 2048x1536 | 木のテーブルの上の、革張りの持ち運び用セット（ダイスと駒） | 「手軽」に合う（携帯用）。茶〜こげ茶で静か。駒とダイスの細部がやや多い。幅は小さめ |
| s5-Hourglass_1_jpg.jpg | https://commons.wikimedia.org/wiki/File:Hourglass_1.jpg | Suohros | CC0 | 4080x3072 | 木のテーブルの上の砂時計。背景は緑の壁 | 「15 分」の連想。単純で細部が少ない。緑と木の色。砂時計は中央で小さめ |
| s5-Backgammon_3573_jpg.jpg | https://commons.wikimedia.org/wiki/File:Backgammon_3573.jpg | Ryan Hyde | CC BY-SA 2.0 | 2230x1479 | 暗い背景の、ダイスカップと赤いダイスが載った革のボード。斜めから | 暗く静かだが、これだけでは「簡単・手軽」の意味が薄い |

（見て外した: 公園でバックギャモンをする人の写真は顔が主役になるので外した）

### 6. 「ゲームとしての面白さ」（ダイスの運、ダブリングキューブ、戦略）

表紙に挙げた `s1-Backgammon_Board_Close_up_jpg.jpg`（緑のフェルトに赤白ダイスとキューブ）と `s1-Backgammon_52600594028_jpg.jpg`（ダイスとキューブ 64・8・2）も、こちらに使える。

| 縮小版 | Commons | 作者 | ライセンス | 寸法 | 写っているもの | 見込み |
|---|---|---|---|---|---|---|
| s6-Dice_Macro_15676431485_jpg.jpg | https://commons.wikimedia.org/wiki/File:Dice_Macro_(15676431485).jpg | Jack Elliott | CC BY 2.0 | 6016x4000 | 黒い面に白いダイス 2 個 | 一番静か。黒が主で 30% だと暗くなる。ダイスは中央で小さい |
| s6-Poker_Chips_and_Dealer_Button_5248534210.jpg | https://commons.wikimedia.org/wiki/File:Poker_Chips_and_Dealer_Button_(52485342107).jpg | Jerom Gerard | CC BY 2.0 | 6000x4000 | 多色のポーカーチップの山と「DEALER」の駒。背景は明るい灰色 | 「掛け点を吊り上げる」に合う（賭けの連想）。色は多いが形は単純。明るいので文字の色との相性を見る必要あり。DEALER の英字が読める |
| s6-Backgammon_40577847383_jpg.jpg | https://commons.wikimedia.org/wiki/File:Backgammon_(40577847383).jpg | Clint Budd | CC BY 2.0 | 6000x4000 | 黒地のボードに象牙色・黒の駒とダイス。斜めの構図 | 駒の白がコントラストを作る。「戦略」に合う。細部は少なめ |
| s6-Interior_of_Casino_de_Monte_Carlo_1_jpg.jpg | https://commons.wikimedia.org/wiki/File:Interior_of_Casino_de_Monte_Carlo_(1).jpg | Joseolgon | CC BY-SA 4.0 | 5472x3648 | モンテカルロのカジノの豪華な廊下（大理石の柱、シャンデリア） | 金色で豪華。柱・天井の装飾が多く、やや細かい。ゲームの内容とのつながりは弱い |

### 7. 「おしゃれ」（前景にボードの写真 3 枚。背景は別の切り口）

| 縮小版 | Commons | 作者 | ライセンス | 寸法 | 写っているもの | 見込み |
|---|---|---|---|---|---|---|
| s7-Colorful_Umbrellas_jpg.jpg | https://commons.wikimedia.org/wiki/File:Colorful_Umbrellas.jpg | Ladhra | CC BY-SA 4.0 | 6240x4160 | 黒い背景に、虹色の傘がたくさん宙に浮く（見上げた構図） | 「カラフル」に合う。背景が黒なので 30% でも色が残り、文字の邪魔になりにくい。一部に明るい照明の丸 |
| s7-Colorful_glass_mosaic_inside_Mehrangarh_.jpg | https://commons.wikimedia.org/wiki/File:Colorful_glass_mosaic_inside_Mehrangarh.jpg | Janos Vasko | CC BY-SA 4.0 | 5472x3648 | 暗い部屋のステンドグラスの窓（赤・緑・青・黄）。インドの城 | 「おしゃれ」に合う。暗部が多く、窓の色だけが出る。窓は左〜中央に集まる |
| s7-Hanging_paper_lanterns_Unsplash_jpg.jpg | https://commons.wikimedia.org/wiki/File:Hanging_paper_lanterns_(Unsplash).jpg | Alphacolor（Unsplash） | CC0 | 5616x3744 | 橙の放射状の梁に、絵柄のついた提灯が並ぶ。見上げた構図 | 暖色で目を引くが、提灯の絵柄と梁が細かくうるさい。30% でも文字と競合しそう |
| s7-Backgammon_Iran_jpg.jpg | https://commons.wikimedia.org/wiki/File:Backgammon_Iran.jpg | Chris Blackhead | CC BY-SA 2.0 | 3332x2499 | 象嵌の木のボードと、駒を押さえる指 | 「おしゃれなボード」そのもので、前景の写真と切り口が近い（条件の「別の切り口」から外れる）。指が写る |

（見て外した: マーブル紙・イズニク陶器・カレイドスコープなどは、縁や余白が写る、文様が細かい、暗すぎるなどで外した）

## B. 望月正行プロ・矢澤亜希子プロ

### 「望月プロ」は望月正行プロで合っているか

合っていると見てよい。日本バックギャモン協会（JBA）の代表理事で、日本人初の世界チャンピオン（2009 年）、2021 年に 2 度目。世界の格付け Giants of Backgammon でも 1 位の常連。検索で、ほかに世界的に知られる「望月」姓のバックギャモン選手は出てこなかった。ただし「望月プロ」と呼ばれる別人がいないことまでは確かめていない。

- JBA プロフィール: 「2009年、2021年 世界選手権優勝」 https://backgammon.or.jp/?page_id=73251

### 望月正行プロの優勝歴

| 大会 | 年 | 順位 | 出典 URL | 出典数・補足 |
|---|---|---|---|---|
| 第34回 世界バックギャモン選手権（メイン。モナコ・モンテカルロ） | 2009 年 7 月（19 日に優勝） | 優勝（日本人初。決勝の相手はデンマークの選手で、2 連覇を狙っていた） | https://www.j-cast.com/2009/07/22045837.html | 複数: J-CAST（2009-07-22）、JBA の 2018・2021 年の記事が「2009 年に日本人初」と書く（下）。「第34回」は ja.wikipedia と、回数から逆算（2014=39 回、2018=43 回）。J-CAST の記事自体には回数の記載なし |
| 第45回 世界バックギャモン選手権（メイン。モンテカルロ、フェアモントホテル） | 2021 年 7 月 24 日〜8 月 1 日 | 優勝（決勝はスイスの Carlos Estenssoro。メインを 7 連勝） | https://backgammon.or.jp/?p=64955 | 複数: JBA（2021-08-02）、en.wikipedia の優勝者一覧（https://en.wikipedia.org/wiki/List_of_world_backgammon_champions）、USBGF 殿堂の紹介（https://usbgf.org/awards/masayuki-mochy-mochizuki/） |
| 世界選手権 Super Jackpot（2009 年・2021 年の両方で優勝） | 2009・2021 | 優勝 | https://usbgf.org/awards/masayuki-mochy-mochizuki/ | **1 つだけ**（USBGF の記述。「unprecedented double win」）。年ごとの回数・詳細は未確認 |
| Ultimate Backgammon Championship（UBC） | 2019 年〜 | USBGF は「4 回出て 3 回優勝」、en.wikipedia は「決勝に 6 年連続、うち 4 回優勝」と書き、**食い違っている** | https://usbgf.org/awards/masayuki-mochy-mochizuki/ ・ https://en.wikipedia.org/wiki/Masayuki_Mochizuki | 食い違うので、載せるなら「UBC 優勝（複数回）」程度。en.wikipedia の記事は「要出典」の注記付き |
| 世界の格付け Giants of Backgammon | 2009・2013・2015・2017・2019・2022・2024 の各年で 1 位（en.wikipedia） | 1 位 | https://en.wikipedia.org/wiki/Masayuki_Mochizuki | **1 つだけ**（en.wikipedia。USBGF は「6 回 1 位、1 回 2 位」で、数が合わない） |
| 国内: 盤聖戦（1998・1999・2014）、名人戦（2009・2012）ほか | 各年 | 優勝 | https://ja.wikipedia.org/wiki/望月正行 | **1 つだけ**（ja.wikipedia。一部に出典なし） |

補足: JBA（2018 年の記事）によれば、日本人の世界選手権優勝は 2009 年の望月、2011 年の鈴木琢光、2014・2018 年の矢澤で、2021 年の望月が 5 回目（JBA の 2021 年の記事は「過去 12 年で 5 回」）。

### 矢澤亜希子プロの優勝歴

| 大会 | 年 | 順位 | 出典 URL | 出典数・補足 |
|---|---|---|---|---|
| 第39回 世界選手権（メイン。モナコ・モンテカルロ、8 月 5 日〜10 日） | 2014 年 | 優勝（日本人 3 人目。決勝は米国の Doug Mayfield。1 戦目の 21 ポイントマッチで負け、続く 11 ポイントマッチで逆転） | https://backgammon.or.jp/?p=4411 | 複数: JBA（2014-08-16）、ja.wikipedia、JBA の 2018 年の記事 |
| 第43回 世界選手権（メイン。モンテカルロ、フェアモントホテル、7 月 31 日〜8 月 5 日） | 2018 年 | 優勝（決勝はドイツの Philip Kazemieh に 19-10（19 ポイントマッチ）。参加 177 人、7 連勝。**日本人初、女性でも世界初の 2 回優勝**） | https://backgammon.or.jp/?p=55047 ・ https://backgammon.or.jp/?p=55071 | 複数: JBA の 2 つの記事（2018-08-06、2018-08-08）、ja.wikipedia、en.wikipedia の優勝者一覧 |
| 世界選手権 Super Jackpot（第37回・第38回） | 2012・2013 年 | 優勝 | https://ja.wikipedia.org/wiki/矢澤亜希子 | **1 つだけ**（ja.wikipedia） |
| ラスベガスオープン選手権 | 2014・2015 年 | 優勝 | https://ja.wikipedia.org/wiki/矢澤亜希子 | **1 つだけ**（ja.wikipedia） |
| 国内: 盤聖戦（2004・2009・2015・2016）ほか | 各年 | 優勝 | https://ja.wikipedia.org/wiki/矢澤亜希子 | **1 つだけ**（ja.wikipedia。2004 年は女性初の盤聖と同ページに記載） |

参考: 2012 年に子宮体がんが見つかり、治療を続けながら 2014・2018 年に優勝した経緯が報道されている（https://bunshun.jp/articles/-/53532 、https://www.itmedia.co.jp/business/articles/1901/28/news043.html。どちらも開いて内容は確かめていない、検索結果の見出しのみ）。

補足（日本人の活躍として使える）: en.wikipedia の優勝者一覧によると、2024 年の女性部門の世界チャンピオンは Miho Macleod（日本）。**1 つだけの出典**で、JBA の記事は見つかっていない。

### 写真の候補

#### Wikimedia Commons（先に探した結果）

| 人物 | ファイル | 作者 | ライセンス | 寸法 | 内容 | 備考 |
|---|---|---|---|---|---|---|
| 望月正行 | https://commons.wikimedia.org/wiki/File:Masayuki_%22Mochy%22_Mochizuki.jpg（縮小版: `candidates/person-mochizuki.jpg`） | Mamta1210（自作） | **CC0** | 500x620（縦長・小さい） | 2019-08-04、UBC 決勝の会場。青い盤の前に座る本人。バストアップ、笑顔 | 見て確かめた。人物の同定は、ファイル名と説明文（"Mochy in Monte Carlo Backgammon World Championship at UBC 2019 Final"）による。本人の写真として使えるが、500px なのでスライドで大きく出すとぼやける |
| 矢澤亜希子 | なし | | | | | Commons に該当なし（`Akiko Yazawa`・`Yazawa Akiko`・`矢澤亜希子` の検索で 0 件）。ja.wikipedia・en.wikipedia の記事にも本人の写真は無い |

#### SNS・公式サイト（ダウンロードしていない。許諾は利用者が確かめる）

下の URL は、検索結果と WebFetch の要約で得たもので、**写真の中身は私が開いて見ていない**（SNS は取得できなかった）。「写っている内容」は各ページの記述による。

**矢澤亜希子**

| URL | 種類・投稿者 | 写っている内容 |
|---|---|---|
| https://backgammon.or.jp/wp-content/uploads/2018/08/s_CIMG0738.jpg（掲載ページ: https://backgammon.or.jp/?p=55071） | JBA の公式サイト。撮影者の表記なし | キャプション「表彰式にて」。2018 年世界選手権優勝時 |
| https://backgammon.or.jp/wp-content/uploads/2018/08/38521666_10155813177720292_6875536002811691008_n.jpg（同ページ） | JBA の公式サイト。撮影者の表記なし。ファイル名は Facebook 由来 | キャプション「決勝戦前の握手」。決勝の Philip Kazemieh との握手 |
| https://backgammon.or.jp/?p=55047 の 4 枚（`IMG_4673-1024x768.jpg`、`38450857_2044951822205869_304073320800714752_o-681x1024.jpg`、`s_CIMG0738-1024x768.jpg`、`s_CIMG0753-1024x768.jpg`） | JBA の公式サイト。キャプション・撮影者の表記なし | 第43回世界選手権の記事の写真（誰が写っているかは記載なし） |
| https://www.instagram.com/akiko.yazawa/ | 本人（と見られる）の Instagram | 未確認 |
| https://x.com/akikoyazawa | 本人（プロフィール: Professional Backgammon Player, 2014 2018 World Champion）の X | 未確認（取得すると 402 で見られなかった） |
| https://www.facebook.com/akiko.yazawabg/ | 本人（と見られる）の Facebook | 未確認 |
| https://www.alamy.com/world-backgammon-champion-akiko-yazawa-poses-for-photo-in-tokyo-on-jan8-2019-yazawa-became-the-world-backgammon-champion-in-2014-and-2018-the-yomiuri-shimbun-via-ap-images-image531764247.html | Alamy（有料の写真販売）。2019-01-08 東京。読売新聞 / AP Images、撮影 奥西義和 | 本人のポーズ写真。**有料素材で、自由には使えない**。載せるならライセンス購入が要る |

**望月正行**

| URL | 種類・投稿者 | 写っている内容 |
|---|---|---|
| https://backgammon.or.jp/wp-content/uploads/2021/08/world-championship-2021_02.png（掲載ページ: https://backgammon.or.jp/?p=64955） | JBA の公式サイト。「©滝沢望」の表記あり | 2021 年世界選手権優勝時の写真（1 枚目 `world-championship-2021_01.png` も同ページ。写っている人物の記載なし） |
| https://backgammon.or.jp/?page_id=73251 | JBA の公式サイト（役員紹介）。`register2018_mochizuki2-240x300-2.png` | 望月本人のプロフィール写真（小さい） |
| https://www.instagram.com/bgmochy/ | 本人の Instagram（@bgmochy） | 未確認 |
| https://www.facebook.com/masayuki.mochizuki/ | 本人の Facebook | 未確認 |
| https://x.com/bgmochy | 本人の X（@bgmochy） | 未確認 |
| https://usbgf.org/awards/masayuki-mochy-mochizuki/ | USBGF 殿堂（2023 年入り）の紹介ページ | 写真の有無・クレジットは確かめていない |

## 判断が要る点

1. **矢澤亜希子プロの写真は Commons に無い**。JBA の公式サイトの写真（撮影者不明）か SNS を使うなら、許諾は利用者が確かめる（JBA に問い合わせる、本人に連絡する、など）。
2. **望月プロの Commons の写真は CC0 だが 500x620 と小さい**。スライドで小さく載せるなら足りる。
3. 優勝歴のうち **UBC の回数と Giants の年数は出典の間で食い違う**。スライドに載せるなら、世界選手権（望月 2009・2021、矢澤 2014・2018）に絞るのが確実（どれも JBA の記事に一次の記述がある）。
4. TODO-013 の「不遇の歴史」は、自由なライセンスで「日本の禁止令」に合う画像が見つからず、賭博の連想の画像（ヨーロッパの絵・写真）になる。
