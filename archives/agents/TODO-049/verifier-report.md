# TODO-049 verifier report
1. narration: 上田・横田・岡美穂・2024年女子の話なし。景山は「ほかにも、景山充人プロをはじめ、多くの日本人が世界ランキングの上位にいます。」で一致。
   `rg -n -e 上田 -e 横田 -e 岡美穂 slides/backgammon.js` -> 270行目の画面 HTML (<b>内、スペース入り表記) のみ。一致。
2. diff の変更行は narration / duration(28->23) / 読み辞書3行削除のみ。HTML は無変更。削除した3語は他所に出現せず(上の rg 結果)。一致。
   変更ファイル: TODO.md, slides/backgammon.js (指示範囲内)。
3. `ytslide measure --slides backgammon 5` -> `実測 32.640s ... 23.31s -> duration: 23`(exit 0)。ファイルの duration: 23 と一致。
4. `ytslide check --slides backgammon` -> `slides/backgammon.js: 問題なし`(exit 0)。
判断が要る点: なし。
