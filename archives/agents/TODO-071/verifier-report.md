# TODO-071 verifier 報告（大回りに直した後の再確認）

手段: Playwright（node、/usr/bin/chromium）。スクリプトは scratchpad の v.js。
fetch(cache:'reload') + reload の後、`rules-white` / `rules-brown` の d が指示の値
（白 y=250/500・x=120、茶 y=580/170・x=55）になっているのを出力で確認してから撮影。
CLAUDE.md が無く、走らせる検証コマンドは無い（終了コードの記録対象なし）。

## 変更範囲
`git status`: TODO.md、slides/backgammon.js が変更、archives/agents/TODO-071/ と images/k-arena1.jpeg が未追跡。
slides/backgammon.js の差分は flow 関数と 2 枚目の figure のみ。images/k-arena1.jpeg は指示に無いが、本件の差分から参照はされていない（要確認ならそちらで）。

## 確認項目
1. 1280x800（画像 verifier-1280-t0.png / t1.2 / t3.png）
   - t=0: 線は見えず（dashoffset 1.01）、点も出ていない。矢じりは始点（右側）にある。一致
   - t=1.2: dashoffset 0.515。線が途中まで、矢じりが先端（左端の折り返し付近）で進む向き。一致
   - t=3.0: dashoffset 0。2 本とも描き切り、矢じりは右端の終点。一致
2. 向き: 白（緑）は右上 → 上段を左へ → 左で折り返し → 下段を右へ → 右下の緑ゴール。茶色（オレンジ）は右下 → 下段を左へ → 外側で折り返し → 上段を右へ → 右上のオレンジゴール。写真の駒（茶色が右下、白が右上）と合う。一致
3. 札・キャプション: 欠け・重なりなし。キャプションの白は緑、茶色はオレンジの字。矢じり先端（x=1040）は札と重ならない。一致
4. 412x915（verifier-412-t3.png）: 横スクロールなし（scrollWidth 412 = clientWidth 412）、はみ出し・重なりなし。ただし図は小さく、矢印は細部が読める大きさではない（見やすさは判断しない）。一致
5. getCurrentTime: 1.5499 → 2.5499（1 秒あけて増加）。一致
6. コンソール: 新しいエラーなし。出たのは cdn.tailwindcss.com の警告と 404 1 件（favicon と推定、URL は未確認）のみ

## 判断できなかったこと
なし。
