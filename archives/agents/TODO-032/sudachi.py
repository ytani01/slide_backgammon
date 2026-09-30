# 使い方: uvx --with sudachipy --with sudachidict_core python sudachi.py <slides/backgammon.js のパス>
# 規則は player.html の prepareSpeechText と同じ順（slidesConfig.rules → SPEECH_RULES）。SPEECH_RULES は backgammon の文に効くものだけ写した。
import re, sys
from sudachipy import dictionary, tokenizer
src = open(sys.argv[1]).read()
rules = re.findall(r"\[/(.+?)/g, '(.+?)'\]", src)
narrs = re.findall(r"narration: '([^']*)'", src)
speech = [(r'考え方', 'かんがえかた'), (r'使い方', 'つかいかた'), (r'\bAI\b', 'エーアイ')]
t = dictionary.Dictionary().create(); M = tokenizer.Tokenizer.SplitMode.C
def kata2(s):
    return s
for i, n in enumerate(narrs, 1):
    for p, r in rules + speech: n = re.sub(p, r, n)
    print(i, n)
    print('  ', ' '.join(f"{m.surface()}[{m.reading_form()}]" for m in t.tokenize(n, M) if re.search(r'[一-鿿0-9０-９]', m.surface())))
