# TODO-076: bg-karena.jpg から夜景の明かりを拾い、KARENA_LIGHTS の座標を出す。
# 実行: python3 archives/agents/TODO-076/pick-lights.py（numpy・Pillow・matplotlib を使う）
# 暖色で明るい画素の極大を取り、夜景の範囲（多角形）の中だけ残して、28px より近いものを間引く。
# 天井の帯の反射（x 440〜560、y 235〜265 の横一列）と、左上の窓枠ぎわ、人の頭に近い (975,386) は外した。
from PIL import Image, ImageDraw, ImageFilter
from matplotlib.path import Path
import numpy as np, json, sys
im = Image.open('images/bg-karena.jpg').convert('RGB'); a = np.asarray(im).astype(int)
R, G, B = a[..., 0], a[..., 1], a[..., 2]; L = (R + G + B) / 3
score = np.where((R - B > 35) & (L > 150), L, 0).astype(float)
mx = np.asarray(Image.fromarray(score.astype(np.uint8)).filter(ImageFilter.MaxFilter(9))).astype(float)
ys, xs = np.nonzero((score > 0) & (score >= mx))
pts = []
for x, y in sorted(zip(xs, ys), key=lambda p: -score[p[1], p[0]]):
    if all((x - px) ** 2 + (y - py) ** 2 > 18 ** 2 for px, py in pts): pts.append((int(x), int(y)))
poly = Path([(0,400),(95,265),(440,270),(460,140),(520,105),(600,200),(650,240),(800,240),(790,40),(870,30),(980,90),(1040,0),(1180,0),(1230,250),(1130,290),(1070,380),(990,400),(870,420),(860,490),(730,530),(700,600),(520,660),(470,700),(200,710),(160,800),(0,800)])
pts = [q for q in pts if poly.contains_point(q) and not (440 < q[0] < 560 and 235 < q[1] < 265) and not (q[0] < 130 and q[1] < 330) and q != (975, 386)]
out = []
for q in sorted(pts, key=lambda q: -score[q[1], q[0]]):
    if all((q[0] - o[0]) ** 2 + (q[1] - o[1]) ** 2 >= 28 ** 2 for o in out): out.append(q)
out.sort(key=lambda q: (q[1], q[0]))
print(json.dumps([list(q) for q in out], separators=(',', ':')))
if len(sys.argv) > 1:  # 引数に出力先を渡すと、拾った点を描いた画像を書く
    d = ImageDraw.Draw(im)
    for x, y in out: d.ellipse([x - 8, y - 8, x + 8, y + 8], outline=(255, 0, 255), width=2)
    im.save(sys.argv[1])
