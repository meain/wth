// Family: borrowed UI paradigms and retro/playful (ids 41-50)
(function () {
  const F = "borrowed UI paradigms and retro/playful";
  const hr = h => (h % 12 || 12) + (h < 12 ? " AM" : " PM");
  const hs = h => (h % 12 || 12) + (h < 12 ? "a" : "p");
  const uvWord = u => u >= 8 ? "very high" : u >= 6 ? "high" : u >= 3 ? "moderate" : "low";
  const maxMm = W => Math.max(0.1, ...W.rain24.map(r => r.mm || 0));
  const RM = n => `@media (prefers-reduced-motion: reduce) { .d${n} *, .d${n} *::before, .d${n} *::after { animation: none !important } }`;

  // ---------- 41: Windows 95 window ----------
  V.push({
    id: "41", name: "Weather.exe", family: F, level: "simple",
    blurb: "The forecast as a Windows 95 program on a teal desktop: group boxes, a sunken list view for the week, a segmented progress-bar rain chart and a taskbar clock. Inspired by the ESP32 'Windows 95' weather station on Hackaday.",
    pro: "Instantly recognisable and dense without feeling cluttered; pure CSS bevels.",
    con: "Nostalgia joke may wear thin for daily use; tiny 12px system font.",
    css: `
.d41{background:#008080;font-family:Tahoma,"MS Sans Serif",Geneva,Verdana,sans-serif;font-size:12px;color:#000;padding:14px 12px 0;display:flex;flex-direction:column;box-sizing:border-box;min-height:680px}
.d41 .win{background:#c0c0c0;border:2px solid;border-color:#fff #000 #000 #fff;box-shadow:inset -1px -1px #808080,inset 1px 1px #dfdfdf;padding:3px;flex:1;display:flex;flex-direction:column}
.d41 .tb{min-width:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;background:linear-gradient(90deg,#000080,#1084d0);color:#fff;font-weight:bold;padding:3px 4px;display:flex;align-items:center;gap:6px}
.d41 .tb .bt{margin-left:auto;display:flex;gap:2px}
.d41 .tb .bt span{width:16px;height:14px;background:#c0c0c0;color:#000;font-size:10px;line-height:12px;text-align:center;border:1px solid;border-color:#fff #404040 #404040 #fff}
.d41 .menu{display:flex;padding:2px 0 4px}
.d41 .menu span{padding:1px 7px}
.d41 .menu u{text-decoration:underline}
.d41 .row{display:flex;gap:6px;flex-wrap:wrap}
.d41 fieldset{border:1px solid #808080;box-shadow:1px 1px 0 #fff,inset 1px 1px 0 #fff;margin:4px 2px;padding:6px 8px 8px;min-width:0}
.d41 legend{padding:0 3px}
.d41 .now{flex:1 1 200px}
.d41 .det{flex:1 1 220px}
.d41 .big{display:flex;gap:10px;align-items:center}
.d41 .ico{font-size:40px;line-height:1}
.d41 .t{font-size:34px;font-weight:bold;letter-spacing:-1px;display:block;line-height:1}
.d41 .sunk{background:#fff;border:2px solid;border-color:#808080 #fff #fff #808080;box-shadow:inset 1px 1px #000}
.d41 .kv{display:grid;grid-template-columns:auto 1fr;gap:3px 6px;align-items:center}
.d41 .kv .sunk{padding:1px 4px;white-space:nowrap}
.d41 .chart{display:flex;height:112px;padding:4px 4px 2px;gap:3px}
.d41 .c{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;min-width:0}
.d41 .c .p{font-size:10px}
.d41 .c .b{width:70%;background:repeating-linear-gradient(to top,#000080 0 6px,transparent 6px 8px)}
.d41 .c .h{font-size:10px;color:#444;border-top:1px solid #808080;width:100%;text-align:center;margin-top:2px}
.d41 .note{margin:6px 0 0;display:flex;gap:6px;align-items:flex-start}
.d41 .note b{background:#000080;color:#fff;padding:0 4px}
.d41 .lv{margin:4px 2px}
.d41 table{border-collapse:collapse;width:100%}
.d41 th{background:#c0c0c0;border:1px solid;border-color:#fff #404040 #404040 #fff;font-weight:normal;text-align:left;padding:1px 6px}
.d41 td{padding:2px 6px;white-space:nowrap}
.d41 tr.sel td{background:#000080;color:#fff}
.d41 .pb{display:inline-block;width:46px;height:9px;border:1px solid #808080;margin-right:5px;vertical-align:middle;background:#fff}
.d41 .pb i{display:block;height:100%;background:#000080}
.d41 tr.sel .pb i{background:#fff}
.d41 .status{display:flex;gap:3px;margin-top:auto;padding-top:4px}
.d41 .status span{flex:1;border:1px solid;border-color:#808080 #fff #fff #808080;padding:1px 5px}
.d41 .task{background:#c0c0c0;border-top:2px solid #fff;margin:10px -12px 0;padding:3px 4px;display:flex;gap:4px;align-items:center}
.d41 .task>span{border:2px solid;border-color:#fff #000 #000 #fff;padding:1px 8px}
.d41 .task .tk{border-color:#000 #fff #fff #000;background:#d8d8d8;font-weight:bold}
.d41 .task .clock{margin-left:auto;border:1px solid;border-color:#808080 #fff #fff #808080}`,
    render: (W) => {
      const d = W.details;
      return `<div class="d41"><div class="win">
<div class="tb"><span>${W.now.icon} Weather — ${W.place}</span><div class="bt"><span>_</span><span>□</span><span>×</span></div></div>
<div class="menu"><span><u>F</u>ile</span><span><u>E</u>dit</span><span><u>V</u>iew</span><span>F<u>o</u>recast</span><span><u>H</u>elp</span></div>
<div class="row">
 <fieldset class="now"><legend>Current conditions</legend><div class="big"><span class="ico">${W.now.icon}</span><div><b class="t">${W.now.tempC}°C</b><div>${W.now.desc}</div><div>Feels like ${W.now.feelsC}°C</div><div style="color:#555">${W.date}, ${W.localTime}</div></div></div></fieldset>
 <fieldset class="det"><legend>Details</legend><div class="kv">
  <span>Humidity:</span><span class="sunk">${d.humidity}%</span>
  <span>Wind:</span><span class="sunk">${d.windKmh} km/h ${d.windDir}, gusts ${d.gustKmh}</span>
  <span>UV index:</span><span class="sunk">${d.uv} (${uvWord(d.uv)})</span>
  <span>Cloud cover:</span><span class="sunk">${d.cloud}%</span>
 </div></fieldset>
</div>
<fieldset><legend>Chance of rain, next 24 hours</legend>
 <div class="chart sunk">${W.rain24.map(r => `<div class="c"><span class="p">${r.prob}%</span><div class="b" style="height:${r.prob * 0.72}px"></div><span class="h">${hs(r.hour)}</span></div>`).join("")}</div>
 <p class="note"><b>i</b><span>${W.rainSummary}</span></p>
</fieldset>
<div class="lv sunk"><table><tr><th>Day</th><th>Forecast</th><th>Low</th><th>High</th><th>Rain</th></tr>
${W.days.map((x, i) => `<tr class="${i === 0 ? "sel" : ""}"><td>${x.name}</td><td>${x.icon} ${x.desc}</td><td>${x.lo}°C</td><td>${x.hi}°C</td><td><span class="pb"><i style="width:${x.pop}%"></i></span>${x.pop}%</td></tr>`).join("")}
</table></div>
<div class="status"><span>Sunrise ${d.sunrise}</span><span>Sunset ${d.sunset}</span><span>${d.pressureHpa} hPa</span></div>
</div>
<div class="task"><span><b>Start</b></span><span class="tk">${W.now.icon} Weather</span><span class="clock">${W.localTime}</span></div></div>`;
    }
  });

  // ---------- 42: htop-style terminal TUI ----------
  V.push({
    id: "42", name: "wth --tui", family: F, level: "simple",
    blurb: "A terminal dashboard in the spirit of htop: bracketed meters for humidity/cloud/UV/wind, a block-character rain histogram and a function-key footer. Inspired by the amber/green themes of the 'ASCII Weather' app.",
    pro: "Monospace grid makes every number line up; zero graphics needed.",
    con: "Phosphor green on black is niche; block glyphs depend on the font.",
    css: `
.d42{background:#0b0f0a;color:#a9f59a;font:12px/1.5 ui-monospace,Menlo,Consolas,"DejaVu Sans Mono",monospace;padding:12px 14px 10px;box-sizing:border-box}
.d42 .pr{color:#6fa865;overflow-wrap:anywhere}
.d42 .pr b{color:#e6ff8a;font-weight:normal}
.d42 .box{border:1px solid #3d6b35;position:relative;padding:12px 10px 8px;margin-top:14px}
.d42 .box>.tt{position:absolute;top:-9px;left:10px;background:#0b0f0a;padding:0 5px;color:#e6ff8a}
.d42 .top{display:flex;gap:10px;flex-wrap:wrap}
.d42 .top .box{flex:1 1 200px}
.d42 .tmp{font-size:44px;line-height:1;color:#e6ff8a}
.d42 .dim{color:#5f8f57}
.d42 .m{white-space:pre}
.d42 .m .k{color:#62d0ff}
.d42 .m .g{color:#7cff5c}
.d42 .m .y{color:#ffd35c}
.d42 .m .r{color:#ff6b5c}
.d42 .ch{white-space:pre;line-height:1.15;overflow:hidden}
.d42 .ch .w{color:#62d0ff}
.d42 .sum{margin-top:6px;color:#e6ff8a}
.d42 .dr{display:grid;grid-template-columns:46px 1fr 70px 108px 74px;gap:6px;white-space:nowrap}
.d42 .dr.hd{color:#0b0f0a;background:#7cff5c}
.d42 .dr .sp{white-space:pre;color:#ffd35c}
.d42 .dr .pp{white-space:pre;color:#62d0ff}
.d42 .dr:nth-child(2){background:#1b2a18}
.d42 .fk{margin-top:10px;display:flex;flex-wrap:wrap;gap:0 2px}
.d42 .fk span{white-space:nowrap}
.d42 .fk b{color:#0b0f0a;background:#62d0ff;font-weight:normal;padding:0 1px}
.d42 .cur{display:inline-block;width:7px;height:13px;background:#a9f59a;vertical-align:-2px;animation:d42-b 1s steps(1) infinite}
@keyframes d42-b{50%{opacity:0}}
${RM(42)}`,
    render: (W) => {
      const d = W.details;
      const bar = (v, max, w) => { const n = Math.round(Math.min(v / max, 1) * w); return "|".repeat(n) + " ".repeat(w - n); };
      const meter = (k, v, max, txt, cls) => `<div class="m"><span class="k">${k.padEnd(5)}</span>[<span class="${cls}">${bar(v, max, 18)}</span>] ${txt}</div>`;
      const rows = [];
      for (let r = 5; r >= 1; r--) {
        rows.push(W.rain24.map(x => {
          const s = x.prob >= r * 20 ? "███" : x.prob >= r * 20 - 10 ? "▄▄▄" : "   ";
          return x.prob >= 50 ? `<span class="w">${s}</span>` : s;
        }).join(" "));
      }
      rows.push(`<span class="dim">${W.rain24.map(x => hs(x.hour).padEnd(3)).join(" ")}</span>`);
      rows.push(W.rain24.map(x => (x.prob + "%").padEnd(3)).join(" "));
      const tLo = Math.min(...W.days.map(x => x.lo)), tHi = Math.max(...W.days.map(x => x.hi)), tSp = (tHi - tLo) || 1;
      const span = (lo, hi) => { const a = Math.round((lo - tLo) / tSp * 12), b = Math.round((hi - tLo) / tSp * 12); let s = ""; for (let t = 0; t <= 12; t++) s += t < a || t > b ? "·" : t === a || t === b ? "┃" : "━"; return s; };
      return `<div class="d42">
<div class="pr"><b>meain@${W.cityName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}</b>:~$ wth "${W.place}" --tui</div>
<div class="top">
 <div class="box"><span class="tt">now · ${W.localTime}</span>
  <div class="tmp">${W.now.tempC}°C</div>
  <div>${W.now.icon} ${W.now.desc}</div>
  <div class="dim">feels like ${W.now.feelsC}°C · ${W.date}</div>
 </div>
 <div class="box"><span class="tt">details</span>
  ${meter("HUM", d.humidity, 100, d.humidity + "%", "g")}
  ${meter("CLOUD", d.cloud, 100, d.cloud + "%", "g")}
  ${meter("UV", d.uv, 11, d.uv + " " + uvWord(d.uv), d.uv >= 6 ? "r" : "y")}
  ${meter("WIND", d.windKmh, 50, d.windKmh + " km/h " + d.windDir, "y")}
  <div class="m"><span class="k">SUN  </span> ↑ rise ${d.sunrise}  ↓ set ${d.sunset}</div>
 </div>
</div>
<div class="box"><span class="tt">rain chance · next 24h · 2h slots</span>
 <div class="ch">${rows.join("\n")}</div>
 <div class="sum">&gt; ${W.rainSummary}</div>
</div>
<div class="box"><span class="tt">7 days</span>
 <div class="dr hd"><span>DAY</span><span>COND</span><span>LO..HI</span><span>${tLo}°C · · · ${tHi}°C</span><span>RAIN</span></div>
 ${W.days.map(x => `<div class="dr"><span>${x.name}</span><span>${x.icon} ${x.desc}</span><span>${x.lo}..${x.hi}°C</span><span class="sp">${span(x.lo, x.hi)}</span><span class="pp">${"▓".repeat(Math.round(x.pop / 20)).padEnd(5, "░")} ${x.pop}%</span></div>`).join("")}
</div>
<div class="fk"><span><b>F1</b>Help </span><span><b>F2</b>City </span><span><b>F5</b>Refresh </span><span><b>F6</b>Hourly </span><span><b>F10</b>Quit </span><span class="cur"></span></div>
</div>`;
    }
  });

  // ---------- 43: Spreadsheet ----------
  V.push({
    id: "43", name: "weather.xlsx", family: F, level: "simple",
    blurb: "The forecast as a spreadsheet: a formula bar calling =WEATHER(), conditional-format colour scales on highs and lows, data bars for rain chance, a heat-mapped rain row and the summary as a cell comment.",
    pro: "Conditional formatting is a genuinely good way to scan a table of numbers.",
    con: "Looks like work; gridlines add visual noise.",
    css: `
.d43{background:#fff;color:#222;font:12px/1.3 "Segoe UI",Calibri,Arial,sans-serif;border:1px solid #c8c8c8;box-sizing:border-box}
.d43 .tbar{gap:8px;flex-wrap:wrap;background:#217346;color:#fff;padding:6px 10px;display:flex;justify-content:space-between}
.d43 .rib{background:#f3f3f3;border-bottom:1px solid #d4d4d4;padding:5px 10px;display:flex;gap:10px;color:#444;flex-wrap:wrap}
.d43 .rib b{border:1px solid #c8c8c8;background:#fff;padding:0 6px;font-weight:normal}
.d43 .fx{display:flex;border-bottom:1px solid #d4d4d4;align-items:stretch}
.d43 .fx .nb{width:60px;border-right:1px solid #d4d4d4;padding:4px 6px}
.d43 .fx .f{padding:4px 8px;color:#555;font-style:italic;border-right:1px solid #d4d4d4}
.d43 .fx .v{padding:4px 8px;font-family:Consolas,Menlo,monospace;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d43 table{border-collapse:collapse;width:100%;table-layout:fixed}
.d43 th{background:#f0f0f0;color:#555;font-weight:normal;border:1px solid #d4d4d4;height:18px;font-size:11px}
.d43 th.rn{width:28px}
.d43 td{border:1px solid #e1e1e1;height:20px;padding:1px 5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.d43 td.num{text-align:right}
.d43 td.h{background:#ddebf7;font-weight:600;color:#1f3d5c}
.d43 td.title{font-size:15px;font-weight:600;height:26px}
.d43 td.sel{outline:2px solid #217346;outline-offset:-2px;font-size:20px;font-weight:700;text-align:right;height:30px}
.d43 td.rc{text-align:center;font-size:11px;height:34px;line-height:1.2}
.d43 td.rc b{display:block;font-size:13px}
.d43 td.cm{position:relative;color:#5a4a00;background:#fff8d6;white-space:normal;height:auto}
.d43 td.cm::after{content:"";position:absolute;right:0;top:0;border:5px solid transparent;border-top-color:#d00;border-right-color:#d00}
.d43 td.k{color:#666}
.d43 .tabs{display:flex;background:#f3f3f3;border-top:1px solid #d4d4d4;font-size:11px}
.d43 .tabs span{padding:4px 12px;border-right:1px solid #d4d4d4;color:#555}
.d43 .tabs span.on{background:#fff;color:#217346;font-weight:600;border-bottom:2px solid #217346}`,
    render: (W) => {
      const d = W.details;
      const hiC = t => `hsl(${Math.round(55 - (t - 26) * 6)},90%,${Math.round(82 - (t - 26) * 2.5)}%)`;
      const loC = t => `hsl(205,70%,${Math.round(84 - (22 - t) * 6)}%)`;
      const rc = r => `<td class="rc" style="background:rgba(33,115,200,${(r.prob / 100 * 0.85).toFixed(2)});color:${r.prob > 55 ? "#fff" : "#123"}">${hr(r.hour)}<b>${r.prob}%</b></td>`;
      const cols = ["A", "B", "C", "D", "E", "F"];
      let n = 0; const rn = () => `<th class="rn">${++n}</th>`;
      return `<div class="d43">
<div class="tbar"><span>weather_${W.cityName.toLowerCase().replace(/[^a-z0-9]+/g, "_")}.xlsx</span><span>Saved · ${W.localTime}</span></div>
<div class="rib"><b>Calibri</b><b>11</b><span><b>B</b></span><span>Σ AutoSum</span><span>Conditional Formatting</span></div>
<div class="fx"><span class="nb">C2</span><span class="f">fx</span><span class="v">=WEATHER("${W.place}", NOW())</span></div>
<table>
<colgroup><col style="width:28px"><col style="width:15%"><col style="width:27%"><col><col><col style="width:20%"><col></colgroup>
<tr><th class="rn"></th>${cols.map(c => `<th>${c}</th>`).join("")}</tr>
<tr>${rn()}<td class="title" colspan="6">${W.place} · ${W.date} · ${W.localTime}</td></tr>
<tr>${rn()}<td class="k">Now</td><td>${W.now.icon} ${W.now.desc}</td><td class="sel">${W.now.tempC}°C</td><td colspan="3" class="k">Feels like ${W.now.feelsC}°C</td></tr>
<tr>${rn()}<td class="h">Day</td><td class="h">Condition</td><td class="h">Lo °C</td><td class="h">Hi °C</td><td class="h">Rain chance</td><td class="h">Rain mm</td></tr>
${W.days.map(x => `<tr>${rn()}<td>${x.name}</td><td>${x.icon} ${x.desc}</td><td class="num" style="background:${loC(x.lo)}">${x.lo}</td><td class="num" style="background:${hiC(x.hi)}">${x.hi}</td><td class="num" style="background:linear-gradient(90deg,#9cc3ee ${x.pop}%,transparent ${x.pop}%)">${x.pop}%</td><td class="num">${x.mm.toFixed(1)}</td></tr>`).join("")}
<tr>${rn()}<td class="h" colspan="6">Rain chance, next 24 h (2-hour slots)</td></tr>
<tr>${rn()}${W.rain24.slice(0, 6).map(rc).join("")}</tr>
<tr>${rn()}${W.rain24.slice(6).map(rc).join("")}</tr>
<tr>${rn()}<td class="cm" colspan="6">Comment: ${W.rainSummary}</td></tr>
<tr>${rn()}<td class="h" colspan="6">Details</td></tr>
<tr>${rn()}<td class="k">Humidity</td><td>${d.humidity}%</td><td class="k">Wind</td><td colspan="3">${d.windKmh} km/h ${d.windDir} (gusts ${d.gustKmh})</td></tr>
<tr>${rn()}<td class="k">UV index</td><td>${d.uv} · ${uvWord(d.uv)}</td><td class="k">Cloud</td><td>${d.cloud}%</td><td class="k">Pressure</td><td>${d.pressureHpa}</td></tr>
<tr>${rn()}<td class="k">Sunrise</td><td>${d.sunrise}</td><td class="k">Sunset</td><td>${d.sunset}</td><td class="k">Dew pt</td><td>${d.dewC}°C</td></tr>
</table>
<div class="tabs"><span class="on">Forecast</span><span>Hourly</span><span>History</span><span>+</span></div>
</div>`;
    }
  });

  // ---------- 44: Chat with a weather bot ----------
  V.push({
    id: "44", name: "Weatherbot chat", family: F, level: "simple",
    blurb: "A messaging thread where you ask a cheeky bot about the weather and it answers with bubbles, a tiny rain chart, a week list and detail chips. Inspired by the Hyundai Card weather app's witty comments instead of bare symbols.",
    pro: "Reads top-to-bottom like a story; personality without decoration.",
    con: "Conversation framing wastes vertical space on the questions.",
    css: `
.d44{background:#ece5dd;color:#1d1d1f;font:13px/1.35 -apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;box-sizing:border-box;display:flex;flex-direction:column}
.d44 .hd{background:#0b6e63;color:#fff;padding:10px 14px;display:flex;align-items:center;gap:10px}
.d44 .av{width:34px;height:34px;border-radius:50%;background:#fde68a;color:#0b6e63;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px}
.d44 .hd small{display:block;opacity:.8;font-size:11px}
.d44 .th{padding:10px 12px;display:flex;flex-direction:column;gap:6px;background:radial-gradient(#d9d0c5 1px,transparent 1px) 0 0/14px 14px}
.d44 .day{align-self:center;background:#dfeef6;color:#456;font-size:11px;padding:2px 10px;border-radius:8px}
.d44 .b{max-width:82%;padding:7px 10px 5px;border-radius:10px;box-shadow:0 1px 1px rgba(0,0,0,.12);position:relative}
.d44 .b .ts{display:block;text-align:right;font-size:10px;color:#889;margin-top:2px}
.d44 .u{align-self:flex-end;background:#d9fdd3;border-top-right-radius:2px}
.d44 .w{align-self:flex-start;background:#fff;border-top-left-radius:2px}
.d44 .big{font-size:30px;font-weight:700;line-height:1.1}
.d44 .rb{display:flex;align-items:flex-end;gap:3px;height:58px;margin:8px 0 2px;border-bottom:1px solid #ccd}
.d44 .rb i{flex:1;background:#5aa9e6;border-radius:3px 3px 0 0;min-height:2px}
.d44 .rb i.hi{background:#1769aa}
.d44 .rl{display:flex;gap:3px;font-size:9px;color:#778}
.d44 .rl span{flex:1;text-align:center}
.d44 .wk{display:grid;grid-template-columns:44px 1fr auto auto;gap:2px 10px;margin-top:4px;font-size:12px}
.d44 .wk .p{color:#1769aa;text-align:right}
.d44 .wk .t{text-align:right;font-variant-numeric:tabular-nums}
.d44 .chips{display:flex;flex-wrap:wrap;gap:5px;margin-top:5px}
.d44 .chips span{background:#f1f5f4;border:1px solid #dbe5e3;border-radius:12px;padding:2px 8px;font-size:12px}
.d44 .typ{align-self:flex-start;background:#fff;border-radius:10px;padding:8px 12px;display:flex;gap:4px}
.d44 .typ i{width:6px;height:6px;border-radius:50%;background:#aab}
.d44 .qr{display:flex;gap:6px;padding:6px 12px;flex-wrap:wrap}
.d44 .qr span{border:1px solid #0b6e63;color:#0b6e63;border-radius:14px;padding:3px 10px;font-size:12px;background:#fff}
.d44 .in{display:flex;gap:8px;padding:8px 12px 10px;align-items:center}
.d44 .in span{flex:1;background:#fff;border-radius:18px;padding:8px 14px;color:#99a}
.d44 .in b{background:#0b6e63;color:#fff;border-radius:16px;padding:6px 12px;font-size:12px}`,
    render: (W) => {
      const d = W.details;
      return `<div class="d44">
<div class="hd"><div class="av">WB</div><div><b>Weatherbot</b><small>online · ${W.place}</small></div></div>
<div class="th">
 <span class="day">Today · ${W.date}</span>
 <div class="b u">hey, what's it like outside?<span class="ts">${W.localTime}</span></div>
 <div class="b w">${W.now.icon} ${W.now.desc} in ${W.place.split(",")[0]} right now<div class="big">${W.now.tempC}°C</div>feels like ${W.now.feelsC}°C.<span class="ts">${W.localTime}</span></div>
 <div class="b u">gonna rain ${W.isNight ? "tonight" : "later"}?<span class="ts">${W.localTime}</span></div>
 <div class="b w">${W.rainSummary}
  <div class="rb">${W.rain24.map(r => `<i class="${r.prob >= 50 ? "hi" : ""}" style="height:${r.prob}%"></i>`).join("")}</div>
  <div class="rl">${W.rain24.map(r => `<span>${hs(r.hour)}</span>`).join("")}</div>
  <div class="rl">${W.rain24.map(r => `<span>${r.prob}%</span>`).join("")}</div>
  <span class="ts">${W.localTime}</span></div>
 <div class="b u">and the rest of the week?<span class="ts">${W.localTime}</span></div>
 <div class="b w">Here's the week ahead:
  <div class="wk">${W.days.map(x => `<span>${x.name}</span><span>${x.icon} ${x.desc}</span><span class="t">${x.lo}–${x.hi}°C</span><span class="p">rain ${x.pop}%</span>`).join("")}</div>
  <span class="ts">${W.localTime}</span></div>
 <div class="b u">anything else?<span class="ts">${W.localTime}</span></div>
 <div class="b w">UV is ${uvWord(d.uv)} right now.
  <div class="chips"><span>💧 Humidity ${d.humidity}%</span><span>🧭 Wind ${d.windKmh} km/h ${d.windDir}</span><span>☀️ UV ${d.uv}</span><span>☁️ Cloud ${d.cloud}%</span><span>🌅 Sunrise ${d.sunrise}</span><span>🌇 Sunset ${d.sunset}</span></div>
  <span class="ts">${W.localTime}</span></div>
 <div class="typ"><i></i><i></i><i></i></div>
</div>
<div class="qr"><span>Hourly</span><span>Tomorrow</span><span>Umbrella?</span></div>
<div class="in"><span>Message Weatherbot</span><b>Send</b></div>
</div>`;
    }
  });

  // ---------- 45: LCD weather station ----------
  V.push({
    id: "45", name: "LCD station", family: F, level: "medium",
    blurb: "A 90s desk weather station: grey plastic body, reflective green LCD with faint unlit '88' segments, a blinking clock colon, segment bar meters for rain and a scrolling ticker. Inspired by the 'Classic Green' LCD palette of the Framer Weatherstation component.",
    pro: "Strong single-object identity; low-contrast LCD feels calm and tactile.",
    con: "LCD contrast is deliberately low; emoji are flattened to grey silhouettes.",
    css: `
.d45{background:radial-gradient(circle at 30% 0,#4a4f57,#1f2227);padding:22px 16px;box-sizing:border-box;font-family:ui-monospace,Menlo,Consolas,monospace}
.d45 .dev{background:linear-gradient(#e4e1d8,#cbc7bb);border-radius:22px;padding:14px 16px 16px;box-shadow:0 12px 30px rgba(0,0,0,.5),inset 0 2px 0 #fff,inset 0 -3px 0 #a9a497}
.d45 .brand{display:flex;justify-content:space-between;font:700 10px/1 Helvetica,Arial,sans-serif;letter-spacing:.18em;color:#5b574d;margin:0 4px 10px}
.d45 .brand i{font-style:normal;color:#c0392b}
.d45 .lcd{background:linear-gradient(160deg,#b5c49a,#97a87c);border-radius:8px;padding:10px 12px;color:#1c2614;box-shadow:inset 0 3px 8px rgba(0,0,0,.35);border:3px solid #7b7a70}
.d45 .lcd .lb{font:700 9px/1 Helvetica,Arial,sans-serif;letter-spacing:.12em;opacity:.75}
.d45 .r1{flex-wrap:wrap;gap:4px;display:flex;justify-content:space-between;align-items:baseline;border-bottom:1px solid rgba(28,38,20,.25);padding-bottom:5px}
.d45 .clk{font-size:20px;font-weight:700}
.d45 .col{animation:d45-bl 1s steps(1) infinite}
@keyframes d45-bl{50%{opacity:.1}}
.d45 .r2{display:flex;gap:12px;padding:8px 0;border-bottom:1px solid rgba(28,38,20,.25);flex-wrap:wrap}
.d45 .seg{position:relative;font-weight:700;display:inline-block}
.d45 .seg::before{content:attr(data-g);position:absolute;left:0;top:0;color:rgba(28,38,20,.08)}
.d45 .tmp{font-size:64px;line-height:.95;letter-spacing:-2px}
.d45 .unit{font-size:20px;font-weight:700;vertical-align:top}
.d45 .ic{filter:grayscale(1) brightness(.35) contrast(1.4);font-size:26px}
.d45 .cond{display:flex;flex-direction:column;justify-content:center;gap:2px;font-size:12px;font-weight:700}
.d45 .ind{margin-left:auto;display:grid;grid-template-columns:auto auto;gap:2px 10px;font-size:12px;font-weight:700;align-content:center}
.d45 .ind span:nth-child(odd){font:700 9px/1.6 Helvetica,Arial,sans-serif;letter-spacing:.1em;opacity:.75}
.d45 .rn{padding:8px 0 4px;border-bottom:1px solid rgba(28,38,20,.25)}
.d45 .bars{display:flex;gap:4px;margin-top:5px}
.d45 .bars .c{flex:1;text-align:center;font-size:9px;font-weight:700}
.d45 .stk{display:flex;flex-direction:column-reverse;gap:2px;margin:2px 0}
.d45 .stk i{height:4px;background:rgba(28,38,20,.08)}
.d45 .stk i.on{background:#1c2614}
.d45 .tick{overflow:hidden;white-space:nowrap;font-size:11px;font-weight:700;margin-top:5px}
.d45 .tick span{display:inline-block;padding-left:100%;animation:d45-mq 16s linear infinite}
@keyframes d45-mq{to{transform:translateX(-100%)}}
.d45 .wk{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;padding-top:8px;text-align:center;font-size:10px;font-weight:700}
.d45 .wk .ic{font-size:17px;display:block}
.d45 .wk .ds{font:700 8px/1.15 Helvetica,Arial,sans-serif;letter-spacing:.04em;min-height:18px;display:block;text-transform:uppercase}
.d45 .wk b{font-size:13px;display:block}
.d45 .sun{display:flex;justify-content:space-between;font-size:11px;font-weight:700;padding-top:7px;margin-top:7px;border-top:1px solid rgba(28,38,20,.25)}
.d45 .btns{display:flex;gap:10px;margin-top:14px;justify-content:center;flex-wrap:wrap}
.d45 .btns span{background:linear-gradient(#f2efe7,#c4bfb2);border-radius:14px;padding:6px 14px;font:700 10px/1 Helvetica,Arial,sans-serif;letter-spacing:.12em;color:#4b483f;box-shadow:0 2px 0 #8e897c}
.d45 .btns span.lt{background:linear-gradient(#f7a35c,#d9752a);color:#fff}
${RM(45)}
@media (prefers-reduced-motion: reduce){.d45 .tick span{padding-left:0}}`,
    render: (W) => {
      const d = W.details;
      const hh = String(W.hour24 % 12 || 12), mm = String(W.minute).padStart(2, "0"), ap = W.hour24 < 12 ? "AM" : "PM";
      return `<div class="d45"><div class="dev">
<div class="brand"><span>WTH-560 · WEATHER STATION</span><span><i>●</i> RADIO SYNC</span></div>
<div class="lcd">
 <div class="r1"><span class="lb">${W.place.toUpperCase()} · ${W.date.toUpperCase()}</span><span class="clk">${hh}<span class="col">:</span>${mm} <small>${ap}</small></span></div>
 <div class="r2">
  <div><span class="lb">OUT TEMP</span><br><span class="seg tmp" data-g="88">${W.now.tempC}</span><span class="unit">°C</span></div>
  <div class="cond"><span class="ic">${W.now.icon}</span><span>${W.now.desc.toUpperCase()}</span><span>FEELS <span class="seg" data-g="88">${W.now.feelsC}</span>°C</span></div>
  <div class="ind"><span>HUMID</span><span>${d.humidity}%</span><span>WIND</span><span>${d.windKmh} KM/H ${d.windDir}</span><span>UV</span><span>${d.uv} ${uvWord(d.uv).toUpperCase()}</span><span>CLOUD</span><span>${d.cloud}%</span></div>
 </div>
 <div class="rn"><span class="lb">RAIN CHANCE · NEXT 24H · EACH SEGMENT = 10%</span>
  <div class="bars">${W.rain24.map(r => `<div class="c">${r.prob}<div class="stk">${Array.from({ length: 10 }, (_, k) => `<i class="${r.prob >= (k + 1) * 10 - 5 ? "on" : ""}"></i>`).join("")}</div>${hs(r.hour).toUpperCase()}</div>`).join("")}</div>
  <div class="tick"><span>${W.rainSummary.toUpperCase()} · ${W.rainSummary.toUpperCase()}</span></div>
 </div>
 <div class="wk">${W.days.map(x => `<div>${x.name.toUpperCase()}<span class="ic">${x.icon}</span><span class="ds">${x.desc}</span><b>${x.hi}°</b>${x.lo}°C<br>☂ ${x.pop}%</div>`).join("")}</div>
 <div class="sun"><span>SUNRISE ${d.sunrise}</span><span>SUNSET ${d.sunset}</span><span>${d.pressureHpa} HPA</span></div>
</div>
<div class="btns"><span>MODE</span><span class="lt">LIGHT</span><span>MAX/MIN</span><span>SET</span></div>
</div></div>`;
    }
  });

  // ---------- 46: Metro map ----------
  V.push({
    id: "46", name: "Weather Transit Map", family: F, level: "medium",
    blurb: "A transit diagram: the next 24 hours run as a line whose segments turn from grey 'Dry Line' to blue 'Rain Line' when rain is likely, and the week branches off as an orange line of day stations. Inspired by Behance's 'The Weather Line' and the Met Office brief to show forecasts with shape and line.",
    pro: "Time as a journey is intuitive; rain stretch pops out at a glance.",
    con: "SVG labels need care at narrow widths; less room for details.",
    css: `
.d46{background:#f7f5ef;color:#1a1a1a;font:12px/1.3 "Helvetica Neue",Helvetica,Arial,sans-serif;padding:14px 16px;box-sizing:border-box}
.d46 .hd{flex-wrap:wrap;overflow-wrap:anywhere;display:flex;align-items:center;gap:12px;border-bottom:3px solid #1a1a1a;padding-bottom:8px}
.d46 .rd{width:40px;height:40px;border-radius:50%;border:7px solid #d6312b;box-sizing:border-box;position:relative;flex:none}
.d46 .rd::after{content:"";position:absolute;left:-10px;right:-10px;top:50%;height:9px;margin-top:-4.5px;background:#1e3a8a}
.d46 h3{margin:0;font-size:17px;letter-spacing:.02em}
.d46 .yah{margin-left:auto;text-align:right}
.d46 .yah b{font-size:28px;display:block;line-height:1}
.d46 svg{display:block;width:100%;height:auto;margin-top:6px}
.d46 svg text{font-family:"Helvetica Neue",Helvetica,Arial,sans-serif}
.d46 .notice{background:#ffd200;border-left:8px solid #1a1a1a;padding:6px 10px;font-weight:600;margin-top:4px}
.d46 .notice small{display:block;font-weight:700;letter-spacing:.1em;font-size:10px}
.d46 .lg{display:flex;flex-wrap:wrap;gap:4px 14px;margin-top:8px;font-size:11px;color:#444}
.d46 .lg i{display:inline-block;width:22px;height:6px;border-radius:3px;vertical-align:middle;margin-right:5px}`,
    render: (W) => {
      const d = W.details, R = W.rain24, X = i => 36 + i * 42, Y0 = 82;
      const segs = R.slice(0, -1).map((r, i) => { const wet = (r.prob + R[i + 1].prob) / 2 >= 50; return `<line x1="${X(i)}" y1="${Y0}" x2="${X(i + 1)}" y2="${Y0}" stroke="${wet ? "#1f6fd1" : "#a3a9b0"}" stroke-width="10" stroke-linecap="round"/>`; }).join("");
      const sts = R.map((r, i) => `<circle cx="${X(i)}" cy="${Y0}" r="${i === 0 ? 9 : 6}" fill="#fff" stroke="#1a1a1a" stroke-width="${i === 0 ? 4 : 3}"/>
<text x="${X(i)}" y="${Y0 - 16}" transform="rotate(-40 ${X(i)} ${Y0 - 16})" font-size="11" font-weight="${r.prob >= 50 ? 700 : 400}">${hr(r.hour)}</text>
<text x="${X(i)}" y="${Y0 + 24}" text-anchor="middle" font-size="11" font-weight="700" fill="${r.prob >= 50 ? "#1f6fd1" : "#555"}">${r.prob}%</text>
${r.mm >= 0.4 ? `<text x="${X(i)}" y="${Y0 + 37}" text-anchor="middle" font-size="9.5" fill="#1f6fd1">${r.mm} mm</text>` : ""}`).join("");
      const DY = k => 172 + k * 44;
      const days = W.days.map((x, k) => `<circle cx="36" cy="${DY(k)}" r="7" fill="#fff" stroke="${x.pop >= 50 ? "#1f6fd1" : "#1a1a1a"}" stroke-width="${x.pop >= 50 ? 5 : 3}"/>
<text x="56" y="${DY(k) - 2}" font-size="13" font-weight="700">${x.name} <tspan font-weight="400">${x.icon} ${x.desc}</tspan></text>
<text x="56" y="${DY(k) + 13}" font-size="11" fill="#555">${x.lo}–${x.hi}°C · rain ${x.pop}%${x.mm ? " · " + x.mm + " mm" : ""}</text>`).join("");
      const fac = [["Humidity", d.humidity + "%"], ["Wind", d.windKmh + " km/h " + d.windDir], ["Gusts", d.gustKmh + " km/h"], ["UV index", d.uv + " (" + uvWord(d.uv) + ")"], ["Cloud cover", d.cloud + "%"], ["Sunrise", d.sunrise], ["Sunset", d.sunset]];
      return `<div class="d46">
<div class="hd"><div class="rd"></div><div><h3>${W.cityName.toUpperCase()} WEATHER NETWORK</h3><span>${W.date} · service from ${W.localTime}</span></div>
<div class="yah"><small>You are here</small><b>${W.now.tempC}°C</b>${W.now.icon} ${W.now.desc} · feels ${W.now.feelsC}°C</div></div>
<svg viewBox="0 0 540 470" role="img" aria-label="Transit-style map of the next 24 hours of rain and the 7-day forecast">
 <text x="0" y="14" font-size="10" font-weight="700" letter-spacing="1.2" fill="#555">NEXT 24 HOURS · CHANCE OF RAIN PER STOP</text>
 <path d="M36 ${Y0} V ${DY(6)}" stroke="#e3742b" stroke-width="10" stroke-linecap="round" fill="none"/>
 ${segs}${sts}
 <text x="52" y="148" font-size="10" font-weight="700" letter-spacing="1.2" fill="#555">ORANGE LINE · NEXT 7 DAYS</text>
 ${days}
 <g transform="translate(300 160)">
  <rect width="236" height="${30 + fac.length * 24}" rx="6" fill="#fff" stroke="#1a1a1a" stroke-width="2"/>
  <rect width="236" height="26" rx="6" fill="#1a1a1a"/><rect y="14" width="236" height="12" fill="#1a1a1a"/>
  <text x="12" y="18" fill="#fff" font-size="11" font-weight="700" letter-spacing="1">STATION FACILITIES · NOW</text>
  ${fac.map((f, i) => `<text x="12" y="${46 + i * 24}" font-size="12" fill="#555">${f[0]}</text><text x="224" y="${46 + i * 24}" font-size="12" font-weight="700" text-anchor="end">${f[1]}</text>`).join("")}
 </g>
</svg>
<div class="notice"><small>SERVICE NOTICE</small>${W.rainSummary}</div>
<div class="lg"><span><i style="background:#a3a9b0"></i>Dry Line: rain unlikely</span><span><i style="background:#1f6fd1"></i>Rain Line: 50% or more</span><span><i style="background:#e3742b"></i>Orange Line: daily forecast</span></div>
</div>`;
    }
  });

  // ---------- 47: Winamp-style player ----------
  V.push({
    id: "47", name: "WeatherAmp", family: F, level: "medium",
    blurb: "A late-90s skinned media player: the temperature sits where track time goes, the title marquee scrolls the rain summary, the seek bar is a 24-hour rain waveform, the playlist is the week and the equaliser sliders are the details.",
    pro: "Each player part maps neatly to a weather concept; very playful.",
    con: "Tiny pixel text and a dark skin; joke needs the reader to know Winamp.",
    css: `
.d47{background:#15151d;padding:16px;box-sizing:border-box;font:11px/1.3 Tahoma,Verdana,Geneva,sans-serif;color:#d6d6e0}
.d47 .pn{background:linear-gradient(#3b3b4f,#26263a);border:1px solid #5a5a78;border-bottom-color:#111;border-right-color:#111;margin-bottom:6px;padding:0 0 8px}
.d47 .tb{background:linear-gradient(90deg,#c8a24a,#8b6b1f 30%,#2a2a3c 31%);height:13px;font:700 9px/13px Tahoma,sans-serif;letter-spacing:.2em;color:#fff6d5;padding-left:8px;margin-bottom:6px}
.d47 .scr{display:flex;gap:8px;margin:0 8px}
.d47 .lcd{background:#000;border:1px solid #111;box-shadow:inset 0 0 0 1px #2b2b40;color:#00e000;font-family:ui-monospace,Menlo,Consolas,monospace}
.d47 .tm{padding:6px 10px;min-width:130px}
.d47 .tm b{font-size:34px;line-height:1;display:block;text-shadow:0 0 6px rgba(0,224,0,.5)}
.d47 .vis{display:flex;gap:2px;align-items:flex-end;height:18px;margin-top:4px}
.d47 .vis i{width:5px;background:linear-gradient(#e33,#ee3 40%,#0d0);animation:d47-eq .9s ease-in-out infinite alternate}
@keyframes d47-eq{from{transform:scaleY(.25)}to{transform:scaleY(1)}}
.d47 .vis i{transform-origin:bottom}
.d47 .rt{flex:1;display:flex;flex-direction:column;gap:5px;min-width:0}
.d47 .mq{overflow:hidden;white-space:nowrap;padding:4px 6px}
.d47 .mq span{display:inline-block;padding-left:100%;animation:d47-mq 18s linear infinite}
@keyframes d47-mq{to{transform:translateX(-100%)}}
.d47 .kb{display:flex;gap:5px;flex-wrap:wrap}
.d47 .kb span{padding:2px 6px;font-size:10px}
.d47 .kb em{font-style:normal;color:#8a8aa6;margin-right:3px}
.d47 .seek{margin:8px 8px 0}
.d47 .seek svg{display:block;width:100%;height:auto}
.d47 .lab{display:flex;justify-content:space-between;font-size:9px;color:#8a8aa6;margin-top:2px}
.d47 .tr{display:flex;gap:4px;margin:8px 8px 0;flex-wrap:wrap}
.d47 .tr span{background:linear-gradient(#5a5a74,#34344a);border:1px solid #777794;border-bottom-color:#111;border-right-color:#111;padding:2px 8px;font-size:10px}
.d47 .tr span.on{background:linear-gradient(#2d6b2d,#1d421d);color:#9f9}
.d47 .two{display:flex;gap:6px;flex-wrap:wrap}
.d47 .two .pn{flex:1 1 230px}
.d47 .pl{margin:0 8px;padding:4px 0}
.d47 .pl div{display:grid;grid-template-columns:16px 1fr auto;gap:6px;padding:1px 6px;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:11px}
.d47 .pl div.cur{background:#0000c6;color:#fff}
.d47 .pl .r{color:#5fb3ff}
.d47 .pl div.cur .r{color:#bfe0ff}
.d47 .eq{display:flex;gap:6px;margin:4px 8px 0;justify-content:space-between}
.d47 .sl{text-align:center;font-size:9px;width:44px}
.d47 .sl .tk{height:74px;width:6px;margin:0 auto 4px;background:#0b0b12;border:1px solid #444;position:relative}
.d47 .sl .tk i{position:absolute;left:-5px;width:14px;height:7px;background:linear-gradient(#dcdce8,#8a8aa0);border:1px solid #222}
.d47 .sl .tk b{position:absolute;left:0;right:0;bottom:0;background:linear-gradient(#ee3,#0d0)}
.d47 .sl strong{display:block;color:#00e000;font-family:ui-monospace,Menlo,monospace;font-size:10px}
.d47 .sun{margin:8px 8px 0;font-size:10px;color:#8a8aa6}
${RM(47)}
@media (prefers-reduced-motion: reduce){.d47 .mq span{padding-left:0}}`,
    render: (W) => {
      const d = W.details, R = W.rain24, mx = maxMm(W);
      const wave = R.map((r, i) => { const h = Math.max(1.5, Math.min(26, (r.mm || 0) / mx * 26)); return `<rect x="${i * 40 + 6}" y="${32 - h}" width="28" height="${h * 2}" fill="#00e000" opacity="${(0.3 + r.prob / 100 * 0.7).toFixed(2)}"/><text x="${i * 40 + 20}" y="74" text-anchor="middle" font-size="9" fill="#00e000">${r.prob}%</text>`; }).join("");
      const sl = (k, v, max, txt) => { const p = Math.max(0, Math.min((v || 0) / max, 1)) * 100; return `<div class="sl"><div class="tk"><b style="height:${p}%"></b><i style="bottom:calc(${p}% - 4px)"></i></div>${k}<strong>${txt}</strong></div>`; };
      return `<div class="d47">
<div class="pn"><div class="tb">WEATHERAMP</div>
 <div class="scr">
  <div class="lcd tm"><small>NOW · ${W.localTime}</small><b>${W.now.tempC}°C</b><small>feels like ${W.now.feelsC}°C</small>
   <div class="vis">${[5, 9, 14, 7, 11, 16, 6, 12, 8, 13].map((h, i) => `<i style="height:${h}px;animation-delay:-${(i * 0.17).toFixed(2)}s"></i>`).join("")}</div></div>
  <div class="rt">
   <div class="lcd mq"><span>*** ${W.place} — ${W.now.icon} ${W.now.desc} — ${W.rainSummary} ***</span></div>
   <div class="kb"><span class="lcd"><em>HUM</em>${d.humidity}%</span><span class="lcd"><em>WIND</em>${d.windKmh} ${d.windDir}</span><span class="lcd"><em>UV</em>${d.uv}</span><span class="lcd"><em>CLD</em>${d.cloud}%</span></div>
   <div class="kb"><span class="lcd"><em>DATE</em>${W.date}</span></div>
  </div>
 </div>
 <div class="seek"><div class="lcd" style="padding:4px 4px 0"><svg viewBox="0 0 480 80"><line x1="0" y1="32" x2="480" y2="32" stroke="#0a4" stroke-width="1"/>${wave}<line x1="1" y1="0" x2="1" y2="64" stroke="#fff" stroke-width="2"/></svg></div>
  <div class="lab">${R.map(r => `<span>${hs(r.hour)}</span>`).join("")}</div>
  <div class="lab"><span>▶ playing now</span><span>bar height = rain mm (max ${mx.toFixed(1)} mm) · brightness = chance</span></div></div>
 <div class="tr"><span>◀◀ Prev</span><span class="on">▶ Play</span><span>❚❚ Pause</span><span>■ Stop</span><span>▶▶ Next</span><span>Shuffle</span><span>Repeat</span></div>
</div>
<div class="two">
 <div class="pn"><div class="tb">PLAYLIST · 7 DAYS</div><div class="lcd pl">${W.days.map((x, i) => `<div class="${i === 0 ? "cur" : ""}"><span>${i + 1}.</span><span>${x.name} — ${x.icon} ${x.desc}</span><span>${x.lo}–${x.hi}°C <span class="r">${x.pop}%</span></span></div>`).join("")}</div></div>
 <div class="pn"><div class="tb">EQUALIZER · DETAILS</div>
  <div class="eq">${sl("HUMID", d.humidity, 100, d.humidity + "%")}${sl("CLOUD", d.cloud, 100, d.cloud + "%")}${sl("UV", d.uv, 11, d.uv + " " + uvWord(d.uv).split(" ").pop())}${sl("WIND", d.windKmh, 50, d.windKmh + " " + d.windDir)}${sl("GUST", d.gustKmh, 50, d.gustKmh + "km/h")}</div>
  <div class="sun">Sunrise ${d.sunrise} · Sunset ${d.sunset}</div></div>
</div>
</div>`;
    }
  });

  // ---------- 48: 8-bit game HUD ----------
  const PAL = { y: "#ffec27", o: "#ffa300", w: "#fff1e8", g: "#c2c3c7", d: "#5f574f", b: "#29adff", c: "#ffccaa", k: "#000", r: "#ff004d", n: "#1d2b53", s: "#ab5236" };
  const SP = {
    sun: ["...y...", ".y.y.y.", "..yyy..", "yyyoyyy", "..yyy..", ".y.y.y.", "...y..."],
    partly: ["....y.y.y.", ".....yyy..", "....yyyyy.", "..www.yyy.", ".wwwwwyy..", "wwwwwwww..", "wwwwwwwww.", ".ggggggg.."],
    showers: ["....y.y.y.", ".....yyy..", "..www.yyy.", ".wwwwwyy..", "wwwwwwww..", ".ggggggg..", ".b..b..b..", "..b..b...."],
    rain: ["...ggg....", "..ggggg...", ".gggggggg.", "gggggggggg", ".dddddddd.", "..b...b...", ".b..b...b.", "...b..b..."],
    cloud: ["...www....", "..wwwww...", ".wwwwwwww.", "wwwwwwwwww", ".gggggggg."],
    moon: ["..cccc.", ".ccc...", "ccc....", "ccc....", "ccc....", ".ccc...", "..cccc."],
    hero: ["..sss..", "..ccc..", ".rrrrr.", "c.rrr.c", "..bbb..", "..b.b..", ".kk.kk."]
  };
  const rects = (m, ox, oy) => m.map((row, y) => [...row].map((ch, x) => ch === "." ? "" : `<rect x="${ox + x}" y="${oy + y}" width="1" height="1" fill="${PAL[ch]}"/>`).join("")).join("");
  const sprite = (m, px) => `<svg viewBox="0 0 ${m[0].length} ${m.length}" width="${m[0].length * px}" height="${m.length * px}" shape-rendering="crispEdges">${rects(m, 0, 0)}</svg>`;
  const pickSp = desc => /^Rain/.test(desc) ? SP.rain : /Showers/.test(desc) ? SP.showers : /^Sunny/.test(desc) ? SP.sun : SP.partly;

  V.push({
    id: "48", name: "Weather Quest", family: F, level: "rich",
    blurb: "An 8-bit game screen in the PICO-8 palette: a pixel-art night scene with drifting clouds, a top HUD for place/temp/time, block-segment stat bars, an 'incoming rain' power meter, an RPG dialogue box and a level-select row for the week. Inspired by 'Pixel 8-bit Weather' and 'Pixel Forecast' on the App Store.",
    pro: "Joyful and memorable; sprites are tiny character grids turned into SVG rects, no assets.",
    con: "Uppercase pixel-ish text is slower to read; most work of the set.",
    css: `
.d48{background:#000;color:#fff1e8;font:700 11px/1.35 ui-monospace,Menlo,Consolas,"Courier New",monospace;text-transform:uppercase;letter-spacing:.04em;padding:10px;box-sizing:border-box}
.d48 .hud{display:grid;grid-template-columns:repeat(4,1fr);gap:4px;padding:2px 4px 8px;text-align:left}
.d48 .hud small{color:#ffa300;display:block;font-size:10px}
.d48 .hud b{font-size:15px}
.d48 .scene{position:relative;border:3px solid #fff1e8;box-shadow:0 0 0 3px #1d2b53}
.d48 .scene svg{display:block;width:100%;height:auto}
.d48 .cl{animation:d48-dr 14s steps(28) infinite alternate}
.d48 .cl2{animation:d48-dr 20s steps(20) infinite alternate-reverse}
@keyframes d48-dr{to{transform:translateX(18px)}}
.d48 .tw{animation:d48-tw 1.6s steps(1) infinite}
@keyframes d48-tw{50%{opacity:.2}}
.d48 .bub{position:absolute;left:30%;top:34%;background:#fff1e8;color:#000;padding:4px 7px;border:2px solid #000;box-shadow:3px 3px 0 #000}
.d48 .bub b{font-size:20px}
.d48 .row{display:flex;gap:8px;margin-top:8px;flex-wrap:wrap}
.d48 .pane{border:3px solid #fff1e8;background:#1d2b53;padding:7px 8px;flex:1 1 220px;box-shadow:inset 0 0 0 2px #000}
.d48 .pane h4{margin:0 0 5px;color:#ffec27;font-size:11px}
.d48 .st{display:grid;grid-template-columns:62px 1fr auto;gap:6px;align-items:center;margin:3px 0}
.d48 .blk{display:flex;gap:2px}
.d48 .blk i{width:8px;height:9px;background:#000;border:1px solid #5f574f}
.d48 .blk i.on{background:#00e436;border-color:#00e436}
.d48 .blk.u i.on{background:#ff004d;border-color:#ff004d}
.d48 .blk.w i.on{background:#29adff;border-color:#29adff}
.d48 .mtr{display:flex;gap:3px;align-items:flex-end}
.d48 .mtr .c{flex:1;text-align:center;font-size:9px}
.d48 .mtr .s{display:flex;flex-direction:column-reverse;gap:1px;margin:2px 0}
.d48 .mtr .s i{height:5px;background:#000}
.d48 .mtr .s i.on{background:#29adff}
.d48 .mtr .s i.on.hv{background:#83769c}
.d48 .dlg{border:3px solid #fff1e8;background:#000;padding:8px 10px;margin-top:8px;position:relative;line-height:1.5}
.d48 .dlg .who{color:#ffa300}
.d48 .dlg .nx{position:absolute;right:8px;bottom:2px;animation:d48-tw 1s steps(1) infinite}
.d48 .lv{display:grid;grid-template-columns:repeat(auto-fit,minmax(68px,1fr));gap:4px;margin-top:8px}
.d48 .lv div{border:2px solid #5f574f;background:#1d2b53;padding:4px;text-align:center;font-size:9.5px;line-height:1.3}
.d48 .lv div.on{border-color:#ffec27;background:#7e2553}
.d48 .lv .w{color:#ffa300}
.d48 .lv svg{display:block;margin:3px auto}
.d48 .lv .t{color:#fff1e8;font-size:11px}
.d48 .lv .p{color:#29adff}
.d48 .ft{display:flex;justify-content:space-between;margin-top:8px;color:#c2c3c7;font-size:10px;flex-wrap:wrap;gap:4px}
.d48 .ft .ps{color:#ffec27;animation:d48-tw 1.2s steps(1) infinite}
${RM(48)}`,
    render: (W) => {
      const d = W.details;
      const blk = (n, cls) => `<span class="blk ${cls || ""}">${Array.from({ length: 10 }, (_, k) => `<i class="${k < n ? "on" : ""}"></i>`).join("")}</span>`;
      const stars = !W.isNight ? "" : [[6, 3], [14, 9], [27, 2], [41, 7], [55, 3], [72, 10], [84, 4], [118, 12], [126, 3], [96, 14], [64, 15]].map(([x, y], i) => `<rect class="${i % 3 === 0 ? "tw" : ""}" x="${x}" y="${y}" width="1" height="1" fill="#fff1e8"/>`).join("");
      const hill = [];
      const hp = [0, 0, 1, 2, 3, 4, 4, 5, 5, 5, 4, 4, 3, 2, 2, 1, 1, 0, 0, 0, 0, 1, 2, 3, 3, 4, 4, 4, 3, 2, 1, 1, 0, 0];
      hp.forEach((h, i) => { if (h) hill.push(`<rect x="${i * 4}" y="${34 - h * 2}" width="4" height="${h * 2}" fill="#008751"/>`); });
      return `<div class="d48">
<div class="hud"><div><small>World</small><b>${W.place.split(",")[0]}</b></div><div><small>Temp</small><b>${W.now.tempC}°C</b></div><div><small>Feels</small><b>${W.now.feelsC}°C</b></div><div><small>Time</small><b>${W.localTime}</b></div></div>
<div class="scene"><svg viewBox="0 0 136 44" shape-rendering="crispEdges" role="img" aria-label="Pixel ${W.isNight ? "night" : "day"} scene, ${W.now.desc}">
 <rect width="136" height="44" fill="${W.isNight ? "#1d2b53" : "#4aa3e8"}"/><rect y="22" width="136" height="22" fill="${W.isNight ? "#2a3a6a" : "#7fc4f2"}"/>
 ${stars}
 ${rects(W.isNight ? SP.moon : SP.sun, 108, 4)}
 <g class="cl">${rects(SP.cloud, 22, 5)}</g><g class="cl2">${rects(SP.cloud, 70, 12)}</g>
 ${hill.join("")}
 <rect y="34" width="136" height="2" fill="#00e436"/><rect y="36" width="136" height="8" fill="#ab5236"/>
 ${Array.from({ length: 17 }, (_, i) => `<rect x="${i * 8 + (i % 2) * 2}" y="38" width="3" height="1" fill="#5f574f"/>`).join("")}
 ${rects(SP.hero, 24, 27)}
</svg><div class="bub">${W.now.icon} ${W.now.desc}<br><b>${W.now.tempC}°C</b></div></div>
<div class="row">
 <div class="pane"><h4>Stats</h4>
  <div class="st"><span>Humidity</span>${blk(Math.max(0, Math.min(10, Math.round(d.humidity / 10))))}<span>${d.humidity}%</span></div>
  <div class="st"><span>Cloud</span>${blk(Math.max(0, Math.min(10, Math.round(d.cloud / 10))), "w")}<span>${d.cloud}%</span></div>
  <div class="st"><span>UV</span>${blk(Math.max(0, Math.min(10, Math.round(d.uv / 11 * 10))), "u")}<span>${d.uv} ${uvWord(d.uv)}</span></div>
  <div class="st"><span>Wind</span>${blk(Math.max(0, Math.min(10, Math.round(d.windKmh / 5))), "w")}<span>${d.windKmh}KM/H ${d.windDir}</span></div>
 </div>
 <div class="pane"><h4>Incoming rain · 24h</h4>
  <div class="mtr">${W.rain24.map(r => `<div class="c">${r.prob}<div class="s">${Array.from({ length: 10 }, (_, k) => `<i class="${r.prob >= (k + 1) * 10 - 5 ? "on" : ""} ${r.mm >= 1.5 ? "hv" : ""}"></i>`).join("")}</div>${hs(r.hour)}</div>`).join("")}</div>
 </div>
</div>
<div class="dlg"><span class="who">Sage:</span> ${W.rainSummary}<span class="nx">▼ next</span></div>
<div class="lv">${W.days.map((x, i) => `<div class="${i === 0 ? "on" : ""}"><span class="w">1-${i + 1} ${x.name}</span>${sprite(pickSp(x.desc), 3)}${x.desc}<br><span class="t">${x.lo}–${x.hi}°C</span><br><span class="p">Rain ${x.pop}%</span></div>`).join("")}</div>
<div class="ft"><span>Sunrise ${d.sunrise}</span><span class="ps">Press start</span><span>Sunset ${d.sunset}</span></div>
</div>`;
    }
  });

  // ---------- 49: Phone lock screen ----------
  V.push({
    id: "49", name: "Lock screen", family: F, level: "rich",
    blurb: "A phone lock screen at 8:30 PM: an animated night wallpaper with drifting clouds, the big clock, round complications for humidity/UV/cloud/wind and the forecast arriving as stacked notifications, the rain one expanded with a chart. Inspired by mobbin-style iOS lock-screen widget layouts.",
    pro: "Feels native and glanceable; notification framing gives the rain alert urgency.",
    con: "Phone chrome eats width; content gets small inside a 380px frame.",
    css: `
.d49{background:#101218;padding:14px 0;display:flex;justify-content:center;box-sizing:border-box;font:13px/1.3 -apple-system,"SF Pro Text","Segoe UI",Roboto,Helvetica,Arial,sans-serif}
.d49 .ph{position:relative;width:100%;max-width:372px;height:700px;border-radius:46px;overflow:hidden;border:7px solid #2b2d33;box-shadow:0 0 0 2px #50535c,0 20px 40px rgba(0,0,0,.6);color:#fff;box-sizing:border-box}
.d49 .wp{position:absolute;inset:0;width:100%;height:100%}
.d49 .cl{animation:d49-dr 26s ease-in-out infinite alternate}
.d49 .cl2{animation:d49-dr 34s ease-in-out infinite alternate-reverse}
@keyframes d49-dr{to{transform:translateX(40px)}}
.d49 .in{position:relative;padding:12px 16px;height:100%;box-sizing:border-box;display:flex;flex-direction:column}
.d49 .sb{display:flex;justify-content:space-between;font-size:12px;font-weight:600;padding:0 10px}
.d49 .isl{width:96px;height:26px;border-radius:14px;background:#000;margin:-2px auto 0}
.d49 .dt{text-align:center;margin-top:8px;font-size:15px;font-weight:600;opacity:.9}
.d49 .ck{text-align:center;font-size:78px;font-weight:300;line-height:1;letter-spacing:-2px;text-shadow:0 2px 12px rgba(0,0,0,.3)}
.d49 .cx{text-align:center;font-size:13px;opacity:.9;margin-top:2px}
.d49 .gs{display:flex;justify-content:center;gap:14px;margin:10px 0 12px}
.d49 .g{text-align:center;font-size:10px;width:54px}
.d49 .g svg{display:block;margin:0 auto 2px}
.d49 .nt{background:rgba(30,34,48,.72);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-radius:18px;padding:9px 12px;margin-bottom:7px;border:1px solid rgba(255,255,255,.08)}
.d49 .nt .ap{display:flex;justify-content:space-between;font-size:11px;opacity:.7;margin-bottom:2px}
.d49 .nt .ap b{font-weight:600;letter-spacing:.03em}
.d49 .nt h5{margin:0;font-size:13px}
.d49 .nt p{margin:2px 0 0;font-size:12px;opacity:.85}
.d49 .nt svg{display:block;width:100%;height:auto;margin-top:6px}
.d49 .xl{position:relative;height:12px;font-size:9px;opacity:.7}
.d49 .xl span{position:absolute;transform:translateX(-50%)}
.d49 .wk{display:grid;grid-template-columns:40px 1fr auto 42px;gap:1px 8px;font-size:12px;margin-top:3px}
.d49 .wk .p{color:#8fd0ff;text-align:right}
.d49 .wk .t{text-align:right}
.d49 .bt{margin-top:auto;display:flex;justify-content:space-between;align-items:flex-end;padding:0 8px 4px}
.d49 .bt span{width:46px;height:46px;border-radius:50%;background:rgba(30,34,48,.7);display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:600}
.d49 .hb{width:120px;height:5px;border-radius:3px;background:#fff;opacity:.85;margin:0 auto 8px}
${RM(49)}`,
    render: (W) => {
      const d = W.details, R = W.rain24;
      const ring = (v, max, col, txt) => { const c = 2 * Math.PI * 18, f = Math.min(v / max, 1) * c; return `<svg width="46" height="46" viewBox="0 0 46 46"><circle cx="23" cy="23" r="18" fill="rgba(20,24,36,.7)" stroke="rgba(255,255,255,.18)" stroke-width="4"/><circle cx="23" cy="23" r="18" fill="none" stroke="${col}" stroke-width="4" stroke-linecap="round" stroke-dasharray="${f.toFixed(1)} ${c.toFixed(1)}" transform="rotate(-90 23 23)"/><text x="23" y="27" text-anchor="middle" font-size="12" font-weight="700" fill="#fff">${txt}</text></svg>`; };
      const dirDeg = { N: 0, NE: 45, E: 90, SE: 135, S: 180, SW: 225, W: 270, NW: 315 }[d.windDir] || 0;
      const comp = `<svg width="46" height="46" viewBox="0 0 46 46"><circle cx="23" cy="23" r="18" fill="rgba(20,24,36,.7)" stroke="rgba(255,255,255,.18)" stroke-width="4"/><text x="23" y="11" text-anchor="middle" font-size="7" fill="#fff" opacity=".7">N</text><g transform="rotate(${dirDeg + 180} 23 23)"><path d="M23 9 L27 21 L23 19 L19 21 Z" fill="#ffd166"/></g><text x="23" y="30" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">${d.windKmh}</text></svg>`;
      const cw = 300, chH = 54, xs = i => i / ((R.length - 1) || 1) * cw, mx = maxMm(W);
      const area = `M0 ${chH} ` + R.map((r, i) => `L${xs(i).toFixed(1)} ${(chH - r.prob / 100 * (chH - 4)).toFixed(1)}`).join(" ") + ` L${cw} ${chH} Z`;
      const line = R.map((r, i) => `${i ? "L" : "M"}${xs(i).toFixed(1)} ${(chH - r.prob / 100 * (chH - 4)).toFixed(1)}`).join(" ");
      const bars = R.map((r, i) => r.mm ? `<rect x="${(xs(i) - 4).toFixed(1)}" y="${(chH - r.mm / mx * 24).toFixed(1)}" width="8" height="${(r.mm / mx * 24).toFixed(1)}" rx="2" fill="#fff" opacity=".85"/>` : "").join("");
      const peak = R.reduce((a, b) => b.prob > a.prob ? b : a);
      return `<div class="d49"><div class="ph">
<svg class="wp" viewBox="0 0 360 690" preserveAspectRatio="xMidYMid slice">
 <defs><linearGradient id="d49-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${W.isNight ? "#0b1330" : "#4a90d9"}"/><stop offset=".55" stop-color="${W.isNight ? "#29305e" : "#8cc4ee"}"/><stop offset="1" stop-color="${W.isNight ? "#5b3f63" : "#f1d9a8"}"/></linearGradient></defs>
 <rect width="360" height="690" fill="url(#d49-sky)"/>
 ${W.isNight ? [[30, 60], [80, 30], [140, 90], [210, 40], [320, 70], [50, 150], [260, 130], [180, 170], [330, 200]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.2" fill="#fff" opacity=".7"/>`).join("") : ""}
 ${W.isNight ? `<circle cx="290" cy="110" r="26" fill="#f4eccd"/><circle cx="280" cy="102" r="5" fill="#e3d8b2"/><circle cx="298" cy="120" r="3.5" fill="#e3d8b2"/>` : `<circle cx="290" cy="110" r="30" fill="#ffe27a" opacity=".95"/><circle cx="290" cy="110" r="44" fill="#ffe27a" opacity=".25"/>`}
 <g class="cl" fill="#cfd6ee" opacity=".22"><ellipse cx="220" cy="130" rx="70" ry="16"/><ellipse cx="250" cy="118" rx="38" ry="16"/></g>
 <g class="cl2" fill="#cfd6ee" opacity=".16"><ellipse cx="80" cy="220" rx="90" ry="18"/><ellipse cx="60" cy="206" rx="40" ry="16"/></g>
 <path d="M0 600 L40 570 L80 585 L130 548 L170 572 L220 540 L270 566 L320 545 L360 560 V690 H0 Z" fill="#20193a"/>
 <path d="M0 630 L60 610 L120 625 L190 600 L250 622 L310 606 L360 618 V690 H0 Z" fill="#140f26"/>
</svg>
<div class="in">
 <div class="sb"><span>${W.place.split(",")[0]}</span><span>5G · 82%</span></div>
 <div class="isl"></div>
 <div class="dt">${W.date}</div>
 <div class="ck">${W.hour24 % 12 || 12}:${String(W.minute).padStart(2, "0")}</div>
 <div class="cx">${W.now.icon} ${W.now.tempC}°C ${W.now.desc} · feels ${W.now.feelsC}°C</div>
 <div class="gs">
  <div class="g">${ring(d.humidity, 100, "#6ec1ff", d.humidity + "%")}Humidity</div>
  <div class="g">${ring(d.uv, 11, "#ff9f43", d.uv)}UV ${uvWord(d.uv)}</div>
  <div class="g">${ring(d.cloud, 100, "#c9d1e8", d.cloud + "%")}Cloud</div>
  <div class="g">${comp}Wind ${d.windDir} km/h</div>
 </div>
 <div class="nt"><div class="ap"><b>☂ WEATHER · ${peak.prob >= 30 ? "RAIN ALERT" : "RAIN OUTLOOK"}</b><span>now</span></div>
  <h5>${peak.prob >= 30 ? `Rain likely, peak ${peak.prob}% at ${hr(peak.hour)}` : `Little rain expected, peak ${peak.prob}% at ${hr(peak.hour)}`}</h5><p>${W.rainSummary}</p>
  <svg viewBox="0 0 ${cw} ${chH + 2}"><path d="${area}" fill="#5fb0ff" opacity=".35"/><path d="${line}" fill="none" stroke="#8fd0ff" stroke-width="2"/>${bars}</svg>
  <div class="xl">${[0, 3, 6, 9, R.length - 1].filter((i, k, a) => R[i] && a.indexOf(i) === k).map(i => `<span style="left:${(i / ((R.length - 1) || 1) * 100).toFixed(1)}%">${hr(R[i].hour)}</span>`).join("")}</div>
  <p style="font-size:10px;opacity:.6;margin-top:4px">Line = chance of rain · white bars = mm</p>
 </div>
 <div class="nt"><div class="ap"><b>WEATHER · 7-DAY OUTLOOK</b><span>${W.localTime}</span></div>
  <div class="wk">${W.days.map(x => `<span>${x.name}</span><span>${x.icon} ${x.desc}</span><span class="t">${x.lo}–${x.hi}°C</span><span class="p">${x.pop}%</span>`).join("")}</div>
 </div>
 <div class="nt" style="padding:7px 12px"><div class="ap" style="margin:0"><b>SUN · Sunrise ${d.sunrise} · Sunset ${d.sunset}</b><span>today</span></div></div>
 <div class="bt"><span>Torch</span><span>Camera</span></div>
 <div class="hb"></div>
</div></div></div>`;
    }
  });

  // ---------- 50: Trading cards ----------
  const sunG = (cx, cy, r) => `<g stroke="#f2a20c" stroke-width="3" stroke-linecap="round">${[0, 45, 90, 135, 180, 225, 270, 315].map(a => { const t = a * Math.PI / 180; return `<line x1="${(cx + Math.cos(t) * (r + 4)).toFixed(1)}" y1="${(cy + Math.sin(t) * (r + 4)).toFixed(1)}" x2="${(cx + Math.cos(t) * (r + 9)).toFixed(1)}" y2="${(cy + Math.sin(t) * (r + 9)).toFixed(1)}"/>`; }).join("")}</g><circle cx="${cx}" cy="${cy}" r="${r}" fill="#ffcc33" stroke="#f2a20c" stroke-width="2"/>`;
  const cloudG = (dx, dy, fill, stroke) => `<path transform="translate(${dx} ${dy})" d="M14 50h32a11 11 0 0 0 1-22a15 15 0 0 0-29-3a12 12 0 0 0-4 25z" fill="${fill}" stroke="${stroke}" stroke-width="2.5" stroke-linejoin="round"/>`;
  const drops = (xs, y) => xs.map(x => `<line x1="${x}" y1="${y}" x2="${x - 3}" y2="${y + 8}" stroke="#2f7fe0" stroke-width="3" stroke-linecap="round"/>`).join("");
  const glyph = (desc, size) => {
    let g;
    if (/^Rain/.test(desc)) g = cloudG(2, -6, "#c7cfdc", "#6b7489") + drops([22, 32, 42], 50);
    else if (/Showers/.test(desc)) g = sunG(42, 20, 9) + cloudG(-2, -2, "#fff", "#8a93a6") + drops([22, 34], 52);
    else if (/^Sunny/.test(desc)) g = sunG(32, 32, 13);
    else if (/Mostly sunny/.test(desc)) g = sunG(34, 28, 13) + cloudG(-6, 10, "#fff", "#8a93a6").replace("translate(-6 10)", "translate(-6 10) scale(.75)");
    else g = sunG(42, 22, 10) + cloudG(-2, 2, "#fff", "#8a93a6");
    return `<svg viewBox="0 0 64 64" width="${size}" height="${size}">${g}</svg>`;
  };
  const typeCol = desc => /^Rain/.test(desc) ? ["#3b82f6", "#dbeafe"] : /Showers/.test(desc) ? ["#0d9488", "#ccfbf1"] : /^Sunny/.test(desc) ? ["#f59e0b", "#fef3c7"] : /Mostly/.test(desc) ? ["#eab308", "#fef9c3"] : ["#8b8fa8", "#eceef5"];

  V.push({
    id: "50", name: "Weather TCG", family: F, level: "rich",
    blurb: "Collectible trading cards: today is a holo 'rare' card with an illustrated art box, temperature as HP, feels-like and overnight rain as attacks, and details as weakness/resistance stats; the week is a binder page of typed mini cards. Inspired by trading-card frames and Dribbble 'card-based weather' concepts.",
    pro: "Every day gets its own collectible identity; hand-drawn SVG glyphs, no emoji in the art.",
    con: "Card metaphor adds framing chrome; holo shimmer is decorative only.",
    css: `
.d50{background:#efe6d2;background-image:radial-gradient(#d9ccb0 1px,transparent 1px);background-size:12px 12px;color:#222;font:12px/1.3 "Trebuchet MS","Segoe UI",Helvetica,Arial,sans-serif;padding:16px;box-sizing:border-box;display:flex;gap:12px;flex-wrap:wrap;align-items:flex-start}
.d50 .big{flex:1 1 250px;max-width:270px;background:linear-gradient(135deg,#f9d65c,#e9b730);border-radius:14px;padding:9px;box-shadow:0 8px 18px rgba(80,60,20,.35);transform:rotate(-1.5deg)}
.d50 .in{background:linear-gradient(#fbf3dc,#f1e2b8);border-radius:8px;padding:8px 9px 9px}
.d50 .nm{display:flex;justify-content:space-between;align-items:baseline}
.d50 .nm b{font-size:16px}
.d50 .nm .hp{color:#c0392b;font-weight:700;font-size:15px}
.d50 .nm .hp small{font-size:9px;margin-right:2px}
.d50 .stage{font-size:9px;color:#7a6a3a;letter-spacing:.06em;text-transform:uppercase}
.d50 .art{position:relative;margin:5px 0;height:130px;border:4px solid #c9a227;border-radius:3px;background:linear-gradient(#26305e,#5c5a8f 70%,#c98b6b);overflow:hidden;display:flex;align-items:center;justify-content:center}
.d50 .art::after{content:"";position:absolute;inset:-50%;background:linear-gradient(115deg,transparent 40%,rgba(255,255,255,.45) 48%,rgba(160,255,240,.3) 52%,transparent 60%);animation:d50-holo 5s ease-in-out infinite;mix-blend-mode:screen}
@keyframes d50-holo{0%{transform:translateX(-30%)}100%{transform:translateX(30%)}}
.d50 .ty{text-align:center;font-size:10px;font-style:italic;background:#e4cf8f;margin:0 -2px 6px;padding:2px}
.d50 .atk{display:grid;grid-template-columns:auto 1fr auto;gap:6px;align-items:center;padding:5px 0;border-bottom:1px solid #d8c48a}
.d50 .atk .e{display:flex;gap:2px}
.d50 .atk .e i{width:12px;height:12px;border-radius:50%;background:#3b82f6;border:1px solid #1d4ed8}
.d50 .atk .e i.f{background:#ef4444;border-color:#b91c1c}
.d50 .atk b{font-size:13px}
.d50 .atk .dm{font-size:16px;font-weight:700}
.d50 .atk p{grid-column:1/-1;margin:0;font-size:10.5px;color:#4a4330}
.d50 .rb{grid-column:1/-1;display:flex;gap:2px;align-items:flex-end;height:26px}
.d50 .rb i{flex:1;background:#3b82f6;border-radius:2px 2px 0 0;min-height:1px}
.d50 .rl{grid-column:1/-1;display:flex;justify-content:space-between;font-size:8.5px;color:#7a6a3a;margin-top:-4px}
.d50 .wr{display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;text-align:center;font-size:9px;color:#5a5136;padding-top:5px}
.d50 .wr b{display:block;font-size:11px;color:#222}
.d50 .fl{font-size:9.5px;font-style:italic;color:#5a5136;border:1px solid #d8c48a;padding:3px 5px;margin-top:5px}
.d50 .no{display:flex;justify-content:space-between;font-size:8.5px;color:#7a6a3a;margin-top:4px}
.d50 .side{flex:1 1 230px;display:grid;grid-template-columns:1fr 1fr;gap:8px}
.d50 .side h4{grid-column:1/-1;margin:0;font-size:11px;letter-spacing:.12em;color:#7a6a3a;text-transform:uppercase}
.d50 .mc{border-radius:8px;padding:4px;box-shadow:0 3px 6px rgba(80,60,20,.25)}
.d50 .mc .ii{border-radius:5px;padding:4px 6px;background:#fffdf6}
.d50 .mc .tp{display:flex;justify-content:space-between;font-weight:700;font-size:12px}
.d50 .mc .tp span:last-child{color:#c0392b;font-size:11px}
.d50 .mc .ar{display:flex;align-items:center;gap:4px;border-radius:3px;margin:3px 0;padding:0 2px}
.d50 .mc .ds{font-size:10px;font-style:italic;line-height:1.15}
.d50 .mc .bt{display:flex;justify-content:space-between;font-size:10px;color:#444}
.d50 .mc .pp{display:inline-flex;gap:2px;vertical-align:middle;margin-right:3px}
.d50 .mc .pp i{width:6px;height:6px;border-radius:50%;background:#d8dbe4}
.d50 .mc .pp i.on{background:#2f7fe0}
${RM(50)}`,
    render: (W) => {
      const d = W.details, R = W.rain24, mx = Math.max(...R.map(r => r.prob || 0)), mxd = mx || 1;
      const moonArt = `<svg viewBox="0 0 160 110" width="200" height="130" style="position:relative;z-index:1">
${W.isNight ? `<circle cx="112" cy="34" r="20" fill="#f6efcf"/><circle cx="104" cy="28" r="4" fill="#e6dcb2"/>
${[[20, 18], [40, 40], [70, 14], [140, 70], [150, 20], [12, 60]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.3" fill="#fff"/>`).join("")}` : `<circle cx="112" cy="34" r="18" fill="#ffd34d"/><circle cx="112" cy="34" r="26" fill="#ffd34d" opacity=".3"/>`}
<g transform="translate(30 30) scale(1.4)">${cloudG(0, 0, "#f4f6fb", "#8a93a6")}</g>
<path d="M0 100 Q40 84 80 96 T160 92 V110 H0Z" fill="${W.isNight ? "#2a2347" : "#5b8f5a"}"/></svg>`;
      return `<div class="d50">
<div class="big"><div class="in">
 <div class="stage">Basic · ${W.date}</div>
 <div class="nm"><b>${W.place.split(",")[0]}</b><span class="hp"><small>TEMP</small>${W.now.tempC}°C</span></div>
 <div class="art"${W.isNight ? "" : ' style="background:linear-gradient(#6fb6ee,#c9e6fa 70%,#f3dcae)"'}>${moonArt}</div>
 <div class="ty">${W.now.icon} ${W.now.desc} type · ${W.place} · ${W.localTime}</div>
 <div class="atk"><span class="e"><i class="f"></i></span><b>Feels Like</b><span class="dm">${W.now.feelsC}°C</span></div>
 <div class="atk"><span class="e"><i></i><i></i></span><b>${W.isNight ? "Night Rain" : "Rain Next 24h"}</b><span class="dm">${R.reduce((a, r) => a + r.mm, 0).toFixed(1)} mm</span>
  <div class="rb">${R.map(r => `<i style="height:${(r.prob / mxd * 100).toFixed(0)}%;opacity:${(0.35 + r.prob / 100 * 0.65).toFixed(2)}"></i>`).join("")}</div>
  <div class="rl"><span>${hr(R[0].hour)}</span><span>${hr(R[6].hour)}</span><span>${hr(R[11].hour)}</span></div>
  <p>${W.rainSummary} Peak chance ${mx}%.</p></div>
 <div class="wr"><span>Weakness<b>UV ${d.uv} ${uvWord(d.uv)}</b></span><span>Resistance<b>Wind ${d.windKmh} ${d.windDir}</b></span><span>Retreat<b>Cloud ${d.cloud}%</b></span></div>
 <div class="fl">Humidity ${d.humidity}% · sunrise ${d.sunrise} · sunset ${d.sunset}.</div>
 <div class="no"><span>Illus. hand-drawn SVG</span><span>050/050 ★ Holo rare</span></div>
</div></div>
<div class="side"><h4>Your week · 7 cards</h4>
${W.days.map(x => { const [c, bg] = typeCol(x.desc); return `<div class="mc" style="background:${c}"><div class="ii">
 <div class="tp"><span>${x.name}</span><span>HI ${x.hi}°C</span></div>
 <div class="ar" style="background:${bg}">${glyph(x.desc, 40)}<span class="ds">${x.icon} ${x.desc}</span></div>
 <div class="bt"><span>LO ${x.lo}°C</span><span><span class="pp">${Array.from({ length: 5 }, (_, k) => `<i class="${x.pop > k * 20 ? "on" : ""}"></i>`).join("")}</span>${x.pop}%</span></div>
</div></div>`; }).join("")}
</div>
</div>`;
    }
  });
})();
