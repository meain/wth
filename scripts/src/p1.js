// Family: data-viz as the hero. Variants 01-10.
(function () {
  const FAM = "data-viz as the hero";
  const f = n => (+n).toFixed(1);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  // temperature -> colour, scaled to the data's own min/max (set per render by setup)
  let LO = 20, HI = 32, H0 = 20;
  const setup = W => {
    const v = [...(W.hourlyTempC || []), ...(W.days || []).flatMap(d => [d.lo, d.hi]), W.now && W.now.tempC].filter(Number.isFinite);
    let a = v.length ? Math.min(...v) : 20, b = v.length ? Math.max(...v) : 32;
    if (b - a < 6) { const m = (a + b) / 2; a = m - 3; b = m + 3; }
    LO = a; HI = b; H0 = Number.isFinite(W.hour24) ? W.hour24 : 20;
  };
  const tc = (t, s = 70, l = 55) => `hsl(${Math.round(220 - clamp((t - LO) / (HI - LO || 1), 0, 1) * 205)},${s}%,${l}%)`;
  const maxMm = W => Math.max(3.1, ...W.rain24.map(r => +r.mm || 0));
  const pc = v => clamp(+v || 0, 0, 100);
  const hr = h => (h === 0 ? "12 AM" : h === 12 ? "12 PM" : h < 12 ? h + " AM" : h - 12 + " PM");
  const hrs = h => (h === 0 ? "12a" : h === 12 ? "12p" : h < 12 ? h + "a" : h - 12 + "p");
  const hourOf = i => (H0 + i) % 24; // hourlyTempC index -> clock hour
  const sun = W => { const d = W.details || {}; return Number.isFinite(d.sunriseMin) && Number.isFinite(d.sunsetMin) ? { sr: d.sunriseMin / 60, ss: d.sunsetMin / 60 } : null; };
  const WRAP = "overflow-wrap:anywhere;min-width:0";
  const smooth = p => {
    let d = `M${f(p[0][0])},${f(p[0][1])}`;
    for (let i = 0; i < p.length - 1; i++) {
      const p0 = p[i - 1] || p[i], p1 = p[i], p2 = p[i + 1], p3 = p[i + 2] || p2;
      d += `C${f(p1[0] + (p2[0] - p0[0]) / 6)},${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)},${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])},${f(p2[1])}`;
    }
    return d;
  };
  const det = d => [
    ["Humidity", d.humidity + "%"], ["Wind", `${d.windKmh} km/h ${d.windDir}`], ["UV index", d.uv],
    ["Cloud cover", d.cloud + "%"], ["Sunrise", d.sunrise], ["Sunset", d.sunset]
  ];
  const RM = id => `@media (prefers-reduced-motion: reduce){.d${id} *{animation:none !important}}`;

  /* ---------------- 01 24h dial ---------------- */
  V.push({
    id: "01", name: "24-hour Dial", family: FAM, level: "rich",
    blurb: "A clock face of the next day: the outer ring is hourly temperature coloured by heat, spokes pointing inward are rain chance, a gold arc marks daylight and the hand is 'now'. Inspired by the Weather Radials posters and radial temperature charts.",
    pro: "One glance answers 'when tonight does it rain and how cold does it get'.",
    con: "Hand-built SVG maths; clock metaphor takes a second to learn.",
    css: `.d01{background:#f7f3ea;color:#2a2620;font:13px/1.35 "Avenir Next","Segoe UI",sans-serif;padding:18px 20px;box-sizing:border-box;width:100%}
.d01 .hd{display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:6px}
.d01 .pl{font-size:20px;font-weight:700;overflow-wrap:anywhere;min-width:0}.d01 .sub{color:#7a7062}
.d01 .mid{display:flex;flex-wrap:wrap;gap:14px;align-items:center;margin:6px 0 4px}
.d01 svg.dial{width:310px;max-width:100%;height:auto;flex:none}
.d01 .side{flex:1;min-width:160px}
.d01 .lg{font-size:11px;color:#7a7062;margin:6px 0 10px}
.d01 .lg i{display:inline-block;width:10px;height:10px;border-radius:2px;vertical-align:-1px;margin-right:4px}
.d01 .rs{background:#fff;border-left:3px solid #3b6fd6;padding:7px 9px;font-size:12px;margin-bottom:10px}
.d01 dl{display:grid;grid-template-columns:auto 1fr;gap:3px 10px;margin:0;font-size:12px}.d01 dt{color:#7a7062}.d01 dd{margin:0;font-weight:600}
.d01 .wk{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-top:8px;text-align:center;font-size:11px}
.d01 .wk div{background:#fff;border-radius:8px;padding:6px 2px}
.d01 .wk b{display:block;font-size:12px}.d01 .wk .ic{font-size:18px;display:block}.d01 .wk .ds{color:#7a7062;display:block;min-height:28px}
.d01 .wk .p{color:#3b6fd6;font-weight:600}
.d01 .hand{transform-origin:170px 170px;animation:d01-sweep 1.4s cubic-bezier(.2,.8,.2,1)}
.d01 .rb{transform-origin:170px 170px;animation:d01-in 1s ease-out both}
@keyframes d01-sweep{from{transform:rotate(-300deg)}to{transform:rotate(0)}}
@keyframes d01-in{from{opacity:0}to{opacity:1}}
${RM("01")}`,
    render: W => {
      setup(W);
      const c = 170, pt = (r, a) => [c + r * Math.sin(a * Math.PI / 180), c - r * Math.cos(a * Math.PI / 180)];
      const seg = (r0, r1, a0, a1) => { const A = pt(r1, a0), B = pt(r1, a1), C = pt(r0, a1), D = pt(r0, a0), lg = a1 - a0 > 180 ? 1 : 0; return `M${f(A[0])},${f(A[1])}A${r1},${r1} 0 ${lg} 1 ${f(B[0])},${f(B[1])}L${f(C[0])},${f(C[1])}A${r0},${r0} 0 ${lg} 0 ${f(D[0])},${f(D[1])}Z`; };
      let s = "";
      const SN = sun(W);
      s += `<circle cx="${c}" cy="${c}" r="64" fill="#fff"/>`;
      if (SN) { const sr = SN.sr * 15; let ss = SN.ss * 15; if (ss <= sr) ss += 360; s += `<path d="${seg(58, 64, sr, Math.min(ss, sr + 359.9))}" fill="#e9b13b"/>` + (ss < sr + 359.9 ? `<path d="${seg(58, 64, ss, sr + 360)}" fill="#2c3550"/>` : ""); }
      W.hourlyTempC.forEach((t, i) => { const a = hourOf(i) * 15; s += `<path d="${seg(112, 130, a + 0.5, a + 14.5)}" fill="${tc(t)}"/>`; if (i % 3 === 0) { const p = pt(142, a + 7.5); s += `<text x="${f(p[0])}" y="${f(p[1] + 3)}" text-anchor="middle" font-size="10" font-weight="700" fill="${tc(t, 60, 38)}">${t}°</text>`; } });
      W.rain24.forEach(r => { const a = r.hour * 15 + 15, len = pc(r.prob) * 0.38, A = pt(106, a), B = pt(106 - len, a); s += `<line class="rb" x1="${f(A[0])}" y1="${f(A[1])}" x2="${f(B[0])}" y2="${f(B[1])}" stroke="#3b6fd6" stroke-width="7" stroke-linecap="round" opacity="${0.35 + r.prob / 160}"/>`; if (r.prob >= 50) { const L = pt(106 - len - 9, a); s += `<text x="${f(L[0])}" y="${f(L[1] + 3)}" text-anchor="middle" font-size="8" fill="#3b6fd6" font-weight="700">${r.prob}%</text>`; } });
      [0, 6, 12, 18].forEach(h => { const p = pt(158, h * 15); s += `<text x="${f(p[0])}" y="${f(p[1] + 3)}" text-anchor="middle" font-size="9" fill="#7a7062">${hr(h)}</text>`; });
      const na = (H0 + (+W.minute || 0) / 60) * 15, HB = pt(66, na), H1 = pt(136, na), HL = pt(150, na);
      s += `<g class="hand"><line x1="${f(HB[0])}" y1="${f(HB[1])}" x2="${f(H1[0])}" y2="${f(H1[1])}" stroke="#2a2620" stroke-width="2"/><circle cx="${f(H1[0])}" cy="${f(H1[1])}" r="4" fill="#2a2620"/><text x="${f(HL[0])}" y="${f(HL[1])}" text-anchor="middle" font-size="9" font-weight="700" fill="#2a2620">now</text></g>`;
      s += `<text x="${c}" y="${c - 14}" text-anchor="middle" font-size="22">${W.now.icon}</text><text x="${c}" y="${c + 16}" text-anchor="middle" font-size="28" font-weight="700" fill="#2a2620">${W.now.tempC}°C</text><text x="${c}" y="${c + 32}" text-anchor="middle" font-size="9" fill="#7a7062">${W.now.desc}</text>`;
      return `<div class="d01"><div class="hd"><span class="pl">${W.place}</span><span class="sub">${W.date} · ${W.localTime}</span></div>
<div class="mid"><svg class="dial" viewBox="0 0 340 340" role="img" aria-label="24 hour forecast dial">${s}</svg>
<div class="side"><div style="font-size:15px;font-weight:600">${W.now.icon} ${W.now.desc}, ${W.now.tempC}°C</div><div class="sub">Feels like ${W.now.feelsC}°C</div>
<div class="lg"><i style="background:linear-gradient(90deg,${tc(LO)},${tc(HI)})"></i>ring: temperature by hour<br><i style="background:#3b6fd6"></i>spokes: chance of rain<br><i style="background:#e9b13b"></i>daylight ${W.details.sunrise}–${W.details.sunset}</div>
<div class="rs">🌧️ Next 24h: ${W.rainSummary}</div>
<dl>${det(W.details).map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("")}</dl></div></div>
<div class="wk">${W.days.map(d => `<div><b>${d.name}</b><span class="ic">${d.icon}</span><span class="ds">${d.desc}</span>${d.lo}° / <b style="display:inline">${d.hi}°</b><br><span class="p">💧 ${d.pop}%</span></div>`).join("")}</div></div>`;
    }
  });

  /* ---------------- 02 Tide table ---------------- */
  V.push({
    id: "02", name: "Tide Table", family: FAM, level: "medium",
    blurb: "Temperature drawn like a tide chart: a filled swell across 24 hours with HIGH and LOW callouts, rain hanging from the top like soundings, and the week set as a harbour-master's table. Inspired by meteogram and tide-chart apps.",
    pro: "Calm, nautical, and the high/low callouts are instantly useful.",
    con: "Dark navy theme; small chart labels at 380px width.",
    css: `.d02{background:#0c1a2b;color:#dfe8f2;font:13px/1.4 "Iowan Old Style","Palatino",Georgia,serif;padding:20px;box-sizing:border-box;width:100%}
.d02 .top{display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:8px;border-bottom:1px solid #2a3d55;padding-bottom:10px}
.d02 .pl{font-size:13px;letter-spacing:.2em;text-transform:uppercase;color:#7fb7d9;overflow-wrap:anywhere;min-width:0}
.d02 .t{font-size:54px;line-height:1;font-weight:400}.d02 .t small{font-size:20px;color:#7fb7d9}
.d02 .cd{text-align:right;font-size:14px}.d02 .cd span{color:#93a8bf;font-size:12px;display:block}
.d02 svg{width:100%;height:auto;display:block;margin:10px 0 2px}
.d02 .wave{stroke-dasharray:6 4;animation:d02-flow 6s linear infinite}
@keyframes d02-flow{to{stroke-dashoffset:-100}}
.d02 .rs{font-style:italic;color:#9fc3df;font-size:12px;margin-bottom:12px}
.d02 table{width:100%;border-collapse:collapse;font-size:12.5px;font-variant-numeric:tabular-nums}
.d02 th{font-weight:400;color:#7fb7d9;text-align:left;font-size:10px;letter-spacing:.15em;text-transform:uppercase;border-bottom:1px solid #2a3d55;padding:4px}
.d02 td{padding:5px 4px;border-bottom:1px dotted #22344a}
.d02 td.n{text-align:right}.d02 .hi{color:#ffb38a}.d02 .lo{color:#8cc7ff}
.d02 .ft{display:grid;grid-template-columns:repeat(3,1fr);gap:6px 12px;margin-top:12px;font-size:12px}
.d02 .ft span{color:#7fb7d9;font-size:10px;letter-spacing:.12em;text-transform:uppercase;display:block}
${RM("02")}`,
    render: W => {
      setup(W);
      const T = W.hourlyTempC, n = T.length, X = i => 24 + i * (472 / ((n - 1) || 1));
      const tmin = Math.min(...T), tmax = Math.max(...T), tspan = Math.max(tmax - tmin, 4), toff = (tspan - (tmax - tmin)) / 2, mmx = maxMm(W);
      const Y = t => 165 - (t - tmin + toff) / tspan * 80;
      const pts = T.map((t, i) => [X(i), Y(t)]);
      const line = smooth(pts);
      let mx = 0, mn = 0; T.forEach((t, i) => { if (t > T[mx]) mx = i; if (t < T[mn]) mn = i; });
      const idxOf = h => ((h - H0 + 48) % 24);
      const SN = sun(W), sr = SN ? idxOf(SN.sr) : 0, ss = SN ? idxOf(SN.ss) : 0;
      let s = `<defs><linearGradient id="d02g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3fa7c9" stop-opacity=".55"/><stop offset="1" stop-color="#3fa7c9" stop-opacity="0"/></linearGradient></defs>`;
      s += `<line x1="20" y1="18" x2="500" y2="18" stroke="#2a3d55"/>`;
      W.rain24.forEach((r, k) => { const x = X(k * 2) + 1, h = (+r.mm || 0) / mmx * 40; s += `<rect x="${f(x)}" y="18" width="${f(472 / 12 - 6)}" height="${f(Math.max(h, 1))}" fill="#6fa8ff" opacity="${0.3 + r.prob / 150}" rx="2"/><text x="${f(x + 16)}" y="${f(30 + h)}" text-anchor="middle" font-size="8.5" fill="#9fc3df">${pc(r.prob)}%</text>`; });
      s += `<text x="22" y="12" font-size="8.5" fill="#7fb7d9" letter-spacing="1">RAIN mm · CHANCE</text>`;
      (SN ? [[sr, "SUNRISE " + W.details.sunrise], [ss, "SUNSET " + W.details.sunset]] : []).forEach(([i, l]) => { const rt = X(i) > 380; s += `<line x1="${f(X(i))}" y1="70" x2="${f(X(i))}" y2="200" stroke="#e9c46a" stroke-dasharray="2 3"/><text x="${f(X(i) + (rt ? -3 : 3))}" y="78" ${rt ? 'text-anchor="end" ' : ""}font-size="8" fill="#e9c46a">${l}</text>`; });
      s += `<path d="${line} L${f(X(n - 1))},200 L${f(X(0))},200Z" fill="url(#d02g)"/><path class="wave" d="${line}" fill="none" stroke="#7fd3ee" stroke-width="2"/>`;
      s += `<circle cx="${f(X(mx))}" cy="${f(Y(T[mx]))}" r="3.5" fill="#ffb38a"/><text x="${f(X(mx))}" y="${f(Y(T[mx]) - 9)}" text-anchor="middle" font-size="10" fill="#ffb38a">HIGH ${T[mx]}° · ${hr(hourOf(mx))}</text>`;
      s += `<circle cx="${f(X(mn))}" cy="${f(Y(T[mn]))}" r="3.5" fill="#8cc7ff"/><text x="${f(X(mn))}" y="${f(Y(T[mn]) + 18)}" text-anchor="middle" font-size="10" fill="#8cc7ff">LOW ${T[mn]}° · ${hr(hourOf(mn))}</text>`;
      s += `<circle cx="${f(X(0))}" cy="${f(Y(T[0]))}" r="3.5" fill="#fff"/><text x="${f(X(0) + 6)}" y="${f(Y(T[0]) - 6)}" font-size="9" fill="#fff">now</text>`;
      for (let i = 0; i < n; i += 4) s += `<text x="${f(X(i))}" y="214" text-anchor="middle" font-size="9" fill="#93a8bf">${hr(hourOf(i))}</text>`;
      return `<div class="d02"><div class="top"><div><div class="pl">${W.place}</div><div class="t">${W.now.tempC}<small>°C</small></div></div>
<div class="cd">${W.now.icon} ${W.now.desc}<span>Feels like ${W.now.feelsC}°C · ${W.date}, ${W.localTime}</span></div></div>
<svg viewBox="0 0 520 220" role="img" aria-label="24 hour temperature and rain chart">${s}</svg>
<div class="rs">🌧️ ${W.rainSummary}</div>
<table><tr><th>Day</th><th>Conditions</th><th class="n">Low</th><th class="n">High</th><th class="n">Rain</th></tr>
${W.days.map(d => `<tr><td>${d.name}</td><td>${d.icon} ${d.desc}</td><td class="n lo">${d.lo}°</td><td class="n hi">${d.hi}°</td><td class="n">${d.pop}%</td></tr>`).join("")}</table>
<div class="ft">${det(W.details).map(([k, v]) => `<div><span>${k}</span>${v}</div>`).join("")}</div></div>`;
    }
  });

  /* ---------------- 03 Ledger sparks ---------------- */
  V.push({
    id: "03", name: "Ledger Sparks", family: FAM, level: "simple",
    blurb: "A broadsheet-style page where Tufte word-sized sparklines sit inside the sentences: the 24h temperature and rain run inline with the text, and each day carries a tiny range rule. Inspired by Weather Line's 'just a line' approach and sparkline typography.",
    pro: "Pure HTML/CSS, reads like a newspaper, tiny footprint.",
    con: "Sparklines are small; exact values rely on the text.",
    css: `.d03{background:#f4f0e6;color:#1d1b17;font:14px/1.5 Georgia,"Times New Roman",serif;padding:22px 26px;box-sizing:border-box;width:100%}
.d03 .mast{display:flex;justify-content:space-between;border-top:3px double #1d1b17;border-bottom:1px solid #1d1b17;padding:4px 0;font-size:11px;letter-spacing:.14em;text-transform:uppercase}
.d03 h1{font-size:30px;margin:10px 0 0;font-weight:700;line-height:1.1;overflow-wrap:anywhere}
.d03 .lead{display:flex;gap:18px;align-items:flex-start;flex-wrap:wrap;margin-top:6px}
.d03 .big{font-size:84px;line-height:.9;font-weight:700;letter-spacing:-.04em}.d03 .big sup{font-size:26px;letter-spacing:0}
.d03 .lt{flex:1;min-width:200px;font-size:14.5px}
.d03 .sp{display:inline-flex;align-items:flex-end;gap:1px;height:22px;vertical-align:-4px;margin:0 3px;padding:0 2px;border-bottom:1px solid #8a8272}
.d03 .sp i{display:block;width:3px;background:#1d1b17}
.d03 .sp.r i{width:7px;background:#2f5fb3}
.d03 .sp i.now{background:#c0392b}
.d03 h2{font-size:11px;letter-spacing:.18em;text-transform:uppercase;border-bottom:1px solid #1d1b17;margin:16px 0 4px;padding-bottom:2px}
.d03 .row{display:grid;grid-template-columns:44px 1fr 32px 110px 32px 40px;gap:8px;align-items:center;padding:3px 0;border-bottom:1px dotted #b9b19f;font-size:13px}
.d03 .row .n{text-align:right;font-variant-numeric:tabular-nums}
.d03 .rg{position:relative;height:6px;background:#e2dccd}
.d03 .rg i{position:absolute;top:0;bottom:0;background:linear-gradient(90deg,#4b7bd1,#d1603d)}
.d03 .pp{color:#2f5fb3;font-style:italic;text-align:right}
.d03 .dt{columns:3 120px;font-size:13px}.d03 .dt div{break-inside:avoid}.d03 .dt b{font-variant:small-caps;font-weight:400;color:#6b6456}
${RM("03")}`,
    render: W => {
      setup(W);
      const T = W.hourlyTempC, mn = Math.min(...T), mxT = Math.max(...T), tsp = (mxT - mn) || 1;
      const iMn = T.indexOf(mn), iMx = T.indexOf(mxT);
      const spT = `<span class="sp" title="24h temperature">${T.map((t, i) => `<i${i === 0 ? ' class="now"' : ""} style="height:${(4 + (t - mn) / tsp * 16).toFixed(1)}px"></i>`).join("")}</span>`;
      const spR = `<span class="sp r" title="24h rain chance">${W.rain24.map(r => `<i style="height:${(2 + pc(r.prob) * 0.2).toFixed(1)}px"></i>`).join("")}</span>`;
      const dall = W.days.flatMap(d => [d.lo, d.hi]), lo = Math.min(...dall), span = (Math.max(...dall) - lo) || 1;
      return `<div class="d03"><div class="mast"><span>${W.date}</span><span>${W.localTime}</span></div>
<h1>${W.place}</h1>
<div class="lead"><div class="big">${W.now.tempC}<sup>°C</sup></div>
<div class="lt">${W.now.icon} <b>${W.now.desc}</b>, feels like ${W.now.feelsC}°C. Over the next 24 hours the temperature runs ${spT} from a low of ${mn}°C around ${hr(hourOf(iMn))} to a high of ${mxT}°C around ${hr(hourOf(iMx))}. Rain chance ${spR} peaks at ${Math.max(0, ...W.rain24.map(r => pc(r.prob)))}%: ${W.rainSummary}</div></div>
<h2>The week</h2>
${W.days.map(d => `<div class="row"><b>${d.name}</b><span>${d.icon} ${d.desc}</span><span class="n">${d.lo}°</span><span class="rg"><i style="left:${((d.lo - lo) / span * 100).toFixed(1)}%;width:${Math.max(((d.hi - d.lo) / span * 100), 2).toFixed(1)}%"></i></span><span class="n">${d.hi}°</span><span class="pp">${d.pop}%</span></div>`).join("")}
<h2>Particulars</h2><div class="dt">${det(W.details).map(([k, v]) => `<div><b>${k}</b> ${v}</div>`).join("")}</div></div>`;
    }
  });

  /* ---------------- 04 LED dot matrix ---------------- */
  V.push({
    id: "04", name: "Dot Matrix", family: FAM, level: "simple",
    blurb: "A departures-board / LED panel where every chart is made of lit dots: ten dots per rain slot, ten per day's rain chance, and the temperatures in amber monospace. Inspired by dot-matrix and waffle charts.",
    pro: "Counting dots makes percentages tangible; pure CSS grid.",
    con: "Very stylised; amber-on-black is loud for some.",
    css: `.d04{background:#0b0b0a;color:#ffb000;font:12.5px/1.45 "SF Mono",Menlo,Consolas,monospace;padding:18px 20px;box-sizing:border-box;width:100%}
.d04 .hd{display:flex;justify-content:space-between;flex-wrap:wrap;gap:4px;overflow-wrap:anywhere;color:#b07a00;font-size:11px;text-transform:uppercase;letter-spacing:.1em}
.d04 .now{display:flex;align-items:baseline;gap:14px;flex-wrap:wrap;margin:6px 0 10px}
.d04 .t{font-size:60px;line-height:1;text-shadow:0 0 12px #ff9d0066}
.d04 .lb{font-size:10px;letter-spacing:.14em;color:#b07a00;text-transform:uppercase;margin:12px 0 5px;border-top:1px dashed #3a2a00;padding-top:8px}
.d04 .mx{display:grid;grid-template-columns:repeat(12,1fr);gap:4px;text-align:center}
.d04 .col{display:flex;flex-direction:column-reverse;align-items:center;gap:3px}
.d04 .dot{width:8px;height:8px;border-radius:50%;background:#2a1f00}
.d04 .dot.on{background:#ffb000;box-shadow:0 0 5px #ffb000aa}
.d04 .dot.b.on{background:#4fc3ff;box-shadow:0 0 5px #4fc3ffaa}
.d04 .ax{font-size:9.5px;color:#b07a00}.d04 .pv{font-size:10px;color:#4fc3ff}
.d04 .rs{color:#4fc3ff;margin-top:6px}
.d04 .dy{display:grid;grid-template-columns:44px 1fr minmax(66px,auto) auto 36px;gap:8px;align-items:center;padding:2px 0}
.d04 .dy .ds{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d04 .dr{display:flex;gap:2px}.d04 .dr .dot{width:6px;height:6px}
.d04 .kv{display:grid;grid-template-columns:repeat(3,1fr);gap:2px 10px}.d04 .kv span{color:#b07a00}
${RM("04")}`,
    render: W => {
      setup(W);
      const dots = (n, cls = "") => Array.from({ length: 10 }, (_, i) => `<i class="dot ${cls}${i < n ? " on" : ""}"></i>`).join("");
      return `<div class="d04"><div class="hd"><span>${W.place}</span><span>${W.date} ${W.localTime}</span></div>
<div class="now"><span class="t">${W.now.tempC}°C</span><span>${W.now.icon} ${W.now.desc.toUpperCase()}<br>FEELS ${W.now.feelsC}°C</span></div>
<div class="lb">Rain chance, next 24h (1 dot = 10%)</div>
<div class="mx">${W.rain24.map(r => `<div class="col"><span class="ax">${hrs(r.hour)}</span>${dots(Math.round(r.prob / 10), "b")}<span class="pv">${pc(r.prob)}</span></div>`).join("")}</div>
<div class="rs">🌧️ ${W.rainSummary}</div>
<div class="lb">7 days · low/high · rain chance</div>
${W.days.map(d => `<div class="dy"><span>${d.name.toUpperCase()}</span><span class="ds">${d.icon} ${d.desc}</span><span>${d.lo}°/${d.hi}°</span><span class="dr">${dots(Math.round(d.pop / 10), "b")}</span><span>${d.pop}%</span></div>`).join("")}
<div class="lb">Conditions</div>
<div class="kv">${det(W.details).map(([k, v]) => `<div><span>${k.toUpperCase()}</span> ${v}</div>`).join("")}</div></div>`;
    }
  });

  /* ---------------- 05 Heat calendar ---------------- */
  V.push({
    id: "05", name: "Heat Calendar", family: FAM, level: "simple",
    blurb: "Everything is a heatmap cell: 24 hourly temperature tiles, 12 rain tiles shaded by chance, and a week calendar where each day's tile fades from its low to its high colour. Inspired by GitHub-style contribution calendars and Cédric Scherer's daily temperature charts.",
    pro: "Colour carries the pattern, numbers stay printed in every cell.",
    con: "Relies heavily on colour; needs the printed numbers for colour-blind users.",
    css: `.d05{background:#fbfaf6;color:#22252b;font:13px/1.4 "Helvetica Neue",Arial,sans-serif;padding:20px;box-sizing:border-box;width:100%}
.d05 .hd{display:flex;align-items:center;gap:14px;flex-wrap:wrap}
.d05 .tt{width:86px;height:86px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:34px;font-weight:700;color:#fff}
.d05 .pl{font-size:20px;font-weight:700;overflow-wrap:anywhere;min-width:0}.d05 .mu{color:#6c7280;font-size:12px}
.d05 h3{font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:#6c7280;margin:14px 0 5px;font-weight:600}
.d05 .hm{display:grid;grid-template-columns:repeat(12,1fr);gap:3px}
.d05 .hm div{border-radius:4px;text-align:center;padding:4px 0 3px;font-size:11px;font-weight:700;color:#1e1e1e}
.d05 .hm small{display:block;font-weight:400;font-size:9px;opacity:.75}
.d05 .rn div{color:#14305e}
.d05 .rs{font-size:12px;margin-top:5px;color:#2b4f8f}
.d05 .wk{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}
.d05 .wk div{border-radius:8px;padding:6px 4px;text-align:center;font-size:11px;color:#1e1e1e;min-height:110px;display:flex;flex-direction:column;justify-content:space-between}
.d05 .wk b{font-size:12px}.d05 .wk .ic{font-size:18px}
.d05 .wk .p{background:#ffffffb0;border-radius:6px;padding:1px 0;color:#1d4fa5;font-weight:700}
.d05 .dt{display:grid;grid-template-columns:repeat(6,1fr);gap:4px}
.d05 .dt div{background:#eef0f3;border-radius:6px;padding:6px;font-size:13px;font-weight:700}
.d05 .dt span{display:block;font-size:9.5px;font-weight:400;color:#6c7280;text-transform:uppercase}
@media (max-width:420px){.d05 .dt{grid-template-columns:repeat(3,1fr)}}
${RM("05")}`,
    render: W => (setup(W), `<div class="d05"><div class="hd"><div class="tt" style="background:${tc(W.now.tempC)}">${W.now.tempC}°</div>
<div><div class="pl">${W.place}</div><div>${W.now.icon} ${W.now.desc} · ${W.now.tempC}°C, feels like ${W.now.feelsC}°C</div><div class="mu">${W.date}, ${W.localTime}</div></div></div>
<h3>Temperature by hour (°C)</h3>
<div class="hm">${W.hourlyTempC.map((t, i) => `<div style="background:${tc(t, 75, 72)}">${t}°<small>${hrs(hourOf(i))}</small></div>`).join("")}</div>
<h3>Chance of rain, 2-hour blocks</h3>
<div class="hm rn">${W.rain24.map(r => `<div style="background:hsl(214,80%,${96 - pc(r.prob) * 0.42}%)">${r.prob}%<small>${hrs(r.hour)}</small></div>`).join("")}</div>
<div class="rs">🌧️ ${W.rainSummary}</div>
<h3>Week (tile fades from low to high)</h3>
<div class="wk">${W.days.map(d => `<div style="background:linear-gradient(${tc(d.hi, 75, 74)},${tc(d.lo, 75, 80)})"><b>${d.name}</b><span class="ic">${d.icon}</span><span>${d.desc}</span><span>${d.hi}° / ${d.lo}°</span><span class="p">💧${d.pop}%</span></div>`).join("")}</div>
<h3>Details</h3>
<div class="dt">${det(W.details).map(([k, v]) => `<div><span>${k}</span>${v}</div>`).join("")}</div></div>`)
  });

  /* ---------------- 06 Small multiples ---------------- */
  V.push({
    id: "06", name: "Small Multiples", family: FAM, level: "medium",
    blurb: "Tufte-style small multiples: seven identical day panels share one temperature axis and a rain 'glass', and the details become six matching mini gauges (rings, a wind arrow, a daylight arc). Inspired by small-multiple forecast grids and Weather Strip's compact panels.",
    pro: "Days compare honestly because every panel uses the same scale.",
    con: "Many tiny SVGs; individual panels are small on phones.",
    css: `.d06{background:#efebe3;color:#26231f;font:12.5px/1.35 "Gill Sans","Trebuchet MS",sans-serif;padding:20px;box-sizing:border-box;width:100%}
.d06 .hd{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;align-items:flex-end}
.d06 .t{font-size:46px;line-height:1;font-weight:300}.d06 .pl{font-size:16px;font-weight:600;overflow-wrap:anywhere;min-width:0}.d06 .mu{color:#7b746a}
.d06 .r24{background:#fff;border-radius:10px;padding:8px 10px;margin:12px 0}
.d06 .r24 svg{width:100%;height:auto;display:block}
.d06 h4{margin:12px 0 6px;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#7b746a;font-weight:600}
.d06 .gr{display:grid;grid-template-columns:repeat(7,1fr);gap:5px}
.d06 .gr>div{background:#fff;border-radius:8px;padding:6px 3px;text-align:center}
.d06 .gr b{display:block;font-size:12px}.d06 .gr .ds{display:block;font-size:10px;color:#7b746a;min-height:26px}
.d06 .gr svg{width:100%;max-width:62px;height:auto}
.d06 .g6{display:grid;grid-template-columns:repeat(6,1fr);gap:5px}
.d06 .g6>div{background:#fff;border-radius:8px;padding:6px 2px;text-align:center;font-size:11px}
.d06 .g6 svg{width:46px;height:46px;display:block;margin:0 auto 2px}
.d06 .g6 span{display:block;color:#7b746a;font-size:9.5px;text-transform:uppercase}
@media (max-width:420px){.d06 .g6{grid-template-columns:repeat(3,1fr)}}
${RM("06")}`,
    render: W => {
      setup(W);
      const dall = W.days.flatMap(d => [d.lo, d.hi]);
      let lo = Math.floor(Math.min(...dall)), hi = Math.ceil(Math.max(...dall)); if (hi - lo < 3) { lo -= 1; hi += 2; }
      const Y = t => 70 - (t - lo) / (hi - lo) * 60;
      const panel = (d, k) => `<div><b>${d.name}</b><div style="font-size:17px">${d.icon}</div><span class="ds">${d.desc}</span>
<svg viewBox="0 0 62 82"><line x1="18" y1="10" x2="18" y2="70" stroke="#ddd6ca" stroke-width="6" stroke-linecap="round"/>
<line x1="18" y1="${f(Y(d.hi))}" x2="18" y2="${f(Y(d.lo))}" stroke="url(#d06t${k})" stroke-width="6" stroke-linecap="round"/>
<defs><linearGradient id="d06t${k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${tc(d.hi)}"/><stop offset="1" stop-color="${tc(d.lo)}"/></linearGradient></defs>
<text x="25" y="${f(Y(d.hi) + 3)}" font-size="9" fill="#26231f" font-weight="700">${d.hi}°</text><text x="25" y="${f(Y(d.lo) + 3)}" font-size="9" fill="#7b746a">${d.lo}°</text>
<rect x="44" y="40" width="12" height="30" rx="2" fill="none" stroke="#9db6dd"/><rect x="45" y="${f(69 - pc(d.pop) * 0.28)}" width="10" height="${f(pc(d.pop) * 0.28)}" fill="#3e74c9"/>
<text x="50" y="80" text-anchor="middle" font-size="8.5" fill="#3e74c9">${d.pop}%</text></svg></div>`;
      const ring = (v, max, col, label, txt) => { const C = 2 * Math.PI * 18; return `<div><svg viewBox="0 0 46 46"><circle cx="23" cy="23" r="18" fill="none" stroke="#eee8de" stroke-width="5"/><circle cx="23" cy="23" r="18" fill="none" stroke="${col}" stroke-width="5" stroke-dasharray="${f(C * clamp((+v || 0) / max, 0, 1))} ${f(C)}" transform="rotate(-90 23 23)"/><text x="23" y="26" text-anchor="middle" font-size="10" font-weight="700" fill="#26231f">${v}</text></svg><span>${label}</span>${txt}</div>`; };
      const dirs = { N: 0, NE: 45, E: 90, SE: 135, S: 180, SW: 225, W: 270, NW: 315 };
      const D = W.details, wd = dirs[D.windDir] || 0;
      const SN = sun(W), dh = SN ? ((SN.ss - SN.sr + 24) % 24) : 0, dayFrac = dh / 24;
      const arc = `<svg viewBox="0 0 46 46"><path d="M5,32 A18,18 0 0 1 41,32" fill="none" stroke="#eee8de" stroke-width="4"/><path d="M5,32 A18,18 0 0 1 41,32" fill="none" stroke="#e7a83a" stroke-width="4" stroke-dasharray="${f(Math.PI * 18 * clamp(dayFrac * 2, 0, 1))} 200"/><line x1="2" y1="32" x2="44" y2="32" stroke="#26231f" stroke-width="1"/><text x="23" y="43" text-anchor="middle" font-size="8" fill="#26231f">${SN ? f(dh) + "h" : "—"}</text></svg>`;
      const R = W.rain24, bw = 480 / 12;
      const r24 = `<svg viewBox="0 0 500 92">${R.map((r, k) => `<rect x="${f(10 + k * bw + 4)}" y="${f(64 - pc(r.prob) * 0.5)}" width="${f(bw - 8)}" height="${f(pc(r.prob) * 0.5)}" rx="3" fill="#3e74c9" opacity="${0.35 + pc(r.prob) / 160}"/><text x="${f(10 + k * bw + bw / 2)}" y="${f(60 - pc(r.prob) * 0.5)}" text-anchor="middle" font-size="9" fill="#3e74c9">${r.prob}%</text><text x="${f(10 + k * bw + bw / 2)}" y="78" text-anchor="middle" font-size="9" fill="#7b746a">${hrs(r.hour)}</text>`).join("")}<line x1="10" y1="64" x2="490" y2="64" stroke="#cfc6b8"/></svg>`;
      return `<div class="d06"><div class="hd"><div><div class="pl">${W.place}</div><div class="mu">${W.date} · ${W.localTime}</div></div>
<div style="text-align:right"><div class="t">${W.now.tempC}°C</div>${W.now.icon} ${W.now.desc} · feels ${W.now.feelsC}°C</div></div>
<div class="r24"><b>🌧️ Rain chance, next 24h</b> <span class="mu">— ${W.rainSummary}</span>${r24}</div>
<h4>Seven days, one shared scale (${lo}–${hi}°C) · glass = rain chance</h4>
<div class="gr">${W.days.map(panel).join("")}</div>
<h4>Right now</h4>
<div class="g6">${ring(D.humidity, 100, "#3e74c9", "Humidity", D.humidity + "%")}${ring(D.uv, 11, "#d9772b", "UV index", D.uv + " of 11")}${ring(D.cloud, 100, "#8a94a6", "Cloud", D.cloud + "%")}
<div><svg viewBox="0 0 46 46"><circle cx="23" cy="23" r="18" fill="none" stroke="#eee8de" stroke-width="2"/><text x="23" y="9" text-anchor="middle" font-size="6" fill="#7b746a">N</text><g transform="rotate(${wd + 180} 23 23)"><line x1="23" y1="34" x2="23" y2="12" stroke="#26231f" stroke-width="2.5"/><path d="M17,17 L23,9 L29,17Z" fill="#26231f"/></g></svg><span>Wind</span>${D.windKmh} km/h from ${D.windDir}</div>
<div>${arc}<span>Sunrise</span>${D.sunrise}</div><div>${arc}<span>Sunset</span>${D.sunset}</div></div></div>`;
    }
  });

  /* ---------------- 07 Streamgraph ---------------- */
  V.push({
    id: "07", name: "Night Stream", family: FAM, level: "rich",
    blurb: "The next 24 hours as a flowing streamgraph: warmth, rain chance and rainfall are stacked layers around a centre line, so the stream visibly swells with rain before dawn and turns warm by afternoon. Inspired by Weather Strip's stacked condition bands and streamgraph forecasts.",
    pro: "Striking and genuinely shows how conditions trade off over the day.",
    con: "Stacked layers trade precision for shape; heaviest SVG of the set.",
    css: `.d07{background:radial-gradient(120% 80% at 20% 0%,#2a1d4a,#110c1d 70%);color:#ece6ff;font:13px/1.4 "Futura","Century Gothic",sans-serif;padding:20px;box-sizing:border-box;width:100%}
.d07 .hd{display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;align-items:flex-end}
.d07 .t{font-size:58px;line-height:1;font-weight:300}.d07 .t small{font-size:20px;color:#b9a8ff}
.d07 .mu{color:#9d92bd;font-size:12px}
.d07 svg{width:100%;height:auto;display:block;margin:8px 0 0}
.d07 .ly{animation:d07-in 1.6s ease-out both;transform-origin:260px 110px}
.d07 .ly2{animation-delay:.25s}.d07 .ly3{animation-delay:.5s}
.d07 .nw{animation:d07-pulse 2.4s ease-in-out infinite}
@keyframes d07-in{from{opacity:0;transform:scaleY(.2)}to{opacity:1;transform:scaleY(1)}}
@keyframes d07-pulse{50%{opacity:.35}}
.d07 .lg{display:flex;gap:12px;flex-wrap:wrap;font-size:11px;color:#c8bfe6}.d07 .lg i{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:4px;vertical-align:-1px}
.d07 .rs{margin:8px 0 12px;padding:8px 10px;border-radius:8px;background:#ffffff10;font-size:12.5px}
.d07 .wk{display:grid;gap:4px}
.d07 .w{display:grid;grid-template-columns:44px 120px minmax(0,1fr) 44px;gap:8px;align-items:center;font-size:12px}
.d07 .tr{position:relative;height:14px;border-radius:7px;background:#ffffff0d}
.d07 .tr i{position:absolute;top:2px;bottom:2px;border-radius:5px}
.d07 .tr em{position:absolute;top:-1px;font-style:normal;font-size:10px;color:#fff;white-space:nowrap}
.d07 .w .p{color:#8fc2ff;text-align:right}
.d07 .dt{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:12px;font-size:12px}
.d07 .dt span{display:block;color:#9d92bd;font-size:10px;text-transform:uppercase;letter-spacing:.1em}
${RM("07")}`,
    render: W => {
      setup(W);
      const R = W.rain24, n = R.length, X = k => 20 + k * (480 / ((n - 1) || 1)), cy = 108;
      const TH = W.hourlyTempC, tt = k => { const v = TH[k * 2]; return Number.isFinite(v) ? v : TH[TH.length - 1]; };
      const tmn = Math.min(...TH), tsp = (Math.max(...TH) - tmn) || 1, mmx = maxMm(W);
      const a = R.map((r, k) => 14 + (tt(k) - tmn) / tsp * 28), b = R.map(r => pc(r.prob) * 0.55), c = R.map(r => (+r.mm || 0) / mmx * 40);
      const base = R.map((r, k) => cy - (a[k] + b[k] + c[k]) / 2);
      const L0 = base, L1 = base.map((y, k) => y + a[k]), L2 = L1.map((y, k) => y + b[k]), L3 = L2.map((y, k) => y + c[k]);
      const P = arr => arr.map((y, k) => [X(k), y]);
      const band = (top, bot) => smooth(P(top)) + " " + smooth(P(bot).reverse()).replace(/^M/, "L") + "Z";
      let s = `<defs><linearGradient id="d07w" x1="0" y1="0" x2="1" y2="0">${R.map((r, k) => `<stop offset="${f(k / (n - 1))}" stop-color="${tc(tt(k), 80, 60)}"/>`).join("")}</linearGradient></defs>`;
      const SN = sun(W);
      if (SN) {
        const sr = (SN.sr - H0 + 48) % 24 / 2, ss = (SN.ss - H0 + 48) % 24 / 2, dr = (x, w) => `<rect x="${f(x)}" y="4" width="${f(Math.max(w, 0))}" height="190" fill="#ffd36b" opacity=".06"/>`;
        s += ss >= sr ? dr(X(sr), X(ss) - X(sr)) : dr(X(0), X(ss) - X(0)) + dr(X(sr), X(n - 1) - X(sr));
        const sa = X(sr) > 360 ? "end" : "start", ta = X(ss) < 160 ? "start" : "end";
        s += `<text x="${f(X(sr) + (sa === "end" ? -3 : 3))}" y="14" text-anchor="${sa}" font-size="9" fill="#ffd36b">☀️ sunrise ${W.details.sunrise}</text><text x="${f(X(ss) + (ta === "end" ? -3 : 3))}" y="${Math.abs(X(ss) - X(sr)) < 150 ? 24 : 14}" text-anchor="${ta}" font-size="9" fill="#ffd36b">sunset ${W.details.sunset}</text>`;
      }
      s += `<path class="ly" d="${band(L0, L1)}" fill="url(#d07w)" opacity=".92"/>`;
      s += `<path class="ly ly2" d="${band(L1, L2)}" fill="#6f8dff" opacity=".8"/>`;
      s += `<path class="ly ly3" d="${band(L2, L3)}" fill="#3ad0ff" opacity=".85"/>`;
      R.forEach((r, k) => { if (k % 2 === 0) s += `<text x="${f(X(k))}" y="${f(L0[k] - 5)}" text-anchor="middle" font-size="9.5" fill="#ffd8c2">${tt(k)}°</text>`; if (r.prob >= 50) s += `<text x="${f(X(k))}" y="${f(L3[k] + 12)}" text-anchor="middle" font-size="9" fill="#9fe6ff">${pc(r.prob)}% · ${(+r.mm || 0).toFixed(1)}mm</text>`; });
      s += `<line class="nw" x1="${X(0)}" y1="20" x2="${X(0)}" y2="196" stroke="#fff" stroke-dasharray="2 3"/><text x="${X(0) + 4}" y="28" font-size="9" fill="#fff">now</text>`;
      R.forEach((r, k) => { if (k % 2 === 0) s += `<text x="${f(X(k))}" y="210" text-anchor="middle" font-size="9" fill="#9d92bd">${hr(r.hour)}</text>`; });
      const dall = W.days.flatMap(d => [d.lo, d.hi]), gl = Math.min(...dall) - 1, gh = Math.max(...dall) + 1, P2 = t => clamp((t - gl) / ((gh - gl) || 1) * 100, 0, 100).toFixed(1);
      return `<div class="d07"><div class="hd"><div><div style="font-size:16px;font-weight:600;overflow-wrap:anywhere">${W.place}</div><div class="mu">${W.date} · ${W.localTime}</div></div>
<div style="text-align:right"><div class="t">${W.now.tempC}<small>°C</small></div>${W.now.icon} ${W.now.desc} · feels like ${W.now.feelsC}°C</div></div>
<svg viewBox="0 0 520 216" role="img" aria-label="24 hour streamgraph of temperature, rain chance and rainfall">${s}</svg>
<div class="lg"><span><i style="background:linear-gradient(90deg,${tc(LO)},${tc(HI)})"></i>warmth (°C)</span><span><i style="background:#6f8dff"></i>chance of rain</span><span><i style="background:#3ad0ff"></i>rainfall (mm)</span></div>
<div class="rs">🌧️ ${W.rainSummary}</div>
<div class="wk">${W.days.map(d => `<div class="w"><b>${d.name}</b><span>${d.icon} ${d.desc}</span><span class="tr"><i style="left:${P2(d.lo)}%;right:${(100 - P2(d.hi)).toFixed(1)}%;background:linear-gradient(90deg,${tc(d.lo, 80, 60)},${tc(d.hi, 80, 60)})"></i><em style="left:max(0px,calc(${P2(d.lo)}% - 26px))">${d.lo}°</em><em style="left:calc(${P2(d.hi)}% + 4px)">${d.hi}°</em></span><span class="p">💧${d.pop}%</span></div>`).join("")}</div>
<div class="dt">${det(W.details).map(([k, v]) => `<div><span>${k}</span>${v}</div>`).join("")}</div></div>`;
    }
  });

  /* ---------------- 08 Floating range ---------------- */
  V.push({
    id: "08", name: "Floating Ranges", family: FAM, level: "medium",
    blurb: "A crisp analyst view: a Weather Line-style 24h temperature line with the degrees written above it and rain bars beneath, then the week as floating low-to-high bars on one shared axis. Inspired by Weather Line and Dark Sky's range bars.",
    pro: "Most precise and familiar chart reading of the set.",
    con: "Looks like a well-made chart, less like a 'place'.",
    css: `.d08{--bg:#ffffff;--fg:#14161a;--mu:#6b7280;--bl:#1f5fd1;--ln:#f0f1f3;--ln2:#eceef1;background:var(--bg);color:var(--fg);font:13px/1.4 -apple-system,"Inter","Segoe UI",sans-serif;padding:20px 22px;box-sizing:border-box;width:100%}
.d08 .hd{display:flex;flex-direction:column;gap:4px;align-items:center;text-align:center;padding:6px 0 4px}
.d08 .t{font-size:52px;font-weight:700;letter-spacing:-.03em;line-height:1}
.d08 .pl{font-weight:700;font-size:17px;overflow-wrap:anywhere;min-width:0}.d08 .mu{color:var(--mu);font-size:12px}.d08 .ds{font-size:14px}
.d08 .sv{overflow-x:auto;-webkit-overflow-scrolling:touch;margin-top:10px}
.d08 svg{width:100%;min-width:460px;height:auto;display:block}
.d08 .rs{font-size:13px;color:var(--bl);margin:4px 0 14px;text-align:center}
.d08 .sh{display:none;text-align:center;font-size:11px;color:var(--mu);margin-top:2px}
.d08 .row{display:grid;grid-template-columns:42px 126px minmax(0,1fr) 48px;gap:8px;align-items:center;padding:5px 0;border-top:1px solid var(--ln);font-size:12.5px}
.d08 .tr{position:relative;height:22px;margin:0 22px}
.d08 .tr i{position:absolute;top:8px;height:6px;border-radius:3px}
.d08 .tr em{position:absolute;top:2px;font-style:normal;font-size:11px;font-variant-numeric:tabular-nums}
.d08 .tr .l{color:var(--mu);transform:translateX(-100%);padding-right:5px}.d08 .tr .h{font-weight:700;padding-left:5px}
.d08 .p{display:flex;align-items:center;gap:4px;color:var(--bl);font-weight:600;font-size:11.5px;justify-content:flex-end}
.d08 .dt{display:grid;grid-template-columns:repeat(6,1fr);gap:1px;background:var(--ln2);border:1px solid var(--ln2);border-radius:10px;overflow:hidden;margin-top:14px;text-align:center}
.d08 .dt div{padding:9px 4px;font-weight:600;background:var(--bg)}
.d08 .dt span{display:block;font-size:10px;font-weight:400;color:var(--mu)}
@media (prefers-color-scheme:dark){.d08{--bg:#0d1117;--fg:#e8ecf2;--mu:#98a2b3;--bl:#6ea8ff;--ln:#1c232c;--ln2:#232b36}}
@media (max-width:520px){.d08{padding:16px 14px}.d08 .sh{display:block}.d08 .t{font-size:60px}.d08 .dt{grid-template-columns:repeat(3,1fr)}.d08 .row{grid-template-columns:44px 1fr auto;grid-template-areas:"dn dc p" "tr tr tr";row-gap:2px;padding:7px 0}.d08 .row .dn{grid-area:dn}.d08 .row .dc{grid-area:dc}.d08 .row .tr{grid-area:tr}.d08 .row .p{grid-area:p}}
${RM("08")}`,
    render: W => {
      setup(W);
      const T = W.hourlyTempC, n = T.length, X = i => 16 + i * (488 / ((n - 1) || 1));
      const tmin = Math.min(...T), tmax = Math.max(...T), tspan = Math.max(tmax - tmin, 4), toff = (tspan - (tmax - tmin)) / 2, Y = t => 100 - (t - tmin + toff) / tspan * 64;
      let s = `<path d="${smooth(T.map((t, i) => [X(i), Y(t)]))}" fill="none" stroke="currentColor" stroke-width="2"/>`;
      T.forEach((t, i) => { if (i % 2 === 0) s += `<circle cx="${f(X(i))}" cy="${f(Y(t))}" r="2.5" fill="${i ? "currentColor" : "#e4572e"}"/><text x="${f(X(i))}" y="${f(Y(t) - 8)}" text-anchor="middle" font-size="10" font-weight="600" fill="currentColor">${t}°</text>`; });
      W.rain24.forEach((r, k) => { const x = X(k * 2), h = pc(r.prob) * 0.32; s += `<rect x="${f(x - 7)}" y="${f(146 - h)}" width="14" height="${f(h)}" rx="2" style="fill:var(--bl)" opacity="${0.25 + pc(r.prob) / 140}"/>${r.prob >= 30 ? `<text x="${f(x)}" y="${f(142 - h)}" text-anchor="middle" font-size="8.5" style="fill:var(--bl)">${pc(r.prob)}%</text>` : ""}<text x="${f(x)}" y="160" text-anchor="middle" font-size="9" style="fill:var(--mu)">${k === 0 ? "now" : hrs(r.hour)}</text>`; });
      s += `<line x1="8" y1="146" x2="512" y2="146" style="stroke:var(--ln2)"/>`;
      const all = W.days.flatMap(d => [d.lo, d.hi]), gl = Math.min(...all) - 1, gh = Math.max(...all) + 1, P = t => ((t - gl) / (gh - gl) * 100).toFixed(1);
      return `<div class="d08"><div class="hd"><div class="pl">${W.place}</div><div class="t">${W.now.tempC}°C</div><div class="ds">${W.now.icon} ${W.now.desc} · feels like ${W.now.feelsC}°C</div><div class="mu">${W.date}, ${W.localTime}</div></div>
<div class="sv"><svg viewBox="0 0 520 164" role="img" aria-label="Next 24 hours temperature and rain chance">${s}</svg></div>
<div class="sh">swipe the chart for later hours →</div>
<div class="rs">🌧️ ${W.rainSummary}</div>
${W.days.map(d => `<div class="row"><b class="dn">${d.name}</b><span class="dc">${d.icon} ${d.desc}</span><span class="tr"><i style="left:${P(d.lo)}%;width:${(P(d.hi) - P(d.lo)).toFixed(1)}%;background:linear-gradient(90deg,${tc(d.lo)},${tc(d.hi)})"></i><em class="l" style="left:${P(d.lo)}%">${d.lo}°</em><em class="h" style="left:${P(d.hi)}%">${d.hi}°</em></span><span class="p">💧 ${d.pop}%</span></div>`).join("")}
<div class="dt">${det(W.details).map(([k, v]) => `<div><span>${k}</span>${v}</div>`).join("")}</div></div>`;
    }
  });

  /* ---------------- 09 Polar week ---------------- */
  V.push({
    id: "09", name: "Polar Week", family: FAM, level: "rich",
    blurb: "The week as a weather radial: seven spokes, each a bar running from the day's low to its high on a shared radial temperature scale, with rain bubbles sized by chance on the rim and today's reading in the hub. Directly riffs on the Weather Radials posters and climate-circle charts.",
    pro: "Memorable poster-like hero that still reads exact values.",
    con: "Radial length is harder to compare than straight bars; heavy SVG.",
    css: `.d09{background:#170f22;color:#f1e9ff;font:13px/1.4 "Avenir Next","Segoe UI",sans-serif;padding:18px 20px;box-sizing:border-box;width:100%}
.d09 .hd{display:flex;justify-content:space-between;flex-wrap:wrap;gap:6px}.d09 .pl{font-weight:700;font-size:17px;overflow-wrap:anywhere;min-width:0}.d09 .mu{color:#a493bd;font-size:12px}
.d09 svg.po{width:100%;max-width:400px;height:auto;display:block;margin:0 auto}
.d09 .bars{transform-origin:200px 200px;animation:d09-grow 1.3s cubic-bezier(.2,.8,.2,1) both}
.d09 .spin{transform-origin:200px 200px;animation:d09-spin 60s linear infinite}
@keyframes d09-grow{from{transform:scale(.4);opacity:0}to{transform:scale(1);opacity:1}}
@keyframes d09-spin{to{transform:rotate(360deg)}}
.d09 .r24{display:grid;grid-template-columns:repeat(12,1fr);gap:3px;align-items:end;height:54px;margin-top:4px}
.d09 .r24 div{background:#7aa7ff;border-radius:3px 3px 0 0;position:relative}
.d09 .r24 div span{position:absolute;top:-13px;left:50%;transform:translateX(-50%);font-size:9px;color:#c9d9ff}
.d09 .ax{display:grid;grid-template-columns:repeat(12,1fr);gap:3px;font-size:9px;color:#a493bd;text-align:center}
.d09 .rs{font-size:12px;margin:6px 0 10px;color:#c9d9ff}
.d09 .dt{display:grid;grid-template-columns:repeat(3,1fr);gap:6px 10px;font-size:12px}
.d09 .dt span{display:block;color:#a493bd;font-size:10px;text-transform:uppercase;letter-spacing:.1em}
${RM("09")}`,
    render: W => {
      setup(W);
      const dall = W.days.flatMap(d => [d.lo, d.hi]), gl = Math.min(...dall), gh = Math.max(...dall), mid = (gl + gh) / 2, sp = Math.max(gh - gl, 4);
      const c = 200, r = t => 103 + (t - mid) / sp * 94, pt = (R, a) => [c + R * Math.sin(a * Math.PI / 180), c - R * Math.cos(a * Math.PI / 180)];
      let s = `<circle class="spin" cx="${c}" cy="${c}" r="160" fill="none" stroke="#3a2a52" stroke-dasharray="1 5"/>`;
      [...new Set([gl, mid, gh].map(Math.round))].forEach(t => { s += `<circle cx="${c}" cy="${c}" r="${r(t)}" fill="none" stroke="#3a2a52"/><text x="${c + 3}" y="${c - r(t) - 2}" font-size="8" fill="#7e6b9a">${t}°</text>`; });
      let bars = "";
      W.days.forEach((d, k) => {
        const a = k * 360 / (W.days.length || 1), A = pt(r(d.lo), a), B = pt(r(d.hi), a);
        bars += `<line x1="${f(A[0])}" y1="${f(A[1])}" x2="${f(B[0])}" y2="${f(B[1])}" stroke="url(#d09g${k})" stroke-width="14" stroke-linecap="round"/>`;
        s += `<defs><linearGradient id="d09g${k}" gradientUnits="userSpaceOnUse" x1="${f(A[0])}" y1="${f(A[1])}" x2="${f(B[0])}" y2="${f(B[1])}"><stop offset="0" stop-color="${tc(d.lo, 80, 62)}"/><stop offset="1" stop-color="${tc(d.hi, 80, 62)}"/></linearGradient></defs>`;
        const Lh = pt(r(d.hi) + 12, a), Ll = pt(r(d.lo) - 12, a);
        bars += `<text x="${f(Lh[0])}" y="${f(Lh[1] + 3)}" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">${d.hi}°</text><text x="${f(Ll[0])}" y="${f(Ll[1] + 3)}" text-anchor="middle" font-size="8.5" fill="#bfb0d6">${d.lo}°</text>`;
        const RB = pt(160, a), rad = 3 + Math.sqrt(pc(d.pop)) * 1.1;
        s += `<circle cx="${f(RB[0])}" cy="${f(RB[1])}" r="${f(rad)}" fill="#7aa7ff" opacity="${0.35 + pc(d.pop) / 160}"/><text x="${f(RB[0])}" y="${f(RB[1] + 3)}" text-anchor="middle" font-size="8" fill="#fff" font-weight="700">${pc(d.pop)}%</text>`;
        const L = pt(186, a), anc = Math.abs(L[0] - c) < 20 ? "middle" : L[0] > c ? "start" : "end";
        const dy = L[1] < c - 100 ? -14 : L[1] > c + 100 ? 6 : -4;
        s += `<text x="${f(L[0])}" y="${f(L[1] + dy)}" text-anchor="${anc}" font-size="10.5" font-weight="700" fill="#f1e9ff">${d.name}</text><text x="${f(L[0])}" y="${f(L[1] + dy + 12)}" text-anchor="${anc}" font-size="9" fill="#bfb0d6">${d.icon} ${d.desc}</text>`;
      });
      s += `<g class="bars">${bars}</g>`;
      s += `<circle cx="${c}" cy="${c}" r="36" fill="#241834"/><text x="${c}" y="${c - 8}" text-anchor="middle" font-size="22" font-weight="700" fill="#fff">${W.now.tempC}°C</text><text x="${c}" y="${c + 6}" text-anchor="middle" font-size="8" fill="#bfb0d6">${W.now.icon} ${W.now.desc}</text><text x="${c}" y="${c + 17}" text-anchor="middle" font-size="7.5" fill="#a493bd">feels ${W.now.feelsC}°C</text>`;
      return `<div class="d09"><div class="hd"><span class="pl">${W.place}</span><span class="mu">${W.date} · ${W.localTime}</span></div>
<svg class="po" viewBox="0 0 400 400" role="img" aria-label="Seven day radial forecast">${s}</svg>
<div class="mu" style="text-align:center;margin-bottom:8px">Spokes run low → high °C · rim bubbles = chance of rain</div>
<b>🌧️ Rain chance, next 24h</b>
<div class="r24" style="margin-top:16px">${W.rain24.map(x => `<div style="height:${2 + pc(x.prob) * 0.42}px;opacity:${0.35 + pc(x.prob) / 150}"><span>${pc(x.prob)}%</span></div>`).join("")}</div>
<div class="ax">${W.rain24.map(x => `<span>${hrs(x.hour)}</span>`).join("")}</div>
<div class="rs">${W.rainSummary}</div>
<div class="dt">${det(W.details).map(([k, v]) => `<div><span>${k}</span>${v}</div>`).join("")}</div></div>`;
    }
  });

  /* ---------------- 10 Warming stripes ---------------- */
  V.push({
    id: "10", name: "Weather Stripes", family: FAM, level: "simple",
    blurb: "Ed Hawkins' climate 'warming stripes' turned into a forecast: one coloured stripe per hour for temperature, one per two hours for rain, and a stripe per day for the week, each with its number printed in. Inspired by the #ShowYourStripes graphics.",
    pro: "Bold, poster-like and instantly recognisable; just CSS.",
    con: "Colour-led; exact trend shape is less obvious than a line.",
    css: `.d10{background:#fff;color:#111;font:13px/1.35 "Helvetica Neue",Helvetica,Arial,sans-serif;width:100%;box-sizing:border-box}
.d10 .hd{padding:18px 20px 10px;display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:8px}
.d10 .t{font-size:64px;font-weight:800;letter-spacing:-.04em;line-height:.9}
.d10 .pl{font-size:12px;letter-spacing:.2em;text-transform:uppercase;font-weight:700;overflow-wrap:anywhere}
.d10 .st{display:flex;height:130px}
.d10 .st div{flex:1;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;font-size:9px;color:#fff;padding-bottom:4px;font-weight:700;text-shadow:0 1px 2px #0005}
.d10 .ax{display:flex;font-size:9px;color:#666;padding:2px 0}.d10 .ax span{flex:1;text-align:center}
.d10 .cap{font-size:10.5px;text-transform:uppercase;letter-spacing:.12em;color:#666;padding:8px 20px 4px;font-weight:700}
.d10 .rn{display:flex;height:44px}
.d10 .rn div{flex:1;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700}
.d10 .rs{padding:6px 20px 4px;font-size:12.5px}
.d10 .dy{display:grid;grid-template-columns:52px 1fr auto auto;gap:10px;align-items:center;padding:6px 20px;font-size:12.5px}
.d10 .dy .pi{background:#ffffffd9;border-radius:10px;padding:1px 8px;font-weight:700}
.d10 .dt{display:grid;grid-template-columns:repeat(6,1fr);padding:10px 20px 18px;gap:6px}
.d10 .dt span{display:block;font-size:9.5px;color:#666;text-transform:uppercase}
@media (max-width:420px){.d10 .dt{grid-template-columns:repeat(3,1fr)}}
${RM("10")}`,
    render: W => (setup(W), `<div class="d10"><div class="hd"><div><div class="pl">${W.place}</div><div style="color:#666;font-size:12px">${W.date} · ${W.localTime}</div></div>
<div style="text-align:right"><div class="t">${W.now.tempC}°C</div>${W.now.icon} ${W.now.desc} · feels like ${W.now.feelsC}°C</div></div>
<div class="cap">Temperature, every hour (°C)</div>
<div class="st">${W.hourlyTempC.map(t => `<div style="background:${tc(t, 78, 48)}">${t}</div>`).join("")}</div>
<div class="ax">${W.hourlyTempC.map((t, i) => `<span>${i % 4 === 0 ? hrs(hourOf(i)) : ""}</span>`).join("")}</div>
<div class="cap">Chance of rain, 2-hour stripes</div>
<div class="rn">${W.rain24.map(r => `<div style="background:hsl(212,85%,${96 - pc(r.prob) * 0.6}%);color:${r.prob > 55 ? "#fff" : "#123"}">${pc(r.prob)}%</div>`).join("")}</div>
<div class="ax">${W.rain24.map(r => `<span>${hrs(r.hour)}</span>`).join("")}</div>
<div class="rs">🌧️ ${W.rainSummary}</div>
<div class="cap">The week (stripe runs low → high)</div>
${W.days.map(d => `<div class="dy" style="background:linear-gradient(90deg,${tc(d.lo, 70, 82)},${tc(d.hi, 70, 72)})"><b>${d.name}</b><span>${d.icon} ${d.desc}</span><span class="pi">${d.lo}° → ${d.hi}°</span><span class="pi" style="color:#1d4fa5">💧${d.pop}%</span></div>`).join("")}
<div class="dt">${det(W.details).map(([k, v]) => `<div><span>${k}</span><b>${v}</b></div>`).join("")}</div></div>`)
  });
})();
