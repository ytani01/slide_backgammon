import re, fugashi
src=open('slides/backgammon.js').read()
rules=re.findall(r"\[/(.+?)/g, '(.+?)'\]", src)
narrs=re.findall(r"narration: '([^']*)'", src)
t=fugashi.Tagger()
for i,n in enumerate(narrs,1):
    for pat,rep in rules: n=re.sub(pat,rep,n)
    out=[]
    for w in t(n):
        if re.search(r'[一-鿿0-9]', w.surface):
            k=getattr(w.feature,'kana',None) or getattr(w.feature,'pron',None)
            out.append(f"{w.surface}[{k}]")
    print(i, ' '.join(out))
