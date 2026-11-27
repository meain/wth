// Family: scenes and illustration (ids 21-30)
(() => {
const V = window.V;
const FAM = "scenes and illustration";
const hs = h => (h % 12 || 12) + (h < 12 ? "a" : "p");
const det = W => { const d = W.details; return [["Humidity", d.humidity + "%"], ["Wind", d.windKmh + " km/h " + d.windDir], ["UV index", String(d.uv)], ["Cloud cover", d.cloud + "%"], ["Sunrise", d.sunrise], ["Sunset", d.sunset]]; };
const num = (v, d) => (typeof v === "number" && isFinite(v) ? v : d);
const nowMin = W => num(W.hour24, 12) * 60 + num(W.minute, 0);
// sunrise/sunset in minutes after midnight, or null when unknown
const sunMin = (W, k) => { const v = W.details && W.details[k]; return typeof v === "number" && isFinite(v) && v >= 0 && v <= 1440 ? v : null; };
const sunSpan = W => { const r = sunMin(W, "sunriseMin"), s = sunMin(W, "sunsetMin"); return r !== null && s !== null && s > r ? [r, s] : [360, 1080]; };
const wt = W => (W.isNight ? "tonight" : "today");
const dateOf = W => W.dateShort || W.date || "";
const cityOf = W => W.cityName || String(W.place || "").split(",")[0];
const rng = s => () => (s = (s * 16807) % 2147483647) / 2147483647;
const RM = id => `@media (prefers-reduced-motion: reduce){.d${id} *{animation:none !important}}`;
const fx = n => Math.round(n * 10) / 10;

/* ---------- 21 Horizon Line (simple) ---------- */
V.push({
  id: "21", name: "Horizon Line", family: FAM, level: "simple",
  blurb: "One ink line splits the card into sky and ground: now sits above the horizon, the night's rain hangs below it like reeds in water. Inspired by the airy landscape-poster weather shots on Dribbble.",
  pro: "Pure CSS, calm, reads top to bottom like a landscape.",
  con: "The scene is only implied; it's more editorial than illustrated.",
  css: `
.d21{font-family:Georgia,"Times New Roman",serif;color:#2b2622;background:#efe8d8;width:100%;box-sizing:border-box;overflow:hidden;padding-bottom:18px}
.d21 *{box-sizing:border-box}
.d21-sky{position:relative;height:196px;padding:18px 26px 10px;background:linear-gradient(#e7b48b,#f3d4b3 60%,#f8e6d2);display:flex;flex-direction:column;justify-content:space-between}
.d21-top{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;font-size:11px;letter-spacing:.14em;text-transform:uppercase}
.d21-top span{min-width:0;overflow-wrap:anywhere}
.d21-c{overflow-wrap:anywhere;min-width:0}
.d21-moon{position:absolute;right:62px;top:52px;width:26px;height:26px;border-radius:50%;box-shadow:7px -4px 0 0 #fff7ea}
.d21-now{display:flex;align-items:flex-end;gap:16px;flex-wrap:wrap}
.d21-t{font-size:108px;line-height:.78;letter-spacing:-.04em}
.d21-t sup{font-size:32px;vertical-align:top;letter-spacing:0}
.d21-c{padding-bottom:2px;font-size:16px;font-style:italic}
.d21-c small{display:block;font-style:normal;font-size:12px;opacity:.75;margin-top:3px}
.d21-hz{display:flex;justify-content:space-between;border-top:2px solid #2b2622;padding:5px 26px 0;font-size:11px;letter-spacing:.06em}
.d21-lbl{font-size:10px;letter-spacing:.18em;text-transform:uppercase;opacity:.6;padding:10px 26px 6px}
.d21-reeds{display:flex;gap:5px;padding:0 26px}
.d21-reed{flex:1;text-align:center;font-size:10px}
.d21-well{height:56px;display:flex;justify-content:center}
.d21-well i{display:block;width:55%;background:linear-gradient(#5f7f9c,#a9bdcc);border-radius:0 0 4px 4px}
.d21-reed b{display:block;font-weight:600;margin-top:3px}
.d21-reed span{opacity:.6}
.d21-sum{padding:8px 26px 2px;font-style:italic;font-size:13px}
.d21-days{margin:8px 26px 0;border-top:1px solid #cfc5b0}
.d21-day{display:grid;grid-template-columns:50px 1fr 62px 66px;align-items:center;padding:5px 0;border-bottom:1px solid #ddd3bf;font-size:13px}
.d21-day em{font-size:11px;opacity:.7;font-style:normal;text-align:right}
.d21-day b{text-align:right;font-weight:600}
.d21-det{display:grid;grid-template-columns:repeat(4,1fr);gap:8px 12px;padding:12px 26px 0;font-size:14px}
.d21-det small{display:block;font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;opacity:.6}`,
  render: W => { const n = W.now, d = W.details; return `<div class="d21">
<div class="d21-sky"><div class="d21-top"><span>${W.place}</span><span>${W.date} · ${W.localTime}</span></div><div class="d21-moon"${W.isNight ? "" : ' style="background:#ffe08a;box-shadow:0 0 22px rgba(255,214,110,.85)"'}></div>
<div class="d21-now"><div class="d21-t">${n.tempC}<sup>°C</sup></div><div class="d21-c">${n.icon} ${n.desc}<small>Feels like ${n.feelsC}°C</small></div></div></div>
<div class="d21-hz"><span>↑ Sunrise ${d.sunrise}</span><span>Sunset ${d.sunset} ↓</span></div>
<div class="d21-lbl">Rain chance, next 24 hours</div>
<div class="d21-reeds">${W.rain24.map(r => `<div class="d21-reed"><div class="d21-well"><i style="height:${Math.round(r.prob * 0.6)}px"></i></div><b>${r.prob}%</b><span>${hs(r.hour)}</span></div>`).join("")}</div>
<div class="d21-sum">${W.rainSummary}</div>
<div class="d21-days">${W.days.map(x => `<div class="d21-day"><span>${x.name}</span><span>${x.icon} ${x.desc}</span><em>${x.pop}% rain</em><b>${x.lo}° – ${x.hi}°</b></div>`).join("")}</div>
<div class="d21-det">${det(W).slice(0, 4).map(([k, v]) => `<div><small>${k}</small>${v}</div>`).join("")}</div></div>`; }
});

/* ---------- 22 Window Frame (simple) ---------- */
V.push({
  id: "22", name: "Window Frame", family: FAM, level: "simple",
  blurb: "You're looking out of a wooden sash window at dusk; each pane holds one part of the forecast, with a brass plaque for the place. The idea came from the 'looking through a window' framing of RainyDay.js (Creative Bloq).",
  pro: "Cosy, instantly legible metaphor; the panes give a natural grid.",
  con: "The frame eats ~40px of width, which is tight on phones.",
  css: `
.d22{background:radial-gradient(circle at 50% 0,#5a4a5e,#2d2431 70%);color:#f3eee6;font-family:"Avenir Next","Segoe UI",system-ui,sans-serif;padding:18px 20px 22px;box-sizing:border-box}
.d22 *{box-sizing:border-box}
.d22-plaque{margin:0 auto 12px;width:max-content;max-width:100%;padding:5px 14px;background:linear-gradient(#dcb86e,#a87d34);color:#3a2a10;border-radius:3px;font-size:12px;font-weight:600;letter-spacing:.08em;box-shadow:0 2px 0 #6b4e1d;text-align:center;overflow-wrap:anywhere}
.d22-frame{display:grid;grid-template-columns:1fr 1fr;gap:9px;padding:12px;background:#b98b5c;border-radius:4px 4px 0 0;box-shadow:inset 0 0 0 3px #8a6038,0 10px 24px rgba(0,0,0,.45)}
.d22-pane{position:relative;padding:12px 14px;background:linear-gradient(165deg,#16213f,#2f3f6c 65%,#6d5a7e);box-shadow:inset 0 0 18px rgba(0,0,0,.5);overflow:hidden}
.d22-pane:before{content:"";position:absolute;inset:0;background:linear-gradient(115deg,transparent 40%,rgba(255,255,255,.07) 45%,transparent 52%);pointer-events:none}
.d22-wide{grid-column:1/-1}
.d22-h{font-size:10px;letter-spacing:.16em;text-transform:uppercase;opacity:.6;margin-bottom:6px}
.d22-t{font-size:56px;font-weight:300;line-height:1}
.d22-now p{margin:5px 0 0;font-size:13px}
.d22-dl{display:grid;grid-template-columns:1fr auto;gap:4px 10px;font-size:12.5px}
.d22-dl span{opacity:.65}
.d22-dl b{font-weight:600;text-align:right}
.d22-bars{display:flex;gap:4px;align-items:flex-end;height:62px}
.d22-bars div{flex:1;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;height:100%;font-size:9.5px}
.d22-bars i{display:block;width:70%;background:linear-gradient(#9cc7ff,#4e7fd1);border-radius:3px 3px 0 0;margin-top:2px}
.d22-hrs{display:flex;gap:4px;font-size:9.5px;opacity:.6;margin-top:3px}
.d22-hrs span{flex:1;text-align:center}
.d22-sum{font-size:12px;margin-top:7px;font-style:italic;opacity:.9}
.d22-week{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;text-align:center;font-size:11px}
.d22-week div{display:flex;flex-direction:column;gap:2px}
.d22-week b{font-size:12px}
.d22-ic{font-size:18px}
.d22-week em{font-style:normal;opacity:.7;font-size:10px;min-height:24px}
.d22-pop{color:#9cc7ff}
.d22-sill{height:16px;margin:0 -10px;background:linear-gradient(#d4a676,#8a6038);border-radius:2px;box-shadow:0 6px 10px rgba(0,0,0,.4)}`,
  render: W => { const n = W.now; return `<div class="d22">
<div class="d22-plaque">${W.place} · ${W.date} · ${W.localTime}</div>
<div class="d22-frame">
<div class="d22-pane d22-now"><div class="d22-h">Now</div><div class="d22-t">${n.tempC}°C</div><p>${n.icon} ${n.desc}</p><p>Feels like ${n.feelsC}°C</p></div>
<div class="d22-pane"><div class="d22-h">Outside</div><div class="d22-dl">${det(W).map(([k, v]) => `<span>${k}</span><b>${v}</b>`).join("")}</div></div>
<div class="d22-pane d22-wide"><div class="d22-h">Rain chance · next 24 h</div><div class="d22-bars">${W.rain24.map(r => `<div><small>${r.prob}%</small><i style="height:${Math.round(r.prob * 0.45)}px"></i></div>`).join("")}</div><div class="d22-hrs">${W.rain24.map(r => `<span>${hs(r.hour)}</span>`).join("")}</div><div class="d22-sum">${W.rainSummary}</div></div>
<div class="d22-pane d22-wide"><div class="d22-h">This week</div><div class="d22-week">${W.days.map(x => `<div><b>${x.name}</b><span class="d22-ic">${x.icon}</span><em>${x.desc}</em><span>${x.hi}° / ${x.lo}°</span><span class="d22-pop">${x.pop}% rain</span></div>`).join("")}</div></div>
</div><div class="d22-sill"></div></div>`; }
});

/* ---------- 23 Paper-cut Hills (simple) ---------- */
V.push({
  id: "23", name: "Paper-cut Hills", family: FAM, level: "simple",
  blurb: "Layered paper hills with drop shadows, each ridge carrying one band of data: rain on the nearest slope, the week on the next, details in the dark valley. Paper-craft landscape shots on Dribbble were the prompt.",
  pro: "Warm, tactile and built only from border-radius and shadows.",
  con: "Curved tops waste a little vertical space per layer.",
  css: `
.d23{font-family:"Gill Sans","Trebuchet MS",sans-serif;color:#2c3a2f;background:#fde3c4;overflow:hidden;box-sizing:border-box}
.d23 *{box-sizing:border-box}
.d23-sky{position:relative;padding:22px 26px 50px;background:linear-gradient(#f9c79a,#fde3c4);min-height:170px}
.d23-sun{position:absolute;right:26px;top:16px;width:112px;height:112px;border-radius:50%;background:#fff4dc;box-shadow:0 0 0 10px rgba(255,244,220,.45),3px 4px 0 rgba(150,80,30,.12);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
.d23-sun b{font-size:38px;line-height:1;font-weight:600;color:#c4542d}
.d23-sun small{font-size:11px}
.d23-place{font-size:26px;font-weight:600;padding-right:130px;overflow-wrap:anywhere}
.d23-sub{font-size:12px;opacity:.75;margin-top:2px}
.d23-cond{margin-top:14px;font-size:16px}
.d23-cond small{display:block;font-size:12px;opacity:.75}
.d23-l{position:relative;margin-top:-26px;padding:34px 24px 34px;box-shadow:0 -5px 9px rgba(0,0,0,.18)}
.d23-l1{background:#c6dbb0;border-radius:65% 35% 0 0/42px 22px 0 0}
.d23-l2{background:#8cb98e;border-radius:30% 70% 0 0/24px 44px 0 0}
.d23-l3{background:#3e6b57;border-radius:55% 45% 0 0/40px 30px 0 0;color:#eef4e6;padding-bottom:22px}
.d23-h{font-size:10px;letter-spacing:.18em;text-transform:uppercase;opacity:.75;margin-bottom:8px}
.d23-chips{display:flex;gap:4px}
.d23-chip{flex:1;height:46px;border-radius:7px 7px 2px 2px;background:#eef3e4;position:relative;overflow:hidden;font-size:10px;text-align:center}
.d23-chip i{position:absolute;left:0;right:0;bottom:0;background:#5d8fae}
.d23-chip b{position:relative;display:block;padding-top:3px;font-weight:600}
.d23-hr{display:flex;gap:4px;font-size:10px;margin-top:3px}
.d23-hr span{flex:1;text-align:center;opacity:.7}
.d23-sum{font-size:12.5px;margin-top:8px}
.d23-day{display:grid;grid-template-columns:48px 1fr 62px 62px;padding:4px 0;font-size:13px;border-bottom:1px dashed rgba(44,58,47,.3)}
.d23-day em{font-style:normal;font-size:11px;opacity:.8}
.d23-day b{text-align:right}
.d23-det{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.d23-det div{font-size:15px}
.d23-det small{display:block;font-size:10px;letter-spacing:.12em;text-transform:uppercase;opacity:.7}`,
  render: W => { const n = W.now; return `<div class="d23">
<div class="d23-sky"><div class="d23-sun"><b>${n.tempC}°C</b><small>feels ${n.feelsC}°C</small></div>
<div class="d23-place">${W.place}</div><div class="d23-sub">${W.date} · ${W.localTime}</div>
<div class="d23-cond">${n.icon} ${n.desc}<small>Feels like ${n.feelsC}°C</small></div></div>
<div class="d23-l d23-l1"><div class="d23-h">Rain chance · next 24 h</div><div class="d23-chips">${W.rain24.map(r => `<div class="d23-chip"><i style="height:${Math.round(r.prob * 0.3)}px"></i><b>${r.prob}%</b></div>`).join("")}</div><div class="d23-hr">${W.rain24.map(r => `<span>${hs(r.hour)}</span>`).join("")}</div><div class="d23-sum">${W.rainSummary}</div></div>
<div class="d23-l d23-l2"><div class="d23-h">Next ${W.days.length} days</div>${W.days.map(x => `<div class="d23-day"><span>${x.name}</span><span>${x.icon} ${x.desc}</span><em>${x.pop}% rain</em><b>${x.lo}°–${x.hi}°</b></div>`).join("")}</div>
<div class="d23-l d23-l3"><div class="d23-h">Details</div><div class="d23-det">${det(W).map(([k, v]) => `<div><small>${k}</small>${v}</div>`).join("")}</div></div></div>`; }
});

/* ---------- 24 Postcard (simple) ---------- */
V.push({
  id: "24", name: "Postcard", family: FAM, level: "simple",
  blurb: "A 'Greetings from Pune' postcard: gradient-painted front, the current reading as the stamp, a handwritten note with the details, the week on the address lines and a postal barcode whose bars are the rain chances. Riffs on the landmark-postcard weather concepts in InVision's Dribbble roundup.",
  pro: "Charming and personal; every number reads as natural language.",
  con: "Handwriting fonts vary a lot by OS.",
  css: `
.d24{background:#d9cdb4;padding:22px 18px;font-family:Georgia,serif;color:#33302a;box-sizing:border-box}
.d24 *{box-sizing:border-box}
.d24-card{background:#fbf6ea;border-radius:4px;box-shadow:0 1px 0 #c9bb9d,0 12px 24px rgba(60,45,20,.25);overflow:hidden;transform:rotate(-.6deg)}
.d24-front{height:132px;display:flex;align-items:center;justify-content:center;background:radial-gradient(ellipse 55% 45% at 18% 104%,#4d7c5b 98%,transparent 100%),radial-gradient(ellipse 70% 55% at 85% 112%,#2f5d48 98%,transparent 100%),radial-gradient(circle at 70% 56%,#ffe9b0 0 20px,transparent 21px),linear-gradient(#d9603f,#f09a5a 55%,#f7cf93)}
.d24-front h2{margin:0;font-family:"Arial Black",Impact,sans-serif;font-size:42px;line-height:.9;color:#fff8e6;text-align:center;letter-spacing:.03em;text-shadow:3px 3px 0 #9c3a22}
.d24-front h2 small{display:block;font-family:Georgia,serif;font-style:italic;font-weight:400;font-size:15px;letter-spacing:.05em;text-shadow:none;margin-bottom:4px}
.d24-back{position:relative;display:grid;grid-template-columns:1fr 1fr;padding:16px 16px 6px}
.d24-msg{padding-right:14px;border-right:1px solid #cbbf9f;font-family:"Bradley Hand","Segoe Print","Comic Sans MS",cursive;font-size:14px;line-height:1.45;color:#2a3a6a;overflow-wrap:anywhere;min-width:0}
.d24-msg p{margin:0 0 6px}
.d24-addr{padding-left:12px;padding-top:110px;font-size:12px}
.d24-row{display:grid;grid-template-columns:32px 1fr 34px 46px;gap:4px;border-bottom:1px solid #cbbf9f;padding:4px 0;align-items:baseline}
.d24-row em{font-style:normal;font-size:10.5px;color:#4a6b8a}
.d24-row b{text-align:right;font-weight:600}
.d24-stamp{position:absolute;right:18px;top:14px;width:86px;height:98px;background:#2f6f8f;color:#fff;outline:4px dotted #fbf6ea;outline-offset:-2px;border:5px solid #2f6f8f;box-shadow:0 0 0 1px #cbbf9f;text-align:center;padding-top:8px;font-size:11px}
.d24-stamp b{display:block;font-size:28px;line-height:1.1}
.d24-pm{position:absolute;right:86px;top:30px;width:80px;height:80px;border-radius:50%;border:2px solid rgba(90,70,130,.55);color:rgba(90,70,130,.8);transform:rotate(-14deg);display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:9px;letter-spacing:.12em;text-transform:uppercase;text-align:center;line-height:1.3}
.d24-code{padding:6px 16px 14px}
.d24-ct{font-size:10px;letter-spacing:.14em;text-transform:uppercase;opacity:.6;margin-bottom:4px}
.d24-bars{display:flex;gap:6px;align-items:flex-end;height:36px}
.d24-bars i{flex:1;background:#33302a;display:block}
.d24-hrs{display:flex;gap:6px;font-size:9.5px;margin-top:3px;font-family:ui-monospace,Menlo,monospace}
.d24-hrs span{flex:1;text-align:center}
.d24-hrs b{display:block;font-weight:600}`,
  render: W => { const n = W.now, d = W.details, city = cityOf(W), fs = Math.max(20, Math.min(42, Math.floor(360 / (0.85 * Math.max(1, city.length))))); return `<div class="d24"><div class="d24-card">
<div class="d24-front"><h2 style="font-size:${fs}px;padding:0 12px;overflow-wrap:anywhere"><small>Greetings from</small>${city.toUpperCase()}</h2></div>
<div class="d24-back">
<div class="d24-msg"><p>Dear you,</p><p>It's ${n.tempC}°C and ${n.icon} ${n.desc.toLowerCase()} here ${wt(W)}, feels like ${n.feelsC}°C.</p><p>${W.rainSummary}</p><p>Humidity ${d.humidity}%, wind ${d.windKmh} km/h from the ${d.windDir}, UV ${d.uv}, cloud cover ${d.cloud}%. Sunrise ${d.sunrise}, sunset ${d.sunset}.</p><p>— love, ${city}</p></div>
<div class="d24-addr">${W.days.map(x => `<div class="d24-row"><span>${x.name}</span><span>${x.icon} ${x.desc}</span><em>${x.pop}%</em><b>${x.lo}–${x.hi}°</b></div>`).join("")}</div>
<div class="d24-pm"><span style="max-width:68px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${city}</span><span>${dateOf(W)}</span><span>${W.localTime}</span></div>
<div class="d24-stamp"><b>${n.tempC}°C</b>${n.icon} ${n.desc}<br>feels ${n.feelsC}°C</div>
</div>
<div class="d24-code"><div class="d24-ct">Rain chance, next 24 h (bar height)</div><div class="d24-bars">${W.rain24.map(r => `<i style="height:${4 + Math.round(r.prob * 0.35)}px"></i>`).join("")}</div><div class="d24-hrs">${W.rain24.map(r => `<span>${hs(r.hour)}<b>${r.prob}%</b></span>`).join("")}</div></div>
</div></div>`; }
});

/* ---------- 25 Sky Dome (medium) ---------- */
V.push({
  id: "25", name: "Sky Dome", family: FAM, level: "medium",
  blurb: "A planetarium dome over the horizon: today's sun path as a dashed arc with sunrise/sunset at its feet, the moon placed by the actual time of night, and the coming rain hanging below the ground line. Sun-arc widgets and the CSS pixel-sky experiments on DEV were the starting point.",
  pro: "Sunrise, sunset and 'how far into the night' become one picture.",
  con: "Moon/sun maths in SVG; dome wastes the top corners.",
  css: `
.d25{background:linear-gradient(#0a0f22,#1b2244 60%,#141a33);color:#e8e6f5;font-family:"Futura","Century Gothic",system-ui,sans-serif;padding:18px 20px 20px;box-sizing:border-box}
.d25 *{box-sizing:border-box}
.d25-top{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;font-size:12px;letter-spacing:.1em;text-transform:uppercase;opacity:.8}
.d25-top span{min-width:0;overflow-wrap:anywhere}
.d25 svg{display:block;width:100%;height:auto;margin-top:4px}
.d25-st{animation:d25-tw 3.4s ease-in-out infinite}
@keyframes d25-tw{50%{opacity:.2}}
.d25-sum{font-size:13px;text-align:center;opacity:.9;margin:2px 0 12px}
.d25-days{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;text-align:center;font-size:11px;border-top:1px solid rgba(255,255,255,.15);padding-top:10px}
.d25-days div{display:flex;flex-direction:column;gap:2px}
.d25-days span:nth-child(2){font-size:17px}
.d25-days em{font-style:normal;font-size:9.5px;opacity:.7;min-height:22px}
.d25-days i{font-style:normal;color:#8fb7ff}
.d25-det{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:12px;font-size:14px}
.d25-det small{display:block;font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;opacity:.55}
${RM(25)}`,
  render: W => {
    const n = W.now, d = W.details, cx = 260, hz = 210, R = 180, r = 150;
    const [rise, set] = sunSpan(W), now = nowMin(W);
    const day = now >= rise && now <= set;
    const f = Math.min(1, Math.max(0, day ? (now - rise) / ((set - rise) || 1) : ((now - set + 1440) % 1440) / ((1440 - set + rise) || 1)));
    const a = Math.PI * (1 - f), mx = fx(cx + r * Math.cos(a)), my = fx(hz - r * Math.sin(a));
    const rnd = rng(25); let stars = "";
    for (let i = 0; i < 46; i++) { const sa = rnd() * Math.PI, sr = 20 + rnd() * (R - 26); const x = fx(cx + sr * Math.cos(sa)), y = fx(hz - 8 - sr * Math.sin(sa)); stars += `<circle class="d25-st" cx="${x}" cy="${y}" r="${fx(0.6 + rnd())}" fill="#fff" style="animation-delay:-${fx(rnd() * 3.4)}s"/>`; }
    const w = (R * 2) / 12;
    const rain = W.rain24.map((s, i) => { const x = cx - R + i * w + w / 2, h = Math.min(60, Math.max(1, s.mm * 16)); return `<rect x="${fx(x - 7)}" y="${hz + 2}" width="14" height="${fx(h)}" rx="3" fill="#6ea0ff" opacity="${fx(0.35 + s.prob / 140)}"/><text x="${fx(x)}" y="${hz + 70}" text-anchor="middle" font-size="10" fill="#cfd8ff">${s.prob}%</text><text x="${fx(x)}" y="${hz + 84}" text-anchor="middle" font-size="9" fill="#cfd8ff" opacity=".6">${hs(s.hour)}</text>`; }).join("");
    return `<div class="d25"><div class="d25-top"><span>${W.place}</span><span>${W.date} · ${W.localTime}</span></div>
<svg viewBox="0 0 520 300" role="img" aria-label="Sky dome">
<defs><radialGradient id="d25g" cx="50%" cy="100%" r="100%"><stop offset="0" stop-color="#2c3770"/><stop offset="1" stop-color="#0d1330"/></radialGradient></defs>
<path d="M${cx - R} ${hz} A${R} ${R} 0 0 1 ${cx + R} ${hz} Z" fill="url(#d25g)" stroke="rgba(255,255,255,.18)"/>
${stars}
<path d="M${cx - r} ${hz} A${r} ${r} 0 0 1 ${cx + r} ${hz}" fill="none" stroke="#ffcf7a" stroke-width="1.2" stroke-dasharray="3 5" opacity=".7"/>
<text x="${cx}" y="${hz - r - 6}" text-anchor="middle" font-size="9" fill="#ffcf7a" opacity=".8" letter-spacing="1.5">SUN PATH</text>
<circle cx="${mx}" cy="${my}" r="11" fill="#f4f1de"/><circle cx="${fx(mx + 5)}" cy="${fx(my - 3)}" r="10" fill="#1d2550"/>
<text x="${mx}" y="${fx(my + 24)}" text-anchor="middle" font-size="9.5" fill="#f4f1de">${day ? "Sun" : "Moon"} · ${W.localTime}</text>
<text x="${cx}" y="150" text-anchor="middle" font-size="54" font-weight="300" fill="#fff">${n.tempC}°C</text>
<text x="${cx}" y="174" text-anchor="middle" font-size="13" fill="#e8e6f5">${n.icon} ${n.desc}</text>
<text x="${cx}" y="192" text-anchor="middle" font-size="11" fill="#e8e6f5" opacity=".7">Feels like ${n.feelsC}°C</text>
<rect x="0" y="${hz}" width="520" height="90" fill="#0b1020"/>
<circle cx="${cx + r}" cy="${hz + 4}" r="9" fill="#ff9a4d" opacity=".5"/>
<line x1="0" y1="${hz}" x2="520" y2="${hz}" stroke="#e8e6f5" stroke-width="1.2"/>
${rain}
<text x="${cx - r}" y="${hz - 8}" text-anchor="middle" font-size="10" fill="#ffcf7a">↑ Sunrise ${d.sunrise}</text>
<text x="${cx + r}" y="${hz - 8}" text-anchor="middle" font-size="10" fill="#ffcf7a">Sunset ${d.sunset} ↓</text>
<text x="12" y="${hz + 16}" font-size="9" fill="#cfd8ff" opacity=".6">RAIN mm</text>
</svg>
<div class="d25-sum">${W.rainSummary}</div>
<div class="d25-days">${W.days.map(x => `<div><b>${x.name}</b><span>${x.icon}</span><em>${x.desc}</em><span>${x.hi}° / ${x.lo}°</span><i>${x.pop}% rain</i></div>`).join("")}</div>
<div class="d25-det">${det(W).slice(0, 4).concat([["Gusts", d.gustKmh + " km/h"], ["Dew point", d.dewC + "°C"]]).map(([k, v]) => `<div><small>${k}</small>${v}</div>`).join("")}</div></div>`;
  }
});

/* ---------- 26 Night Skyline (medium) ---------- */
V.push({
  id: "26", name: "Night Skyline", family: FAM, level: "medium",
  blurb: "The week is a city at night: one tower per day, height set by the high, forecast painted on the facade and rain streaking above the wetter days; a few windows flicker. Inspired by IsoWeather's 'your city is the forecast' idea (Product Hunt).",
  pro: "The week's temperature shape is visible as a skyline at a glance.",
  con: "Text on building facades gets small at phone width.",
  css: `
.d26{background:linear-gradient(#070a16,#141b34 55%,#1e2547);color:#eef0ff;font-family:"Avenir Next Condensed","Arial Narrow",system-ui,sans-serif;box-sizing:border-box;overflow:hidden}
.d26 *{box-sizing:border-box}
.d26-head{position:relative;padding:18px 22px 0;display:flex;align-items:flex-end;gap:16px;flex-wrap:wrap}
.d26-moon{position:absolute;right:30px;top:20px;width:40px;height:40px;border-radius:50%;background:#f2eed8;box-shadow:0 0 30px rgba(242,238,216,.35)}
.d26-t{font-size:64px;font-weight:600;line-height:.9}
.d26-c{font-size:15px;padding-bottom:4px}
.d26-c small{display:block;font-size:12px;opacity:.7}
.d26-pl{font-size:12px;letter-spacing:.14em;text-transform:uppercase;opacity:.75;width:100%;order:-1}
.d26 svg{display:block;width:100%;height:auto}
.d26-win{animation:d26-fl 5s steps(1) infinite}
@keyframes d26-fl{40%{fill:#2a3350}55%{fill:#ffd27a}}
.d26-street{background:#0b0e18;padding:12px 22px 16px;border-top:2px solid #ff4fa3}
.d26-neon{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#ff7ac0;text-shadow:0 0 8px rgba(255,79,163,.7);margin-bottom:6px}
.d26-bars{display:flex;gap:4px;align-items:flex-end;height:44px}
.d26-bars div{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;font-size:9.5px}
.d26-bars i{display:block;width:60%;background:#5ec8ff;box-shadow:0 0 6px rgba(94,200,255,.7);border-radius:2px;margin-top:2px}
.d26-hrs{display:flex;gap:4px;font-size:9.5px;opacity:.55;margin-top:2px}
.d26-hrs span{flex:1;text-align:center}
.d26-sum{font-size:12.5px;margin:8px 0 10px;opacity:.9}
.d26-signs{display:flex;flex-wrap:wrap;gap:6px}
.d26-signs span{border:1px solid rgba(94,200,255,.5);border-radius:3px;padding:3px 8px;font-size:12px}
.d26-signs small{opacity:.6;margin-right:5px;text-transform:uppercase;font-size:9.5px;letter-spacing:.1em}
${RM(26)}`,
  render: W => {
    const n = W.now, lo = Math.min(...W.days.map(x => x.lo)), hi = Math.max(...W.days.map(x => x.hi));
    const G = 300, rnd = rng(26);
    const b = W.days.map((x, i) => {
      const bx = 6 + i * 76, bw = 70, h = Math.round(110 + (x.hi - lo) / ((hi - lo) || 1) * 130), top = G - h, mid = bx + bw / 2;
      let wins = "";
      for (let y = top + 98; y < G - 10; y += 13) for (let c = 0; c < 4; c++) { const lit = rnd() < 0.42, fl = lit && rnd() < 0.15; wins += `<rect ${fl ? 'class="d26-win" ' : ""}x="${bx + 9 + c * 14}" y="${y}" width="8" height="7" fill="${lit ? "#ffd27a" : "#2a3350"}"${fl ? ` style="animation-delay:-${fx(rnd() * 5)}s"` : ""}/>`; }
      const k = Math.max(0, Math.min(9, Math.round(x.pop / 12))); let streaks = "";
      for (let j = 0; j < k; j++) { const sx = bx + 8 + j * (bw - 10) / Math.max(1, k); streaks += `<line x1="${fx(sx + 5)}" y1="${top - 34}" x2="${fx(sx)}" y2="${top - 10}" stroke="#7fa8ff" stroke-width="1.3" opacity=".7"/>`; }
      return `${streaks}<rect x="${bx}" y="${top}" width="${bw}" height="${h}" fill="#1a2138" stroke="#323c63"/>
<text x="${mid}" y="${top + 20}" text-anchor="middle" font-size="13" font-weight="700" fill="#fff">${x.name}</text>
<text x="${mid}" y="${top + 38}" text-anchor="middle" font-size="14">${x.icon}</text>
<text x="${mid}" y="${top + 53}" text-anchor="middle" font-size="9.5" fill="#cdd3f0">${x.desc}</text>
<text x="${mid}" y="${top + 70}" text-anchor="middle" font-size="12" font-weight="700" fill="#ffd27a">${x.hi}° / ${x.lo}°</text>
<text x="${mid}" y="${top + 86}" text-anchor="middle" font-size="10" fill="#9cc0ff">${x.pop}% rain</text>${wins}`;
    }).join("");
    return `<div class="d26"><div class="d26-head"><div class="d26-moon"${W.isNight ? "" : ' style="background:#ffe08a;box-shadow:0 0 30px rgba(255,214,110,.6)"'}></div><div class="d26-pl">${W.place} · ${W.date} · ${W.localTime}</div><div class="d26-t">${n.tempC}°C</div><div class="d26-c">${n.icon} ${n.desc}<small>Feels like ${n.feelsC}°C</small></div></div>
<svg viewBox="0 0 540 304" role="img" aria-label="Week as skyline">${b}<rect x="0" y="${G}" width="540" height="4" fill="#0b0e18"/></svg>
<div class="d26-street"><div class="d26-neon">Rain chance · next 24 h</div>
<div class="d26-bars">${W.rain24.map(r => `<div><small>${r.prob}%</small><i style="height:${Math.round(r.prob * 0.3) + 1}px"></i></div>`).join("")}</div>
<div class="d26-hrs">${W.rain24.map(r => `<span>${hs(r.hour)}</span>`).join("")}</div>
<div class="d26-sum">${W.rainSummary}</div>
<div class="d26-signs">${det(W).map(([k, v]) => `<span><small>${k}</small>${v}</span>`).join("")}</div></div></div>`;
  }
});

/* ---------- 27 Lighthouse (medium) ---------- */
V.push({
  id: "27", name: "Lighthouse", family: FAM, level: "medium",
  blurb: "A lighthouse keeper's view: beams pulse across the night sea, the next 24h of rain chance is drawn as the swell rolling in, and the week is written up as a ship's log. Animated-illustration weather apps like D-D Play (Trend Hunter) suggested the moving scene.",
  pro: "Strong mood; the swell chart makes 'rain builds then fades' obvious.",
  con: "Nautical theme is a stylistic commitment; mono log is dense.",
  css: `
.d27{background:linear-gradient(#081b24,#0f2f3a 50%,#0b2530);color:#e9f1ee;font-family:"Avenir Next",system-ui,sans-serif;box-sizing:border-box;overflow:hidden;padding-bottom:16px}
.d27 *{box-sizing:border-box}
.d27-hero{position:relative}
.d27 svg{display:block;width:100%;height:auto}
.d27-txt{position:absolute;right:22px;top:20px;text-align:right;max-width:62%;overflow-wrap:anywhere}
.d27-pl{font-size:12px;letter-spacing:.14em;text-transform:uppercase;opacity:.75}
.d27-t{font-size:62px;font-weight:300;line-height:1}
.d27-c{font-size:14px}
.d27-c small{display:block;font-size:12px;opacity:.7}
.d27-bl{animation:d27-p 4s ease-in-out infinite}
.d27-br{animation:d27-p 4s ease-in-out infinite;animation-delay:-2s}
@keyframes d27-p{0%,100%{opacity:.15}50%{opacity:1}}
.d27-wave{animation:d27-w 6s linear infinite}
@keyframes d27-w{to{transform:translateX(-40px)}}
.d27-h{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#ffd98a;padding:12px 22px 0}
.d27-sum{font-size:13px;padding:0 22px;opacity:.9}
.d27-log{margin:10px 22px 0;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:12px;border-top:1px solid rgba(255,217,138,.35)}
.d27-row{display:grid;grid-template-columns:44px 1fr 72px 64px;padding:4px 0;border-bottom:1px dotted rgba(233,241,238,.2)}
.d27-row em{font-style:normal;color:#8fd3e8}
.d27-row b{text-align:right;font-weight:600}
.d27-det{display:grid;grid-template-columns:repeat(3,1fr);gap:6px 10px;margin:12px 22px 0;font-size:13px}
.d27-det small{display:block;font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;opacity:.55}
${RM(27)}`,
  render: W => {
    const n = W.now, d = W.details, xs = y => [fx(64 + (178 - y) * 6 / 106), fx(96 - (178 - y) * 6 / 106)];
    const band = (y1, y2) => { const [a1, b1] = xs(y1), [a2, b2] = xs(y2); return `<polygon points="${a1},${y1} ${b1},${y1} ${b2},${y2} ${a2},${y2}" fill="#c8453a"/>`; };
    let wave = "M-40 186"; for (let x = -40; x < 600; x += 40) wave += ` q10 -6 20 0 t20 0`;
    wave += " V200 H-40 Z";
    const P = W.rain24.map((r, i) => [fx(30 + i * 480 / 11), fx(96 - r.prob * 0.75)]);
    const line = P.map(p => p.join(",")).join(" ");
    return `<div class="d27"><div class="d27-hero"><svg viewBox="0 0 540 200" role="img" aria-label="Lighthouse">
<defs><linearGradient id="d27r" x1="0" x2="1"><stop offset="0" stop-color="#fff2b8" stop-opacity=".6"/><stop offset="1" stop-color="#fff2b8" stop-opacity="0"/></linearGradient><linearGradient id="d27l" x1="1" x2="0"><stop offset="0" stop-color="#fff2b8" stop-opacity=".6"/><stop offset="1" stop-color="#fff2b8" stop-opacity="0"/></linearGradient></defs>
<polygon class="d27-br" points="88,59 540,10 540,112" fill="url(#d27r)"/><polygon class="d27-bl" points="72,59 0,34 0,86" fill="url(#d27l)"/>
<ellipse cx="80" cy="186" rx="64" ry="14" fill="#1d2a30"/>
<polygon points="64,178 96,178 90,72 70,72" fill="#efe9dd"/>${band(150, 135)}${band(115, 100)}
<rect x="65" y="68" width="30" height="5" fill="#2b3a40"/><rect x="70" y="50" width="20" height="18" fill="#ffe9a8"/><polygon points="66,50 94,50 80,36" fill="#2b3a40"/>
<path class="d27-wave" d="${wave}" fill="#123e4b"/>
</svg><div class="d27-txt"><div class="d27-pl">${W.place} · ${W.localTime}</div><div class="d27-t">${n.tempC}°C</div><div class="d27-c">${n.icon} ${n.desc}<small>Feels like ${n.feelsC}°C</small></div></div></div>
<div class="d27-h">Rain swell · chance of rain, next 24 h</div>
<svg viewBox="0 0 540 128" role="img" aria-label="Rain chance swell">
<polygon points="30,100 ${line} 510,100" fill="#1b5566" opacity=".8"/><polyline points="${line}" fill="none" stroke="#8fd3e8" stroke-width="2" stroke-linejoin="round"/>
${P.map((p, i) => `<circle cx="${p[0]}" cy="${p[1]}" r="2.5" fill="#ffd98a"/><text x="${p[0]}" y="${fx(p[1] - 7)}" text-anchor="middle" font-size="10" fill="#e9f1ee">${W.rain24[i].prob}%</text><text x="${p[0]}" y="118" text-anchor="middle" font-size="9.5" fill="#e9f1ee" opacity=".6">${hs(W.rain24[i].hour)}</text>`).join("")}
<line x1="30" y1="100" x2="510" y2="100" stroke="rgba(233,241,238,.3)"/></svg>
<div class="d27-sum">${W.rainSummary}</div>
<div class="d27-h">Ship's log · ${W.days.length} days</div>
<div class="d27-log">${W.days.map(x => `<div class="d27-row"><span>${x.name}</span><span>${x.icon} ${x.desc}</span><em>rain ${x.pop}%</em><b>${x.lo}°–${x.hi}°</b></div>`).join("")}</div>
<div class="d27-det">${det(W).map(([k, v]) => `<div><small>${k}</small>${v}</div>`).join("")}</div></div>`;
  }
});

/* ---------- 28 Rain on Glass (rich) ---------- */
V.push({
  id: "28", name: "Rain on Glass", family: FAM, level: "rich",
  blurb: "A fogged-up window at night with blurred city lights behind; the temperature is finger-written in the condensation, and the glass is split into 12 two-hour lanes where the number and size of sliding drops follow the forecast rain. Directly inspired by RainyDay.js (Creative Bloq) and rainy-window CodePens.",
  pro: "Emotional and memorable; rain intensity is felt, not just read.",
  con: "Many animated elements; heaviest variant to render.",
  css: `
.d28{background:#0c0f14;color:#eef1f5;font-family:"Avenir Next",system-ui,sans-serif;padding:14px 14px 18px;box-sizing:border-box}
.d28 *{box-sizing:border-box}
.d28-win{position:relative;height:340px;border-radius:4px;overflow:hidden;border:10px solid #1f242c;box-shadow:0 0 0 1px #000,inset 0 0 30px rgba(0,0,0,.6)}
.d28-bokeh{position:absolute;inset:-30px;filter:blur(8px);background:radial-gradient(circle at 12% 62%,rgba(255,170,60,.7) 0 12px,transparent 34px),radial-gradient(circle at 30% 80%,rgba(255,90,70,.6) 0 10px,transparent 30px),radial-gradient(circle at 48% 58%,rgba(255,220,140,.55) 0 16px,transparent 40px),radial-gradient(circle at 66% 76%,rgba(90,200,220,.5) 0 12px,transparent 34px),radial-gradient(circle at 84% 60%,rgba(255,170,60,.6) 0 14px,transparent 36px),radial-gradient(circle at 92% 86%,rgba(255,90,70,.5) 0 9px,transparent 28px),linear-gradient(#141a26,#232838 60%,#2d2a30)}
.d28-fog{position:absolute;inset:0;background:linear-gradient(rgba(180,195,210,.26),rgba(120,135,150,.1))}
.d28-dot{position:absolute;border-radius:50%;background:rgba(230,240,250,.35)}
.d28-fogtext{position:absolute;left:20px;right:20px;top:12px;overflow-wrap:anywhere;font-family:"Bradley Hand","Segoe Print","Comic Sans MS",cursive;color:rgba(255,255,255,.9);text-shadow:0 0 8px rgba(255,255,255,.35)}
.d28-fogtext b{display:block;font-size:66px;line-height:1;font-weight:400}
.d28-fogtext span{display:block;font-size:15px}
.d28-lanes{position:absolute;left:0;right:0;bottom:0;height:206px;display:flex}
.d28-lane{position:relative;flex:1;border-left:1px solid rgba(255,255,255,.06)}
.d28-lane i{position:absolute;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:radial-gradient(circle at 35% 30%,rgba(255,255,255,.95),rgba(200,220,240,.3) 45%,rgba(20,30,40,.35));box-shadow:0 1px 1px rgba(0,0,0,.4);animation:d28-slide linear infinite}
@keyframes d28-slide{0%{transform:translateY(0);opacity:0}10%{opacity:1}85%{opacity:1}100%{transform:translateY(140px);opacity:0}}
.d28-lab{position:absolute;left:0;right:0;bottom:0;text-align:center;font-size:10px;background:rgba(5,8,12,.55);padding:3px 0}
.d28-lab b{display:block;font-size:11px}
.d28-lab span{opacity:.6}
.d28-cap{font-size:10px;letter-spacing:.14em;text-transform:uppercase;opacity:.55;margin:10px 2px 2px}
.d28-sum{font-size:13px;margin:0 2px 12px}
.d28-days{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;text-align:center;font-size:11px}
.d28-days div{background:#161b23;border-radius:6px;padding:7px 2px;display:flex;flex-direction:column;gap:2px}
.d28-days span:nth-child(2){font-size:17px}
.d28-days em{font-style:normal;font-size:9.5px;opacity:.65;min-height:22px}
.d28-days i{font-style:normal;color:#8fc4ff}
.d28-det{display:flex;flex-wrap:wrap;gap:6px 16px;margin-top:12px;font-size:13px}
.d28-det small{opacity:.55;margin-right:4px}
${RM(28)}`,
  render: W => {
    const n = W.now, rnd = rng(28);
    let dots = ""; for (let i = 0; i < 70; i++) { const s = fx(1 + rnd() * 2.4); dots += `<span class="d28-dot" style="left:${fx(rnd() * 100)}%;top:${fx(rnd() * 100)}%;width:${s}px;height:${s}px"></span>`; }
    const lanes = W.rain24.map(r => {
      const k = Math.min(10, Math.round(r.mm * 2.5) + (r.prob >= 20 ? 1 : 0)); let drops = "";
      for (let j = 0; j < k; j++) { const s = fx(4 + Math.min(r.mm, 6) * 1.6 + rnd() * 2); drops += `<i style="left:${fx(10 + rnd() * 60)}%;top:${fx(rnd() * 40)}px;width:${s}px;height:${fx(s * 1.25)}px;animation-duration:${fx(4 + rnd() * 5)}s;animation-delay:-${fx(rnd() * 8)}s"></i>`; }
      return `<div class="d28-lane">${drops}<div class="d28-lab"><b>${r.prob}%</b><span>${hs(r.hour)} · ${r.mm} mm</span></div></div>`;
    }).join("");
    return `<div class="d28"><div class="d28-win"><div class="d28-bokeh"></div><div class="d28-fog"></div>${dots}
<div class="d28-fogtext"><b>${n.tempC}°C</b><span>${n.icon} ${n.desc} · feels ${n.feelsC}°C</span><span>${W.place} · ${W.localTime}</span></div>
<div class="d28-lanes">${lanes}</div></div>
<div class="d28-cap">Drops on the glass = rain in each 2-hour slot, next 24 h</div>
<div class="d28-sum">${W.rainSummary}</div>
<div class="d28-days">${W.days.map(x => `<div><b>${x.name}</b><span>${x.icon}</span><em>${x.desc}</em><span>${x.hi}° / ${x.lo}°</span><i>${x.pop}% rain</i></div>`).join("")}</div>
<div class="d28-det">${det(W).map(([k, v]) => `<span><small>${k}</small>${v}</span>`).join("")}</div></div>`;
  }
});

/* ---------- 29 Isometric Diorama (rich) ---------- */
V.push({
  id: "29", name: "Iso Diorama", family: FAM, level: "rich",
  blurb: "A little isometric tabletop where each day is a floating block spanning its low to high temperature, tinted by condition, with bobbing rain clouds over the wet days. Lifted from IsoWeather's isometric-city forecasts (Product Hunt / App Store), turned into a data diorama.",
  pro: "Playful and genuinely shows the temperature range per day in 3D.",
  con: "Isometric maths in SVG; exact values need the legend below.",
  css: `
.d29{background:linear-gradient(#f6f1e7,#ece4d4);color:#2f2a35;font-family:"Avenir Next","Segoe UI",system-ui,sans-serif;padding:18px 20px 18px;box-sizing:border-box}
.d29 *{box-sizing:border-box}
.d29-head{display:flex;justify-content:space-between;align-items:flex-end;gap:12px;flex-wrap:wrap}
.d29-pl{font-size:12px;letter-spacing:.12em;text-transform:uppercase;opacity:.7}
.d29-t{font-size:56px;font-weight:700;line-height:1;color:#e0703a}
.d29-c{text-align:right;font-size:15px}
.d29-c small{display:block;font-size:12px;opacity:.7}
.d29 svg{display:block;width:100%;height:auto;margin:2px 0}
.d29-cl{animation:d29-bob 3.6s ease-in-out infinite}
@keyframes d29-bob{50%{transform:translateY(-4px)}}
.d29-leg{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;font-size:10.5px;text-align:center}
.d29-leg div{display:flex;flex-direction:column;gap:1px;padding:5px 2px;border-radius:6px;background:rgba(255,255,255,.6)}
.d29-leg em{font-style:normal;font-size:9.5px;opacity:.7;min-height:22px}
.d29-leg i{font-style:normal;color:#3d6db3}
.d29-h{font-size:10px;letter-spacing:.16em;text-transform:uppercase;opacity:.6;margin:14px 0 4px}
.d29-rain{display:flex;gap:3px;align-items:flex-end;height:40px}
.d29-rain div{flex:1;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;height:100%;font-size:9.5px}
.d29-rain i{display:block;width:100%;background:#7d9fd6;border-radius:2px 2px 0 0;margin-top:1px;box-shadow:inset -4px 0 0 #5b7fbb}
.d29-hrs{display:flex;gap:3px;font-size:9.5px;opacity:.6;margin-top:2px}
.d29-hrs span{flex:1;text-align:center}
.d29-sum{font-size:12.5px;margin-top:6px}
.d29-det{display:grid;grid-template-columns:repeat(3,1fr);gap:6px 10px;margin-top:12px;font-size:13.5px}
.d29-det small{display:block;font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;opacity:.55}
${RM(29)}`,
  render: W => {
    const n = W.now, ox = 129.6, oy = 196, U = 26, Vv = 15, a = 0.38, dx = 2 * a * U, dy = 2 * a * Vv;
    const tlo = Math.min(...W.days.map(x => x.lo)), thi = Math.max(...W.days.map(x => x.hi)), tsp = (thi - tlo) || 1;
    const zs = t => fx(40 + (t - tlo) / tsp * 110);
    const S = (u, v) => [fx(ox + (u - v) * U), fx(oy + (u + v) * Vv)];
    const pal = { "Rain": ["#9db7e3", "#6d8fc9", "#4d6ea8"], "Showers": ["#b9cfe9", "#8fb0d6", "#6b8db8"], "Partly cloudy": ["#e8dccb", "#c9b8a0", "#a8967d"], "Sunny": ["#ffd77a", "#f2b544", "#d0922a"], "Mostly sunny": ["#ffe29a", "#f5c56b", "#d6a447"] };
    const pts = arr => arr.map(p => p.join(",")).join(" ");
    const c1 = S(-0.8, 0.8), c2 = S(6.2, 0.8), c3 = S(6.2, -6.2), c4 = S(-0.8, -6.2);
    const plate = `<polygon points="${pts([c1, c2, [c2[0], c2[1] + 10], [c1[0], c1[1] + 10]])}" fill="#b8ab93"/><polygon points="${pts([c2, c3, [c3[0], c3[1] + 10], [c2[0], c2[1] + 10]])}" fill="#9f927b"/><polygon points="${pts([c1, c2, c3, c4])}" fill="#ddd3c0" stroke="#c8bca6"/>`;
    const prism = (cx, z0, z1, col, w, h) => { const t = oy - z1, b = oy - z0; return `<polygon points="${pts([[cx - w, t], [cx, t + h], [cx, b + h], [cx - w, b]])}" fill="${col[1]}"/><polygon points="${pts([[cx, t + h], [cx + w, t], [cx + w, b], [cx, b + h]])}" fill="${col[2]}"/><polygon points="${pts([[cx, t - h], [cx + w, t], [cx, t + h], [cx - w, t]])}" fill="${col[0]}"/>`; };
    const cols = W.days.map((x, i) => {
      const cx = fx(ox + i * 1.8 * U), z0 = zs(x.lo), z1 = Math.max(zs(x.hi), z0 + 8), col = pal[x.desc] || pal["Partly cloudy"], top = oy - z1 - dy;
      let cloud = "";
      if (x.pop >= 30) { const cy = top - 58; let drops = ""; for (let j = 0; j < Math.min(6, Math.round(x.pop / 25)); j++) drops += `<line x1="${fx(cx - 9 + j * 6)}" y1="${cy + 8}" x2="${fx(cx - 11 + j * 6)}" y2="${cy + 14}" stroke="#4d6ea8" stroke-width="1.4"/>`;
        cloud = `<g class="d29-cl" style="animation-delay:-${i * 0.5}s"><ellipse cx="${cx}" cy="${cy}" rx="18" ry="8" fill="#fff" stroke="#c8bca6"/><text x="${cx}" y="${cy + 3}" text-anchor="middle" font-size="8.5" font-weight="700" fill="#3d6db3">${x.pop}%</text>${drops}</g>`; }
      return `${prism(cx, 0, z0, ["#efe7d8", "#d8cdb8", "#c2b59e"], dx * 0.3, dy * 0.3)}${prism(cx, z0, z1, col, dx, dy)}
<text x="${cx}" y="${fx(top - 18)}" text-anchor="middle" font-size="11" font-weight="700" fill="#2f2a35">${x.name}</text><text x="${cx}" y="${fx(top - 6)}" text-anchor="middle" font-size="10" fill="#c4542d">${x.hi}°</text>
<text x="${fx(cx + dx + 2)}" y="${fx(oy - z0 + 4)}" font-size="9" fill="#3d6db3">${x.lo}°</text>${cloud}`;
    }).join("");
    return `<div class="d29"><div class="d29-head"><div><div class="d29-pl">${W.place} · ${W.date} · ${W.localTime}</div><div class="d29-t">${n.tempC}°C</div></div><div class="d29-c">${n.icon} ${n.desc}<small>Feels like ${n.feelsC}°C</small></div></div>
<svg viewBox="0 0 540 316" role="img" aria-label="Isometric week: blocks span low to high">${plate}${cols}<text x="20" y="306" font-size="9.5" fill="#6d6458">Blocks float from each day's low to its high · clouds = rain chance ≥ 30%</text></svg>
<div class="d29-leg">${W.days.map(x => `<div><b>${x.name}</b><span>${x.icon}</span><em>${x.desc}</em><span>${x.lo}°–${x.hi}°</span><i>${x.pop}% rain</i></div>`).join("")}</div>
<div class="d29-h">Rain chance · next 24 h</div>
<div class="d29-rain">${W.rain24.map(r => `<div><small>${r.prob}%</small><i style="height:${Math.round(r.prob * 0.26) + 1}px"></i></div>`).join("")}</div>
<div class="d29-hrs">${W.rain24.map(r => `<span>${hs(r.hour)}</span>`).join("")}</div>
<div class="d29-sum">${W.rainSummary}</div>
<div class="d29-det">${det(W).map(([k, v]) => `<div><small>${k}</small>${v}</div>`).join("")}</div></div>`;
  }
});

/* ---------- 30 Tiny Planet (rich) ---------- */
V.push({
  id: "30", name: "Tiny Planet", family: FAM, level: "rich",
  blurb: "Your next 24 hours orbit a tiny planet: temperature grows out of the surface as a ring of bars, rain floats above as drops sized by millimetres, sunrise and sunset are pinned on the orbit, and clouds drift slowly around. 'Tiny planet' photo projections and radial day clocks seen on Dribbble inspired it.",
  pro: "A whole day in one round picture; striking as a hero.",
  con: "Radial charts are harder to read precisely than linear ones.",
  css: `
.d30{background:radial-gradient(circle at 50% 30%,#1b1840,#0a0918 70%);color:#ece9ff;font-family:"Futura","Trebuchet MS",system-ui,sans-serif;padding:16px 18px 18px;box-sizing:border-box}
.d30 *{box-sizing:border-box}
.d30-top{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;font-size:12px;letter-spacing:.12em;text-transform:uppercase;opacity:.8}
.d30 svg{display:block;width:100%;max-width:400px;height:auto;margin:0 auto}
.d30-cl{transform-box:view-box;transform-origin:190px 190px;animation:d30-spin 80s linear infinite}
@keyframes d30-spin{to{transform:rotate(360deg)}}
.d30-key{font-size:10.5px;text-align:center;opacity:.65;margin-top:-2px}
.d30-sum{font-size:13px;text-align:center;margin:6px 0 12px}
.d30-days{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;text-align:center;font-size:11px}
.d30-days div{border:1px solid rgba(236,233,255,.15);border-radius:999px 999px 10px 10px;padding:8px 2px 6px;display:flex;flex-direction:column;gap:2px}
.d30-days span:nth-child(2){font-size:16px}
.d30-days em{font-style:normal;font-size:9.5px;opacity:.65;min-height:22px}
.d30-days i{font-style:normal;color:#8fd0ff}
.d30-det{display:grid;grid-template-columns:repeat(3,1fr);gap:6px 10px;margin-top:12px;font-size:13.5px;text-align:center}
.d30-det small{display:block;font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;opacity:.55}
${RM(30)}`,
  render: W => {
    const n = W.now, d = W.details, C = 190, rnd = rng(30);
    const pt = (r, deg) => { const a = deg * Math.PI / 180; return [fx(C + r * Math.cos(a)), fx(C + r * Math.sin(a))]; };
    let stars = ""; for (let i = 0; i < 50; i++) stars += `<circle cx="${fx(rnd() * 380)}" cy="${fx(rnd() * 380)}" r="${fx(0.4 + rnd() * 0.9)}" fill="#fff" opacity="${fx(0.3 + rnd() * 0.6)}"/>`;
    const hrs = (W.hourlyTempC || []).slice(0, 24), hmin = Math.min(...hrs), hspan = (Math.max(...hrs) - hmin) || 1;
    const temps = hrs.map((t, i) => { const fr = (t - hmin) / hspan, deg = -90 + i * 15, [x1, y1] = pt(76, deg), [x2, y2] = pt(76 + 6 + fr * 34, deg), hue = Math.round(205 - fr * 175); return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="hsl(${hue},80%,62%)" stroke-width="7" stroke-linecap="round"/>`; }).join("");
    const startH = num(W.rain24[0] && W.rain24[0].hour, W.hour24);
    const rain = W.rain24.map((s, j) => { const deg = -90 + j * 30 + 7.5, [x, y] = pt(136, deg), [tx, ty] = pt(156, deg); return `<circle cx="${x}" cy="${y}" r="${fx(2.2 + Math.min(s.mm, 5) * 2.2)}" fill="#6fb6ff" opacity="${fx(0.35 + s.prob / 150)}"/><text x="${tx}" y="${fx(ty + 3)}" text-anchor="middle" font-size="9" fill="#cfe6ff">${s.prob}%</text>`; }).join("");
    const lbls = [0, 6, 12, 18].map(i => { const [x, y] = pt(56, -90 + i * 15); return `<text x="${x}" y="${fx(y + 3)}" text-anchor="middle" font-size="8.5" fill="#d9f0dd" opacity=".85">${hs((startH + i) % 24)}</text>`; }).join("");
    const mark = (s, key, lab, col) => { const m = sunMin(W, key); if (m === null || !s || s === "—") return ""; const h = ((m / 60 - startH) % 24 + 24) % 24, deg = -90 + h * 15, [x, y] = pt(172, deg), below = y > C; return `<circle cx="${x}" cy="${y}" r="5" fill="${col}"/><text x="${x}" y="${fx(below ? y + 15 : y - 9)}" text-anchor="middle" font-size="9.5" fill="${col}">${lab} ${s}</text>`; };
    const clouds = [0, 120, 240].map(deg => { const [x, y] = pt(66, deg); return `<ellipse cx="${x}" cy="${y}" rx="11" ry="5" fill="#fff" opacity=".85"/>`; }).join("");
    return `<div class="d30"><div class="d30-top"><span>${W.place}</span><span>${W.date} · ${W.localTime}</span></div>
<svg viewBox="0 0 380 380" role="img" aria-label="Next 24 hours around a tiny planet">
<defs><radialGradient id="d30p" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#4fae7c"/><stop offset=".7" stop-color="#2a6f63"/><stop offset="1" stop-color="#173f45"/></radialGradient></defs>
${stars}
<circle cx="${C}" cy="${C}" r="136" fill="none" stroke="rgba(255,255,255,.08)"/>
${temps}${rain}
<circle cx="${C}" cy="${C}" r="68" fill="url(#d30p)"/>
<g class="d30-cl">${clouds}</g>
${lbls}
<text x="${C}" y="${C + 4}" text-anchor="middle" font-size="30" font-weight="700" fill="#fff">${n.tempC}°C</text>
<text x="${C}" y="${C + 20}" text-anchor="middle" font-size="9.5" fill="#fff">${n.icon} ${n.desc}</text>
<text x="${C}" y="${C + 32}" text-anchor="middle" font-size="8.5" fill="#fff" opacity=".8">feels ${n.feelsC}°C</text>
<polygon points="${C - 5},6 ${C + 5},6 ${C},14" fill="#ffd27a"/><text x="${C + 9}" y="13" font-size="9.5" fill="#ffd27a">now ${W.localTime}</text>
${mark(d.sunrise, "sunriseMin", "Sunrise", "#ffb347")}${mark(d.sunset, "sunsetMin", "Sunset", "#ff7f6e")}
</svg>
<div class="d30-key">Clockwise from top = next 24 h · inner bars: temperature (blue cool, orange warm) · drops: rain mm, % = chance</div>
<div class="d30-sum">${W.rainSummary}</div>
<div class="d30-days">${W.days.map(x => `<div><b>${x.name}</b><span>${x.icon}</span><em>${x.desc}</em><span>${x.hi}° / ${x.lo}°</span><i>${x.pop}% rain</i></div>`).join("")}</div>
<div class="d30-det">${det(W).map(([k, v]) => `<div><small>${k}</small>${v}</div>`).join("")}</div></div>`;
  }
});
})();
