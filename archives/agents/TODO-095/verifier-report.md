# TODO-095 verifier 報告

## 結果: 3 項目とも合格

## 実行したコマンド

repro.py をそのまま動かすと、2 回落ちた。原因は URL の指定漏れ。

- URL が `http://localhost:8137/player.html` だと `?slides=` が無く、`slides/readme.js` を読みに行って 404 になる（`slides not found: readme`）。出力は次のとおり。
  `ReferenceError: Cannot access 'isPlaying' before initialization`
- 正しい URL は `http://localhost:8137/player.html?slides=backgammon`。repro.py の冒頭の使い方に `?slides=backgammon` の記載は無い（判断が要る点）。

```
cd /home/ytani/work/slide_backgammon && python -m http.server 8137 &     # PID で止めた
cd ~/work/yt_slide && .venv/bin/python /home/ytani/work/slide_backgammon/archives/agents/TODO-095/repro.py \
  "http://localhost:8137/player.html?slides=backgammon" <OUT>.jpg
```

- 変更後は `after.jpg`、変更前（`git stash push slides/backgammon.js`）は `before.jpg` に保存した。
- 変更前の実行後に `git stash pop` で戻した。

## 1. 直した後

- box-shadow: `rgb(255, 255, 255) 0px 0px 0px 0px, rgba(252, 211, 77, 0.8) 0px 0px 0px 4px, rgba(54, 83, 20, 0.2) 0px 10px 15px -3px, rgba(54, 83, 20, 0.2) 0px 4px 6px -4px`（`ring-4=true`）
- `rgba(252, 211, 77, 0.8) 0px 0px 0px 4px` を含む。一致。
- 画像 `after.jpg`: 札 1 に金色の太い枠が見える。一致。

## 2. 壊すと落ちるか

- stash 後の `git diff --stat` は `TODO.md` 1 行のみ（slides/backgammon.js は外れた）。
- box-shadow: `rgb(255, 255, 255) 0px 0px 0px 0px, rgba(163, 230, 53, 0.2) 0px 0px 0px 1px, rgba(54, 83, 20, 0.2) 0px 10px 15px -3px, rgba(54, 83, 20, 0.2) 0px 4px 6px -4px`（`ring-4=true` なのに枠は 1px の淡い緑）。一致。
- 画像 `before.jpg`: 札 1 の枠は淡い緑の細線のみで、金色は見えない。一致。
- `git stash pop` 後の `git diff --stat`: `TODO.md | 2 +-` と `slides/backgammon.js | 2 +-`（計 2 ファイル、各 1 行）に戻った。TODO.md は着手前から未コミットの変更。

## 3. 見た目の副作用

- `after.jpg` の札 1 の形（角丸）と中身（「世界の遊戯人口」「約 2.8億 人」「日本バックギャモン協会による」）は崩れていない。before.jpg と中身・位置が同じ。一致。

## 画像

- /home/ytani/work/slide_backgammon/archives/agents/TODO-095/after.jpg
- /home/ytani/work/slide_backgammon/archives/agents/TODO-095/before.jpg

## 確かめられなかったこと

- 特になし。8000 番には触れていない。http.server（8137 番）は PID で止めた。
