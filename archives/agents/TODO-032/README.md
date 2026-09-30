# TODO-032 の分担

- main: fugashi + unidic-lite で 10 枚のナレーションの読みを出し（`yomi.py`、出力は
  `main-yomi.txt`）、読み違えそうな語を規則に足した
- verifier（Sonnet 5.5 / medium）: main とは別の解析器（SudachiPy）で読みを出し直し、
  見落としと、足した規則の当たり方を確かめた。TODO-020〜031 と同じ担当に続けて頼んだ

音声を文字に戻して読みを確かめる道具（whisper）は手元に無い。書き起こしは漢字で返るので、
入れても読みの確認には使えない。解析器 2 つで当たりを付けるのにとどめた。

## 報告

- 確認: [verifier-report.md](verifier-report.md)

確認の担当が撮ったスクリーンショットは、量が多い（13 件で 133 枚・42MB）ので残していない。
`archives/agents/TODO-031/measure.py <コミット> <ポート>` で撮り直せる。
