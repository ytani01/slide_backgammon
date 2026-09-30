# TODO-010 verifier-report（5 枚目）

- 1. `ytslide check --slides backgammon`: 終了コード 0、`slides/backgammon.js: 問題なし`
- 2. はみ出し: 1280x720 は 428/428・868/868、412x915 は 456/456・910/910 → 無し。naturalWidth: board1 1090、board2 1280、board3 1215 → 0 でない。`slideData.length` 5
- 3. `slide5-1280.png`
  - 3 枚とも盤が見える。board1(青白の盤)は上端で盤の縁がやや切れるが、盤面は全体が写っている(大きな欠けではない)
  - 赤と黒の盤は残っていない(board2 は白木の盤、board3 はターコイズの箱)
  - クレジットは 2 行で読める(小さいが判読できる)
- 4. Commons API(extmetadata)との突き合わせ: 3 件とも一致
  - RG72 / CC BY 4.0（Etna festivalo 14.jpg）
  - Alper Çuğun / CC BY 2.0（Shall we play a game?）※ API は "Alper Çuğun from Berlin, Germany"
  - Diligent / Public domain（Partie de Trictrac.jpg）= 「PD」
- 5. `find images -name 'bg-board*'`: bg-board1.jpg 1090x568、bg-board2.jpg 1280x902、bg-board3.jpg 1215x652 の 3 枚のみ。旧写真のファイルは残っていない
- 確かめられなかったこと: 無し。写真がファイル名の Commons ページの絵と同一かは見ていない(API は名前の照合のみ)
