# 「世界中でプレーされている」用の各国の写真（調査報告）

Wikimedia Commons の API（User-Agent 付き、`curl --max-time 30` と同等）で検索・メタデータを取得した。
カテゴリ `People playing backgammon`、`Backgammon in <国>` と、キーワード検索（国名・現地語）から
横 1000px 以上の約 60 枚を縮小画像で見て絞った。コードは変更していない。

## 保存した写真（新規 5 枚 + 既存のチェコ）

保存先は `/home/ytani/work/slide_ytsched/images/`。長辺 1200px、`magick` で縮小（`-strip -quality 85`）。
保存後に開いて、盤が写っていること、透かし・文字が無いこと、チェスなど別のゲームが無いことを見た。

| 保存したファイル | 国と場所 | 撮影年 | 作者 | ライセンス | 元ページ | 何が写っているか |
| --- | --- | --- | --- | --- | --- | --- |
| `bg-world-iran.jpg`（1200x792） | イラン、サナンダジ（西部）の路上 | 2012 | Adam Jones | CC BY-SA 2.0 | https://commons.wikimedia.org/wiki/File:Young_Men_Play_Backgammon_on_Street_-_Sanandaj_-_Western_Iran_(7421919010).jpg | 歩道で若い男性 2 人が木の小さな卓の上の盤で対局。盤全体が見える。原図 3648x2736 の上 12% を切り出し（道路の柵を減らした） |
| `bg-world-georgia.jpg`（1200x905） | ジョージア、クタイシの公園 | 2014 | Marcin Konsek | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:2014_Kutaisi,_M%C4%99%C5%BCczy%C5%BAni_graj%C4%85cy_w_tryktraka.jpg | ベンチの盤を高齢の男性 2 人が打ち、2 人が立って見ている。盤は木製で手前から見える。縮小のみ（原図 4100x3093） |
| `bg-world-tunisia.jpg`（1200x801） | チュニジア（カフェ。町名は Commons に無い） | 2019 | Monaam Ben Fredj | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Tawleh_Players_01.jpg | 使い込んだ緑色の革張りの盤を囲む男性たち。手前の手が石を動かして少しぶれている。説明は「Tawleh（タウレ）はバックギャモンに似た盤ゲーム」。縮小のみ（原図 6005x4009）。Wiki Loves Africa 2019 の投稿 |
| `bg-world-peru.jpg`（1200x860） | ペルー（Commons のカテゴリが Men of Peru。場所は不明） | 2012 | Alex Proimos | CC BY 2.0 | https://commons.wikimedia.org/wiki/File:Saturday_Afternoon_Backgammon_(6784476822).jpg | 屋外の卓で高齢の男性 4 人が緑と赤の折りたたみ盤を囲む。盤ははっきり写る。縮小のみ（原図 4064x2912） |
| `bg-world-usa.jpg`（1200x1200） | アメリカ、ニューヨーク市ブルックリンのブライトンビーチ（Second Street Park） | 2012 | Liz Cooke | CC BY-SA 3.0 | https://commons.wikimedia.org/wiki/File:Backgammon_Players,_Brighton_Beach,_Brooklyn_2012.jpg | 公園の木陰で男性が盤を囲み、1 人が立って見ている。セピア調に加工された写真（元から）。正方形のまま縮小（原図 1936x1936） |
| `bg-crowd2.jpg`（既存、1600x1067） | チェコ、ボードゲームの催し「Deskohraní」のバックギャモン大会 | 2008 | Matěj Baťha | CC BY-SA 3.0 | https://commons.wikimedia.org/wiki/File:Deskohran%C3%AD_08s4_077_-_Backgammon.jpg | 既に採用済み（TODO-025 の research-report.md 参照） |

地域は、中東（イラン）、コーカサス（ジョージア）、アフリカ（チュニジア）、南米（ペルー）、北米（アメリカ）、
ヨーロッパ（チェコ）で、偏りは無い。

### 表記について（main が決める点）

- 全て CC BY / CC BY-SA なので、スライドに作者とライセンスの表記が要る。CC BY-SA は同じ条件で公開する
  義務があるが、スライドで使うだけなら作者・ライセンス・元ページの表記で足りる。
- `bg-world-iran.jpg` は切り出し（改変）しているので、「一部を切り出して使用」と添えるのが安全。
- ペルー・チュニジアの写真は、国以外の場所（町名）が Commons に書かれていない。スライドでは国名だけにする。

## 使わなかった候補

上から、差し替え用の予備として使いやすい順。ギリシャ・トルコは予備としてそのまま使える品質。

| 候補（Commons のファイル名） | 国 | ライセンス | 作者・年 | 使わなかった理由 |
| --- | --- | --- | --- | --- |
| `Playing Backgammon Athens Greece (113613901).jpeg`（2048x1601） | ギリシャ、アテネ（ピレウス） | CC BY-SA 3.0 | Sascha Kohlmann、2014 | 予備の第 1 候補。白黒で、公園のベンチの盤を 2 人が打つ。盤は見える。ヨーロッパはチェコがあり、色のある写真を優先したので外した |
| `Tavla oynayan kadınlar, Serik - Women playing backgammon in Turkey.jpg`（2538x1653） | トルコ、セリク | CC BY-SA 3.0 | Abuk SABUK、2012 | 予備の第 2 候補。女性 2 人が象嵌の盤を打つ。盤はよく見える。中東はイラン・チュニジアで足りていて、手前に手だけの構図なので次点 |
| `Shibam people playing backgammon.JPG`（3264x2448） | イエメン、シバーム | CC BY-SA 3.0 | Aneta Ribarska、2006 | 大勢が広場で囲む。雰囲気は良いが盤が小さく手前の人の背中で隠れ気味。カテゴリに `People playing dominoes` も付いていて、ドミノの可能性もある |
| `Nardy players in Armenia.jpg`（3015x1915） | アルメニア | パブリックドメイン（米国政府、Peace Corps） | Peace Corps、2007 | 表記が要らないのが利点。木匙を売る店の中で対局し、盤ははっきり見えるが暗く、店の商品が目立つ。ジョージアと地域が近いので外した |
| `Boardgames in Bucarest (10654287715).jpg`（5267x3511） | ルーマニア、ブカレスト | CC BY-SA 2.0 | Jeroen Komen、2012 | 縮小画像で見ただけ。カテゴリは `Backgammon in Romania`、`People playing backgammon`。ヨーロッパはチェコと重なるので外した（題が Boardgames で他のゲームが写っている可能性は未確認） |
| `Backgammon-playwers-netanya-street-july-2013.jpg`（2915x2187） | イスラエル、ネタニヤ | CC BY 2.0 | Bryan Doane、2013 | 高齢の男性が路上の盤を囲む。盤は見える。アメリカの構図と似るため外した（縮小画像で見た） |
| `Backgammon12.jpg`（4000x3000） | エルサレム旧市街（Commons のカテゴリは Games of Palestine） | CC BY-SA 4.0 | TZivyA、2017 | 良い写真だが、国の扱いが政治的に微妙なので、main が決めるまで避けた |
| `Beckgammon Players (2893114310).jpg`（2272x1704） | エルサレム旧市街（カテゴリは Backgammon in Israel） | CC BY 2.0 | upyernoz、2008 | 同上（国の扱い）。加えて夜で暗い |
| `Tawleh Players 03.jpg`（5347x3169） | チュニジア | CC BY-SA 4.0 | Monaam Ben Fredj、2018 | 盤が手前の青いカウンターに隠れて、ほとんど見えない。同じ作者の 01 を採用 |
| `Tavla Oynayan Amcalar.jpg`（3492x2619） | トルコ | CC BY-SA 4.0 | Theigumus、2019 | 盤が小さく、人物が主役になる |
| `Istanbul, Tavla game.jpg`（1360x2048） | トルコ、イスタンブール | CC BY 2.0 | Stephane Gaudry、2012 | 縦長で横が 1360 しかなく、傾けて重ねる用途に向かない |
| `Backgammon Iran.jpg`（3332x2499） | イラン | CC BY-SA 2.0 | Chris Blackhead、2014 | 盤の接写で、指が石を押さえているだけ。人が写らない |
| `ქართველები ნარდის თამაშობენ (48397852796).jpg`、`In the street (50409818923).jpg` | ジョージア、トビリシ | CC BY 2.0 | madras91、2019 / 2020 | 白黒でジョージアが重複（クタイシの写真を優先） |
| `Nacala - Bay Diving (2767931598).jpg` | モザンビーク、ナカラ | CC BY 2.0 | Stig Nygaard、2007 | 観光客が食堂で打つ場面で、盤が小さい |
| `Flickr - Government Press Office (GPO) - Backgammon in Beirut.jpg` | レバノン、ベイルート（1982） | CC BY-SA 3.0 | GPO 提供（Flickr）、1982 | イスラエル軍兵士が軍用車の脇で遊ぶ場面。戦争の文脈になる |
| `DSCN3337.JPG` | レバノン、ベイルート | CC BY-SA 3.0 ほか | Rekd、2004 | 撮影は 2004 年の低画質（2048x1536）で、画像は開いて見ていない。カテゴリは People playing backgammon |
| `Hammond Slides Central Asia 31.jpg`（10200x6600） | 場所不明（ソ連、1964） | CC BY-SA 4.0 | Thomas T. Hammond | 国が特定できない（カテゴリは Unidentified locations in Asia） |
| `Нарды, Россия (1〜3).jpg` | ロシア | CC0 | GennadyL、2024 | 盤だけの写真（人が写らない） |
| `Nyc union square backgammon game nov.2024.jpg` | アメリカ、ニューヨーク | CC0 | Artprof23、2024 | 手前にチェス盤が大きく写る（research-report.md と同じ判断） |

## 検索して見つからなかったもの

エジプト、ブラジル、イギリス、インド、モロッコ、シリア、ヨルダン、キプロス、アゼルバイジャンで
バックギャモンをしている人の写真（横 1000px 以上）は、Commons の検索・カテゴリでは見つからなかった
（見つかるのは盤の物品、絵画、古い書籍の PDF ばかり）。「Category:Backgammon in Azerbaijan」の
写真は、家屋博物館内の写真 1 枚（縦長、開いて見ていない）だけだった。

## 判断が要る点

1. 5 枚（新規）にチェコを足すと 6 枚ある。スライドで 5 枚に絞るなら、絵柄が近く見劣りする
   ブルックリン（正方形・セピア調）を外すのが第一候補。
2. ギリシャ・トルコ（依頼の例に挙がっていた国）は、上の予備にある。使うなら再度の保存を依頼してほしい
   （切り出しの指定があれば添える）。
3. CC BY / CC BY-SA の表記の置き場所（スライドの隅か、最後のクレジット）。
