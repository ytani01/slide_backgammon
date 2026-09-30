# TODO-034 verifier 報告（作業ツリーの `git diff`）

測定: 作業ツリーを http://127.0.0.1:8765/ で、コミット切り替えを外した measure.py の写し（本体は未変更）で測った。終了コード 0。スクリーンショットは `archives/agents/TODO-034/shots/s1〜s10.png`。

## 1. 10 枚の測定
- 10 枚とも scrollHeight = clientHeight = 428、読み込めない img 無し、h2 上端 24.828125 px（2〜10 枚目一致）、`OUTSIDE: []`。`ytslide check --slides backgammon`: 問題なし。

## 2. 5 枚目
- 国名の札は無い。ページ内に「イラン」「ペルー」の文字は無く、札に使っていた `bg-lime-400` の要素も 0 個。
- 5 枚の写真（イラン・ジョージア・チュニジア・ペルー・チェコ）は欠けず、盤が見える。従来と同じ位置と傾きで、互いに少し重なる。下端は 239・226・234・366・379 px で、canvas の高さ 428 以内。右の数字の箱とは重ならない。クレジットは「写真（一部切り出し）: Adam Jones、…／Wikimedia Commons」で 1 行に収まっている。

## 3. world() の定義と呼び出し
- 定義: `const world = (src, alt, pos, deg)`（引数 4 つ。`country` を外した）。呼び出し 5 か所（248〜252 行）はすべて 4 つの引数（src, alt, pos, deg）。
- 呼び出しの内容は、外した国名（イラン・ジョージア・チュニジア・ペルー・チェコ）以外、変更前と同じ（差分の追加行と削除行を突き合わせた）。alt・位置・角度の入れ違いは無い。読み込み後の img の alt と src も対応している（iran-イラン、georgia-公園のベンチ、tunisia-カフェ、peru-屋外のテーブル、crowd2-大会の会場）。

## 4. duration
- `ytslide measure --slides backgammon --all --root .`（書き込みなし。git status の追跡ファイルは変化なし）とファイルの値が 10 枚全部一致（9, 22, 18, 22, 17, 30, 15, 18, 13, 21）。

## 差分の範囲
- 作業ツリーの `git diff` の slides/backgammon.js には、TODO-034 の分（world() の国名の削除）のほか、TODO-033 の分（6 枚目の変更と読みの規則 1 行）が同居している（TODO-033 は未コミット）。TODO-034 の分は world() の定義と 5 か所の呼び出しだけ。
- 作業ツリーには archives/todo/ の TODO-033・034 のファイルも未追跡で出ている（管理者の作業と見られる）。
