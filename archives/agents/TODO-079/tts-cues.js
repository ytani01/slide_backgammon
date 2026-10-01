// TODO-079〜081: ナレーションの区切りまでを Online TTS で読ませて長さを測り、1.4 倍速の秒を出す。
// 実行: node archives/agents/TODO-079/tts-cues.js（8000 番のサーバーと ffprobe を使う）
const { createRequire } = require('module');
const { chromium } = createRequire('/home/ytani/.local/share/mise/installs/npm-playwright/latest/node_modules/')('playwright');
const { execFileSync } = require('child_process');
const fs = require('fs'), os = require('os'), path = require('path');
const CUES = {
    '世界中でプレーされている': ['日本バックギャモン協会', '約3億人', 'ヨーロッパ', 'モナコ'],
    '世界中で日本人が大活躍': ['望月正行', '矢澤亜希子', 'ほかにも'],
    '魅力① 簡単で手軽': ['基本のルール', '1ゲーム', 'ボードは'],
    '魅力② ゲームとしての面白さ': ['ダイスを', '戦略的', 'そして'],
    '魅力③ おしゃれ': ['カラフル', '部屋に', 'インテリア'],
    // TODO-083
    'バックギャモンの歴史は古い': ['起源は', 'その後', '日本にも'],
    'バックギャモンとは': ['ダイスを', '15個', '振り出し'],
    '関内バックギャモンの会で始めよう': ['初めての方', '月に2回', 'お喋り', 'お問い合わせ', '最新情報', 'あなたも'],
};
const ONLY = process.argv.slice(2);  // 題名を渡すと、そのスライドだけ測る
(async () => {
    const b = await chromium.launch();
    const p = await b.newPage();
    await p.goto('http://localhost:8000/player.html?slides=backgammon');
    const jobs = await p.evaluate(([CUES, ONLY]) => Object.entries(CUES).filter(([t]) => !ONLY.length || ONLY.includes(t)).flatMap(([title, cues]) => {
        const n = slideData.find((s) => s.title === title).narration;
        return [...cues.map((c) => [title, c, prepareSpeechText(n.slice(0, n.indexOf(c)))]), [title, '全体', prepareSpeechText(n)]];
    }), [CUES, ONLY]);
    await b.close();
    const f = path.join(os.tmpdir(), 'tts-cue.mp3');
    for (const [title, cue, text] of jobs) {
        const r = await fetch('https://translate.google.com/translate_tts?ie=UTF-8&tl=ja&client=tw-ob&q=' + encodeURIComponent(text), { signal: AbortSignal.timeout(20000) });
        fs.writeFileSync(f, Buffer.from(await r.arrayBuffer()));
        const d = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]));
        console.log(`${title}\t${cue}\t${d.toFixed(2)}\t${(d / 1.4).toFixed(1)}`);
    }
})();
