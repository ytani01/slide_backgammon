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
        [/東急ハンズ/g, 'とうきゅうハンズ'],
        [/駆け引き/g, 'かけひき'],
        [/3億人/g, 'さんおくにん'],
    ],
};

// 時間軸の画像 1 枚と、その説明（説明は時間軸の点の下に並べる）
const fig = (src, alt) => `
    <img src="images/${src}" alt="${alt}" class="w-full h-auto max-h-[22cqw] object-contain rounded-xl border border-slate-700 shadow-xl shadow-slate-950/60">`;
const cap = (html) => `
    <div class="flex justify-center text-slate-200 font-medium leading-snug whitespace-nowrap" style="font-size: clamp(1.1rem, 2.3cqw, 1.7rem);"><span>${html}</span></div>`;

// 箇条書きの 1 行（template.js の「箇条書き」と同じ書式）
const li = (icon, html) => `
    <li class="flex items-start gap-[1.4cqw] rounded-xl bg-slate-800/40 border border-slate-700/70 px-[1.4cqw] py-[0.8cqw]">
        <span class="shrink-0 grid place-items-center w-[3.2cqw] h-[3.2cqw] rounded-lg bg-lime-500/15 text-lime-400 border border-lime-500/40" style="font-size: clamp(0.85rem, 1.8cqw, 1.3rem);"><i class="fa-solid ${icon}"></i></span>
        <span class="text-slate-100 font-medium leading-snug" style="font-size: clamp(0.9rem, 1.95cqw, 1.45rem);">${html}</span>
    </li>`;

// 流れの 1 箱（template.js の「図解」と同じ書式）
const step = (color, icon, text) => `
    <div class="flex-1 rounded-2xl bg-gradient-to-b from-${color}-950/60 to-slate-900/50 border border-${color}-500/40 px-[1cqw] py-[1.2cqw] shadow-lg shadow-${color}-900/20">
        <div class="mx-auto grid place-items-center w-[4.6cqw] h-[4.6cqw] rounded-full bg-${color}-500/15 border border-${color}-400/40 text-${color}-300" style="font-size: clamp(1.1rem, 2.4cqw, 1.8rem);"><i class="fa-solid ${icon}"></i></div>
        <div class="font-bold text-slate-100 mt-[0.8cqw]" style="font-size: clamp(0.9rem, 2.0cqw, 1.5rem);">${text}</div>
    </div>`;
const arrow = `
    <div class="flex items-center justify-center shrink-0">
        <i class="fa-solid fa-arrow-right text-lime-400" style="font-size: clamp(1.1rem, 2.4cqw, 1.8rem);"></i>
    </div>`;

const slideData = [
    // ── 表紙 ──
    {
        title: '表紙',
        duration: 8,
        narration: 'バックギャモンのススメ。横浜市中区、なか区民活動センター登録団体、関内バックギャモンの会。',
        render: function() {
            return `
                <div class="relative h-full flex flex-col justify-center items-center text-center px-[5cqw] overflow-hidden">
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
                        <p class="text-slate-300 font-medium mt-[2cqw]" style="font-size: clamp(1rem, 2.3cqw, 1.7rem);">
                            横浜市中区 なか区民活動センター登録団体
                        </p>
                        <p class="text-slate-300 font-medium mt-[0.8cqw]" style="font-size: clamp(1rem, 2.3cqw, 1.7rem);">
                            関内バックギャモンの会
                        </p>
                    </div>
                </div>
            `;
        },
    },

    // ── 1. 歴史 ──
    // 背景に古い世界地図を薄く敷くので render() で書く。見出しは player.html と同じ書式
    {
        title: 'バックギャモンの歴史は古い',
        icon: 'fa-landmark',
        duration: 13,
        narration: 'バックギャモンの歴史は古く、起源は約5000年前の中東です。その後、世界中に拡散して定着しました。日本には、奈良時代より前の飛鳥時代に伝わりました。',
        render: function() {
            return `
                <div class="relative h-full overflow-hidden">
                    <img src="images/bg-worldmap.jpg" alt="古い世界地図（Hondius, 1630）" class="absolute inset-0 w-full h-full object-cover opacity-30">
                    <div class="absolute inset-0 bg-slate-950/40"></div>
                    <div class="relative flex flex-col h-full justify-center px-[3cqw]">
                        <h2 class="font-bold text-sky-400 mb-[1.5cqw] flex items-center gap-[1cqw]" style="font-size: clamp(1.4rem, 3.2cqw, 2.5rem);"><i class="fa-solid ${this.icon} text-lime-400"></i> ${this.title}</h2>
                        <div class="grid grid-cols-3 gap-[1.8cqw] items-end">
                            ${fig('bg-egypt.png', 'エジプトの壁画')}
                            ${fig('bg-medieval.png', '中世ヨーロッパの写本')}
                            ${fig('bg-nara.png', '盤を挟んで向かい合う二人の絵')}
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
                            ${cap('起源は <b class="text-lime-300">約 5,000 年前</b>（中東）')}
                            ${cap('<b class="text-lime-300">世界中</b>に拡散・定着')}
                            ${cap('日本には<b class="text-lime-300">飛鳥時代</b>')}
                        </div>
                    </div>
                </div>
            `;
        },
    },

    // ── 2. 世界中 ──
    {
        title: '世界中でプレーされている',
        icon: 'fa-earth-asia',
        duration: 10,
        narration: 'バックギャモンは、世界中でプレーされています。競技人口は世界で3億人とも言われます。趣味レベルでは、10億人を超えるとも言われます。',
        body: `
            <div class="grid grid-cols-5 gap-[1.8cqw] items-center">
                <figure class="col-span-3 m-0">
                    <img src="images/bg-crowd.png" alt="屋外で大勢が対局する写真" class="w-full h-auto max-h-[32cqw] object-contain rounded-xl border border-slate-700 shadow-xl shadow-slate-950/60">
                </figure>
                <div class="col-span-2 space-y-[1.4cqw] text-center">
                    <div class="rounded-2xl bg-slate-800/40 border border-lime-500/40 p-[1.6cqw] shadow-lg shadow-lime-900/20 ring-1 ring-lime-400/20">
                        <div class="text-slate-200 font-medium" style="font-size: clamp(0.9rem, 1.95cqw, 1.4rem);">競技人口</div>
                        <div class="font-extrabold leading-none text-transparent bg-clip-text bg-gradient-to-b from-lime-300 to-lime-500" style="font-size: clamp(2rem, 5cqw, 3.8rem);">3<span class="text-slate-500 font-bold" style="font-size: clamp(0.9rem, 1.9cqw, 1.4rem);"> 億人</span></div>
                        <div class="text-slate-400 font-medium mt-[0.6cqw]" style="font-size: clamp(0.8rem, 1.6cqw, 1.2rem);">とも言われる</div>
                    </div>
                    <div class="rounded-2xl bg-slate-800/40 border border-slate-700 p-[1.6cqw] shadow-lg shadow-slate-950/40">
                        <div class="text-slate-200 font-medium" style="font-size: clamp(0.9rem, 1.95cqw, 1.4rem);">趣味レベル</div>
                        <div class="font-extrabold leading-none text-transparent bg-clip-text bg-gradient-to-b from-sky-300 to-sky-500" style="font-size: clamp(2rem, 5cqw, 3.8rem);">10<span class="text-slate-500 font-bold" style="font-size: clamp(0.9rem, 1.9cqw, 1.4rem);"> 億人超え</span></div>
                        <div class="text-slate-400 font-medium mt-[0.6cqw]" style="font-size: clamp(0.8rem, 1.6cqw, 1.2rem);">とも言われる</div>
                    </div>
                </div>
            </div>
        `,
    },

    // ── 3. 不遇の歴史（日本では、までを 1 枚に） ──
    {
        title: '不遇の歴史',
        icon: 'fa-ban',
        duration: 14,
        narration: '不遇の歴史もあります。簡単で面白いので大流行しましたが、賭博が横行し、禁止令が出されました。日本では、ルールを覚えるより、対戦相手を見つけるのがむずかしいボードゲームになってしまいました。',
        body: `
            <div class="flex items-stretch justify-center gap-[1cqw] text-center">
                ${step('sky', 'fa-face-smile', '簡単で面白い')}
                ${arrow}
                ${step('lime', 'fa-fire', '大流行')}
                ${arrow}
                ${step('amber', 'fa-coins', '賭博の横行')}
                ${arrow}
                ${step('rose', 'fa-ban', '禁止令')}
            </div>
            <div class="flex justify-center gap-[3cqw] mt-[1.4cqw]">
                <img src="images/bg-edo.png" alt="日本の彩色画" class="h-[17cqw] w-auto rounded-xl border border-slate-700 shadow-xl shadow-slate-950/60">
                <img src="images/bg-print.png" alt="日本の白黒の版画" class="h-[17cqw] w-auto rounded-xl border border-slate-700 shadow-xl shadow-slate-950/60">
            </div>
            <blockquote class="mt-[1.4cqw] rounded-2xl bg-slate-800/30 border border-slate-700/70 border-l-4 border-l-sky-500/70 px-[2cqw] py-[1cqw]">
                <p class="text-slate-100 font-medium leading-snug" style="font-size: clamp(0.95rem, 2.05cqw, 1.5rem);">
                    <i class="fa-solid fa-torii-gate text-lime-400"></i> 日本では、ルールを覚えるより、<span class="text-lime-300 font-bold">対戦相手を見つける</span>のがむずかしいボードゲームに
                </p>
            </blockquote>
        `,
    },

    // ── 4. 魅力 ──
    {
        title: 'バックギャモンの魅力',
        icon: 'fa-list-check',
        duration: 24,
        narration: 'バックギャモンの魅力です。ルールが簡単で、15分程度の短時間でプレーできます。奥が深く、ボードはカラフルでおしゃれです。バブル期には、おしゃれなカフェバーなどでプチブームになり、東急ハンズなどで販売されていました。運が良ければ、初心者でも上級者に勝つ可能性があります。ポーカーのように、かけ点を吊り上げる駆け引きもあります。',
        body: `
            <div class="grid grid-cols-5 gap-[1.8cqw] items-center">
                <ul class="col-span-3 space-y-[0.9cqw]">
                    ${li('fa-check', 'ルールが簡単')}
                    ${li('fa-stopwatch', '短時間でプレーできる（15 分程度）')}
                    ${li('fa-layer-group', '奥が深い')}
                    ${li('fa-palette', 'カラフルでおしゃれなボード<span class="text-slate-400">（バブル期には、おしゃれなカフェバーなどでプチブーム、東急ハンズなどで販売されてた）</span>')}
                    ${li('fa-dice', '運が良ければ、初心者でも上級者に勝つ可能性がある')}
                    ${li('fa-chess', 'ポーカーのようにかけ点を吊り上げる駆け引きもある')}
                </ul>
                <figure class="col-span-2 m-0">
                    <div class="grid grid-cols-2 gap-[0.8cqw]">
                        <img src="images/bg-board1.jpg" alt="青と白の競技用のボード" class="col-span-2 w-full h-[16cqw] object-cover rounded-xl border border-slate-700 shadow-xl shadow-slate-950/60">
                        <img src="images/bg-board2.jpg" alt="オレンジの台に置いた白木のボード" class="w-full h-[13cqw] object-cover rounded-xl border border-slate-700 shadow-xl shadow-slate-950/60">
                        <img src="images/bg-board3.jpg" alt="ターコイズ色の古い木箱のボード" class="w-full h-[13cqw] object-cover rounded-xl border border-slate-700 shadow-xl shadow-slate-950/60">
                    </div>
                    <figcaption class="text-slate-500 mt-[0.6cqw] leading-snug" style="font-size: clamp(0.6rem, 1.1cqw, 0.8rem);">写真（一部切り出し）: RG72 (CC BY 4.0)、Alper Çuğun (CC BY 2.0)、Diligent (PD)／Wikimedia Commons</figcaption>
                </figure>
            </div>
        `,
    },
];
