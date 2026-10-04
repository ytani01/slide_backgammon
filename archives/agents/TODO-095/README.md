# TODO-095 の分担

- main: 原因を切り分け（yt_slide の書き出しと同じ手順で再現）、札から `ring-1 ring-lime-400/20` を外した。再現の手順は [repro.py](repro.py)
- verifier（Sonnet 5.5 / medium）: repro.py で、直した後に金色の枠が出ること、変更を外すと出ないことを確かめた。報告は [verifier-report.md](verifier-report.md)、画像は after.jpg・before.jpg

class を 1 つ外すだけで分岐は変わらないので、reviewer は入れなかった。
