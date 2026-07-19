'use strict';
// MARGIN brand-kit generator. Writes one self-contained HTML per asset into _studio/out/,
// then render.js rasterizes each with headless Chrome to the Desktop as margin-*.png.
// Aesthetic mirrors the site: Robinhood black + neon green #00e05a / lime #baff3f.
// DM Sans (900 display) + JetBrains Mono. Mark = "M" drawn as a chart polyline.
const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, 'out');
fs.mkdirSync(OUT, { recursive: true });

const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,800;9..40,900&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">`;

const BASE = `
:root{--bg:#0a0d0a;--panel:#121712;--panel2:#1a201a;--ink:#f0f6f0;--sub:#a9b6aa;--mut:#6f7d71;--dim:#4c584d;
  --grn:#00e05a;--lime:#baff3f;--warn:#ffb224;--bad:#ff5000;
  --line:rgba(240,246,240,.1);--line2:rgba(240,246,240,.2);}
*{margin:0;padding:0;box-sizing:border-box}
html,body{font-family:'DM Sans',system-ui,sans-serif;color:var(--ink);background:#0a0d0a;overflow:hidden;-webkit-font-smoothing:antialiased}
.stage{position:relative;overflow:hidden;background:
  radial-gradient(58% 46% at 80% -6%,rgba(0,224,90,.14),transparent 60%),
  radial-gradient(50% 44% at 6% 10%,rgba(186,255,63,.08),transparent 60%),
  radial-gradient(64% 52% at 52% 116%,rgba(0,224,90,.1),transparent 66%),
  #0a0d0a}
.dm{font-family:'DM Sans',sans-serif}.mo{font-family:'JetBrains Mono',monospace}
.grad{background:linear-gradient(110deg,var(--grn) 12%,var(--lime) 92%);-webkit-background-clip:text;background-clip:text;color:transparent}
.tok{color:var(--grn)}
.eyebrow{font-family:'JetBrains Mono',monospace;letter-spacing:.34em;color:var(--grn);text-transform:uppercase}
.dust{position:absolute;inset:0;opacity:.6;pointer-events:none;background-image:
  radial-gradient(2px 2px at 12% 22%,rgba(0,224,90,.24),transparent),
  radial-gradient(2px 2px at 78% 12%,rgba(186,255,63,.18),transparent),
  radial-gradient(2px 2px at 34% 66%,rgba(0,224,90,.16),transparent),
  radial-gradient(2px 2px at 88% 54%,rgba(0,224,90,.18),transparent),
  radial-gradient(2px 2px at 24% 46%,rgba(240,246,240,.08),transparent),
  radial-gradient(2px 2px at 60% 82%,rgba(186,255,63,.14),transparent)}
`;

// ── The MARGIN mark ── "M" drawn as a price-chart polyline, green→lime gradient stroke.
function mark(size, gradId) {
  const s = size;
  return `<svg width="${s}" height="${s}" viewBox="0 0 120 120" style="filter:drop-shadow(0 ${Math.round(s * 0.05)}px ${Math.round(s * 0.16)}px rgba(0,224,90,.35))">
    <defs><linearGradient id="${gradId}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#00e05a"/><stop offset="1" stop-color="#baff3f"/></linearGradient></defs>
    <polyline points="14,96 14,26 60,74 106,26 106,96" fill="none" stroke="url(#${gradId})"
      stroke-width="17" stroke-linejoin="round" stroke-linecap="round"/>
  </svg>`;
}

const chip = (t, c) => `<span style="display:inline-flex;align-items:center;font-family:'JetBrains Mono';font-size:28px;font-weight:700;color:${c || 'var(--grn)'};background:var(--panel);border:1px solid var(--line2);border-radius:999px;padding:14px 30px;letter-spacing:.03em">${t}</span>`;

function page(w, h, css, inner) {
  return `<!doctype html><html><head><meta charset="utf-8">${FONTS}<style>${BASE}
  .stage{width:${w}px;height:${h}px}${css}</style></head>
  <body><div class="stage"><div class="dust"></div>${inner}</div></body></html>`;
}

const assets = {};

// 1) PFP 2000²
assets['margin-pfp'] = page(2000, 2000, `
  .wrap{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px}
  .name{font-weight:900;font-size:260px;letter-spacing:-.04em;line-height:1}
  .tick{font-family:'JetBrains Mono';font-size:96px;font-weight:700;margin-top:6px}
  .tag{font-weight:500;font-size:64px;color:var(--sub)}`,
  `<div class="wrap">
     ${mark(700, 'mpfp')}
     <div class="name grad">margin</div>
     <div class="tick tok">$MARGIN</div>
     <div class="tag">your bag is buying power</div>
   </div>`);

// 2) BANNER 3000×1000
assets['margin-banner'] = page(3000, 1000, `
  .wrap{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:110px;padding:0 130px}
  .name{font-weight:900;font-size:190px;letter-spacing:-.04em;line-height:.98}
  .tag{font-size:42px;color:var(--sub);letter-spacing:.01em;margin-top:20px;line-height:1.4;max-width:1500px}
  .tag b{color:var(--ink)}
  .row{display:flex;gap:16px;margin-top:34px}
  .dom{font-family:'JetBrains Mono';font-size:32px;font-weight:700;color:var(--grn);margin-top:30px;letter-spacing:.06em}`,
  `<div class="wrap">
     ${mark(480, 'mbn')}
     <div>
       <div class="name grad">margin</div>
       <div class="tag">Borrow SOL against memecoins &amp; tokenized stocks — <b>your bag is buying power.</b></div>
       <div class="row">${chip('UP TO 70% LTV')}${chip('TP / SL ON COLLATERAL', 'var(--lime)')}${chip('NEVER A TELEGRAM BOT')}</div>
       <div class="dom">marginrh.xyz · $MARGIN · @MarginRH</div>
     </div>
   </div>`);

// 3) KEYART 2400×1350
assets['margin-keyart'] = page(2400, 1350, `
  .wrap{position:absolute;inset:0;display:flex;align-items:center;gap:80px;padding:0 130px}
  .name{font-weight:900;font-size:154px;letter-spacing:-.04em;line-height:.98}
  .name em{font-style:normal;color:var(--grn)}
  .sub{font-size:34px;color:var(--sub);max-width:1000px;line-height:1.55;margin-top:26px}
  .sub b{color:var(--ink)}
  .dom{font-family:'JetBrains Mono';font-size:34px;font-weight:700;color:var(--grn);margin-top:38px;letter-spacing:.08em}`,
  `<div class="wrap">
     ${mark(540, 'mka')}
     <div>
       <div class="name">Turn your bag<br>into <span class="grad">buying power.</span></div>
       <div class="sub">Any bag that trades is a credit line — memecoins to <b>30% LTV</b>, tokenized stocks to
         <b>70% over 30 days</b>. Arm stops on collateral <b>while it&rsquo;s pledged</b>, and build credit that compounds into better terms.</div>
       <div class="dom">marginrh.xyz</div>
     </div>
   </div>`);

// 4) THE LOOP 2400×1350
const loopCard = (n, t, d, hot) => `<div style="flex:1;background:var(--panel);border:2px solid ${hot ? 'rgba(0,224,90,.5)' : 'var(--line)'};border-radius:22px;padding:42px 34px;${hot ? 'box-shadow:0 0 50px rgba(0,224,90,.12)' : ''}">
  <div class="mo" style="font-size:26px;letter-spacing:.2em;color:${hot ? 'var(--grn)' : 'var(--dim)'}">${n}</div>
  <div style="font-weight:900;font-size:44px;margin:14px 0 12px;letter-spacing:-.02em">${t}</div>
  <div style="font-size:28px;color:var(--sub);line-height:1.55">${d}</div></div>`;
assets['margin-how'] = page(2400, 1350, `
  .wrap{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:0 100px;gap:46px}
  .top{display:flex;align-items:center;gap:36px}
  .h{font-weight:900;font-size:96px;letter-spacing:-.03em}
  .row{display:flex;gap:22px}
  .foot{font-family:'JetBrains Mono';font-size:27px;color:var(--mut);text-align:center;letter-spacing:.04em}`,
  `<div class="wrap">
     <div class="top">${mark(150, 'mhw')}<div><div class="eyebrow" style="font-size:29px;margin-bottom:10px">▲ the loop ▲</div><div class="h">Collateral that can still <span class="grad">sell itself.</span></div></div></div>
     <div class="row">
       ${loopCard('01 · PLEDGE', 'Connect', 'MARGIN reads your <b style="color:var(--grn)">real bag</b> and prices it live. No signatures, ever.')}
       ${loopCard('02 · BORROW', 'Take SOL', 'Pick a tier. Your <b style="color:var(--grn)">liquidation price</b> is quoted before you commit.')}
       ${loopCard('03 · PROTECT', 'Arm TP/SL', 'A 15-second keeper watches your stops on the collateral <b style="color:var(--grn)">while it&rsquo;s pledged.</b>')}
       ${loopCard('04 · COMPOUND', 'Build credit', 'Every clean repay lifts your score — <b style="color:var(--lime)">higher LTV, lower fees.</b>', true)}
     </div>
     <div class="foot">connect · borrow · protect · repay — every action a public receipt · marginrh.xyz</div>
   </div>`);

// 5) TWO ASSET CLASSES / TIERS 2400×1350
const tierMini = (t, ltv, sub) => `<div style="background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:20px 22px;flex:1">
  <div style="font-weight:800;font-size:26px">${t}</div>
  <div class="grad" style="font-weight:900;font-size:52px;line-height:1;margin:6px 0">${ltv}</div>
  <div style="font-size:20px;color:var(--mut);font-family:'JetBrains Mono'">${sub}</div></div>`;
assets['margin-tiers'] = page(2400, 1350, `
  .wrap{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:0 110px;gap:30px}
  .h{font-weight:900;font-size:88px;letter-spacing:-.03em;text-align:center}
  .cls{display:grid;grid-template-columns:1fr 1fr;gap:26px;margin-top:12px}
  .card{border:1px solid var(--line);border-radius:22px;padding:40px 38px}
  .card.m{background:linear-gradient(160deg,#121712,#14200f)}
  .card.r{background:linear-gradient(160deg,#121712,#0f2016)}
  .lab{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}
  .tag{font-family:'JetBrains Mono';font-size:22px;font-weight:700;letter-spacing:.1em}
  .m .tag{color:var(--lime)} .r .tag{color:var(--grn)}
  .mx{font-family:'JetBrains Mono';font-size:24px;color:var(--mut)} .mx b{color:var(--ink)}
  .cn{font-weight:900;font-size:56px;margin-bottom:22px;letter-spacing:-.02em}
  .tiers{display:flex;gap:14px}
  .foot{font-family:'JetBrains Mono';font-size:26px;color:var(--mut);text-align:center;letter-spacing:.04em}`,
  `<div class="wrap">
     <div class="eyebrow" style="font-size:28px;text-align:center">▲ two asset classes · one click to borrow ▲</div>
     <div class="h">Keep your bags <span class="grad">and</span> your stocks.</div>
     <div class="cls">
       <div class="card m"><div class="lab"><span class="tag">MEMECOINS</span><span class="mx">up to <b>30% LTV</b></span></div>
         <div class="cn">Bags → SOL</div>
         <div class="tiers">${tierMini('Express', '30%', '2d · 3%')}${tierMini('Quick', '25%', '3d · 2%')}${tierMini('Standard', '20%', '7d · 1.5%')}</div></div>
       <div class="card r"><div class="lab"><span class="tag">TOKENIZED STOCKS</span><span class="mx">up to <b>70% LTV</b></span></div>
         <div class="cn">Stocks → SOL</div>
         <div class="tiers">${tierMini('Express', '50%', '7d · 3%')}${tierMini('Quick', '60%', '15d · 4%')}${tierMini('Standard', '70%', '30d · 5%')}</div></div>
     </div>
     <div class="foot">AAPL · NVDA · TSLA · COIN · gold — the xStocks you already hold · marginrh.xyz</div>
   </div>`);

// 6) CREDIT 2400×1350
const crCard = (rng, name, perk, hot) => `<div style="flex:1;background:var(--panel);border:2px solid ${hot ? 'rgba(0,224,90,.45)' : 'var(--line)'};border-radius:20px;padding:40px 34px;text-align:center;${hot ? 'box-shadow:0 0 46px rgba(0,224,90,.12)' : ''}">
  <div class="mo" style="font-size:24px;letter-spacing:.14em;color:var(--mut)">${rng}</div>
  <div style="font-weight:900;font-size:48px;margin:10px 0;letter-spacing:-.02em">${name}</div>
  <div style="font-size:26px;color:var(--sub);line-height:1.5">${perk}</div></div>`;
assets['margin-credit'] = page(2400, 1350, `
  .wrap{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:0 120px;gap:40px}
  .top{display:flex;align-items:center;gap:36px}
  .h{font-weight:900;font-size:100px;letter-spacing:-.03em}
  .row{display:flex;gap:22px}
  .foot{font-family:'JetBrains Mono';font-size:26px;color:var(--mut);text-align:center;letter-spacing:.04em}`,
  `<div class="wrap">
     <div class="top">${mark(150, 'mcr')}<div><div class="eyebrow" style="font-size:29px;margin-bottom:10px">▲ on-chain memory ▲</div><div class="h">Credit is <span class="grad">buying power.</span></div></div></div>
     <div class="row">
       ${crCard('0 – 599', 'Retail', 'Base terms. Everyone starts at 300.')}
       ${crCard('600 – 799', 'Funded', '<b style="color:var(--grn)">+2% LTV</b> on every tier.')}
       ${crCard('800 – 1000', 'Prime', '<b style="color:var(--grn)">+4% LTV · −25bps</b> fee. The top of the book.', true)}
     </div>
     <div class="foot">repay +40 · protected exit +20 · liquidation −250 — credit is earned by repaying, never bought · marginrh.xyz</div>
   </div>`);

// 7) VS THE OTHER DESKS 2400×1350
const vrow = (f, them, us) => `<tr><td class="f">${f}</td><td class="a"><span class="x">✗</span>${them}</td><td class="b"><span class="c">✓</span>${us}</td></tr>`;
assets['margin-vs'] = page(2400, 1350, `
  .wrap{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:0 120px;gap:30px}
  .top{display:flex;align-items:center;gap:34px}
  .h{font-weight:900;font-size:82px;letter-spacing:-.03em}
  table{width:100%;border-collapse:separate;border-spacing:0 14px}
  th{font-family:'JetBrains Mono';font-size:27px;letter-spacing:.1em;text-align:left;padding:0 32px;color:var(--mut)}
  th.b{color:var(--grn)}
  td{padding:24px 32px;font-size:30px;line-height:1.4;vertical-align:middle}
  td.f{font-weight:900;font-size:31px;color:var(--ink);width:22%;background:var(--panel);border:1px solid var(--line);border-right:none;border-radius:16px 0 0 16px}
  td.a{color:#7d8a7e;width:37%;background:rgba(255,80,0,.05);border:1px solid rgba(255,80,0,.18);border-left:none;border-right:none}
  td.b{color:var(--ink);width:41%;background:rgba(0,224,90,.07);border:2px solid rgba(0,224,90,.32);border-left:none;border-radius:0 16px 16px 0}
  td.b b{color:var(--grn)}
  .x{color:var(--bad);font-weight:800;margin-right:16px} .c{color:var(--grn);font-weight:800;margin-right:16px}
  .foot{font-family:'JetBrains Mono';font-size:25px;color:var(--mut);text-align:center;letter-spacing:.03em}`,
  `<div class="wrap">
     <div class="top">${mark(128, 'mvs')}<div><div class="eyebrow" style="font-size:28px;margin-bottom:8px">▲ why not the other desks ▲</div><div class="h">Same mechanics. <span class="grad">Different spine.</span></div></div></div>
     <table>
       <tr><th></th><th>THE OTHER DESKS</th><th class="b">MARGIN</th></tr>
       ${vrow('Custody', 'Your wallet IS the bot wallet — keys in a Telegram bot', '<b>Zero keys held</b> — connect never asks for a signature')}
       ${vrow('Surface', 'Lives in a chat window', '<b>Web-first</b> — full dashboard, positions, live ledger')}
       ${vrow('Keeper', 'Ticks every ~90 seconds', '<b>Every 15 seconds</b> — 6× faster to your stop')}
       ${vrow('Proof', 'Trust the bot', '<b>Read the ledger</b> — every action is a public receipt')}
     </table>
     <div class="foot">we even take $QUANT and $INDEX as collateral — priced live from Robinhood Chain. no hard feelings. ▲ · marginrh.xyz</div>
   </div>`);

// ── The Desk orb ── glowing green sphere with halo + orbit rings
function orb(size, id) {
  const s = size, cx = s / 2, cy = s / 2, r = s * 0.3;
  return `<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" style="overflow:visible">
    <defs>
      <radialGradient id="${id}h" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="rgba(0,224,90,.4)"/><stop offset="1" stop-color="rgba(0,224,90,0)"/></radialGradient>
      <radialGradient id="${id}c" cx="36%" cy="32%" r="72%"><stop offset="0" stop-color="#eaffdc"/><stop offset=".42" stop-color="#00e05a"/><stop offset="1" stop-color="#0a7a35"/></radialGradient>
    </defs>
    <circle cx="${cx}" cy="${cy}" r="${r * 2.2}" fill="url(#${id}h)"/>
    <ellipse cx="${cx}" cy="${cy}" rx="${r * 1.75}" ry="${r * 0.62}" fill="none" stroke="rgba(0,224,90,.4)" stroke-width="${s * 0.006}" transform="rotate(-18 ${cx} ${cy})"/>
    <ellipse cx="${cx}" cy="${cy}" rx="${r * 1.55}" ry="${r * 0.5}" fill="none" stroke="rgba(186,255,63,.35)" stroke-width="${s * 0.005}" transform="rotate(22 ${cx} ${cy})"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${id}c)" style="filter:drop-shadow(0 ${s * 0.03}px ${s * 0.06}px rgba(0,224,90,.4))"/>
    <circle cx="${cx - r * 0.34}" cy="${cy - r * 0.38}" r="${r * 0.2}" fill="rgba(255,255,255,.92)"/>
    <circle cx="${cx + r * 1.75 * Math.cos(-0.31) * 0.955}" cy="${cy - r * 1.75 * Math.sin(-0.31) * 0.34}" r="${s * 0.02}" fill="#baff3f"/>
  </svg>`;
}

// 8) MEET THE DESK 2400×1350 — the announcement hero
assets['margin-desk'] = page(2400, 1350, `
  .wrap{position:absolute;inset:0;display:flex;align-items:center;gap:40px;padding:0 130px}
  .name{font-weight:900;font-size:172px;letter-spacing:-.04em;line-height:.94}
  .sub{font-size:37px;color:var(--sub);max-width:1080px;line-height:1.5;margin-top:28px}
  .sub b{color:var(--ink)}
  .row{display:flex;gap:16px;margin-top:34px;flex-wrap:wrap}
  .dom{font-family:'JetBrains Mono';font-size:34px;font-weight:700;color:var(--grn);margin-top:38px;letter-spacing:.06em}`,
  `<div class="wrap">
     <div style="flex:none">${orb(620, 'mdk')}</div>
     <div>
       <div class="eyebrow" style="font-size:30px;margin-bottom:18px">▲ new · the ai credit engine ▲</div>
       <div class="name">Meet <span class="grad">The Desk.</span></div>
       <div class="sub">Every serious brokerage has a desk that structures the trade. Yours reads your entire bag and
         structures your <b>optimal loan in one click</b>: what to pledge, which tier, how much SOL, and exactly where to set your stops. It proposes — <b>the rules enforce.</b></div>
       <div class="row">${chip('READS YOUR BAG')}${chip('STRUCTURES THE LOAN', 'var(--lime)')}${chip('SETS YOUR STOPS', 'var(--ink)')}</div>
       <div class="dom">marginrh.xyz · $MARGIN · @MarginRH</div>
     </div>
   </div>`);

for (const [name, html] of Object.entries(assets)) {
  fs.writeFileSync(path.join(OUT, name + '.html'), html);
  console.log('wrote', name + '.html');
}
