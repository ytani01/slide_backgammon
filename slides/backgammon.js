// YouTube 動画「バックギャモンのススメ」のスライド。template.js のテンプレートを使う。

const slidesConfig = {
    title: 'バックギャモンのススメ',
    heading: 'バックギャモンのススメ',
    summary: '関内バックギャモンの会による、バックギャモンの歴史と魅力の紹介',
    icon: 'fa-dice',
    rules: [
        [/中区/g, 'なかく'],
        [/関内/g, 'かんない'],
        [/Kアリーナ/g, 'けーありーな'],
        [/奈良時代/g, 'ならじだい'],
        [/飛鳥時代/g, 'あすかじだい'],
        [/賭博/g, 'とばく'],
        [/禁止令/g, 'きんしれい'],
        [/駆け引き/g, 'かけひき'],
        [/3億人/g, 'さんおくにん'],
        [/遊戯人口/g, 'ゆうぎじんこう'],
        [/望月正行/g, 'もちづきまさゆき'],
        [/矢澤亜希子/g, 'やざわあきこ'],
        [/盤双六/g, 'ばんすごろく'],
        [/日本書紀/g, 'にほんしょき'],
        [/持統天皇/g, 'じとうてんのう'],
        [/伏見城御制法/g, 'ふしみじょうごせいほう'],
        [/世界中/g, 'せかいじゅう'],
        [/初めての方/g, 'はじめてのかた'],
        [/た方が/g, 'たほうが'],
        [/来れば/g, 'くれば'],
        [/主に/g, 'おもに'],
        [/日本人/g, 'にほんじん'],
        [/景山充人/g, 'かげやまみちひと'],
        [/2人/g, 'ふたり'],
    ],
};

// 時間軸の画像 1 枚と、何の絵かの小さな説明。時代の説明は時間軸の点の下に並べる（TODO-024）。強調の枠が説明に被らないよう離す（TODO-083）
const fig = (src, alt, label, say, pos = 'object-top') => `
    <figure class="m-0 flex flex-col items-center">
        <img src="images/${src}" alt="${alt}" data-say="${say}" data-say-strong class="w-full h-[17cqw] object-cover ${pos} rounded-xl border border-slate-700 shadow-xl shadow-slate-950/60">
        <figcaption class="text-slate-300 mt-[1.2cqw] text-center leading-tight" style="font-size: 1.7cqw;">${label}</figcaption>
    </figure>`;
const cap = (html) => `
    <div class="text-center text-slate-100 font-medium leading-snug" style="font-size: 2.6cqw;">${html}</div>`;

// 箇条書きの 1 行。template.js の「箇条書き」より大きく、写真と重なっても読めるよう地を濃くした（TODO-018）。
// py は行が多いスライドで上下の余白を詰めるため（TODO-051）
const li = (icon, html, say, py = '1.1cqw') => `
    <li data-say="${say}" class="flex items-center gap-[1.4cqw] rounded-xl bg-slate-950/75 backdrop-blur-sm border border-lime-500/40 px-[1.6cqw] py-[${py}] shadow-lg shadow-slate-950/60">
        <span class="shrink-0 grid place-items-center w-[4.4cqw] h-[4.4cqw] rounded-lg bg-lime-500/15 text-lime-400 border border-lime-500/40" style="font-size: 2.4cqw;"><i class="fa-solid ${icon}"></i></span>
        <span class="text-slate-50 font-bold leading-snug" style="font-size: 2.8cqw;">${html}</span>
    </li>`;

// QR コードの札。札ごと url へのリンクで、QR を左、文字を右に置く（TODO-043）。夜景を見せるため 15cqw から 12cqw にした（TODO-068）
const qrCard = (url, img, alt, label, shown, say = '') => `
    <a href="${url}" ${say && `data-say="${say}" data-say-strong`} target="_blank" rel="noopener" onclick="event.stopPropagation()" class="flex items-center gap-[1cqw] no-underline rounded-2xl bg-slate-50 p-[1cqw] shadow-2xl shadow-slate-950/80">
        <img src="images/${img}" alt="${alt}" class="shrink-0 w-[12cqw] h-auto" style="image-rendering: pixelated;">
        <div class="min-w-0">
            <div class="text-slate-900 font-bold leading-snug" style="font-size: 1.6cqw;">${label}</div>
            <div class="text-slate-600 font-medium mt-[0.4cqw] break-all leading-tight" style="font-size: 0.95cqw;">${shown}</div>
        </div>
    </a>`;

// ルールの 1 行。li() より小さく、4 行を写真の横に並べる（TODO-020）
const rule = (icon, html, say) => `
    <div data-say="${say}" class="flex items-center gap-[1cqw] rounded-xl bg-slate-950/75 border border-lime-500/40 px-[1.2cqw] py-[0.8cqw] shadow-lg shadow-slate-950/60">
        <span class="shrink-0 grid place-items-center w-[3.4cqw] h-[3.4cqw] rounded-lg bg-lime-500/15 text-lime-400 border border-lime-500/40" style="font-size: 1.8cqw;"><i class="fa-solid ${icon}"></i></span>
        <span class="text-slate-50 font-bold leading-snug" style="font-size: 2cqw;">${html}</span>
    </div>`;

// 白い縁を付けて傾けた写真 1 枚。pos は位置と幅の class、deg は傾き
const snap = (src, alt, pos, deg, cue) => `
    <img src="images/${src}" alt="${alt}" data-cue="${cue}" class="absolute ${pos} h-auto bg-slate-50 p-[0.5cqw] rounded-sm shadow-2xl shadow-slate-950/80" style="transform: rotate(${deg}deg);">`;

// 「バックギャモンとは」の盤の矢印（TODO-072）。白（緑）は右上から、茶色（オレンジ）は右下から、同じ U 字を
// 向かい合って進む。駒が出会ったら火花を散らして戦うか、間に壁を立てて 1〜2 秒にらみ合って止まる（半々。TODO-096）。
// 勝ち負けはランダム。負けたほうはすぐスタートから出直し、勝ったほうはそのまま進む。ゴールに着いたほうも、少し止まってからスタートから出直す。
// 線の先は矢じりでなく駒の絵。U 字は入れ子に 3 本あり、それぞれで別々に戦う。速さと、スタートから出るまでの待ちは、出るたびにランダム。
// 待っている間は駒も隠し、戦いの相手にもならない（TODO-096）。
// 位置 s は U 字の上の割合（0 が右上、1 が右下）。線は pathLength="1" なので dash も同じ割合で書ける
const RULES_GAP = 60;  // U 字どうしの間隔
// k 本目の U 字（負は外側）。k = 0 の曲がり角は左の駒の列のあたり（TODO-091）
const rulesTrack = (k) => {
    const d = k * RULES_GAP, top = 210 + d, bottom = 540 - d, left = 180 + d;
    return `M 1000 ${top} L 330 ${top} Q ${left} ${top} ${left} 375 Q ${left} ${bottom} 330 ${bottom} L 1000 ${bottom}`;
};
const RULES_TRACKS = [-1, 0, 1];  // 0 の外側に 1 本、内側に 1 本
// 線の先には矢じりの代わりに駒を描く。縁は線の色で、中に溝の輪を 1 本
const RULES_CHECKER = { white: '#f5f0e1', brown: '#5b3219' };
const RULES_CHECKER_RING = { white: '#a8a29e', brown: '#2b1608' };
const rulesArrow = (id, k, color) => `
    <path id="rules-line-${id}-${k}" d="${rulesTrack(k)}" pathLength="1" stroke-dasharray="0 3" visibility="hidden" fill="none" stroke="${color}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" opacity="0.95"/>
    <g id="rules-head-${id}-${k}" visibility="hidden">
        <circle r="24" fill="${RULES_CHECKER[id]}" stroke="${color}" stroke-width="5"/>
        <circle r="14" fill="none" stroke="${RULES_CHECKER_RING[id]}" stroke-width="2"/>
    </g>`;

// player.html にはスライドを出したときに JS を走らせる口が無いので、render() から setTimeout で呼ぶ。
// render() は画像の確認でも呼ばれるため、画面に無ければ何もせず、二重にも動かさない。画面から消えたら止まる
const rulesBattle = () => {
    const svg = document.getElementById('rules-svg');
    if (!svg || svg.dataset.running) return;
    svg.dataset.running = '1';
    const $ = (id) => svg.querySelector(`#rules-${id}`);
    const FIGHT = 0.3;      // 戦う秒数（にらみ合いの秒数も t.fight で数える）
    const GLARE = 1;        // にらみ合って止まる秒数の下限（1〜2 秒）
    const HOLD = 0.6;       // ゴールで止まる秒数
    const WAIT = 1.5;       // スタートで待つ秒数の上限
    // 出直すたびに、速さ（1 秒に進む割合。端から端まで約 3〜7 秒）と、出るまでの待ちを決め直す
    const launch = (a) => {
        a.s = a.start;
        a.speed = 0.14 + Math.random() * 0.21;
        a.wait = Math.random() * WAIT;
    };
    const tracks = RULES_TRACKS.map((k) => {
        const path = $(`track-${k}`);
        const L = path.getTotalLength();
        const arrows = [
            { id: 'white', start: 0, goal: 1, dir: 1 },
            { id: 'brown', start: 1, goal: 0, dir: -1 },
        ].map((a) => ({ ...a, hold: 0, line: $(`line-${a.id}-${k}`), head: $(`head-${a.id}-${k}`) }));
        arrows.forEach(launch);
        return {
            path, L, arrows,
            touch: 53 / L,  // 駒どうしが触れる距離（駒は半径 24 に縁の半分）
            sparks: $(`sparks-${k}`),
            fight: 0, spark: false, loser: null, gap: 1,
        };
    });
    let last = null;

    const draw = (t) => {
        const at = (s) => t.path.getPointAtLength(Math.min(1, Math.max(0, s)) * t.L);
        for (const a of t.arrows) {
            // 線はスタートから駒まで。白は 0 → s、茶色は s → 1。長さ 0 では丸い端が点に見えるので隠す
            const len = Math.abs(a.s - a.start);
            a.line.setAttribute('visibility', len < 0.005 ? 'hidden' : 'visible');
            a.line.setAttribute('stroke-dasharray', `${len} 3`);
            a.line.setAttribute('stroke-dashoffset', a.dir > 0 ? 0 : -a.s);
            const p = at(a.s);
            const shake = t.fight > 0 && t.spark;
            const jx = shake ? (Math.random() - 0.5) * 12 : 0, jy = shake ? (Math.random() - 0.5) * 12 : 0;
            a.head.setAttribute('transform', `translate(${p.x + jx} ${p.y + jy})`);
            a.head.setAttribute('visibility', a.wait > 0 ? 'hidden' : 'visible');  // スタートで待っている間は盤に出さない
        }
        if (t.fight <= 0) { t.sparks.innerHTML = ''; return; }
        const [w, b] = t.arrows;
        const m = (w.s + b.s) / 2, p = at(m);
        if (!t.spark) {
            // にらみ合い: 2 つの駒の間に、線を横切るレンガの壁を立てる。幅 36・高さ 48 で、3 段を互い違いに積む。
            // 縁取りまで入れて中心から 26。隣の U 字の駒の縁（間隔 60 − 半径 26.5 = 33.5）まで、火花で揺れる 6 より広く空ける
            const p0 = at(m - 0.002), p1 = at(m + 0.002);
            const deg = Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI;
            const bricks = [[-18, -24, 18], [0, -24, 18], [-18, -8, 9], [-9, -8, 18], [9, -8, 9], [-18, 8, 18], [0, 8, 18]]
                .map(([x, y, w]) => `<rect x="${x}" y="${y}" width="${w}" height="16" fill="#dc2626" stroke="#f8fafc" stroke-width="3"/>`).join('');
            t.sparks.innerHTML = `<g transform="translate(${p.x} ${p.y}) rotate(${deg})">${bricks}
                <rect x="-18" y="-24" width="36" height="48" fill="none" stroke="#020617" stroke-width="4"/></g>`;
            return;
        }
        // 火花: 2 つの駒の間から、ランダムな向きに線を飛ばし、光の輪を明滅させる
        let html = `<circle cx="${p.x}" cy="${p.y}" r="${20 + Math.random() * 30}" fill="#fff" opacity="${0.2 + Math.random() * 0.3}"/>`;
        for (let i = 0; i < 10; i++) {
            const r = Math.random() * 2 * Math.PI, r1 = 15 + Math.random() * 15, r2 = 45 + Math.random() * 50;
            html += `<line x1="${p.x + Math.cos(r) * r1}" y1="${p.y + Math.sin(r) * r1}" x2="${p.x + Math.cos(r) * r2}" y2="${p.y + Math.sin(r) * r2}" stroke="${i % 2 ? '#fde047' : '#fff'}" stroke-width="${4 + Math.random() * 3}" stroke-linecap="round"/>`;
        }
        t.sparks.innerHTML = html;
    };

    // 動きを減らす設定なら、向かい合った途中の形で止めて見せる
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        for (const t of tracks) { t.arrows[0].s = 0.45; t.arrows[1].s = 0.55; t.arrows.forEach((a) => { a.wait = 0; }); draw(t); }
        return;
    }

    const step = (t, dt) => {
        if (t.fight > 0) {
            t.fight -= dt;
            if (t.fight <= 0) launch(t.loser);
            return;
        }
        for (const a of t.arrows) {
            if (a.hold > 0) {
                a.hold -= dt;
                if (a.hold <= 0) launch(a);
                continue;
            }
            // 相手が自分のスタート（相手のゴール）で止まっている間は、待ちを進めない（重なって出ないように）
            if (a.wait > 0) { if (t.arrows.every((o) => o.hold <= 0)) a.wait -= dt; continue; }
            a.s += a.dir * a.speed * dt;
            if ((a.goal - a.s) * a.dir <= 0) { a.s = a.goal; a.hold = HOLD; }
        }
        // 向かい合って近づいたときだけぶつかる（すれ違ったあと、ゴールで止まっている間、スタートで待っている間は戦わない）。
        // 遅い端末では 1 フレームで touch より多く縮むので、前のフレームで向かい合っていれば、追い越していても戦わせる
        const [w, b] = t.arrows;
        const gap = b.s - w.s, prev = t.gap;
        t.gap = gap;
        if (w.hold <= 0 && b.hold <= 0 && w.wait <= 0 && b.wait <= 0 && prev >= 0 && gap <= t.touch) {
            // 半々で、火花を散らして戦うか、壁を立てて 1〜2 秒にらみ合って止まる。どちらも負けたほうが出直す
            t.spark = Math.random() < 0.5;
            t.fight = t.spark ? FIGHT : GLARE + Math.random();
            // にらみ合いは止まって見えるので、駒の縁が壁に付く位置まで引き離す（重なったまま見えないように）
            if (!t.spark) {
                const m = (w.s + b.s) / 2, half = 49 / t.L;  // 駒の半径 26.5（縁まで）+ 壁の幅の半分 20（縁取りまで）+ すき間 2.5
                w.s = Math.max(0, m - half);
                b.s = Math.min(1, m + half);
            }
            t.loser = Math.random() < 0.5 ? w : b;
        }
    };

    const frame = (time) => {
        if (!svg.isConnected) return;
        const dt = last === null ? 0 : Math.min((time - last) / 1000, 0.05);  // 1 フレームで進めるのは 0.05 秒まで。タブを離れていた間は飛ばし、遅い端末ではゆっくり動く
        last = time;
        for (const t of tracks) { step(t, dt); draw(t); }
        requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
};

// ナレーションを読み始めてからの秒を数え、毎フレーム draw(t) を呼ぶ（TODO-073 の historyGrow から切り出した。TODO-079〜081）。
// 読み上げの位置は取れないので、読み始めてからの秒を自分で数える。player.html は、再生を始めたとき・再開したとき・
// シーク・速度変更・ミュート解除・声の切り替えなどで、ナレーションをスライドの頭から読み直す。そのたびに増える
// speechRunId を見て、動きも最初からやり直す（進行バーとはずれる。利用者が選んだ）。進行バーの経過秒
// （currentSlideElapsedTime）はスライドの尺で止まるので使わない。秒は読み上げの速さを掛けて、1.0x の秒にそろえる。
// ミュート中は、player.html がナレーションの代わりに尺の分だけ待つので、その待ちに合わせる。
// t は 1.0x の秒で、null はまだ読んでいないとき（再生していないうちに開いたとき）。動きを減らす設定では draw(null) を 1 回だけ呼ぶ。
// draw(null) では最後の形（今の画面）を出す
const narrationClock = (el, draw) => {
    if (!el || el.dataset.running) return;
    el.dataset.running = '1';
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    // シークでは要素ごと作り直されるので、再生中に作られたら読み直しとみなす
    let t = null, run = null, last = performance.now();
    const frame = () => {
        if (!el.isConnected) return;
        const now = performance.now();
        // 音声の速さは player.html で MAX_SPEECH_RATE に抑えられる。ミュート中の待ちは抑えない
        const rate = isMuted ? playbackRate : Math.min(MAX_SPEECH_RATE, getEffectiveSpeed()) / BASE_SPEED_MULTIPLIER;
        if (isPlaying && t !== null) t += (now - last) / 1000 * rate;  // 一時停止中は止める
        last = now;
        if (isPlaying && speechRunId !== run) t = 0;
        run = speechRunId;
        draw(reduce ? null : t);
        if (!reduce) requestAnimationFrame(frame);
    };
    frame();
};
// 0〜1 の進み具合。start 秒から len 秒かけて進み、終わりにかけて緩める。t が null なら 1
const ease = (t, start, len) => t === null ? 1 : 1 - (1 - Math.min(1, Math.max(0, (t - start) / len))) ** 2;

// 「バックギャモンの歴史は古い」の時間軸の線を、ナレーションに合わせて左から伸ばす（TODO-073）。
// 伸ばし始める秒は、Online TTS の音声を文の区切りまで取って長さを測り、1.4 倍速で割った値
// （「その後」が 8.3 秒、「日本にも」が 12.5 秒、全体が 17.5 秒）。Web Speech では少しずれる
const HISTORY_STEPS = [8.3, 12.5];  // 1 区間目（起源 → 中央の点）と 2 区間目（中央の点 → 右端）を伸ばし始める秒
const HISTORY_GROW = 2.5;           // 1 区間を伸ばす秒数
const historyGrow = () => {
    const line = document.getElementById('history-line');
    if (!line || line.dataset.running) return;
    const box = line.parentElement;
    const r = line.getBoundingClientRect();
    const at = (x) => (x - r.left) / r.width;  // 線の上の位置（左端 0、右端 1）
    const dot = box.querySelectorAll('[data-history-dot]')[1].getBoundingClientRect();
    const stops = [0, at(dot.left + dot.width / 2), 1];
    // 矢じりは、線の先が左端に届いたら出す
    const heads = [...box.querySelectorAll('[data-history-head]')].map((el) => ({ el, x: at(el.getBoundingClientRect().left) }));
    narrationClock(line, (t) => {
        // 再生していないうちに開いたときと、動きを減らす設定のときは、最後まで伸ばした形で見せる
        let p = 1;
        if (t !== null) {
            p = 0;
            HISTORY_STEPS.forEach((start, i) => {
                if (t > start) p = stops[i] + (stops[i + 1] - stops[i]) * ease(t, start, HISTORY_GROW);
            });
        }
        line.style.clipPath = `inset(0 ${(1 - p) * 100}% 0 0)`;
        for (const h of heads) h.el.style.opacity = p >= h.x ? 1 : 0;
    });
};

// 写真や札を、ナレーションに合わせて出す（TODO-079〜081）。[data-cue] の要素を、data-cue の秒から
// 上から落ちてきて元の傾きで止まるように出す。元の transform（傾き）は style に書いてあるので、その前に足す
const DROP = 0.7;  // 落ちる秒数
const cueDrop = (box) => {
    if (!box) return;
    const els = [...box.querySelectorAll('[data-cue]')].map((el) => ({ el, at: Number(el.dataset.cue), base: el.style.transform }));
    narrationClock(box, (t) => {
        for (const { el, at, base } of els) {
            const k = ease(t, at, DROP);
            el.style.opacity = t === null ? '' : Math.min(1, k * 2);
            el.style.transform = `translateY(${(1 - k) * -6}cqw) scale(${1 + (1 - k) * 0.15}) ${base}`;
        }
    });
};

// 読み上げている箇所の札を光らせる（TODO-080）。[data-say] の要素を、data-say の秒から次の札の秒まで強調する。
// 最後の札は end 秒（ナレーションの終わり）まで。強調しない間と、最後の形（t が null）は今の画面のまま
const SAY_CLASSES = ['ring-4', 'ring-amber-300/80'];  // 拡大すると歴史の写真が下の説明に被るので、枠だけ（TODO-083）
// data-say-strong の札は、太い枠と光のにじみで強く強調する。歴史の写真と、白い地の QR の札で目立たなかった（TODO-083）
const SAY_STRONG = ['ring-[0.7cqw]', 'ring-amber-300', '!shadow-[0_0_3cqw_0.6cqw_rgba(252,211,77,0.8)]'];
const POP = 0.6;  // data-say-pop を膨らませて戻す秒数
const cueSay = (box, end) => {
    if (!box) return;
    const els = [...box.querySelectorAll('[data-say]')];
    els.forEach((el) => el.classList.add('transition', 'duration-300'));
    const at = els.map((el) => Number(el.dataset.say));
    narrationClock(box, (t) => els.forEach((el, i) => {
        const on = t !== null && t >= at[i] && t < (at[i + 1] ?? end);
        (el.hasAttribute('data-say-strong') ? SAY_STRONG : SAY_CLASSES).forEach((c) => el.classList.toggle(c, on));
        // data-say-pop の要素は、その札を強調し始めたら POP 秒で 1.3 倍まで膨らませて戻し、強調している間は金色に光らせる（TODO-093）
        const k = on ? Math.min(1, (t - at[i]) / POP) : 1;
        el.querySelectorAll('[data-say-pop]').forEach((s) => {
            s.style.transform = `scale(${1 + 0.3 * Math.sin(Math.PI * k)})`;
            s.style.color = on ? '#fcd34d' : '';
            s.style.textShadow = on ? '0 0 1.5cqw rgba(252,211,77,0.9)' : '';
        });
    }));
};

// 「関内バックギャモンの会で始めよう」の背景の夜景の光を、ランダムにきらめかせる（TODO-076）。
// 光の位置は、bg-karena.jpg（1600×1200）の窓の外のビルの明かりを画像から拾った座標。SVG の viewBox を画像と
// 同じにして slice で敷くと、object-cover（中央）と同じ切り方になるので、幅を変えても明かりからずれない
const KARENA_LIGHTS = [[1143,49],[797,56],[845,80],[1155,95],[813,103],[1071,112],[840,120],[996,127],[1088,140],[1171,153],[996,162],[844,178],[566,188],[1118,193],[486,195],[580,238],[1138,267],[597,274],[214,276],[320,278],[267,286],[1040,292],[549,305],[237,320],[1070,345],[191,346],[550,348],[633,349],[116,360],[212,387],[180,390],[829,398],[570,402],[645,405],[600,407],[500,409],[228,410],[190,419],[219,438],[621,445],[663,445],[282,450],[8,457],[240,465],[174,476],[292,480],[638,482],[261,492],[766,492],[605,493],[227,494],[15,499],[311,501],[703,526],[285,535],[239,536],[670,540],[420,541],[12,543],[202,543],[63,557],[617,563],[263,564],[343,568],[383,575],[3,577],[224,579],[420,583],[87,584],[302,585],[454,587],[340,601],[47,612],[421,613],[260,624],[372,638],[222,639],[38,661],[204,665],[494,665],[318,670],[241,673],[78,675],[448,675],[277,684],[396,693],[44,762],[113,763],[82,773],[131,798]];
const karenaLights = `
        <svg id="karena-lights" viewBox="0 0 1600 1200" preserveAspectRatio="xMidYMid slice" class="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
            <defs><radialGradient id="karena-glow"><stop offset="0" stop-color="#fff"/><stop offset="0.35" stop-color="#fef3c7" stop-opacity="0.8"/><stop offset="1" stop-color="#fde68a" stop-opacity="0"/></radialGradient></defs>
            ${KARENA_LIGHTS.map(([x, y]) => `<g transform="translate(${x} ${y})"><g opacity="0"><circle r="20" fill="url(#karena-glow)"/><path d="M -34 0 H 34 M 0 -34 V 34" stroke="#fff" stroke-width="3" stroke-linecap="round"/></g></g>`).join('')}
        </svg>`;
const KARENA_MAX = 3;  // 同時に光る数
const karenaTwinkle = () => {
    const svg = document.getElementById('karena-lights');
    if (!svg || svg.dataset.running) return;
    svg.dataset.running = '1';
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;  // 動きを減らす設定なら光らせない
    const lights = [...svg.querySelectorAll('g > g')];
    const box = svg.parentElement;
    const hit = (r, b) => r.right > b.left && r.left < b.right && r.bottom > b.top && r.top < b.bottom;
    let active = 0;
    const tick = () => {
        if (!svg.isConnected) return;
        if (active < KARENA_MAX) {
            // 切られて見えない明かりと、見出し・箇条書き・QR の札に重なる明かりは使わない。見出しは箱が横幅いっぱいなので、
            // 文字の範囲で見る。重なりは光らせるたびに見るので、幅を変えても効く
            const area = svg.getBoundingClientRect();
            const title = document.createRange();
            title.selectNodeContents(box.querySelector('h2'));
            const blocks = [title, ...box.querySelectorAll('ul, a')].map((e) => e.getBoundingClientRect());
            const free = lights.filter((g) => {
                if (g.getAnimations().length) return false;
                const r = g.getBoundingClientRect();
                const x = (r.left + r.right) / 2, y = (r.top + r.bottom) / 2;
                return x > area.left && x < area.right && y > area.top && y < area.bottom && !blocks.some((b) => hit(r, b));
            });
            if (free.length) {
                active++;
                free[Math.floor(Math.random() * free.length)].animate([
                    { opacity: 0, transform: 'scale(0.3) rotate(0deg)' },
                    { opacity: 1, transform: 'scale(1) rotate(20deg)' },
                    { opacity: 0, transform: 'scale(0.3) rotate(40deg)' },
                ], { duration: 900 + Math.random() * 900, easing: 'ease-in-out' }).onfinish = () => active--;
            }
        }
        setTimeout(tick, 150 + Math.random() * 600);
    };
    tick();
};

// 「世界中でプレーされている」: 写真を冒頭から 1 枚ずつ置き、数字を 0 から「約 3 億人」を読むところまでかけて数え上げる
// （TODO-079）。秒は Online TTS で測った（archives/agents/TODO-079/tts-cues.js）
const WORLD_COUNT = 0.3, WORLD_COUNT_LEN = 8;  // 写真と一緒に数え始め、「約 3 億人」を読む 8.3 秒で 3 億にする（TODO-091）
const worldPlay = () => {
    cueDrop(document.getElementById('world-photos'));
    cueSay(document.getElementById('world-say'), 19.2);
    const n = document.getElementById('world-count');
    narrationClock(n, (t) => {
        n.textContent = `${+(3 * ease(t, WORLD_COUNT, WORLD_COUNT_LEN)).toFixed(1)}億`;
    });
};

// 表紙: タイトルの下の線を伸ばし、札のダイスを転がして止める（TODO-082）。飾りなのでナレーションには合わせない。
// 表示してすぐ動くと気付きにくいので、少し遅らせてゆっくり動かす（TODO-091）
const coverPlay = () => {
    const line = document.getElementById('cover-line');
    if (!line || line.dataset.running || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    line.dataset.running = '1';
    line.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: 1800, delay: 1000, easing: 'ease-out', fill: 'backwards' });
    document.getElementById('cover-dice').animate([{ transform: 'translateX(-4cqw) rotate(-720deg)', opacity: 0 }, { transform: 'none', opacity: 1 }],
        { duration: 2200, delay: 700, easing: 'cubic-bezier(0.2, 0.8, 0.3, 1)', fill: 'backwards' });
};

// 傾けた写真 1 枚（「世界中でプレーされている」用。TODO-025。国名は出さない。TODO-034）
const world = (src, alt, pos, deg, cue) => `
    <div data-cue="${cue}" class="absolute ${pos} bg-slate-50 p-[0.45cqw] rounded-sm shadow-2xl shadow-slate-950/80" style="transform: rotate(${deg}deg);">
        <img src="images/${src}" alt="${alt}" class="w-full aspect-[4/3] object-cover">
    </div>`;

// 魅力②の 1 枚分。後ろの席からも読めるよう、文字を大きくして 3 行に分ける（TODO-064）。
// 上に場面の絵を置く。絵は 3:2 に揃えて、はみ出た所は切る（TODO-065）
const step = (color, src, alt, text, say) => `
    <div data-say="${say}" class="flex flex-col rounded-2xl bg-gradient-to-b from-${color}-950/85 to-slate-900/80 backdrop-blur-sm border border-${color}-500/40 p-[0.8cqw] pb-[1.4cqw] shadow-lg shadow-${color}-900/20">
        <img src="images/${src}" alt="${alt}" class="w-full aspect-[3/2] object-cover rounded-xl border border-${color}-400/40">
        <div class="font-bold text-slate-100 leading-snug mt-auto pt-[1cqw]" style="font-size: 3.2cqw;">${text}</div>
    </div>`;
// 魅力①の図。②の絵・③の写真と違う形にするため、線画で描く（TODO-067）。色は currentColor
const easyFig = {
    // 3 行だけのメモと電球。覚えることが少なく、すぐ分かることを表す
    rules: `
        <rect x="10" y="8" width="58" height="62" rx="5" fill="currentColor" fill-opacity="0.12"/>
        <path d="M 19 24 L 23 28 L 30 20 M 36 24 H 58 M 19 40 L 23 44 L 30 36 M 36 40 H 58 M 19 56 L 23 60 L 30 52 M 36 56 H 58"/>
        <path d="M 84 46 C 84 40 76 36 76 27 A 14 14 0 0 1 104 27 C 104 36 96 40 96 46 Z" fill="currentColor" fill-opacity="0.35"/>
        <path d="M 85 51 H 95 M 87 56 H 93 M 90 4 V 0 M 74 11 L 71 8 M 106 11 L 109 8 M 67 27 H 63 M 113 27 H 117"/>`,
    // 12〜3 時の 15 分だけを塗った時計
    time: `
        <path d="M 60 40 V 8 A 32 32 0 0 1 92 40 Z" fill="currentColor" fill-opacity="0.35" stroke="none"/>
        <circle cx="60" cy="40" r="32"/>
        <path d="M 60 40 V 14 M 60 40 H 84"/>
        <circle cx="60" cy="40" r="2.5" fill="currentColor"/>`,
    // 100 度ほど開いたケース。立てた蓋と手前の盤の両方に三角が見え、蓋の上の縁に取っ手
    board: `
        <path d="M 22 46 L 108 46 L 112 10 L 26 10 Z" fill="currentColor" fill-opacity="0.12"/>
        <path d="M 26 10 L 29 7 H 115 L 112 10 M 115 7 L 111 43 L 108 46" fill="currentColor" fill-opacity="0.2"/>
        <path d="M 63 7 V 3 Q 63 1 65 1 H 75 Q 77 1 77 3 V 7"/>
        <path d="M 10 60 H 96 L 108 46 H 22 Z" fill="currentColor" fill-opacity="0.12"/>
        <path d="M 10 60 V 67 H 96 V 60 M 96 67 L 108 53 V 46" fill="currentColor" fill-opacity="0.2"/>
        <path d="M 65 46 L 69 10 M 53 60 L 65 46"/>
        <g fill="currentColor" fill-opacity="0.45" stroke="none">
            <path d="M 31 10 L 39 10 L 35 22 Z M 43 10 L 51 10 L 47 22 Z M 55 10 L 63 10 L 59 22 Z M 74 10 L 82 10 L 78 22 Z M 86 10 L 94 10 L 90 22 Z M 98 10 L 106 10 L 102 22 Z"/>
            <path d="M 26 46 L 34 46 L 31 34 Z M 38 46 L 46 46 L 43 34 Z M 50 46 L 58 46 L 55 34 Z M 70 46 L 78 46 L 75 34 Z M 82 46 L 90 46 L 87 34 Z M 94 46 L 102 46 L 99 34 Z"/>
            <path d="M 13 60 L 23 60 L 22 53 Z M 27 60 L 37 60 L 36 53 Z M 41 60 L 51 60 L 50 53 Z M 60 60 L 70 60 L 70 53 Z M 72 60 L 82 60 L 82 53 Z M 84 60 L 94 60 L 94 53 Z"/>
            <path d="M 25 46 L 33 46 L 30 51 Z M 37 46 L 45 46 L 42 51 Z M 49 46 L 57 46 L 54 51 Z M 70 46 L 78 46 L 75 51 Z M 82 46 L 90 46 L 87 51 Z M 94 46 L 102 46 L 99 51 Z"/></g>
        <g fill="currentColor" stroke="none"><ellipse cx="30" cy="56" rx="3.5" ry="2.3"/><ellipse cx="78" cy="56" rx="3.5" ry="2.3"/></g>
        <ellipse cx="44" cy="50" rx="3.2" ry="2.1"/><ellipse cx="90" cy="50" rx="3.2" ry="2.1"/>`,
};
// 魅力①の 1 枚分: 図・見出し・大きな数字・一言（TODO-028、TODO-067）
const easy = (color, fig, icon, label, big, note, say) => `
    <div data-say="${say}" class="rounded-2xl bg-gradient-to-b from-${color}-950/85 to-slate-900/80 backdrop-blur-sm border border-${color}-500/40 px-[1cqw] py-[1.8cqw] shadow-lg shadow-${color}-900/20">
        <svg viewBox="0 0 120 76" class="mx-auto mb-[1cqw] h-[9cqw] text-${color}-300" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${easyFig[fig]}</svg>
        <div class="flex items-center justify-center gap-[0.8cqw] text-slate-200 font-bold" style="font-size: 2.1cqw;"><i class="fa-solid ${icon} text-${color}-300"></i>${label}</div>
        <div class="font-extrabold text-${color}-300 leading-none mt-[1.2cqw] h-[7cqw] flex items-center justify-center" style="font-size: 7cqw;">${big}</div>
        <div class="text-slate-200 font-medium mt-[1.2cqw]" style="font-size: 1.8cqw;">${note}</div>
    </div>`;

// 選手の紹介カード（写真の枠・名前・優勝した年・一言）。写真と年を大きく見せる（TODO-026）
const pro = (photo, name, years, note, say) => `
    <div data-say="${say}" class="flex items-center gap-[1.6cqw] rounded-2xl bg-slate-900/80 border border-lime-500/40 p-[1.4cqw] shadow-lg shadow-lime-900/20">
        <div class="shrink-0 w-[17cqw] h-[23cqw] rounded-xl overflow-hidden border border-slate-600">${photo}</div>
        <div class="min-w-0">
            <div class="font-bold text-slate-50 whitespace-nowrap" style="font-size: 3.1cqw;">${name}<span class="text-slate-400 font-medium" style="font-size: 1.7cqw;"> プロ</span></div>
            <div class="text-slate-200 font-medium mt-[1cqw] flex items-center gap-[0.6cqw]" style="font-size: 2cqw;"><i class="fa-solid fa-trophy text-amber-300"></i>世界選手権 優勝</div>
            <div data-say-pop class="origin-left transition-[color,text-shadow] duration-300 font-extrabold text-lime-300 leading-tight whitespace-nowrap" style="font-size: 3.6cqw;">${years.join('<span class="text-slate-500 font-bold">・</span>')}</div>
            <div class="text-amber-300 font-bold mt-[1cqw] leading-snug" style="font-size: 1.8cqw;">${note}</div>
        </div>
    </div>`;

// 背景に画像を敷いた 1 枚。見出しは player.html と同じ書式。
// 見出しは上に固定し、中身だけを残りの高さの真ん中に置く（TODO-031）。
// 暗い画像は opacity を上げる。CC BY の画像は credit にクレジットを渡す。creditLeft でクレジットを左下に置く。写真に重なるので、地を敷いて明るい字にする（TODO-068）
// overlay は背景の上、中身の下に重ねる（TODO-076）。brightness は、もとの写真が暗い背景を明るくする（TODO-085）
const bgSlide = (slide, src, alt, body, { opacity = 50, credit = '', creditLeft = false, overlay = '', brightness = 1 } = {}) => `
    <div class="relative h-full overflow-hidden">
        <img src="images/${src}" alt="${alt}" class="absolute inset-0 w-full h-full object-cover" style="opacity: ${opacity / 100}; filter: brightness(${brightness});">
        <div class="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/25 to-slate-950/45"></div>
        ${overlay}
        <div class="relative flex flex-col h-full px-[3cqw] pt-[2.4cqw] pb-[2.6cqw]">
            <h2 class="shrink-0 font-bold text-sky-300 mb-[1.5cqw] flex items-center gap-[1cqw] drop-shadow-[0_2px_6px_rgba(2,6,23,0.9)]" style="font-size: 3.2cqw;"><i class="fa-solid ${slide.icon} text-lime-400"></i> ${slide.title}</h2>
            <div class="flex-1 min-h-0 flex flex-col justify-center">
                ${body}
            </div>
        </div>
        ${credit ? `<div class="absolute ${creditLeft ? 'left-[1.2cqw] text-slate-300 bg-slate-950/70 px-[0.6cqw] rounded' : 'right-[1.2cqw] text-slate-500'} bottom-[0.8cqw]" style="font-size: 1.1cqw;">${credit}</div>` : ''}
    </div>`;

const slideData = [
    // ── 表紙 ──
    {
        title: '表紙',
        duration: 6,
        narration: 'バックギャモンのススメ。5000年遊ばれてきた、世界のボードゲームを紹介します。',
        render: function() { setTimeout(coverPlay);
            return `
                <div class="relative h-full flex flex-col justify-center items-center text-center px-[5cqw] overflow-hidden">
                    <img src="images/bg-cover.jpg" alt="黒と木目のボードに載ったダイスとダブリングキューブ" class="absolute inset-0 w-full h-full object-cover opacity-[0.45]" style="filter: brightness(1.9);">
                    <div class="absolute inset-0 bg-slate-950/40"></div>
                    <div class="absolute right-[1.2cqw] bottom-[0.8cqw] text-slate-500" style="font-size: 1.1cqw;">背景: Clint Budd (CC BY 2.0)／Wikimedia Commons</div>
                    <!-- 版はタグに合わせて手で書き換える（TODO-040） -->
                    <div class="absolute left-[1.2cqw] bottom-[0.8cqw] text-slate-500" style="font-size: 1.1cqw;">v1.0.0</div>
                    <div class="absolute -top-[18cqw] -left-[10cqw] w-[45cqw] h-[45cqw] rounded-full bg-sky-500/20 blur-[6cqw]"></div>
                    <div class="absolute -bottom-[20cqw] -right-[8cqw] w-[40cqw] h-[40cqw] rounded-full bg-lime-500/20 blur-[6cqw]"></div>
                    <div class="relative">
                        <div class="inline-flex items-center gap-[0.8cqw] rounded-full border border-lime-400/40 bg-lime-400/10 px-[1.8cqw] py-[0.5cqw] text-lime-300 font-bold tracking-widest" style="font-size: 1.7cqw;">
                            <i id="cover-dice" class="fa-solid fa-dice"></i> BACKGAMMON
                        </div>
                        <h1 class="font-extrabold leading-tight mt-[1.8cqw]" style="font-size: 6cqw;">
                            <span class="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-slate-50 to-lime-300">バックギャモンのススメ</span>
                        </h1>
                        <div id="cover-line" class="mx-auto mt-[2cqw] h-[0.35cqw] w-[18cqw] rounded-full bg-gradient-to-r from-sky-400 to-lime-400"></div>
                        <p class="text-slate-50 font-bold mt-[2cqw] drop-shadow-[0_2px_6px_rgba(2,6,23,0.9)]" style="font-size: 3cqw;">
                            <span class="text-lime-300">5000 年</span>遊ばれてきた、世界のボードゲーム
                        </p>
                        <p class="text-slate-200 font-medium mt-[2.4cqw]" style="font-size: 2cqw;">
                            <!-- 公式サイトへのリンク。クリックを再生・一時停止に伝えない（TODO-041） -->
                            <a href="https://kannaibg.wixsite.com/kannai-backgammon" target="_blank" rel="noopener" onclick="event.stopPropagation()" class="no-underline">関内バックギャモンの会</a>
                        </p>
                        <p class="text-slate-400 mt-[0.3cqw]" style="font-size: 1.3cqw;">
                            横浜市中区 なか区民活動センター登録団体
                        </p>
                    </div>
                </div>
            `;
        },
    },

    // ── バックギャモンとは（大きなポイントだけ。出典は archives/agents/TODO-020/research-report.md） ──
    {
        title: 'バックギャモンとは',
        icon: 'fa-circle-question',
        duration: 13,
        narration: '対戦型のすごろくのようなものです。ダイスを2個振って、15個の駒を進め、全部ゴールさせたら勝ちです。振り出しに戻したり、壁で妨害したりして、駆け引きしながら競います。',
        render: function() { setTimeout(() => { rulesBattle(); cueSay(document.getElementById('rules-say'), 13.2); }); return bgSlide(this, 'bg-cover.jpg', '黒と木目のボードに載ったダイスとダブリングキューブ', `
            <div class="flex items-center gap-[2.4cqw]">
                <!-- 盤の写真に、駒の進む向きを重ねる。白は右上 → 左 → 右下のゴール（緑）、
                     茶色は右下 → 左 → 右上のゴール（オレンジ）。参考の動画のように線の先ごと伸ばし（TODO-071。先は駒の絵。TODO-096）、
                     U 字の上でぶつかって戦わせる（TODO-072。動きは rulesBattle）。U 字は入れ子に 3 本（TODO-096） -->
                <figure class="relative m-0 shrink-0 w-[44cqw]">
                    <img src="images/bg-rules-board.jpg" alt="真上から見た、初期配置のバックギャモンの盤" class="w-full aspect-[3/2] object-cover rounded-xl border border-slate-600 shadow-2xl shadow-slate-950/70">
                    <svg id="rules-svg" viewBox="0 0 1130 750" class="absolute inset-0 w-full h-full" aria-hidden="true">
                        ${RULES_TRACKS.map((k) => `
                        <path id="rules-track-${k}" d="${rulesTrack(k)}" fill="none"/>
                        ${rulesArrow('white', k, '#a3e635')}
                        ${rulesArrow('brown', k, '#fb923c')}
                        <g id="rules-sparks-${k}"></g>`).join('')}
                    </svg>
                    <div class="absolute right-[0.4cqw] top-[0.6cqw] rounded-md bg-orange-400 px-[0.7cqw] py-[0.2cqw] font-bold text-slate-950" style="font-size: 1.5cqw;">ゴール</div>
                    <div class="absolute right-[0.4cqw] bottom-[0.6cqw] rounded-md bg-lime-400 px-[0.7cqw] py-[0.2cqw] font-bold text-slate-950" style="font-size: 1.5cqw;">ゴール</div>
                    <figcaption class="text-slate-300 mt-[0.5cqw] text-center" style="font-size: 1.3cqw;">駒が進む向き（<span class="text-lime-300">白</span>と<span class="text-orange-300">茶色</span>は逆向き）</figcaption>
                </figure>
                <div id="rules-say" class="flex-1 flex flex-col gap-[1cqw]">
                    <!-- 知らない人にまず「すごろく」と伝える（TODO-053） -->
                    <p class="m-0 font-black text-amber-300 leading-none drop-shadow-[0_2px_6px_rgba(2,6,23,0.9)]" style="font-size: 4.4cqw;">対戦型のすごろく！</p>
                    ${rule('fa-dice', 'ダイスを <span class="text-lime-300">2 個</span>振る', 2.6)}
                    ${rule('fa-flag-checkered', '<span class="text-lime-300">15 個</span>のコマを全部ゴールさせたら勝ち', 4)}
                    <!-- 特徴的なルールなので、ほかの行と分けて目立たせる（TODO-053） -->
                    <div data-say="8" class="flex items-center gap-[1cqw] rounded-xl bg-amber-400/15 border-2 border-amber-400 px-[1.2cqw] py-[0.8cqw] shadow-lg shadow-slate-950/60">
                        <span class="shrink-0 grid place-items-center w-[3.4cqw] h-[3.4cqw] rounded-lg bg-amber-400/15 text-amber-300 border border-amber-400/60" style="font-size: 1.8cqw;"><i class="fa-solid fa-rotate-left"></i></span>
                        <p class="m-0 text-amber-200 font-bold leading-snug" style="font-size: 2cqw;">振り出しに戻したり、壁で妨害したりして、<br>駆け引きしながらゴールを目指す</p>
                    </div>
                </div>
            </div>
        `, { opacity: 45, brightness: 2.7, credit: '盤: TaurusEmerald (CC BY-SA 4.0)、背景: Clint Budd (CC BY 2.0)／Wikimedia Commons' }); },
    },

    // ── 歴史 ──
    {
        title: 'バックギャモンの歴史は古い',
        icon: 'fa-landmark',
        duration: 18,
        narration: 'バックギャモンの歴史は古く、起源は太古の昔です。約5000年前の中東にも、似た遊びがありました。その後、古代ローマなどを経て、世界中に広がりました。日本にも、飛鳥時代には伝わっていて、日本書紀に記録があります。',
        render: function() { setTimeout(() => { historyGrow(); cueSay(document.getElementById('history-say'), 17.5); });
            return bgSlide(this, 'bg-worldmap.jpg', '古い世界地図（Hondius, 1630）', `
                        <div id="history-say" class="grid grid-cols-3 gap-[1.8cqw] items-start">
                            ${fig('bg-ur.jpg', '貝殻の象眼で花や目の模様を描いた 20 マスの盤と、丸い駒', 'ウルの王族の墓から出た盤<br>（紀元前 2600 年ごろ、イラク）', 2.1, 'object-center')}
                            ${fig('bg-spread.jpg', '中東から世界各地へ矢印が伸びる世界地図', '中東から世界へ', HISTORY_STEPS[0], 'object-center')}
                            ${fig('bg-nara.png', '盤を挟んで向かい合う二人の絵', '盤双六らしい盤を挟む二人<br>（江戸時代ごろの絵）', HISTORY_STEPS[1])}
                        </div>
                        <!-- 時間軸: 各図の真下に点。線は起源の点から始め、次の点の手前と右端に矢じり（TODO-066）。
                             線の左端 (100% - gap 2 つ) / 6 は、1 列目の中心。線はナレーションに合わせて伸ばす（TODO-073。動きは historyGrow） -->
                        <div class="relative mt-[1.2cqw]">
                            <div id="history-line" class="absolute left-[calc((100%-3.6cqw)/6)] right-[3.4cqw] top-1/2 -translate-y-1/2 h-[1.2cqw] bg-gradient-to-r from-sky-400 to-lime-400"></div>
                            <div data-history-head class="absolute right-0 top-1/2 -translate-y-1/2 w-[4cqw] h-[4.8cqw] bg-lime-400" style="clip-path: polygon(0 0, 100% 50%, 0 100%);"></div>
                            <div class="relative grid grid-cols-3 gap-[1.8cqw]">
                                ${['', 'bg-emerald-300', 'bg-lime-400'].map((arrow) => `
                                <div class="relative flex justify-center items-center">
                                    ${arrow ? `<div data-history-head class="absolute right-[calc(50%+2.3cqw)] w-[3.6cqw] h-[4.4cqw] ${arrow}" style="clip-path: polygon(0 0, 100% 50%, 0 100%);"></div>` : ''}
                                    <div data-history-dot class="w-[2.8cqw] h-[2.8cqw] rounded-full bg-lime-400 ring-[0.6cqw] ring-slate-950"></div>
                                </div>`).join('')}
                            </div>
                        </div>
                        <div class="grid grid-cols-3 gap-[1.8cqw] mt-[1.6cqw]">
                            ${cap('<b class="text-lime-300">太古の昔</b>に起源<br>（約 5,000 年前の中東）')}
                            ${cap('その後<br><b class="text-lime-300">世界中</b>に広がる')}
                            ${cap('日本にも<b class="text-lime-300">飛鳥時代</b>には<br>伝わっていた')}
                        </div>
            `, { credit: '写真: BabelStone（CC0）、地図: Natural Earth（CC0）／Wikimedia Commons' });
        },
    },

    // ── 世界中（「世界中に広がった」歴史を受けて、いまの世界へつなぐ。TODO-047） ──
    {
        title: '世界中でプレーされている',
        icon: 'fa-earth-asia',
        duration: 19,
        narration: 'そしていま、バックギャモンは世界中でプレーされています。日本バックギャモン協会によると、世界の遊戯人口は、約3億人と言われます。ヨーロッパやアメリカ、アジアなど、世界各地で国際大会が開かれ、モナコのモンテカルロでは、世界選手権も開かれています。',
        render: function() { setTimeout(worldPlay);
            return bgSlide(this, 'bg-nightearth.jpg', '夜の地球の世界地図（NASA）', `
            <!-- 数字は出典のあるものだけ。「3 億人」は協会の原文どおり遊戯人口（archives/agents/TODO-048/research-report.md）。
                 国際大会の開催地は archives/agents/TODO-046/research-report.md。モンテカルロは 2020 年に開かれていないので「毎年」と書かない -->
            <div class="grid grid-cols-5 gap-[1.8cqw] items-center">
                <!-- いろいろな国で遊ぶ様子を傾けて重ねる（TODO-025。出典は archives/agents/TODO-025/world-photos-report.md） -->
                <div id="world-photos" class="col-span-3 relative h-[31cqw]">
                    ${world('bg-world-iran.jpg', 'イランの路上で、2 人が台の上の盤で打つ写真', 'left-0 top-[0.5cqw] w-[19cqw]', -5, 0.3)}
                    ${world('bg-world-georgia.jpg', '公園のベンチで、年配の男性たちが打つ写真', 'left-[17.5cqw] top-0 w-[18cqw]', 4, 1)}
                    ${world('bg-world-tunisia.jpg', 'カフェで、緑の盤を囲む男性たちの写真', 'left-[34cqw] top-[1cqw] w-[18cqw]', -3, 1.7)}
                    ${world('bg-world-peru.jpg', '屋外のテーブルで、緑の盤を囲む男性たちの写真', 'left-[5cqw] top-[15.5cqw] w-[19cqw]', 3, 2.4)}
                    ${world('bg-crowd2.jpg', '大会の会場で、何組もが打つ写真', 'left-[26cqw] top-[16cqw] w-[20cqw]', -4, 3.1)}
                </div>
                <div id="world-say" class="col-span-2 space-y-[1.4cqw] text-center">
                    <div data-say="4" class="rounded-2xl bg-slate-900/80 border border-lime-500/40 p-[1.4cqw] shadow-lg shadow-lime-900/20">
                        <div class="text-slate-200 font-medium" style="font-size: 1.95cqw;">世界の遊戯人口</div>
                        <div class="font-extrabold leading-none text-transparent bg-clip-text bg-gradient-to-b from-lime-300 to-lime-500" style="font-size: 5cqw;"><span class="text-slate-400 font-bold" style="font-size: 1.9cqw;">約 </span><span id="world-count">3億</span><span class="text-slate-400 font-bold" style="font-size: 1.9cqw;"> 人</span></div>
                        <div class="text-slate-400 font-medium mt-[0.6cqw]" style="font-size: 1.4cqw;">日本バックギャモン協会による</div>
                    </div>
                    <div data-say="10.1" class="rounded-2xl bg-slate-900/80 border border-sky-500/40 p-[1.4cqw] shadow-lg shadow-slate-950/40">
                        <div class="text-slate-200 font-medium" style="font-size: 1.95cqw;">国際大会</div>
                        <div class="text-slate-400 font-medium mb-[0.6cqw]" style="font-size: 1.4cqw;">モナコをはじめ</div>
                        <div class="font-extrabold leading-none text-transparent bg-clip-text bg-gradient-to-b from-sky-300 to-sky-500" style="font-size: 5cqw;">世界各地で</div>
                    </div>
                </div>
            </div>
        `, { opacity: 100, brightness: 3.5, credit: '写真（一部切り出し）: Adam Jones、Marcin Konsek、Monaam Ben Fredj、Alex Proimos、Matěj Baťha（CC BY / BY-SA）／Wikimedia Commons' }); },
    },

    // ── 日本人の活躍（優勝歴は世界選手権だけ。出典は archives/agents/TODO-013/search-report.md） ──
    {
        title: '世界中で日本人が大活躍',
        icon: 'fa-trophy',
        duration: 23,
        narration: 'その世界選手権で、日本人が大活躍しています。望月正行プロは、日本人初の世界チャンピオンで、世界ランキングでも長年1位です。矢澤亜希子プロは、女性で世界初の2度優勝。テレビ番組にも出演しています。ほかにも、景山充人プロをはじめ、多くの日本人が世界ランキングの上位にいます。',
        render: function() { setTimeout(() => cueSay(document.getElementById('japan-say'), 23.3));
            return bgSlide(this, 'bg-japan-night.jpg', '宇宙から見た夜の日本列島（NASA）', `
            <div id="japan-say">
            <div class="grid grid-cols-2 gap-[2cqw]">
                ${pro('<img src="images/pro-mochizuki.jpg" alt="望月正行プロ" class="w-full h-full object-cover">',
                    '望月 正行', ['2009', '2021'], '日本人初の世界チャンピオン<br><span class="text-lime-300">世界ランキングで長年 1 位</span>', 4.1)}
                ${pro('<img src="images/pro-yazawa.jpg" alt="矢澤亜希子プロ" class="w-full h-full object-cover">',
                    '矢澤 亜希子', ['2014', '2018'], '女性で世界初の 2 回優勝<br><span class="text-lime-300">テレビ番組にも出演</span>', 10.8)}
            </div>
            <!-- 2 人のほかにも、今活躍している日本人がいる（Giants of Backgammon 2024 と World Backgammon Championship の一覧。TODO-033） -->
            <div data-say="17" class="mt-[1.6cqw] flex items-center justify-center gap-[1cqw] rounded-xl bg-slate-900/80 border border-amber-400/40 px-[1.6cqw] py-[1cqw] text-slate-100 font-medium" style="font-size: 1.9cqw;">
                <i class="fa-solid fa-medal text-amber-300"></i>
                <span class="leading-snug">ほかにも 世界ランキング上位に <b class="text-lime-300">景山 充人</b>・<b class="text-lime-300">上田 英明</b>・<b class="text-lime-300">横田 一稀</b><br>2024 年 女子の世界王者 <b class="text-lime-300">岡 美穂</b>（Miho Oka Macleod）</span>
            </div>
            </div>
        `, { opacity: 100, brightness: 3.5, credit: '写真（望月プロ）: Mamta1210（CC0）／Wikimedia Commons、写真（矢澤プロ）: 本人の X（@akikoyazawa）', creditLeft: true }); },
    },

    // ── 魅力（簡単で手軽・ゲームとしての面白さ・おしゃれの 3 枚） ──
    {
        title: '魅力① 簡単で手軽',
        icon: 'fa-feather-pointed',
        duration: 16,
        narration: 'バックギャモンの魅力、まずは簡単で手軽なことです。基本のルールはシンプルで、すぐに覚えられます。1ゲームは15分ほどと短いので、何局も続けて楽しめます。ボードは畳んで持ち運べるので、どこでも遊べます。',
        render: function() { setTimeout(() => cueSay(document.getElementById('easy-say'), 16.4));
            return bgSlide(this, 'bg-friends.jpg', '部屋のテーブルで、3 人が笑いながらバックギャモンを遊ぶ絵', `
            <!-- 大きな数字で「どう簡単か」を見せる（TODO-028） -->
            <div id="easy-say" class="grid grid-cols-3 gap-[1.8cqw] text-center">
                ${easy('sky', 'rules', 'fa-list-check', 'ルール', '<span style="font-size: 0.6em;">シンプル</span>', 'すぐに覚えられる', 4.1)}
                ${easy('lime', 'time', 'fa-stopwatch', '1 ゲーム', '<span style="font-size: 0.45em;">約 </span>15<span style="font-size: 0.45em;"> 分</span>', 'すき間の時間で遊べる', 7.7)}
                ${easy('amber', 'board', 'fa-suitcase', 'ボード', '<span style="font-size: 0.6em;">持ち運べる</span>', '畳んでどこでも', 12.6)}
            </div>
        `, { brightness: 1.4, credit: '背景: AI 生成（Gemini）' }); },
    },
    {
        title: '魅力② ゲームとしての面白さ',
        icon: 'fa-dice',
        duration: 24,
        narration: 'ゲームとしての主な魅力は次のとおりです。ダイスを使うので、運が良ければ、初心者でも上級者に勝つ可能性があります。相手の駒を振り出しに戻して、一気に逆転することもあります。戦略的な思考が必要で、奥が深いゲームです。そして、途中で「点数を2倍にしよう」と持ちかける、ダブルという駆け引きもあります。',
        render: function() { setTimeout(() => cueSay(document.getElementById('fun-say'), 23.7));
            return bgSlide(this, 'bg-feltdice.jpg', '緑のフェルトのボードに載った赤と白のダイスとダブリングキューブ', `
            <div id="fun-say" class="grid grid-cols-3 gap-[1.6cqw] text-center">
                ${step('amber', 'card-luck.jpg', 'ゾロ目に両手を上げて喜ぶ若い女性と、頭をかく年配の男性', 'ダイスの運で<br>初心者でも<br>上級者に勝てる', 3.2)}
                ${step('sky', 'card-strategy.jpg', 'パブで、あごに手を当てて盤を見つめる年配の男性と、次の手を示す光る矢印', '戦略的な<br>思考が必要で<br>奥が深い', 13.5)}
                ${step('rose', 'card-double.jpg', '「2」のキューブを掲げて笑う男性と、腕を組んで考え込む相手', '点数を 2 倍にする<br>「ダブル」の<br>駆け引き', 17.5)}
            </div>
        `, { brightness: 1.2, credit: '背景: Donald Olszewski (CC BY 4.0)／Wikimedia Commons、絵: AI 生成（Gemini）' }); },
    },
    {
        title: '魅力③ おしゃれ',
        icon: 'fa-wand-magic-sparkles',
        duration: 8,
        narration: '3つ目は、おしゃれなことです。カラフルでおしゃれなボードがたくさんあり、部屋に飾れる、インテリアのようなボードもあります。',
        render: function() { setTimeout(() => { cueDrop(document.getElementById('style-photos')); cueSay(document.getElementById('style-say'), 8.3); });
            // 背景は盤の三角（ポイント）をカラフルに並べた図案。盤の写真は手前に 3 枚あるので、背景では雰囲気だけを出す（TODO-087）
            return bgSlide(this, 'bg-points.svg', '', `
            <!-- 写真は右に傾けて重ね、文字はその手前に置く（重なってよい） -->
            <!-- 箇条書きを左、写真を右に置く。写真の箱は、空いている幅と高さの両方に収まる大きさにする。
                 全画面では高さが増え、箇条書きの文字は clamp の上限で止まるので、写真が大きくなる（TODO-091）。
                 写真の位置と幅は、その箱に対する割合で書く -->
            <figure id="style-photos" class="relative m-0 flex-1 min-h-0 flex flex-row-reverse items-stretch gap-[1cqw]">
                <div class="flex-1 min-w-0 flex items-center justify-end [container-type:size]">
                    <div class="relative w-[min(100cqw,141.2cqh)] aspect-[48/34]">
                        <!-- 4 枚を 2 段に、ばらけた角度で重ねる。角度は固定（TODO-089） -->
                        ${snap('bg-board1.jpg', '青と白の競技用のボード', 'right-[45.8%] top-[5.9%] w-[50%]', -8, 2.2)}
                        ${snap('bg-board4.jpg', '白い大理石のテーブルに置いた、寄木細工のボードとティーセット', 'right-[2.1%] top-0 w-[47.9%]', 6, 2.9)}
                        ${snap('bg-board2.jpg', 'オレンジの台に置いた白木のボード', 'right-[52.1%] bottom-[11.8%] w-[45.8%]', 4, 4.7)}
                        ${snap('bg-board3.jpg', 'ターコイズ色の古い木箱のボード', 'right-0 bottom-[16.2%] w-[50%]', -3, 5.4)}
                    </div>
                </div>
                <ul id="style-say" class="relative shrink-0 w-fit flex flex-col justify-center gap-[1.4cqw]">
                    ${li('fa-palette', '<span class="text-lime-300">カラフル</span>でおしゃれなボード', 2.2)}
                    ${li('fa-couch', '部屋に飾れる、<br><span class="text-lime-300">インテリア</span>のようなボードも', 4.7)}
                </ul>
            </figure>
            <!-- 写真のクレジットは右下に 2 行で置き、下の写真 2 枚はその分だけ上げる（TODO-074）。背景の図案の上でも読めるよう、地を敷く（TODO-087） -->
            <p class="absolute right-[1.2cqw] bottom-[0.8cqw] whitespace-nowrap text-right text-slate-300 bg-slate-950/70 px-[0.6cqw] rounded leading-snug" style="font-size: 1.1cqw;">写真（一部切り出し）: RG72 (CC BY 4.0)、Alper Çuğun (CC BY 2.0)、<br>Diligent (PD)／Wikimedia Commons、Denys Gromov／Pexels</p>
        `, { opacity: 70 }); },
    },

    // ── 会への誘い（中身は会の公式サイトから。日付は古くなるので載せない。TODO-021） ──
    {
        title: '関内バックギャモンの会で始めよう',
        icon: 'fa-handshake',
        duration: 27,
        narration: '日本では、知る人の少ないバックギャモンですが、関内バックギャモンの会に来れば、一緒に遊ぶ仲間がいます。初めての方には、遊び方を丁寧に教えます。月に2回ほど、主になか区民活動センターや、Kアリーナのバーで、お喋りしながら気軽に遊んでいます。お問い合わせは公式サイトを、最新情報はXをご覧ください。あなたも、バックギャモンを始めてみませんか。',
        // X の札の強調は 24 秒で終え、締めくくりの文では強調しない（TODO-084）
        // 背景は会で遊んでいる K-ARENA Bar の写真。おしゃれなバーで遊ぶ様子を見せる（TODO-068）。窓の外の夜景の明かりをきらめかせる（TODO-076）
        render: function() { setTimeout(() => { karenaTwinkle(); cueSay(document.getElementById('karena-say'), 24); });
            return bgSlide(this, 'bg-karena.jpg', '夜景が見える K アリーナのバーで、窓際のテーブルでバックギャモンを遊ぶ人たち', `
            <!-- 背景の夜景を見せるため、中身を下に寄せる。左下のボードが見えるよう、箇条書きは少し上げる（TODO-068） -->
            <div id="karena-say" class="mt-auto flex items-end gap-[2.4cqw]">
                <div class="flex-1 flex flex-col gap-[1.2cqw] mb-[6cqw]">
                    <ul class="flex flex-col gap-[0.6cqw]">
                        ${li('fa-seedling', '<span class="text-lime-300">初心者歓迎</span>。遊び方を丁寧に教えます', 7.6)}
                        ${li('fa-calendar-days', '<span class="text-lime-300">月 2 回</span>ほど、主に <span class="whitespace-nowrap text-lime-300">なか区民活動センター</span>や <span class="whitespace-nowrap"><span class="text-lime-300">Kアリーナ Bar 7</span> で</span>', 11.4)}
                        ${li('fa-comments', 'お喋りしながら<span class="text-lime-300">気軽に</span>交流', 16.8)}
                    </ul>
                </div>
                <!-- 札ごとリンク。上が公式サイト、下が X。クリックを再生・一時停止に伝えない（TODO-041、TODO-043）。
                     隣の QR を読み込まないよう、QR を大きくして札の間を離す（TODO-063、TODO-084） -->
                <div class="shrink-0 w-[29cqw] flex flex-col gap-[4cqw]">
                    ${qrCard('https://kannaibg.wixsite.com/kannai-backgammon', 'kannai-qr.png', '公式サイトの QR コード', 'お問い合わせは<br>公式サイトで', 'kannaibg.wixsite.com/<br>kannai-backgammon', 19.1)}
                    ${qrCard('https://x.com/lppcn5b6mw94np2', 'x-qr.png', 'X の QR コード', '最新情報は<br>X（旧 Twitter）で', 'x.com/<br>lppcn5b6mw94np2', 21.2)}
                </div>
            </div>
        `, { opacity: 90, credit: '背景: K-ARENA Bar での会の様子（写真: 関内バックギャモンの会）', creditLeft: true, overlay: karenaLights }); },
    },
];
