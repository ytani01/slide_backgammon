// YouTube 動画「バックギャモンのススメ」のスライド。template.js のテンプレートを使う。

const slidesConfig = {
    title: 'バックギャモンのススメ',
    heading: 'バックギャモンのススメ',
    summary: '関内バックギャモンの会による、バックギャモンの歴史と魅力の紹介',
    icon: 'fa-dice',
    rules: [
        [/中区/g, 'なかく'],
        [/関内/g, 'かんない'],
        [/奈良時代/g, 'ならじだい'],
        [/飛鳥時代/g, 'あすかじだい'],
        [/賭博/g, 'とばく'],
        [/禁止令/g, 'きんしれい'],
        [/駆け引き/g, 'かけひき'],
        [/3億人/g, 'さんおくにん'],
        [/望月正行/g, 'もちづきまさゆき'],
        [/矢澤亜希子/g, 'やざわあきこ'],
        [/盤双六/g, 'ばんすごろく'],
        [/日本書紀/g, 'にほんしょき'],
        [/持統天皇/g, 'じとうてんのう'],
        [/伏見城御制法/g, 'ふしみじょうごせいほう'],
        [/2人/g, 'ふたり'],
    ],
};

// 時間軸の画像 1 枚と、何の絵かの小さな説明。時代の説明は時間軸の点の下に並べる（TODO-024）
const fig = (src, alt, label) => `
    <figure class="m-0 flex flex-col items-center">
        <img src="images/${src}" alt="${alt}" class="w-full h-[17cqw] object-cover object-top rounded-xl border border-slate-700 shadow-xl shadow-slate-950/60">
        <figcaption class="text-slate-300 mt-[0.4cqw] text-center leading-tight" style="font-size: clamp(0.6rem, 1.2cqw, 0.9rem);">${label}</figcaption>
    </figure>`;
const cap = (html) => `
    <div class="text-center text-slate-100 font-medium leading-snug" style="font-size: clamp(0.9rem, 2cqw, 1.5rem);">${html}</div>`;

// 箇条書きの 1 行。template.js の「箇条書き」より大きく、写真と重なっても読めるよう地を濃くした（TODO-018）
const li = (icon, html) => `
    <li class="flex items-center gap-[1.4cqw] rounded-xl bg-slate-950/75 backdrop-blur-sm border border-lime-500/40 px-[1.6cqw] py-[1.1cqw] shadow-lg shadow-slate-950/60">
        <span class="shrink-0 grid place-items-center w-[4.4cqw] h-[4.4cqw] rounded-lg bg-lime-500/15 text-lime-400 border border-lime-500/40" style="font-size: clamp(0.85rem, 2.4cqw, 1.8rem);"><i class="fa-solid ${icon}"></i></span>
        <span class="text-slate-50 font-bold leading-snug" style="font-size: clamp(0.8rem, 2.8cqw, 2.1rem);">${html}</span>
    </li>`;

// ルールの 1 行。li() より小さく、4 行を写真の横に並べる（TODO-020）
const rule = (icon, html) => `
    <div class="flex items-center gap-[1cqw] rounded-xl bg-slate-950/75 border border-lime-500/40 px-[1.2cqw] py-[0.8cqw] shadow-lg shadow-slate-950/60">
        <span class="shrink-0 grid place-items-center w-[3.4cqw] h-[3.4cqw] rounded-lg bg-lime-500/15 text-lime-400 border border-lime-500/40" style="font-size: clamp(0.75rem, 1.8cqw, 1.35rem);"><i class="fa-solid ${icon}"></i></span>
        <span class="text-slate-50 font-bold leading-snug" style="font-size: clamp(0.75rem, 2cqw, 1.5rem);">${html}</span>
    </div>`;

// 白い縁を付けて傾けた写真 1 枚。pos は位置と幅の class、deg は傾き
const snap = (src, alt, pos, deg) => `
    <img src="images/${src}" alt="${alt}" class="absolute ${pos} h-auto bg-slate-50 p-[0.5cqw] rounded-sm shadow-2xl shadow-slate-950/80" style="transform: rotate(${deg}deg);">`;

// 流れの 1 箱（template.js の「図解」と同じ書式）
const step = (color, icon, text) => `
    <div class="flex-1 rounded-2xl bg-gradient-to-b from-${color}-950/85 to-slate-900/80 backdrop-blur-sm border border-${color}-500/40 px-[1cqw] py-[1.2cqw] shadow-lg shadow-${color}-900/20">
        <div class="mx-auto grid place-items-center w-[4.6cqw] h-[4.6cqw] rounded-full bg-${color}-500/15 border border-${color}-400/40 text-${color}-300" style="font-size: clamp(1.1rem, 2.4cqw, 1.8rem);"><i class="fa-solid ${icon}"></i></div>
        <div class="font-bold text-slate-100 mt-[0.8cqw]" style="font-size: clamp(0.9rem, 2.0cqw, 1.5rem);">${text}</div>
    </div>`;
// 魅力①の 1 枚分: 見出し・大きな数字・一言（TODO-028）
const easy = (color, icon, label, big, note) => `
    <div class="rounded-2xl bg-gradient-to-b from-${color}-950/85 to-slate-900/80 backdrop-blur-sm border border-${color}-500/40 px-[1cqw] py-[1.8cqw] shadow-lg shadow-${color}-900/20">
        <div class="flex items-center justify-center gap-[0.8cqw] text-slate-200 font-bold" style="font-size: clamp(0.9rem, 2.1cqw, 1.6rem);"><i class="fa-solid ${icon} text-${color}-300"></i>${label}</div>
        <div class="font-extrabold text-${color}-300 leading-none mt-[1.2cqw] h-[7cqw] flex items-center justify-center" style="font-size: clamp(2.4rem, 7cqw, 5.2rem);">${big}</div>
        <div class="text-slate-200 font-medium mt-[1.2cqw]" style="font-size: clamp(0.8rem, 1.8cqw, 1.35rem);">${note}</div>
    </div>`;
const arrow = `
    <div class="flex items-center justify-center shrink-0">
        <i class="fa-solid fa-arrow-right text-lime-400" style="font-size: clamp(1.1rem, 2.4cqw, 1.8rem);"></i>
    </div>`;

// 選手の紹介カード（写真の枠・名前・優勝した年・一言）。写真と年を大きく見せる（TODO-026）
const pro = (photo, name, years, note) => `
    <div class="flex items-center gap-[1.6cqw] rounded-2xl bg-slate-900/80 border border-lime-500/40 p-[1.4cqw] shadow-lg shadow-lime-900/20">
        <div class="shrink-0 w-[17cqw] h-[23cqw] rounded-xl overflow-hidden border border-slate-600">${photo}</div>
        <div class="min-w-0">
            <div class="font-bold text-slate-50 whitespace-nowrap" style="font-size: clamp(1.1rem, 3.1cqw, 2.3rem);">${name}<span class="text-slate-400 font-medium" style="font-size: clamp(0.8rem, 1.7cqw, 1.25rem);"> プロ</span></div>
            <div class="text-slate-200 font-medium mt-[1cqw] flex items-center gap-[0.6cqw]" style="font-size: clamp(0.9rem, 2cqw, 1.5rem);"><i class="fa-solid fa-trophy text-amber-300"></i>世界選手権 優勝</div>
            <div class="font-extrabold text-lime-300 leading-tight whitespace-nowrap" style="font-size: clamp(1.4rem, 3.6cqw, 2.7rem);">${years.join('<span class="text-slate-500 font-bold">・</span>')}</div>
            <div class="text-amber-300 font-bold mt-[1cqw] leading-snug" style="font-size: clamp(0.8rem, 1.8cqw, 1.35rem);">${note}</div>
        </div>
    </div>`;

// 背景に画像を敷いた 1 枚。見出しは player.html と同じ書式。
// 見出しは上に固定し、中身だけを残りの高さの真ん中に置く（TODO-031）。
// 暗い画像は opacity を上げる。CC BY の画像は credit にクレジットを渡す
const bgSlide = (slide, src, alt, body, { opacity = 50, credit = '' } = {}) => `
    <div class="relative h-full overflow-hidden">
        <img src="images/${src}" alt="${alt}" class="absolute inset-0 w-full h-full object-cover" style="opacity: ${opacity / 100};">
        <div class="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/25 to-slate-950/45"></div>
        <div class="relative flex flex-col h-full px-[3cqw] pt-[2.4cqw] pb-[2.6cqw]">
            <h2 class="shrink-0 font-bold text-sky-300 mb-[1.5cqw] flex items-center gap-[1cqw] drop-shadow-[0_2px_6px_rgba(2,6,23,0.9)]" style="font-size: clamp(1.4rem, 3.2cqw, 2.5rem);"><i class="fa-solid ${slide.icon} text-lime-400"></i> ${slide.title}</h2>
            <div class="flex-1 min-h-0 flex flex-col justify-center">
                ${body}
            </div>
        </div>
        ${credit ? `<div class="absolute right-[1.2cqw] bottom-[0.8cqw] text-slate-500" style="font-size: clamp(0.6rem, 1.1cqw, 0.8rem);">${credit}</div>` : ''}
    </div>`;

const slideData = [
    // ── 表紙 ──
    {
        title: '表紙',
        duration: 9,
        narration: 'バックギャモンのススメ。5000年遊ばれてきた、世界のボードゲームを紹介します。お届けするのは、関内バックギャモンの会です。',
        render: function() {
            return `
                <div class="relative h-full flex flex-col justify-center items-center text-center px-[5cqw] overflow-hidden">
                    <img src="images/bg-cover.jpg" alt="黒と木目のボードに載ったダイスとダブリングキューブ" class="absolute inset-0 w-full h-full object-cover opacity-[0.45]">
                    <div class="absolute inset-0 bg-slate-950/40"></div>
                    <div class="absolute right-[1.2cqw] bottom-[0.8cqw] text-slate-500" style="font-size: clamp(0.6rem, 1.1cqw, 0.8rem);">背景: Clint Budd (CC BY 2.0)／Wikimedia Commons</div>
                    <div class="absolute -top-[18cqw] -left-[10cqw] w-[45cqw] h-[45cqw] rounded-full bg-sky-500/20 blur-[6cqw]"></div>
                    <div class="absolute -bottom-[20cqw] -right-[8cqw] w-[40cqw] h-[40cqw] rounded-full bg-lime-500/20 blur-[6cqw]"></div>
                    <div class="relative">
                        <div class="inline-flex items-center gap-[0.8cqw] rounded-full border border-lime-400/40 bg-lime-400/10 px-[1.8cqw] py-[0.5cqw] text-lime-300 font-bold tracking-widest" style="font-size: clamp(0.8rem, 1.7cqw, 1.2rem);">
                            <i class="fa-solid fa-dice"></i> BACKGAMMON
                        </div>
                        <h1 class="font-extrabold leading-tight mt-[1.8cqw]" style="font-size: clamp(2rem, 6cqw, 4.6rem);">
                            <span class="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-slate-50 to-lime-300">バックギャモンのススメ</span>
                        </h1>
                        <div class="mx-auto mt-[2cqw] h-[0.35cqw] w-[18cqw] rounded-full bg-gradient-to-r from-sky-400 to-lime-400"></div>
                        <p class="text-slate-50 font-bold mt-[2cqw] drop-shadow-[0_2px_6px_rgba(2,6,23,0.9)]" style="font-size: clamp(1.1rem, 3cqw, 2.3rem);">
                            <span class="text-lime-300">5000 年</span>遊ばれてきた、世界のボードゲーム
                        </p>
                        <p class="text-slate-200 font-medium mt-[2.4cqw]" style="font-size: clamp(0.9rem, 2cqw, 1.5rem);">
                            関内バックギャモンの会
                        </p>
                        <p class="text-slate-400 mt-[0.3cqw]" style="font-size: clamp(0.65rem, 1.3cqw, 1rem);">
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
        duration: 22,
        narration: 'バックギャモンは、2人で遊ぶ、すごろくの仲間です。日本で昔遊ばれた盤双六も、同じ系統の遊びです。交互にダイスを2個振って、出た目の数だけ自分の駒を進めます。15個の駒を、先に全部ゴールさせた方が勝ちです。相手の駒が1個だけのところに止まると、その駒を振り出しに戻せます。',
        render: function() { return bgSlide(this, 'bg-cover.jpg', '黒と木目のボードに載ったダイスとダブリングキューブ', `
            <div class="flex items-center gap-[2.4cqw]">
                <!-- 盤の写真に、白の駒の進む向きを重ねる（右上 → 左 → 右下のゴール） -->
                <figure class="relative m-0 shrink-0 w-[44cqw]">
                    <img src="images/bg-rules-board.jpg" alt="真上から見た、初期配置のバックギャモンの盤" class="w-full h-auto rounded-xl border border-slate-600 shadow-2xl shadow-slate-950/70">
                    <svg viewBox="0 0 1130 750" class="absolute inset-0 w-full h-full" aria-hidden="true">
                        <defs><marker id="rules-head" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#a3e635"/></marker></defs>
                        <path d="M 960 335 L 170 335 Q 95 335 95 375 Q 95 415 170 415 L 1040 415" fill="none" stroke="#a3e635" stroke-width="22" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#rules-head)" opacity="0.95"/>
                    </svg>
                    <div class="absolute right-[0.4cqw] bottom-[0.6cqw] rounded-md bg-lime-400 px-[0.7cqw] py-[0.2cqw] font-bold text-slate-950" style="font-size: clamp(0.7rem, 1.5cqw, 1.1rem);">ゴール</div>
                    <figcaption class="text-slate-300 mt-[0.5cqw] text-center" style="font-size: clamp(0.65rem, 1.3cqw, 1rem);">白の駒が進む向き（茶色は逆向き）</figcaption>
                </figure>
                <div class="flex-1 flex flex-col gap-[1cqw]">
                    <div class="self-start rounded-full border border-amber-400/50 bg-amber-400/10 px-[1.4cqw] py-[0.4cqw] text-amber-200 font-bold" style="font-size: clamp(0.8rem, 1.8cqw, 1.35rem);">すごろくの仲間（日本の「盤双六」も同じ系統）</div>
                    ${rule('fa-user-group', '<span class="text-lime-300">2 人</span>で、ダイス 2 個を交互に振る')}
                    ${rule('fa-shoe-prints', '出た目の数だけ、<span class="text-lime-300">自分の駒</span>を進める')}
                    ${rule('fa-flag-checkered', '<span class="text-lime-300">15 個</span>を先に全部ゴールさせたら勝ち')}
                    ${rule('fa-rotate-left', '1 個だけの相手の駒は、<span class="text-lime-300">振り出しに戻せる</span>')}
                </div>
            </div>
        `, { opacity: 35, credit: '盤: TaurusEmerald (CC BY-SA 4.0)、背景: Clint Budd (CC BY 2.0)／Wikimedia Commons' }); },
    },

    // ── 歴史 ──
    {
        title: 'バックギャモンの歴史は古い',
        icon: 'fa-landmark',
        duration: 15,
        narration: 'バックギャモンの歴史は古く、約5000年前から、中東には似た遊びがありました。日本でも、飛鳥時代には遊ばれていて、日本書紀に記録があります。中世には、ヨーロッパでも遊ばれていました。',
        render: function() {
            return bgSlide(this, 'bg-worldmap.jpg', '古い世界地図（Hondius, 1630）', `
                        <div class="grid grid-cols-3 gap-[1.8cqw] items-end">
                            ${fig('bg-ur.jpg', '象眼細工の盤と駒（ウルの王のゲーム）', 'ウルの王のゲーム（紀元前 2600 年ごろ）')}
                            ${fig('bg-nara.png', '盤を挟んで向かい合う二人の絵', '盤双六らしい盤を挟む二人（江戸時代ごろの絵）')}
                            ${fig('bg-medieval.png', '盤を挟んで座る二人と、杯を掲げる人の写本の挿絵', '『カルミナ・ブラーナ』の挿絵（1230 年ごろ）')}
                        </div>
                        <!-- 時間軸: 各図の真下に点、右端に矢じり -->
                        <div class="relative mt-[1.2cqw]">
                            <div class="absolute left-0 right-[2.6cqw] top-1/2 -translate-y-1/2 h-[1.2cqw] rounded-l-full bg-gradient-to-r from-sky-400 to-lime-400"></div>
                            <div class="absolute right-0 top-1/2 -translate-y-1/2 w-[3.2cqw] h-[3.8cqw] bg-lime-400" style="clip-path: polygon(0 0, 100% 50%, 0 100%);"></div>
                            <div class="relative grid grid-cols-3 gap-[1.8cqw]">
                                ${'<div class="justify-self-center w-[2.8cqw] h-[2.8cqw] rounded-full bg-lime-400 ring-[0.6cqw] ring-slate-950"></div>'.repeat(3)}
                            </div>
                        </div>
                        <div class="grid grid-cols-3 gap-[1.8cqw] mt-[1cqw]">
                            ${cap('<b class="text-lime-300">約 5,000 年前</b>から<br>中東に似た遊び')}
                            ${cap('日本でも<b class="text-lime-300">飛鳥時代</b>には<br>遊ばれていた')}
                            ${cap('中世には<br><b class="text-lime-300">ヨーロッパ</b>でも')}
                        </div>
            `, { credit: '絵: 大英博物館の展示（CC0）、Codex Buranus（PD）／Wikimedia Commons' });
        },
    },

    // ── 日本での不遇の歴史（日本の話だけ。TODO-027）。「知る人が少ない」を次の「世界中」と最後の会への誘いで受ける ──
    {
        title: '日本での不遇の歴史',
        icon: 'fa-ban',
        duration: 22,
        narration: '日本では、不遇の歴史もあります。簡単で面白いので大流行しましたが、賭博が横行し、689年に持統天皇が禁止令を出し、江戸時代の1605年にも伏見城御制法で禁止されるなど、たびたび禁止されました。いまの日本では、世界に比べて、知る人の少ないゲームになってしまいました。',
        render: function() { return bgSlide(this, 'bg-hikone.jpg', '彦根屏風の背景に描かれた山水の屏風', `
            <div class="flex items-stretch justify-center gap-[1cqw] text-center">
                ${step('sky', 'fa-face-smile', '簡単で面白い')}
                ${arrow}
                ${step('lime', 'fa-people-group', '大流行')}
                ${arrow}
                ${step('amber', 'fa-coins', '賭博の横行')}
                ${arrow}
                ${step('rose', 'fa-ban', '禁止令<br><span class="inline-block mt-[0.4cqw] text-slate-300 font-medium" style="font-size: 0.72em; line-height: 1.35;">689 年 持統天皇<br>1605 年 伏見城御制法 など</span>')}
            </div>
            <!-- 日本の絵 2 枚は左に傾けて重ね、日本の話を右に置く（TODO-019） -->
            <div class="relative mt-[1.6cqw] h-[26cqw]">
                ${snap('bg-edo.png', '日本の彩色画', 'left-[1cqw] top-0 w-[19cqw]', -4)}
                ${snap('bg-print.png', '日本の白黒の版画', 'left-[18cqw] top-0 w-[15.5cqw]', 5)}
                <blockquote class="absolute right-0 top-1/2 -translate-y-1/2 w-[50cqw] rounded-2xl bg-slate-950/60 border border-slate-700/70 border-l-4 border-l-sky-500/70 px-[2.4cqw] py-[1.8cqw]">
                    <p class="text-slate-100 font-medium leading-normal" style="font-size: clamp(1rem, 2.6cqw, 1.95rem);">
                        <i class="fa-solid fa-circle-info text-lime-400"></i> いまの日本では、<br>世界に比べて<br><span class="text-lime-300 font-bold">知る人の少ない</span>ゲームに
                    </p>
                </blockquote>
            </div>
        `, { credit: '背景: 彦根屏風（PD）／Wikimedia Commons' }); },
    },

    // ── 世界中（「日本では」を受けて「でも世界では」とつなぐ） ──
    {
        title: '世界中でプレーされている',
        icon: 'fa-earth-asia',
        duration: 17,
        narration: 'でも、世界に目を向けると、バックギャモンは世界中でプレーされています。日本バックギャモン協会によると、世界で約3億人が遊んでいると言われます。1979年からは毎年、モナコのモンテカルロで世界選手権が開かれています。',
        render: function() { return bgSlide(this, 'bg-nightearth.jpg', '夜の地球の世界地図（NASA）', `
            <!-- 数字は出典のあるものだけ（archives/agents/TODO-025/research-report.md） -->
            <div class="grid grid-cols-5 gap-[1.8cqw] items-center">
                <figure class="col-span-3 m-0">
                    <img src="images/bg-crowd2.jpg" alt="大会の会場で、何組もがバックギャモンを打っている写真" class="w-full h-[28cqw] object-cover object-[center_75%] rounded-xl border border-slate-600 shadow-xl shadow-slate-950/60">
                    <figcaption class="text-slate-300 mt-[0.5cqw]" style="font-size: clamp(0.65rem, 1.3cqw, 1rem);">チェコの大会の会場（2008 年）</figcaption>
                </figure>
                <div class="col-span-2 space-y-[1.4cqw] text-center">
                    <div class="rounded-2xl bg-slate-900/80 border border-lime-500/40 p-[1.4cqw] shadow-lg shadow-lime-900/20 ring-1 ring-lime-400/20">
                        <div class="text-slate-200 font-medium" style="font-size: clamp(0.9rem, 1.95cqw, 1.4rem);">世界で遊ぶ人</div>
                        <div class="font-extrabold leading-none text-transparent bg-clip-text bg-gradient-to-b from-lime-300 to-lime-500" style="font-size: clamp(2rem, 5cqw, 3.8rem);">約 3<span class="text-slate-400 font-bold" style="font-size: clamp(0.9rem, 1.9cqw, 1.4rem);"> 億人</span></div>
                        <div class="text-slate-400 font-medium mt-[0.6cqw]" style="font-size: clamp(0.7rem, 1.4cqw, 1.05rem);">日本バックギャモン協会による</div>
                    </div>
                    <div class="rounded-2xl bg-slate-900/80 border border-sky-500/40 p-[1.4cqw] shadow-lg shadow-slate-950/40">
                        <div class="text-slate-200 font-medium" style="font-size: clamp(0.9rem, 1.95cqw, 1.4rem);">世界選手権</div>
                        <div class="font-extrabold leading-none text-transparent bg-clip-text bg-gradient-to-b from-sky-300 to-sky-500" style="font-size: clamp(2rem, 5cqw, 3.8rem);">1979<span class="text-slate-400 font-bold" style="font-size: clamp(0.9rem, 1.9cqw, 1.4rem);"> 年から</span></div>
                        <div class="text-slate-400 font-medium mt-[0.6cqw]" style="font-size: clamp(0.7rem, 1.4cqw, 1.05rem);">毎年 モナコ・モンテカルロで</div>
                    </div>
                </div>
            </div>
        `, { opacity: 70, credit: '写真: Matěj Baťha (CC BY-SA 3.0)／Wikimedia Commons' }); },
    },

    // ── 日本人の活躍（優勝歴は世界選手権だけ。出典は archives/agents/TODO-013/search-report.md） ──
    {
        title: '世界中で日本人が大活躍',
        icon: 'fa-trophy',
        duration: 22,
        narration: 'その世界選手権で、日本人が大活躍しています。望月正行プロは、2009年に日本人で初めて世界チャンピオンになり、2021年にも優勝しました。矢澤亜希子プロは、2014年と2018年に世界選手権で優勝し、女性として世界で初めて、2度の優勝を果たしました。',
        render: function() { return bgSlide(this, 'bg-japan-night.jpg', '宇宙から見た夜の日本列島（NASA）', `
            <div class="grid grid-cols-2 gap-[2cqw]">
                ${pro('<img src="images/pro-mochizuki.jpg" alt="望月正行プロ" class="w-full h-full object-cover">',
                    '望月 正行', ['2009', '2021'], '日本人初の<br>世界チャンピオン')}
                ${pro('<img src="images/pro-yazawa.jpg" alt="矢澤亜希子プロ" class="w-full h-full object-cover">',
                    '矢澤 亜希子', ['2014', '2018'], '女性で世界初の<br>2 回優勝')}
            </div>
        `, { opacity: 60, credit: '写真（矢澤プロ）: 本人の X（@akikoyazawa）' }); },
    },

    // ── 魅力（簡単で手軽・ゲームとしての面白さ・おしゃれで身近の 3 枚） ──
    {
        title: '魅力① 簡単で手軽',
        icon: 'fa-feather-pointed',
        duration: 15,
        narration: 'バックギャモンの魅力、まずは簡単で手軽なことです。基本のルールは、最初に見た4つだけで、すぐに覚えられます。1ゲームは15分ほど。ボードは畳んで持ち運べるので、どこでも遊べます。',
        render: function() { return bgSlide(this, 'bg-portable.jpg', '木のテーブルに置いた持ち運び用のバックギャモン', `
            <!-- 大きな数字で「どう簡単か」を見せる（TODO-028） -->
            <div class="grid grid-cols-3 gap-[1.8cqw] text-center">
                ${easy('sky', 'fa-list-check', 'ルール', '4<span style="font-size: 0.45em;"> つ</span>', '基本は最初に見た 4 つだけ')}
                ${easy('lime', 'fa-stopwatch', '1 ゲーム', '15<span style="font-size: 0.45em;"> 分</span>', 'すき間の時間で遊べる')}
                ${easy('amber', 'fa-suitcase', 'ボード', '<span style="font-size: 0.6em;">持ち運べる</span>', '畳んでどこでも')}
            </div>
        `, { credit: '背景: Takuro Iwabuchi (CC BY 2.0)／Wikimedia Commons' }); },
    },
    {
        title: '魅力② ゲームとしての面白さ',
        icon: 'fa-dice',
        duration: 18,
        narration: 'ゲームとしての面白さもあります。ダイスを使うので、運が良ければ、初心者でも上級者に勝つ可能性があります。途中で「点数を2倍にしよう」と持ちかける、ダブルという駆け引きもあります。そして、戦略的な思考が必要で、奥が深いゲームです。',
        render: function() { return bgSlide(this, 'bg-feltdice.jpg', '緑のフェルトのボードに載った赤と白のダイスとダブリングキューブ', `
            <div class="grid grid-cols-3 gap-[1.6cqw] text-center">
                ${step('amber', 'fa-dice', 'ダイスの運で<br>初心者でも上級者に勝てる')}
                ${step('rose', 'fa-arrow-trend-up', '点数を 2 倍にする<br>「ダブル」の駆け引き')}
                ${step('sky', 'fa-chess', '戦略的な思考が必要で<br>奥が深い')}
            </div>
        `, { credit: '背景: Donald Olszewski (CC BY 4.0)／Wikimedia Commons' }); },
    },
    {
        title: '魅力③ おしゃれで身近',
        icon: 'fa-wand-magic-sparkles',
        duration: 13,
        narration: '3つ目は、おしゃれで身近なことです。カラフルでおしゃれなボードがたくさんあり、部屋に飾れる、インテリアのようなボードもあります。スマホのアプリを使えば、いつでも世界中の人と対戦できます。',
        render: function() { return bgSlide(this, 'bg-cafe.jpg', 'パリのカフェでバックギャモンを打つ客の絵（Jean Béraud, 1908 年頃）', `
            <!-- 写真は右に傾けて重ね、文字はその手前に置く（重なってよい） -->
            <figure class="relative m-0 h-[34cqw]">
                ${snap('bg-board1.jpg', '青と白の競技用のボード', 'right-[0.5cqw] top-0 w-[38cqw]', 4)}
                ${snap('bg-board2.jpg', 'オレンジの台に置いた白木のボード', 'right-[23cqw] bottom-[0.5cqw] w-[24cqw]', -6)}
                ${snap('bg-board3.jpg', 'ターコイズ色の古い木箱のボード', 'right-0 bottom-[1cqw] w-[25cqw]', 5)}
                <ul class="relative w-[54cqw] h-full flex flex-col justify-center gap-[1.4cqw]">
                    ${li('fa-palette', '<span class="text-lime-300">カラフル</span>でおしゃれなボード')}
                    ${li('fa-couch', '部屋に飾れる、<br><span class="text-lime-300">インテリア</span>のようなボードも')}
                    ${li('fa-mobile-screen', '<span class="text-lime-300">スマホのアプリ</span>で、<br>いつでも世界中の人と対戦')}
                </ul>
                <figcaption class="absolute left-0 bottom-0 max-w-[44cqw] text-slate-500 leading-snug" style="font-size: clamp(0.6rem, 1.1cqw, 0.8rem);">写真（一部切り出し）: RG72 (CC BY 4.0)、Alper Çuğun (CC BY 2.0)、Diligent (PD)／Wikimedia Commons</figcaption>
            </figure>
        `, { opacity: 55, credit: '背景: Jean Béraud「Backgammon at the Café」(PD)／Wikimedia Commons' }); },
    },

    // ── 会への誘い（中身は会の公式サイトから。日付は古くなるので載せない。TODO-021） ──
    {
        title: '関内バックギャモンの会で始めよう',
        icon: 'fa-handshake',
        duration: 21,
        narration: '日本では、まだ知る人の少ないバックギャモンですが、関内バックギャモンの会に来れば、一緒に遊ぶ仲間がいます。初めての方には、遊び方を丁寧に教えます。月に2回ほど、主になか区民活動センターで、お喋りしながら気軽に遊んでいます。日程と申し込みは、公式サイトをご覧ください。',
        render: function() { return bgSlide(this, 'bg-kannai.jpg', '窓の光が差すテーブルに置いた木のバックギャモンのボード', `
            <div class="flex items-center gap-[2.4cqw]">
                <ul class="flex-1 flex flex-col gap-[1.2cqw]">
                    ${li('fa-seedling', '<span class="text-lime-300">初心者歓迎</span>。遊び方を丁寧に教えます')}
                    ${li('fa-calendar-days', '<span class="text-lime-300">月 2 回</span>ほど、主に なか区民活動センターで')}
                    ${li('fa-comments', 'お喋りしながら<span class="text-lime-300">気軽に</span>交流')}
                    ${li('fa-coins', '参加費は <span class="text-lime-300">100 円〜</span>の投げ銭<span class="text-slate-400 font-medium" style="font-size: 0.7em;">（ボード持参なら無料）</span>')}
                </ul>
                <div class="shrink-0 w-[23cqw] rounded-2xl bg-slate-50 p-[1.4cqw] text-center shadow-2xl shadow-slate-950/80">
                    <img src="images/kannai-qr.png" alt="公式サイトの QR コード" class="w-full h-auto" style="image-rendering: pixelated;">
                    <div class="text-slate-900 font-bold mt-[0.6cqw]" style="font-size: clamp(0.8rem, 1.8cqw, 1.35rem);">日程・申し込みは<br>公式サイトで</div>
                    <div class="text-slate-600 font-medium mt-[0.4cqw] break-all leading-tight" style="font-size: clamp(0.55rem, 1.05cqw, 0.8rem);">kannaibg.wixsite.com/<br>kannai-backgammon</div>
                </div>
            </div>
        `, { credit: '背景: 関内バックギャモンの会 公式サイト' }); },
    },
];
