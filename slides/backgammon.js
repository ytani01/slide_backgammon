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

// 時間軸の画像 1 枚と、何の絵かの小さな説明。時代の説明は時間軸の点の下に並べる（TODO-024）
const fig = (src, alt, label, pos = 'object-top') => `
    <figure class="m-0 flex flex-col items-center">
        <img src="images/${src}" alt="${alt}" class="w-full h-[17cqw] object-cover ${pos} rounded-xl border border-slate-700 shadow-xl shadow-slate-950/60">
        <figcaption class="text-slate-300 mt-[0.4cqw] text-center leading-tight" style="font-size: clamp(0.6rem, 1.2cqw, 0.9rem);">${label}</figcaption>
    </figure>`;
const cap = (html) => `
    <div class="text-center text-slate-100 font-medium leading-snug" style="font-size: clamp(0.9rem, 2cqw, 1.5rem);">${html}</div>`;

// 箇条書きの 1 行。template.js の「箇条書き」より大きく、写真と重なっても読めるよう地を濃くした（TODO-018）。
// py は行が多いスライドで上下の余白を詰めるため（TODO-051）
const li = (icon, html, py = '1.1cqw') => `
    <li class="flex items-center gap-[1.4cqw] rounded-xl bg-slate-950/75 backdrop-blur-sm border border-lime-500/40 px-[1.6cqw] py-[${py}] shadow-lg shadow-slate-950/60">
        <span class="shrink-0 grid place-items-center w-[4.4cqw] h-[4.4cqw] rounded-lg bg-lime-500/15 text-lime-400 border border-lime-500/40" style="font-size: clamp(0.85rem, 2.4cqw, 1.8rem);"><i class="fa-solid ${icon}"></i></span>
        <span class="text-slate-50 font-bold leading-snug" style="font-size: clamp(0.8rem, 2.8cqw, 2.1rem);">${html}</span>
    </li>`;

// QR コードの札。札ごと url へのリンクで、QR を左、文字を右に置く（TODO-043）
const qrCard = (url, img, alt, label, shown) => `
    <a href="${url}" target="_blank" rel="noopener" onclick="event.stopPropagation()" class="flex items-center gap-[1cqw] no-underline rounded-2xl bg-slate-50 p-[1cqw] shadow-2xl shadow-slate-950/80">
        <img src="images/${img}" alt="${alt}" class="shrink-0 w-[15cqw] h-auto" style="image-rendering: pixelated;">
        <div class="min-w-0">
            <div class="text-slate-900 font-bold leading-snug" style="font-size: clamp(0.7rem, 1.6cqw, 1.2rem);">${label}</div>
            <div class="text-slate-600 font-medium mt-[0.4cqw] break-all leading-tight" style="font-size: clamp(0.5rem, 0.95cqw, 0.72rem);">${shown}</div>
        </div>
    </a>`;

// ルールの 1 行。li() より小さく、4 行を写真の横に並べる（TODO-020）
const rule = (icon, html) => `
    <div class="flex items-center gap-[1cqw] rounded-xl bg-slate-950/75 border border-lime-500/40 px-[1.2cqw] py-[0.8cqw] shadow-lg shadow-slate-950/60">
        <span class="shrink-0 grid place-items-center w-[3.4cqw] h-[3.4cqw] rounded-lg bg-lime-500/15 text-lime-400 border border-lime-500/40" style="font-size: clamp(0.75rem, 1.8cqw, 1.35rem);"><i class="fa-solid ${icon}"></i></span>
        <span class="text-slate-50 font-bold leading-snug" style="font-size: clamp(0.75rem, 2cqw, 1.5rem);">${html}</span>
    </div>`;

// 白い縁を付けて傾けた写真 1 枚。pos は位置と幅の class、deg は傾き
const snap = (src, alt, pos, deg) => `
    <img src="images/${src}" alt="${alt}" class="absolute ${pos} h-auto bg-slate-50 p-[0.5cqw] rounded-sm shadow-2xl shadow-slate-950/80" style="transform: rotate(${deg}deg);">`;

// 傾けた写真 1 枚（「世界中でプレーされている」用。TODO-025。国名は出さない。TODO-034）
const world = (src, alt, pos, deg) => `
    <div class="absolute ${pos} bg-slate-50 p-[0.45cqw] rounded-sm shadow-2xl shadow-slate-950/80" style="transform: rotate(${deg}deg);">
        <img src="images/${src}" alt="${alt}" class="w-full aspect-[4/3] object-cover">
    </div>`;

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

// 大逆転の絵の 1 コマ: 一言と、自分・相手の進み具合の棒（TODO-055）
const race = (icon, color, text, me, you) => `
    <div class="flex-1 min-w-0 flex flex-col items-center gap-[0.5cqw] rounded-lg bg-slate-800/70 border border-slate-600/60 px-[0.6cqw] py-[0.7cqw]">
        <div class="font-bold text-${color}-300 whitespace-nowrap" style="font-size: clamp(0.6rem, 1.5cqw, 1.1rem);"><i class="fa-solid ${icon}"></i> ${text}</div>
        ${[['自分', 'bg-lime-400', me], ['相手', 'bg-rose-400', you]].map(([who, bar, w]) => `
        <div class="w-full flex items-center gap-[0.4cqw] text-slate-300" style="font-size: clamp(0.5rem, 1.1cqw, 0.8rem);">
            <span class="shrink-0">${who}</span>
            <div class="flex-1 h-[0.9cqw] rounded-full bg-slate-700"><div class="h-full rounded-full ${bar}" style="width: ${w}%;"></div></div>
        </div>`).join('')}
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
                    <!-- 版はタグに合わせて手で書き換える（TODO-040） -->
                    <div class="absolute left-[1.2cqw] bottom-[0.8cqw] text-slate-500" style="font-size: clamp(0.6rem, 1.1cqw, 0.8rem);">v0.3.6</div>
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
                            <!-- 公式サイトへのリンク。クリックを再生・一時停止に伝えない（TODO-041） -->
                            <a href="https://kannaibg.wixsite.com/kannai-backgammon" target="_blank" rel="noopener" onclick="event.stopPropagation()" class="no-underline">関内バックギャモンの会</a>
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
        duration: 14,
        narration: '対戦型のすごろくのようなものです。ダイスを2個振って、15個の駒を進め、全部ゴールさせたら勝ちです。振り出しに戻したり、壁で妨害したりして、駆け引きしながら競います。',
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
                    <!-- 知らない人にまず「すごろく」と伝える（TODO-053） -->
                    <p class="m-0 font-black text-amber-300 leading-none drop-shadow-[0_2px_6px_rgba(2,6,23,0.9)]" style="font-size: clamp(1.6rem, 4.4cqw, 3.4rem);">対戦型のすごろく！</p>
                    ${rule('fa-dice', 'ダイスを <span class="text-lime-300">2 個</span>振る')}
                    ${rule('fa-flag-checkered', '<span class="text-lime-300">15 個</span>のコマを全部ゴールさせたら勝ち')}
                    <!-- 特徴的なルールなので、ほかの行と分けて目立たせる（TODO-053） -->
                    <div class="flex items-center gap-[1cqw] rounded-xl bg-amber-400/15 border-2 border-amber-400 px-[1.2cqw] py-[0.8cqw] shadow-lg shadow-slate-950/60">
                        <span class="shrink-0 grid place-items-center w-[3.4cqw] h-[3.4cqw] rounded-lg bg-amber-400/15 text-amber-300 border border-amber-400/60" style="font-size: clamp(0.75rem, 1.8cqw, 1.35rem);"><i class="fa-solid fa-rotate-left"></i></span>
                        <p class="m-0 text-amber-200 font-bold leading-snug" style="font-size: clamp(0.75rem, 2cqw, 1.5rem);">振り出しに戻したり、壁で妨害したりして、<br>駆け引きしながらゴールを目指す</p>
                    </div>
                </div>
            </div>
        `, { opacity: 35, credit: '盤: TaurusEmerald (CC BY-SA 4.0)、背景: Clint Budd (CC BY 2.0)／Wikimedia Commons' }); },
    },

    // ── 歴史 ──
    {
        title: 'バックギャモンの歴史は古い',
        icon: 'fa-landmark',
        duration: 18,
        narration: 'バックギャモンの歴史は古く、起源は太古の昔です。約5000年前の中東にも、似た遊びがありました。その後、古代ローマなどを経て、世界中に広がりました。日本にも、飛鳥時代には伝わっていて、日本書紀に記録があります。',
        render: function() {
            return bgSlide(this, 'bg-worldmap.jpg', '古い世界地図（Hondius, 1630）', `
                        <div class="grid grid-cols-3 gap-[1.8cqw] items-end">
                            ${fig('bg-nard.jpg', 'ペルシャの写本の、盤を挟んでナルドを打つ人々', 'ペルシャの「ナルド」（15 世紀の絵）')}
                            ${fig('bg-spread.jpg', '中東から世界各地へ矢印が伸びる世界地図', '中東から世界へ伝わった道（おおよそ）', 'object-center')}
                            ${fig('bg-nara.png', '盤を挟んで向かい合う二人の絵', '盤双六らしい盤を挟む二人（江戸時代ごろの絵）')}
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
                            ${cap('<b class="text-lime-300">太古の昔</b>に起源<br>（約 5,000 年前の中東）')}
                            ${cap('その後<br><b class="text-lime-300">世界中</b>に広がる')}
                            ${cap('日本にも<b class="text-lime-300">飛鳥時代</b>には<br>伝わっていた')}
                        </div>
            `, { credit: '絵: バイスングルの『シャー・ナーメ』（PD）、地図: Natural Earth（CC0）／Wikimedia Commons' });
        },
    },

    // ── 世界中（「世界中に広がった」歴史を受けて、いまの世界へつなぐ。TODO-047） ──
    {
        title: '世界中でプレーされている',
        icon: 'fa-earth-asia',
        duration: 19,
        narration: 'そしていま、バックギャモンは世界中でプレーされています。日本バックギャモン協会によると、世界の遊戯人口は、約3億人と言われます。ヨーロッパやアメリカ、アジアなど、世界各地で国際大会が開かれ、モナコのモンテカルロでは、世界選手権も開かれています。',
        render: function() { return bgSlide(this, 'bg-nightearth.jpg', '夜の地球の世界地図（NASA）', `
            <!-- 数字は出典のあるものだけ。「3 億人」は協会の原文どおり遊戯人口（archives/agents/TODO-048/research-report.md）。
                 国際大会の開催地は archives/agents/TODO-046/research-report.md。モンテカルロは 2020 年に開かれていないので「毎年」と書かない -->
            <div class="grid grid-cols-5 gap-[1.8cqw] items-center">
                <!-- いろいろな国で遊ぶ様子を傾けて重ねる（TODO-025。出典は archives/agents/TODO-025/world-photos-report.md） -->
                <div class="col-span-3 relative h-[31cqw]">
                    ${world('bg-world-iran.jpg', 'イランの路上で、2 人が台の上の盤で打つ写真', 'left-0 top-[0.5cqw] w-[19cqw]', -5)}
                    ${world('bg-world-georgia.jpg', '公園のベンチで、年配の男性たちが打つ写真', 'left-[17.5cqw] top-0 w-[18cqw]', 4)}
                    ${world('bg-world-tunisia.jpg', 'カフェで、緑の盤を囲む男性たちの写真', 'left-[34cqw] top-[1cqw] w-[18cqw]', -3)}
                    ${world('bg-world-peru.jpg', '屋外のテーブルで、緑の盤を囲む男性たちの写真', 'left-[5cqw] top-[15.5cqw] w-[19cqw]', 3)}
                    ${world('bg-crowd2.jpg', '大会の会場で、何組もが打つ写真', 'left-[26cqw] top-[16cqw] w-[20cqw]', -4)}
                </div>
                <div class="col-span-2 space-y-[1.4cqw] text-center">
                    <div class="rounded-2xl bg-slate-900/80 border border-lime-500/40 p-[1.4cqw] shadow-lg shadow-lime-900/20 ring-1 ring-lime-400/20">
                        <div class="text-slate-200 font-medium" style="font-size: clamp(0.9rem, 1.95cqw, 1.4rem);">世界の遊戯人口</div>
                        <div class="font-extrabold leading-none text-transparent bg-clip-text bg-gradient-to-b from-lime-300 to-lime-500" style="font-size: clamp(2rem, 5cqw, 3.8rem);"><span class="text-slate-400 font-bold" style="font-size: clamp(0.9rem, 1.9cqw, 1.4rem);">約 </span>3億<span class="text-slate-400 font-bold" style="font-size: clamp(0.9rem, 1.9cqw, 1.4rem);"> 人</span></div>
                        <div class="text-slate-400 font-medium mt-[0.6cqw]" style="font-size: clamp(0.7rem, 1.4cqw, 1.05rem);">日本バックギャモン協会による</div>
                    </div>
                    <div class="rounded-2xl bg-slate-900/80 border border-sky-500/40 p-[1.4cqw] shadow-lg shadow-slate-950/40">
                        <div class="text-slate-200 font-medium" style="font-size: clamp(0.9rem, 1.95cqw, 1.4rem);">国際大会</div>
                        <div class="text-slate-400 font-medium mb-[0.6cqw]" style="font-size: clamp(0.7rem, 1.4cqw, 1.05rem);">モナコをはじめ</div>
                        <div class="font-extrabold leading-none text-transparent bg-clip-text bg-gradient-to-b from-sky-300 to-sky-500" style="font-size: clamp(2rem, 5cqw, 3.8rem);">世界各地で</div>
                    </div>
                </div>
            </div>
        `, { opacity: 70, credit: '写真（一部切り出し）: Adam Jones、Marcin Konsek、Monaam Ben Fredj、Alex Proimos、Matěj Baťha（CC BY / BY-SA）／Wikimedia Commons' }); },
    },

    // ── 日本人の活躍（優勝歴は世界選手権だけ。出典は archives/agents/TODO-013/search-report.md） ──
    {
        title: '世界中で日本人が大活躍',
        icon: 'fa-trophy',
        duration: 23,
        narration: 'その世界選手権で、日本人が大活躍しています。望月正行プロは、日本人初の世界チャンピオンで、世界ランキングでも長年1位です。矢澤亜希子プロは、女性で世界初の2度優勝。テレビ番組にも出演しています。ほかにも、景山充人プロをはじめ、多くの日本人が世界ランキングの上位にいます。',
        render: function() { return bgSlide(this, 'bg-japan-night.jpg', '宇宙から見た夜の日本列島（NASA）', `
            <div class="grid grid-cols-2 gap-[2cqw]">
                ${pro('<img src="images/pro-mochizuki.jpg" alt="望月正行プロ" class="w-full h-full object-cover">',
                    '望月 正行', ['2009', '2021'], '日本人初の世界チャンピオン<br><span class="text-lime-300">世界ランキングで長年 1 位</span>')}
                ${pro('<img src="images/pro-yazawa.jpg" alt="矢澤亜希子プロ" class="w-full h-full object-cover">',
                    '矢澤 亜希子', ['2014', '2018'], '女性で世界初の 2 回優勝<br><span class="text-lime-300">テレビ番組にも出演</span>')}
            </div>
            <!-- 2 人のほかにも、今活躍している日本人がいる（Giants of Backgammon 2024 と World Backgammon Championship の一覧。TODO-033） -->
            <div class="mt-[1.6cqw] flex items-center justify-center gap-[1cqw] rounded-xl bg-slate-900/80 border border-amber-400/40 px-[1.6cqw] py-[1cqw] text-slate-100 font-medium" style="font-size: clamp(0.85rem, 1.9cqw, 1.45rem);">
                <i class="fa-solid fa-medal text-amber-300"></i>
                <span class="leading-snug">ほかにも 世界ランキング上位に <b class="text-lime-300">景山 充人</b>・<b class="text-lime-300">上田 英明</b>・<b class="text-lime-300">横田 一稀</b><br>2024 年 女子の世界王者 <b class="text-lime-300">岡 美穂</b>（Miho Oka Macleod）</span>
            </div>
        `, { opacity: 60, credit: '写真（矢澤プロ）: 本人の X（@akikoyazawa）' }); },
    },

    // ── 魅力（簡単で手軽・ゲームとしての面白さ・おしゃれで身近の 3 枚） ──
    {
        title: '魅力① 簡単で手軽',
        icon: 'fa-feather-pointed',
        duration: 13,
        narration: 'バックギャモンの魅力、まずは簡単で手軽なことです。基本のルールはシンプルで、すぐに覚えられます。1ゲームは15分ほど。ボードは畳んで持ち運べるので、どこでも遊べます。',
        render: function() { return bgSlide(this, 'bg-friends.jpg', '部屋のテーブルで、3 人が笑いながらバックギャモンを遊ぶ絵', `
            <!-- 大きな数字で「どう簡単か」を見せる（TODO-028） -->
            <div class="grid grid-cols-3 gap-[1.8cqw] text-center">
                ${easy('sky', 'fa-list-check', 'ルール', '<span style="font-size: 0.6em;">シンプル</span>', 'すぐに覚えられる')}
                ${easy('lime', 'fa-stopwatch', '1 ゲーム', '15<span style="font-size: 0.45em;"> 分</span>', 'すき間の時間で遊べる')}
                ${easy('amber', 'fa-suitcase', 'ボード', '<span style="font-size: 0.6em;">持ち運べる</span>', '畳んでどこでも')}
            </div>
        `, { credit: '背景: AI 生成（Gemini）' }); },
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
            <!-- 下段: 左に大逆転の流れ（TODO-055）、右にダブルの場面（TODO-054）。上の 1 枚目・2 枚目の下に来る -->
            <div class="mt-[2cqw] grid grid-cols-2 gap-[1.6cqw]">
            <!-- 大逆転: 負けそう → 相手の駒を振り出しに戻す → 逆転勝ち -->
            <div class="flex flex-col justify-center gap-[0.7cqw] rounded-2xl bg-slate-950/80 backdrop-blur-sm border border-amber-500/40 px-[1.2cqw] py-[1.2cqw] shadow-lg shadow-slate-950/60">
                <div class="self-start rounded-lg bg-amber-400 px-[0.8cqw] py-[0.2cqw] font-bold text-slate-950" style="font-size: clamp(0.7rem, 1.6cqw, 1.2rem);">大逆転！</div>
                <div class="flex items-center gap-[0.5cqw]">
                    ${race('fa-face-frown', 'slate', '負けそう', 25, 80)}
                    <i class="fa-solid fa-arrow-right text-amber-300" style="font-size: clamp(0.7rem, 1.6cqw, 1.2rem);"></i>
                    ${race('fa-rotate-left', 'rose', '相手の駒を戻す', 45, 35)}
                    <i class="fa-solid fa-arrow-right text-amber-300" style="font-size: clamp(0.7rem, 1.6cqw, 1.2rem);"></i>
                    ${race('fa-trophy', 'amber', '逆転勝ち', 100, 70)}
                </div>
                <div class="text-slate-300" style="font-size: clamp(0.6rem, 1.4cqw, 1.05rem);">ダイスの目しだいで、負けていても追い付ける</div>
            </div>
            <!-- ダブルの場面: 「2」のキューブを差し出され、受けるか降りるかを迷う（TODO-054） -->
            <div class="flex items-center gap-[1cqw] rounded-2xl bg-slate-950/80 backdrop-blur-sm border border-rose-500/40 px-[1.2cqw] py-[1.2cqw] shadow-lg shadow-slate-950/60">
                <div class="shrink-0 flex flex-col items-center gap-[0.5cqw]">
                    <div class="rounded-lg bg-rose-500 px-[0.8cqw] py-[0.2cqw] font-bold text-slate-950" style="font-size: clamp(0.7rem, 1.6cqw, 1.2rem);">ダブル！</div>
                    <div class="grid place-items-center w-[4.6cqw] h-[4.6cqw] rounded-lg bg-slate-50 border-2 border-slate-400 font-black text-slate-900 shadow-lg shadow-slate-950/60" style="font-size: clamp(1.2rem, 3.2cqw, 2.4rem);">2</div>
                </div>
                <i class="fa-solid fa-arrow-right text-rose-300" style="font-size: clamp(0.7rem, 1.6cqw, 1.2rem);"></i>
                <div class="shrink-0 flex flex-col items-center text-slate-200" style="font-size: clamp(1rem, 3cqw, 2.2rem);">
                    <i class="fa-solid fa-circle-question text-amber-300" style="font-size: 0.5em;"></i>
                    <i class="fa-solid fa-user"></i>
                    <span class="font-bold" style="font-size: 0.4em;">相手</span>
                </div>
                <div class="flex-1 min-w-0 flex flex-col gap-[0.6cqw] text-left whitespace-nowrap">
                    <div class="rounded-lg bg-lime-500/15 border border-lime-500/50 px-[0.8cqw] py-[0.4cqw] font-bold text-slate-50" style="font-size: clamp(0.65rem, 1.5cqw, 1.15rem);"><span class="text-lime-300">受ける</span> → 点数 2 倍で続ける</div>
                    <div class="rounded-lg bg-slate-500/15 border border-slate-400/50 px-[0.8cqw] py-[0.4cqw] font-bold text-slate-50" style="font-size: clamp(0.65rem, 1.5cqw, 1.15rem);"><span class="text-slate-300">降りる</span> → 1 点負けで終わり</div>
                    <div class="text-slate-300 leading-snug" style="font-size: clamp(0.55rem, 1.2cqw, 0.9rem);">ふつうは勝てば 1 点。<br>受けると、勝ち負けが 2 点になる</div>
                </div>
            </div>
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
        duration: 22,
        narration: '日本では、知る人の少ないバックギャモンですが、関内バックギャモンの会に来れば、一緒に遊ぶ仲間がいます。初めての方には、遊び方を丁寧に教えます。月に2回ほど、主になか区民活動センターや、Kアリーナのバーで、お喋りしながら気軽に遊んでいます。お問い合わせは、公式サイトをご覧ください。',
        render: function() { return bgSlide(this, 'bg-kannai.jpg', '窓の光が差すテーブルに置いた木のバックギャモンのボード', `
            <div class="flex items-center gap-[2.4cqw]">
                <div class="flex-1 flex flex-col gap-[1.2cqw]">
                    <ul class="flex flex-col gap-[0.6cqw]">
                        ${li('fa-seedling', '<span class="text-lime-300">初心者歓迎</span>。遊び方を丁寧に教えます')}
                        ${li('fa-calendar-days', '<span class="text-lime-300">月 2 回</span>ほど、主に <span class="whitespace-nowrap">なか区民活動センター</span>や <span class="whitespace-nowrap">Kアリーナ Bar 7 で</span>')}
                        ${li('fa-comments', 'お喋りしながら<span class="text-lime-300">気軽に</span>交流')}
                    </ul>
                </div>
                <!-- 札ごとリンク。上が公式サイト、下が X。クリックを再生・一時停止に伝えない（TODO-041、TODO-043）。
                     隣の QR を読み込まないよう、QR を大きくして札の間を離す（TODO-063） -->
                <div class="shrink-0 w-[33cqw] flex flex-col gap-[2.4cqw]">
                    ${qrCard('https://kannaibg.wixsite.com/kannai-backgammon', 'kannai-qr.png', '公式サイトの QR コード', 'お問い合わせは<br>公式サイトで', 'kannaibg.wixsite.com/<br>kannai-backgammon')}
                    ${qrCard('https://x.com/lppcn5b6mw94np2', 'x-qr.png', 'X の QR コード', '最新情報は<br>X で', 'x.com/<br>lppcn5b6mw94np2')}
                </div>
            </div>
        `, { credit: '背景: 関内バックギャモンの会 公式サイト' }); },
    },
];
