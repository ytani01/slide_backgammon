# TODO-044 verifier 報告

結果: 問題なし。

## 手段
- Playwright MCP のツールがこの担当から使えなかったため、インストール済みの playwright を node から使った（chromium、headless）。
  対象は常駐サーバー http://localhost:8000/player.html?slides=backgammon#10（サーバーは触っていない、HTTP 200 を確認）。
- 開き方: `?slides=backgammon`（無いと readme.js を探して失敗する）と `#10`（10 枚目）。
- 測定スクリプト: scratchpad の m.js（archives には残していない）。

## 測った値（札の文言 = 公式サイトの札）
| 画面 | innerText | 行数 | 札 | はみ出し |
|---|---|---|---|---|
| 1280x800 | "お問い合わせは\n公式サイトで" | 2（高さ 38.19 / 行高 19.10） | [657,276,891,388] | scrollW 234 = clientW 234 |
| 412x915 | 同上 | 2（高さ 15.85、スライドの縮小率 約 0.396 を掛けた行高 20.02 の 2 行分 = 15.87） | [278,145,375,192] | scrollW 246 = clientW 246 |

- 「は」だけの行などは無い（どちらも `<br>` の位置の 2 行）。
- URL 表示も両画面で 2 行（`kannaibg.wixsite.com/` / `kannai-backgammon`）。
- 札・QR・URL は札の内側に収まり、札はスライドの枠（1280: 右端 917、412: 右端 386）の内側。X の札も同様に 2 行で崩れなし。

## スクリーンショット
- /home/ytani/tmp/playwright-mcp/todo044-1280x800.png（札・QR・URL 欠け・はみ出しなし）
- /home/ytani/tmp/playwright-mcp/todo044-412x915.png（縮小表示だが欠け・はみ出しなし。文字は小さい。実害は未確認）

## 旧文言
- `rg -n -e 日程 -e 申し込み slides/` → 該当なし（終了コード 1）。

## 変更範囲
- `git status`: M TODO.md、M slides/backgammon.js。指示の範囲（backgammon.js の 2 行、TODO.md）と一致。
- diff は札の文言とナレーションの各 1 行のみ。

## 確かめていないこと
- ナレーションの読み上げ音声（指示により対象外）。
