// Family: physical objects and instruments (ids 11-20)
(function () {
  const FAM = "physical objects and instruments";
  const hrS = h => h === 0 ? "12a" : h < 12 ? h + "a" : h === 12 ? "12p" : (h - 12) + "p";
  const hrL = h => h === 0 ? "12 AM" : h < 12 ? h + " AM" : h === 12 ? "12 PM" : (h - 12) + " PM";
  const total = W => W.rain24.reduce((a, r) => a + r.mm, 0).toFixed(1);
  const uvTxt = u => u >= 8 ? "Very high" : u >= 6 ? "High" : u >= 3 ? "Moderate" : "Low";
  const pol = (cx, cy, r, a) => { const t = a * Math.PI / 180; return [+(cx + r * Math.sin(t)).toFixed(2), +(cy - r * Math.cos(t)).toFixed(2)]; };
  const RM = "@media (prefers-reduced-motion: reduce) { .dNN * { animation: none !important } }";
  const rm = id => RM.replace("dNN", "d" + id);
  const num = (v, f) => (typeof v === "number" && isFinite(v)) ? v : f;
  const WRAP = "overflow-wrap:anywhere;word-break:break-word";
  const nice = x => { const p = Math.pow(10, Math.floor(Math.log10(x))), f = x / p; return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10) * p; };

  /* ---------------- 11 Thermal receipt ---------------- */
  V.push({
    id: "11", name: "Thermal Receipt", family: FAM, level: "simple",
    blurb: "The forecast as a till receipt from a little thermal printer: line items for each day, a dotted 'printed' rain bar per slot, a subtotal of rainfall and a barcode whose bar widths encode the next 24 hourly temperatures. Inspired by the DIY receipt-printer weather builds on Hackaday and Adafruit.",
    pro: "Instantly recognisable, scans top to bottom like a list; trivially simple CSS.",
    con: "Long and narrow; needs scrolling and wastes the stage width.",
    css: `
.d11{background:#d6d0c2;padding:22px 0 30px;font-family:"Courier New",Courier,monospace;color:#262626;box-sizing:border-box;min-height:100%}
.d11 .pp{position:relative;width:min(340px,88%);margin:6px auto;background:#fbfaf4;padding:16px 18px 20px;font-size:12px;line-height:1.5;box-shadow:0 8px 16px rgba(0,0,0,.14)}
.d11 .pp::before,.d11 .pp::after{content:"";position:absolute;left:0;right:0;height:6px}
.d11 .pp::before{top:-6px;background:conic-gradient(from 135deg at 50% 0,#fbfaf4 90deg,transparent 0) 0 0/12px 6px repeat-x}
.d11 .pp::after{bottom:-6px;background:conic-gradient(from 135deg at 50% 0,#fbfaf4 90deg,transparent 0) 0 0/12px 6px repeat-x;transform:scaleY(-1)}
.d11 .c{text-align:center;overflow-wrap:anywhere}
.d11 h1{font-size:17px;letter-spacing:3px;margin:0;font-weight:700}
.d11 .sm{font-size:10.5px;color:#555}
.d11 .hr{border-top:1px dashed #777;margin:8px 0}
.d11 .hr2{border-top:3px double #444;margin:8px 0}
.d11 .row{display:flex;justify-content:space-between;gap:8px}
.d11 .row span:last-child{text-align:right;white-space:nowrap}
.d11 .big{font-size:30px;font-weight:700;text-align:center;letter-spacing:1px;margin:2px 0}
.d11 .rr{display:grid;grid-template-columns:36px 1fr 34px;align-items:center;gap:6px;font-size:11px}
.d11 .tr{height:8px;background:repeating-linear-gradient(90deg,#ccc 0 1px,transparent 1px 4px)}
.d11 .b{display:block;height:8px;background:repeating-linear-gradient(90deg,#262626 0 3px,transparent 3px 4px)}
.d11 .dy{display:grid;grid-template-columns:34px 1fr 36px 54px;gap:4px;font-size:11.5px}
.d11 .dy .p{text-align:right}.d11 .dy .t{text-align:right;white-space:nowrap}
.d11 .bc{display:flex;justify-content:center;align-items:stretch;height:38px;gap:2px;margin:10px 0 4px}
.d11 .bc i{background:#1d1d1d;display:block}
.d11 .ty{text-align:center;font-weight:700;letter-spacing:1px}`,
    render: W => {
      const d = W.details;
      const rain = W.rain24.map(r => `<div class="rr"><span>${hrL(r.hour).replace(" ", "")}</span><span class="tr"><span class="b" style="width:${Math.min(100, Math.max(0, r.prob))}%"></span></span><span style="text-align:right">${r.prob}%</span></div>`).join("");
      const days = W.days.map(x => `<div class="dy"><span>${x.name.toUpperCase().slice(0, 3)}</span><span>${x.icon} ${x.desc}</span><span class="p">${x.pop}%</span><span class="t">${x.lo}/${x.hi}°C</span></div>`).join("");
      const ht = (W.hourlyTempC || []).filter(t => isFinite(t)), hmn = Math.min(...ht), hsp = (Math.max(...ht) - hmn) || 1;
      const bars = ht.map(t => `<i style="width:${(1 + (t - hmn) / hsp * 11).toFixed(1)}px"></i>`).join("");
      const wet = W.rain24.some(r => r.prob >= 40);
      return `<div class="d11"><div class="pp">
<div class="c"><h1>SKY &amp; CO.</h1><div class="sm">WEATHER SUPPLIES · ${W.place.toUpperCase()}</div><div class="sm">${W.date.toUpperCase()} · ${W.localTime}</div></div>
<div class="hr"></div>
<div class="row"><span>ITEM: CURRENT SKY</span><span>QTY 1</span></div>
<div class="big">${W.now.tempC}°C</div>
<div class="c">${W.now.icon} ${W.now.desc} · feels like ${W.now.feelsC}°C</div>
<div class="hr"></div>
<div class="row"><span><b>RAIN, NEXT 24 H</b></span><span>CHANCE</span></div>
${rain}
<div class="row" style="margin-top:4px"><span>SUBTOTAL RAINFALL</span><span>${total(W)} mm</span></div>
<div class="sm" style="margin-top:2px">* ${W.rainSummary}</div>
<div class="hr"></div>
<div class="dy" style="font-weight:700"><span>DAY</span><span>SKY</span><span class="p">RAIN</span><span class="t">LO/HI</span></div>
${days}
<div class="hr"></div>
<div class="row"><span>HUMIDITY</span><span>${d.humidity}%</span></div>
<div class="row"><span>WIND ${d.windDir}</span><span>${d.windKmh} km/h (gust ${d.gustKmh})</span></div>
<div class="row"><span>UV INDEX</span><span>${d.uv} ${uvTxt(d.uv).toUpperCase()}</span></div>
<div class="row"><span>CLOUD COVER</span><span>${d.cloud}%</span></div>
<div class="row"><span>SUNRISE</span><span>${d.sunrise}</span></div>
<div class="row"><span>SUNSET</span><span>${d.sunset}</span></div>
<div class="row"><span>PRESSURE</span><span>${d.pressureHpa} hPa</span></div>
<div class="hr2"></div>
<div class="row" style="font-weight:700;font-size:13px"><span>TOTAL DUE</span><span>${wet ? "1 UMBRELLA" : "0 UMBRELLAS"}</span></div>
<div class="bc" title="bars encode hourly temperature">${bars}</div>
<div class="c sm">bars = next 24 h temperatures</div>
<div class="hr"></div>
<div class="ty">THANK YOU · COME AGAIN</div>
</div></div>`;
    }
  });

  /* ---------------- 12 Boarding pass ---------------- */
  V.push({
    id: "12", name: "Boarding Pass", family: FAM, level: "simple",
    blurb: "A boarding pass from tonight to tomorrow: departure is now, arrival is Saturday's rain, the gate is the wind and the seat is the UV index. A tear-off stub carries a 'delay notice' for the night rain. Borrowed from the Dribbble Daily UI #024 boarding-pass shots, with the barcode next to the key info.",
    pro: "Strong, playful hierarchy; the now-to-tomorrow 'route' reads at a glance.",
    con: "The metaphor's labels (gate, seat) need the plain-text value beside them to make sense.",
    css: `
.d12{background:#14233b;padding:22px 18px;font-family:"Helvetica Neue",Arial,sans-serif;color:#1b1b1b;box-sizing:border-box;min-height:100%}
.d12 .ps{background:#fffdf8;border-radius:14px;overflow:hidden;box-shadow:0 12px 30px rgba(0,0,0,.35)}
.d12 .tp{gap:10px;flex-wrap:wrap;background:#f26a2e;color:#fff;display:flex;justify-content:space-between;padding:10px 18px;font-size:11px;letter-spacing:2px;font-weight:700}
.d12 .rt{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:16px 18px 8px;gap:8px}
.d12 .k{font-size:9.5px;letter-spacing:1.5px;color:#8a7f73;text-transform:uppercase}
.d12 .code{font-size:40px;font-weight:800;letter-spacing:-1px;line-height:1}
.d12 .cty{font-size:12px;margin-top:3px;overflow-wrap:anywhere}
.d12 .arr{text-align:right}
.d12 .pl{font-size:22px;color:#f26a2e;text-align:center}
.d12 .pl small{display:block;font-size:9px;color:#8a7f73;letter-spacing:1px}
.d12 .fl{display:grid;grid-template-columns:repeat(4,1fr);gap:10px 8px;padding:10px 18px 16px}
.d12 .v{font-size:14px;font-weight:700;margin-top:2px}
.d12 .v small{font-weight:400;font-size:11px;color:#555}
.d12 .perf{height:18px;position:relative;background:radial-gradient(circle at 0 50%,#14233b 9px,transparent 9.5px),radial-gradient(circle at 100% 50%,#14233b 9px,transparent 9.5px)}
.d12 .perf::after{content:"";position:absolute;left:16px;right:16px;top:8px;border-top:2px dashed #d8cfc2}
.d12 .stub{padding:6px 18px 16px;display:grid;grid-template-columns:1fr 1fr;gap:16px}
.d12 h3{margin:0 0 6px;font-size:10px;letter-spacing:2px;color:#f26a2e}
.d12 .bars{display:flex;align-items:flex-end;gap:3px;height:48px;border-bottom:1px solid #ccc}
.d12 .bars i{flex:1;background:#2f6db5;border-radius:2px 2px 0 0;display:block}
.d12 .hl{display:flex;gap:3px;font-size:8.5px;color:#777;margin-top:2px}.d12 .hl span{flex:1;text-align:center}
.d12 .note{font-size:11.5px;margin-top:6px;line-height:1.35}
.d12 table{width:100%;border-collapse:collapse;font-size:11.5px}
.d12 td{padding:2.5px 0;border-bottom:1px dotted #ddd}
.d12 td.r{text-align:right;white-space:nowrap}
.d12 .bc{height:30px;margin:0 18px 16px;background:repeating-linear-gradient(90deg,#111 0 2px,transparent 2px 4px,#111 4px 5px,transparent 5px 8px,#111 8px 11px,transparent 11px 12px)}
@media (max-width:420px){.d12 .stub{grid-template-columns:1fr}.d12 .fl{grid-template-columns:repeat(2,1fr)}}`,
    render: W => {
      const d = W.details, t = W.days[1] || W.days[0];
      const bars = W.rain24.map(r => `<i style="height:${Math.max(2, r.prob)}%" title="${r.prob}%"></i>`).join("");
      const hl = W.rain24.map(r => `<span>${hrS(r.hour)}</span>`).join("");
      const rows = W.days.map((x, i) => `<tr><td>${x.name}</td><td>${x.icon} ${x.desc}</td><td class="r">${x.pop}%</td><td class="r">${x.lo}–${x.hi}°C</td></tr>`).join("");
      return `<div class="d12"><div class="ps">
<div class="tp"><span>SKYWAYS · BOARDING PASS</span><span>${W.date.toUpperCase()}</span></div>
<div class="rt">
 <div><div class="k">From · now ${W.localTime}</div><div class="code">${W.now.tempC}°C</div><div class="cty">${W.now.icon} ${W.now.desc}<br>${W.place}</div></div>
 <div class="pl">✈<small>${W.isNight ? "OVERNIGHT" : "ONWARD"}</small></div>
 <div class="arr"><div class="k">To · ${t.name}</div><div class="code">${t.hi}°C</div><div class="cty">${t.icon} ${t.desc}<br>${t.pop}% chance of rain</div></div>
</div>
<div class="fl">
 <div><div class="k">Feels like</div><div class="v">${W.now.feelsC}°C</div></div>
 <div><div class="k">Gate · wind</div><div class="v">${d.windDir} ${d.windKmh} <small>km/h</small></div></div>
 <div><div class="k">Seat · UV</div><div class="v">${d.uv} <small>${uvTxt(d.uv)}</small></div></div>
 <div><div class="k">Humidity</div><div class="v">${d.humidity}%</div></div>
 <div><div class="k">Boarding · sunrise</div><div class="v">${d.sunrise}</div></div>
 <div><div class="k">Last call · sunset</div><div class="v">${d.sunset}</div></div>
 <div><div class="k">Cloud cover</div><div class="v">${d.cloud}%</div></div>
 <div><div class="k">Gusts</div><div class="v">${d.gustKmh} <small>km/h</small></div></div>
</div>
<div class="perf"></div>
<div class="stub">
 <div><h3>RAIN DELAY NOTICE · NEXT 24 H</h3><div class="bars">${bars}</div><div class="hl">${hl}</div><div class="note">${W.rainSummary}</div></div>
 <div><h3>CONNECTIONS · 7 DAYS</h3><table>${rows}</table></div>
</div>
<div class="bc"></div>
</div></div>`;
    }
  });

  /* ---------------- 13 Weather Facts label ---------------- */
  V.push({
    id: "13", name: "Weather Facts", family: FAM, level: "simple",
    blurb: "A food 'Nutrition Facts' panel turned into 'Weather Facts': serving size 24 hours, heavy rules, % values for rain per slot, and the rain summary printed as the ingredients list. A familiar packaging object, as with the product-label idea in the brief.",
    pro: "Very dense yet orderly; pure typography, prints well, no images at all.",
    con: "Monochrome and rule-heavy; joke wears thin if you see it every day.",
    css: `
.d13{background:#efe9dc;padding:20px;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;color:#000;box-sizing:border-box;min-height:100%}
.d13 .lb{overflow-wrap:anywhere;background:#fff;border:2px solid #000;padding:8px 10px;max-width:420px;margin:0 auto;font-size:12.5px}
.d13 h1{font-size:36px;font-weight:900;margin:0;letter-spacing:-1px;line-height:1}
.d13 .r{display:flex;justify-content:space-between;gap:8px;border-top:1px solid #000;padding:2px 0}
.d13 .r.in{padding-left:14px}
.d13 .r b{font-weight:800}
.d13 .t8{border-top:10px solid #000;margin-top:3px}
.d13 .t4{border-top:5px solid #000}
.d13 .cal{display:flex;justify-content:space-between;align-items:flex-end}
.d13 .cal .n{font-size:38px;font-weight:900;line-height:1}
.d13 .sm{font-size:10.5px}
.d13 .dv{text-align:right;font-weight:800;font-size:10.5px;padding:2px 0}
.d13 .w{display:grid;grid-template-columns:42px 1fr 40px 62px;gap:4px;border-top:1px solid #000;padding:2px 0}
.d13 .w span:nth-child(n+3){text-align:right}
.d13 .ing{font-size:10.5px;line-height:1.35;padding-top:4px;border-top:5px solid #000}`,
    render: W => {
      const d = W.details;
      const rain = W.rain24.map(r => `<div class="r in"><span>${hrL(r.hour)} <span class="sm">(${r.mm.toFixed(1)} mm)</span></span><b>${r.prob}%</b></div>`).join("");
      const wk = W.days.map(x => `<div class="w"><b>${x.name}</b><span>${x.icon} ${x.desc}</span><span>${x.pop}%</span><span>${x.lo}–${x.hi}°C</span></div>`).join("");
      return `<div class="d13"><div class="lb">
<h1>Weather Facts</h1>
<div class="sm">${W.place} · ${W.date}, ${W.localTime}</div>
<div class="r t8" style="border-top-width:10px"><b>Serving size</b><b>24 hours</b></div>
<div class="t4"></div>
<div class="sm" style="font-weight:800">Amount right now</div>
<div class="cal"><span><b style="font-size:20px">Temperature</b><br><span class="sm">${W.now.icon} ${W.now.desc}</span></span><span class="n">${W.now.tempC}°C</span></div>
<div class="t4" style="margin-top:3px"></div>
<div class="dv">% Chance of rain*</div>
<div class="r"><span><b>Feels like</b></span><b>${W.now.feelsC}°C</b></div>
<div class="r"><span><b>Humidity</b></span><b>${d.humidity}%</b></div>
<div class="r"><span><b>Wind</b> ${d.windDir}, gusts ${d.gustKmh} km/h</span><b>${d.windKmh} km/h</b></div>
<div class="r"><span><b>UV index</b> (${uvTxt(d.uv)})</span><b>${d.uv}</b></div>
<div class="r"><span><b>Cloud cover</b></span><b>${d.cloud}%</b></div>
<div class="r"><span><b>Sunrise</b> / <b>Sunset</b></span><b>${d.sunrise} / ${d.sunset}</b></div>
<div class="r t4" style="border-top-width:5px"><span><b>Total rain, next 24 h</b></span><b>${total(W)} mm</b></div>
${rain}
<div class="r t8"><b>7-day supply</b><b>Rain · Lo–Hi</b></div>
${wk}
<div class="ing"><b>Ingredients:</b> ${W.rainSummary} Pressure ${d.pressureHpa} hPa, dew point ${d.dewC}°C, visibility ${d.visibilityKm} km.<br>*Chance of rain per 2-hour slot.</div>
</div></div>`;
    }
  });

  /* ---------------- 14 Index cards ---------------- */
  V.push({
    id: "14", name: "Index Cards", family: FAM, level: "simple",
    blurb: "Four ruled index cards scattered on a desk, each a hand-lettered note: now, tonight's rain, the week, the details. Text sits on the blue rules and a red margin line, like Printr's idea of composing a page from small blocks.",
    pro: "Warm and human; each card is a self-contained chunk, easy to reorder.",
    con: "Handwriting fonts vary by OS; slight rotations cost a little legibility.",
    css: `
.d14{background:#8a5a34 repeating-linear-gradient(92deg,rgba(255,255,255,.04) 0 3px,transparent 3px 11px,rgba(0,0,0,.05) 11px 13px,transparent 13px 26px);padding:18px 14px;font-family:"Bradley Hand","Segoe Print","Comic Sans MS","Chalkboard SE",cursive;color:#1f2a44;box-sizing:border-box;min-height:100%}
.d14 .g{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:16px}
.d14 .cd{background:#fffef8;background-image:linear-gradient(90deg,transparent 30px,#e48a8a 30px 31px,transparent 31px),linear-gradient(#fffef8 0 36px,#e06a6a 36px 37px,transparent 37px),repeating-linear-gradient(#fffef8 0 21px,#a8cbe6 21px 22px);padding:8px 10px 10px 38px;line-height:22px;font-size:14px;box-shadow:0 4px 8px rgba(0,0,0,.35);transform:rotate(-1.2deg)}
.d14 .cd:nth-child(2){transform:rotate(1.4deg)}.d14 .cd:nth-child(3){transform:rotate(.6deg)}.d14 .cd:nth-child(4){transform:rotate(-.8deg)}
.d14 h2{margin:0 0 8px;font-size:17px;line-height:28px;color:#b8322b}
.d14 .t{font-size:44px;line-height:44px;font-weight:700}
.d14 h2{overflow-wrap:anywhere}
.d14 .r{display:flex;justify-content:space-between;gap:6px}
.d14 .r span:last-child{white-space:nowrap}
.d14 u{text-decoration-color:#b8322b}`,
    render: W => {
      const d = W.details;
      const rain = W.rain24.filter((r, i) => i % 1 === 0).map(r => `<div class="r"><span>${hrL(r.hour)}</span><span>${r.prob >= 50 ? "<u>" + r.prob + "%</u>" : r.prob + "%"} · ${r.mm.toFixed(1)} mm</span></div>`).join("");
      const wk = W.days.map(x => `<div class="r"><span>${x.name} ${x.icon} ${x.desc}</span><span>${x.lo}–${x.hi}°C · ${x.pop}%</span></div>`).join("");
      return `<div class="d14"><div class="g">
<div class="cd"><h2>${W.place} · ${W.localTime}</h2><div class="t">${W.now.tempC}°C</div><div>${W.now.icon} ${W.now.desc}</div><div>feels like ${W.now.feelsC}°C</div><div>${W.date}</div></div>
<div class="cd"><h2>Rain, next 24 h (chance · mm)</h2>${rain}<div><u>${W.rainSummary}</u></div></div>
<div class="cd"><h2>This week (lo–hi · rain)</h2>${wk}</div>
<div class="cd"><h2>Details</h2>
<div class="r"><span>💧 Humidity</span><span>${d.humidity}%</span></div>
<div class="r"><span>🌬 Wind</span><span>${d.windKmh} km/h ${d.windDir} (gust ${d.gustKmh})</span></div>
<div class="r"><span>🔆 UV</span><span>${d.uv} ${uvTxt(d.uv).toLowerCase()}</span></div>
<div class="r"><span>☁ Cloud cover</span><span>${d.cloud}%</span></div>
<div class="r"><span>🌅 Sunrise</span><span>${d.sunrise}</span></div>
<div class="r"><span>🌇 Sunset</span><span>${d.sunset}</span></div>
<div class="r"><span>Pressure</span><span>${d.pressureHpa} hPa</span></div>
</div>
</div></div>`;
    }
  });

  /* ---------------- 15 Tear-off calendar ---------------- */
  V.push({
    id: "15", name: "Tear-off Calendar", family: FAM, level: "medium",
    blurb: "A daily tear-off desk calendar: today's sheet is the forecast, yesterday's torn stub still flutters under the binding, and the next six days peek out as the edges of the pages beneath. The rain summary sits where the 'thought for the day' would.",
    pro: "The week literally stacks under today, so 'next days' is spatial, not a table.",
    con: "Peeking page edges are thin; the week gets less room than today.",
    css: `
.d15{background:#e7e2d6;padding:20px 22px 26px;font-family:Georgia,"Times New Roman",serif;color:#262220;box-sizing:border-box;min-height:100%}
.d15 .pad{position:relative;max-width:470px;margin:0 auto}
.d15 .bind{height:26px;background:linear-gradient(#3a3a3a,#1e1e1e);border-radius:6px 6px 0 0;position:relative;z-index:3}
.d15 .bind::before,.d15 .bind::after{content:"";position:absolute;top:-8px;width:14px;height:22px;border:3px solid #9a9a9a;border-radius:8px;left:30%}
.d15 .bind::after{left:auto;right:30%}
.d15 .stub{position:absolute;top:24px;left:10px;width:120px;height:26px;background:#fbf9f3;z-index:2;transform-origin:0 0;animation:d15-flut 3.6s ease-in-out infinite alternate;font-size:10px;padding:4px 8px;box-sizing:border-box;color:#999;clip-path:polygon(0 0,100% 0,100% 40%,88% 70%,74% 45%,60% 85%,44% 50%,30% 92%,16% 55%,0 80%)}
@keyframes d15-flut{0%{transform:rotate(-2deg)}100%{transform:rotate(-9deg) translateY(-2px)}}
.d15 .sh{background:#fbf9f3;position:relative;z-index:1;box-shadow:0 2px 0 #e9e4d8,0 3px 6px rgba(0,0,0,.12);padding:28px 22px 16px}
.d15 .mo{gap:10px;flex-wrap:wrap;display:flex;justify-content:space-between;align-items:baseline;border-bottom:2px solid #c0392b;padding-bottom:4px;color:#c0392b;font-variant:small-caps;letter-spacing:2px;font-size:15px}
.d15 .hero{display:grid;grid-template-columns:auto 1fr;gap:18px;align-items:center;margin-top:8px}
.d15 .dn{font-size:104px;line-height:.9;font-weight:700;color:#c0392b}
.d15 .wd{overflow-wrap:anywhere;font-size:22px;letter-spacing:4px;text-transform:uppercase}
.d15 .nw{font-size:15px;margin-top:4px}
.d15 .nw b{font-size:30px}
.d15 .alm{display:grid;grid-template-columns:repeat(3,1fr);gap:4px 12px;font-size:12px;margin-top:12px;border-top:1px solid #d9d2c3;padding-top:8px}
.d15 .alm i{display:block;font-style:normal;font-size:9.5px;letter-spacing:1.5px;color:#8a8277;text-transform:uppercase}
.d15 .rn{margin-top:12px}
.d15 .rn h4{margin:0 0 4px;font-size:10px;letter-spacing:2px;color:#8a8277;text-transform:uppercase;font-weight:400}
.d15 .cells{display:grid;grid-template-columns:repeat(12,1fr);gap:2px}
.d15 .cells div{text-align:center;font-size:9.5px;padding:3px 0;border-radius:2px;line-height:1.25}
.d15 .q{font-style:italic;font-size:13px;margin-top:10px;padding-left:10px;border-left:3px solid #c0392b}
.d15 .pg{position:relative;background:#f6f3eb;margin:0 auto;border:1px solid #e1dbcd;border-top:none;padding:4px 14px;font-size:11.5px;display:grid;grid-template-columns:62px 1fr auto auto;gap:10px;align-items:center;box-shadow:0 2px 3px rgba(0,0,0,.07)}
.d15 .pg b{color:#c0392b}
${rm("15")}`,
    render: W => {
      const d = W.details;
      const cells = W.rain24.map(r => `<div style="background:rgba(41,98,160,${(r.prob / 100 * 0.85).toFixed(2)});color:${r.prob > 50 ? "#fff" : "#333"}">${hrS(r.hour)}<br>${r.prob}%</div>`).join("");
      const pages = W.days.slice(1).map((x, i) => {
        const dt = { d: x.dateNum, m: x.monthShort };
        return `<div class="pg" style="width:${(98 - i * 1.6).toFixed(1)}%"><span><b>${x.name}</b> ${dt.d} ${dt.m}</span><span>${x.icon} ${x.desc}</span><span>${x.pop}% rain</span><span>${x.lo}–${x.hi}°C</span></div>`;
      }).join("");
      return `<div class="d15"><div class="pad">
<div class="bind"></div>
<div class="stub">Yesterday</div>
<div class="sh">
 <div class="mo"><span>${W.monthLong} ${W.year}</span><span>${W.place}</span></div>
 <div class="hero"><div class="dn">${W.dayNum}</div><div><div class="wd">${W.weekdayLong}</div><div class="nw"><b>${W.now.tempC}°C</b> ${W.now.icon} ${W.now.desc}</div><div style="font-size:13px">feels like ${W.now.feelsC}°C · ${W.localTime} · today ${W.days[0].lo}–${W.days[0].hi}°C</div></div></div>
 <div class="alm">
  <div><i>Sunrise</i>${d.sunrise}</div><div><i>Sunset</i>${d.sunset}</div><div><i>UV index</i>${d.uv} ${uvTxt(d.uv).toLowerCase()}</div>
  <div><i>Humidity</i>${d.humidity}%</div><div><i>Wind</i>${d.windKmh} km/h ${d.windDir}</div><div><i>Cloud cover</i>${d.cloud}%</div>
 </div>
 <div class="rn"><h4>Chance of rain, next 24 hours</h4><div class="cells">${cells}</div></div>
 <div class="q">“${W.rainSummary}”</div>
</div>
${pages}
</div></div>`;
    }
  });

  /* ---------------- 16 LCD weather station ---------------- */
  V.push({
    id: "16", name: "LCD Station", family: FAM, level: "medium",
    blurb: "A plastic desk weather station with a grey-green reflective LCD: faint 'ghost' 88 segments behind every number, segmented rain bars where unlit segments still show, a blinking colon and a scrolling ticker for the rain summary. Ideas from the Dribbble 'LCD Display GUI' weather-station shot.",
    pro: "Nostalgic gadget feel; the ghost segments make it read as real hardware.",
    con: "Low-contrast LCD palette is deliberate but harder to read in sunlight.",
    css: `
.d16{background:#cfd3d6;padding:20px 16px;font-family:"Menlo","Consolas","Courier New",monospace;box-sizing:border-box;min-height:100%}
.d16 .case{background:linear-gradient(#45484c,#24262a);border-radius:26px;padding:14px 16px 16px;box-shadow:0 10px 24px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.15)}
.d16 .brand{display:flex;justify-content:space-between;color:#c9ccd0;font-size:9.5px;letter-spacing:2px;margin:0 4px 8px;font-family:"Helvetica Neue",Arial,sans-serif}
.d16 .lcd{background:linear-gradient(160deg,#bfcab0,#a9b69a);border-radius:10px;padding:12px 14px;color:#18211a;box-shadow:inset 0 3px 8px rgba(0,0,0,.35);text-transform:uppercase}
.d16 .top{gap:8px;flex-wrap:wrap;display:flex;justify-content:space-between;font-size:11px;border-bottom:1px solid rgba(24,33,26,.35);padding-bottom:5px}
.d16 .blink{animation:d16-bl 1s steps(1) infinite}
@keyframes d16-bl{50%{opacity:0}}
.d16 .main{display:grid;grid-template-columns:auto 1fr;gap:14px;align-items:center;margin:8px 0}
.d16 .seg{position:relative;font-size:76px;font-weight:700;line-height:1;letter-spacing:-2px;font-style:italic}
.d16 .seg::before{content:attr(data-g);position:absolute;left:0;top:0;opacity:.09}
.d16 .seg sup{font-size:22px;font-style:normal;vertical-align:top;letter-spacing:0}
.d16 .ic{filter:grayscale(1) brightness(.45) contrast(1.4)}
.d16 .cond{font-size:14px;font-weight:700}
.d16 .sub{font-size:11px;margin-top:4px}
.d16 .lab{font-size:9.5px;letter-spacing:1px;display:flex;justify-content:space-between;margin-top:6px}
.d16 svg{display:block;width:100%;height:auto}
.d16 .tick{overflow:hidden;white-space:nowrap;font-size:11px;border-top:1px solid rgba(24,33,26,.35);border-bottom:1px solid rgba(24,33,26,.35);padding:3px 0;margin-top:4px}
.d16 .tick span{display:inline-block;padding-left:100%;animation:d16-mq 16s linear infinite}
@keyframes d16-mq{to{transform:translateX(-100%)}}
.d16 .wk{display:grid;grid-template-columns:repeat(7,1fr);gap:2px;margin-top:8px;text-align:center;font-size:9.5px;line-height:1.35}
.d16 .wk div{border-right:1px solid rgba(24,33,26,.25)}.d16 .wk div:last-child{border:0}
.d16 .wk b{font-size:12px}
.d16 .dt{display:grid;grid-template-columns:repeat(3,1fr);gap:4px 10px;margin-top:8px;font-size:11px;border-top:1px solid rgba(24,33,26,.35);padding-top:6px}
.d16 .dt span{opacity:.7;font-size:9.5px;display:block}
.d16 .btns{display:flex;justify-content:center;gap:12px;margin-top:12px}
.d16 .btns div{background:linear-gradient(#5b5f64,#3a3d41);color:#d3d6da;font-size:9px;letter-spacing:1.5px;padding:6px 14px;border-radius:14px;box-shadow:0 2px 0 #151618;font-family:"Helvetica Neue",Arial,sans-serif}
${rm("16")}`,
    render: W => {
      const d = W.details;
      // segmented rain bars: 12 columns x 10 segments
      const cw = 40, sh = 6, gap = 2;
      let segs = "";
      W.rain24.forEach((r, i) => {
        const lit = Math.min(10, Math.max(0, Math.round(r.prob / 10)));
        for (let k = 0; k < 10; k++) {
          const y = 4 + (9 - k) * (sh + gap);
          segs += `<rect x="${i * cw + 4}" y="${y}" width="${cw - 8}" height="${sh}" fill="#18211a" opacity="${k < lit ? 0.9 : 0.08}"/>`;
        }
        segs += `<text x="${i * cw + cw / 2}" y="96" font-size="10" text-anchor="middle" fill="#18211a">${hrS(r.hour)}</text>`;
        segs += `<text x="${i * cw + cw / 2}" y="108" font-size="9" text-anchor="middle" fill="#18211a" opacity=".75">${r.prob}%</text>`;
      });
      const wk = W.days.map(x => `<div>${x.name}<br><span class="ic">${x.icon}</span><br>${x.desc}<br><b>${x.hi}°</b>/${x.lo}°C<br>☂ ${x.pop}%</div>`).join("");
      const tmm = /^(\d+):(\d+)(.*)$/.exec(W.localTime || ""), tm = tmm ? [tmm[1], tmm[2] + tmm[3]] : [W.localTime || "", ""];
      return `<div class="d16"><div class="case">
<div class="brand"><span>WTH-560 · WEATHER STATION</span><span>● RF SYNC</span></div>
<div class="lcd">
 <div class="top"><span>${W.place}</span><span>${W.weekdayShort} ${W.dayNum} ${W.monthShort}</span><span>${tm[0]}${tm[1] ? `<span class="blink">:</span>${tm[1]}` : ""}</span></div>
 <div class="main">
  <div class="seg" data-g="88">${W.now.tempC}<sup>°C</sup></div>
  <div><div class="cond"><span class="ic">${W.now.icon}</span> ${W.now.desc}</div><div class="sub">Feels like ${W.now.feelsC}°C</div><div class="sub">Today ${W.days[0].lo}°C – ${W.days[0].hi}°C</div></div>
 </div>
 <div class="lab"><span>RAIN CHANCE · NEXT 24 H</span><span>TOTAL ${total(W)} MM</span></div>
 <svg viewBox="0 0 480 112">${segs}</svg>
 <div class="tick"><span>${W.rainSummary} ··· </span></div>
 <div class="wk">${wk}</div>
 <div class="dt">
  <div><span>HUMIDITY</span>${d.humidity}%</div><div><span>WIND</span>${d.windDir} ${d.windKmh} KM/H</div><div><span>UV INDEX</span>${d.uv} ${uvTxt(d.uv)}</div>
  <div><span>CLOUD</span>${d.cloud}%</div><div><span>SUNRISE</span>${d.sunrise}</div><div><span>SUNSET</span>${d.sunset}</div>
 </div>
</div>
<div class="btns"><div>MODE</div><div>MAX/MIN</div><div>LIGHT</div></div>
</div></div>`;
    }
  });

  /* ---------------- 17 Postcard ---------------- */
  V.push({
    id: "17", name: "Postcard Home", family: FAM, level: "medium",
    blurb: "The back of a postcard from Pune: a handwritten note with the current weather and a P.S. rain sketch on the left, a perforated stamp and a circular postmark (date and time on a curved path) on the right, details written on the address lines. The week arrives as a sheet of seven stamps.",
    pro: "Charming and personal; reads like a message rather than a dashboard.",
    con: "Handwriting and stamp art take space; less scannable than a grid.",
    css: `
.d17{background:#cdbd9f;padding:20px 16px;font-family:"Bradley Hand","Segoe Print","Chalkboard SE","Comic Sans MS",cursive;color:#23324f;box-sizing:border-box;min-height:100%}
.d17 .pc{background:#fdf8ec;box-shadow:0 8px 18px rgba(0,0,0,.25);padding:16px;display:grid;grid-template-columns:1.1fr 1fr;gap:16px;position:relative}
.d17 .pc::before{content:"POST CARD";position:absolute;top:6px;left:50%;transform:translateX(-50%);font:700 9px/1 "Helvetica Neue",Arial,sans-serif;letter-spacing:4px;color:#9b8f78}
.d17 .msg{overflow-wrap:anywhere;font-size:13.5px;line-height:1.45;border-right:1px solid #c9bda6;padding-right:14px;padding-top:8px}
.d17 .msg b{font-size:17px}
.d17 .ps{margin-top:6px;font-size:12px}
.d17 .ps svg{display:block;width:100%;height:auto}
.d17 .rt{position:relative;padding-top:8px}
.d17 .stw{float:right;padding:5px;background:radial-gradient(circle,transparent 2.6px,#fff 3px) -4px -4px/8px 8px;margin-left:8px;filter:drop-shadow(0 1px 1px rgba(0,0,0,.2))}
.d17 .st{width:84px;height:100px;background:#e9f1f6;display:block}
.d17 .pm{position:absolute;top:58px;left:-10px;width:150px;height:auto;opacity:.75;pointer-events:none}
.d17 .ad{clear:both;padding-top:32px;font-size:13px}
.d17 .ad div{border-bottom:1px solid #b8ab92;padding:3px 2px 1px;display:flex;justify-content:space-between;gap:6px}
.d17 .ad div span:first-child{font:600 9.5px "Helvetica Neue",Arial,sans-serif;letter-spacing:1px;color:#8a7f6a;text-transform:uppercase;align-self:flex-end}
.d17 .sheet{margin-top:16px;display:grid;grid-template-columns:repeat(auto-fit,minmax(68px,1fr));gap:4px}
.d17 .sw{padding:4px;background:radial-gradient(circle,transparent 2.2px,#fdf8ec 2.6px) -3px -3px/7px 7px}
.d17 .s{background:#f4ead2;border:1px solid #d6c7a3;text-align:center;font:11px/1.3 "Helvetica Neue",Arial,sans-serif;padding:5px 2px;color:#3b3226}
.d17 .s b{display:block;font-size:12px;color:#b03a2e}
.d17 .s .i{font-size:20px;line-height:1.2}
@media (max-width:420px){.d17 .pc{grid-template-columns:1fr}.d17 .msg{border-right:0;padding-right:0}}`,
    render: W => {
      const d = W.details, rsum = String(W.rainSummary || ""), rs17 = rsum.charAt(0).toLowerCase() + rsum.slice(1);
      // P.S. sketch: rain chance line
      const city = W.cityName || W.place.split(",")[0], cityU = city.toUpperCase(), ctry = W.place.indexOf(",") > 0 ? W.place.split(",").pop().trim().toUpperCase() : "";
      const pts = W.rain24.map((r, i) => `${(10 + i * 20).toFixed(1)},${(52 - r.prob * 0.42).toFixed(1)}`).join(" ");
      const lbl = W.rain24.map((r, i) => i % 3 === 0 ? `<text x="${10 + i * 20}" y="66" font-size="9" text-anchor="middle" fill="#23324f">${hrS(r.hour)}</text>` : "").join("");
      const peak = W.rain24.reduce((a, r, i) => r.prob > W.rain24[a].prob ? i : a, 0);
      const ps = `<svg viewBox="0 0 240 70"><line x1="4" y1="52" x2="236" y2="52" stroke="#b8ab92"/><polyline points="${pts}" fill="none" stroke="#2c5aa0" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/><circle cx="${10 + peak * 20}" cy="${52 - W.rain24[peak].prob * 0.42}" r="3.5" fill="#2c5aa0"/><text x="${peak > 6 ? 10 + peak * 20 - 7 : 10 + peak * 20 + 7}" y="${52 - W.rain24[peak].prob * 0.42 + 4}" font-size="10" text-anchor="${peak > 6 ? "end" : "start"}" fill="#2c5aa0">${W.rain24[peak].prob}% at ${hrL(W.rain24[peak].hour)}</text>${lbl}</svg>`;
      const stamp = `<svg class="st" viewBox="0 0 84 100"><rect width="84" height="100" fill="#e3eef5"/><circle cx="52" cy="34" r="14" fill="#f2b33d"/><g fill="#fff" stroke="#9fb3c4"><ellipse cx="34" cy="46" rx="22" ry="11"/><ellipse cx="46" cy="40" rx="13" ry="10"/></g><text x="42" y="78" text-anchor="middle" font-family="Georgia,serif" font-size="17" font-weight="700" fill="#23324f">${W.now.tempC}°C</text><text x="42" y="92" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="7" letter-spacing="1.5" fill="#23324f">${(ctry ? ctry.slice(0, 8) + " · " : "") + cityU.slice(0, 10)}</text></svg>`;
      const pm = `<svg class="pm" viewBox="0 0 150 80"><defs><path id="d17-pm" d="M18,40 a22,22 0 1,1 44,0 a22,22 0 1,1 -44,0"/></defs><circle cx="40" cy="40" r="30" fill="none" stroke="#3a3a5a" stroke-width="1.6"/><circle cx="40" cy="40" r="19" fill="none" stroke="#3a3a5a" stroke-width="1"/><text font-family="Helvetica,Arial,sans-serif" font-size="7.5" letter-spacing="1.2" fill="#3a3a5a"><textPath href="#d17-pm">${cityU.slice(0, 9)} · ${W.dayNum} ${W.monthShort.toUpperCase()} ${W.year} · ${W.localTime} ·</textPath></text><text x="40" y="43" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="8" fill="#3a3a5a">${W.weekdayShort.toUpperCase()}</text><g fill="none" stroke="#3a3a5a" stroke-width="1.4">${[0, 1, 2, 3, 4].map(k => `<path d="M74,${22 + k * 9} q9,-5 18,0 t18,0 t18,0 t18,0"/>`).join("")}</g></svg>`;
      const sheet = W.days.map(x => `<div class="sw"><div class="s"><b>${x.name}</b><div class="i">${x.icon}</div>${x.desc}<br>${x.lo}–${x.hi}°C<br>☂ ${x.pop}%</div></div>`).join("");
      return `<div class="d17">
<div class="pc">
 <div class="msg">Greetings from ${city}!<br><b>${W.now.tempC}°C</b> ${W.isNight ? "tonight" : "right now"}, ${W.now.icon} ${W.now.desc.toLowerCase()}, though it feels more like ${W.now.feelsC}°C. Today ran ${W.days[0].lo}–${W.days[0].hi}°C.<br>${W.rain24.some(r => r.prob >= 30) ? "Bring a brolly: " : "No brolly needed: "}${rs17}
  <div class="ps">P.S. chance of rain, next 24 h:${ps}</div>
  <div style="text-align:right">— the sky, ${W.localTime}</div>
 </div>
 <div class="rt">
  <div class="stw">${stamp}</div>${pm}
  <div class="ad">
   <div><span>Humidity</span>${d.humidity}%</div>
   <div><span>Wind</span>${d.windDir} ${d.windKmh} km/h, gusts ${d.gustKmh}</div>
   <div><span>UV index</span>${d.uv} (${uvTxt(d.uv).toLowerCase()})</div>
   <div><span>Cloud cover</span>${d.cloud}%</div>
   <div><span>Sunrise</span>${d.sunrise}</div>
   <div><span>Sunset</span>${d.sunset}</div>
  </div>
 </div>
</div>
<div class="sheet">${sheet}</div>
</div>`;
    }
  });

  /* ---------------- 18 Aneroid barometer ---------------- */
  V.push({
    id: "18", name: "Brass Barometer", family: FAM, level: "rich",
    blurb: "A Victorian aneroid barometer on a wood panel: hand-drawn SVG dial with the classic Stormy / Rain / Change / Fair / Very Dry legend, a needle that swings and settles on the real pressure, and a small sub-dial that is a 24-hour clock of rain chance. Engraved brass plates carry the rest. Legend and 'Rises for dry' wording from antique barometer dealer listings.",
    pro: "A genuine instrument: pressure is shown the way people read it for 150 years.",
    con: "Most SVG work of the set; pressure gets hero status though few people care about hPa.",
    css: `
.d18{background:#4a2c17 repeating-linear-gradient(88deg,rgba(0,0,0,.12) 0 2px,transparent 2px 9px,rgba(255,220,170,.05) 9px 11px,transparent 11px 23px);padding:18px 16px;font-family:Georgia,"Times New Roman",serif;color:#2b1d0e;box-sizing:border-box;min-height:100%}
.d18 .top{display:flex;flex-wrap:wrap;gap:14px;align-items:center;justify-content:center}
.d18 .dial{width:300px;max-width:100%;height:auto;display:block;filter:drop-shadow(0 8px 10px rgba(0,0,0,.5))}
.d18 .ndl{transform-box:view-box;transform-origin:160px 160px;transform:rotate(var(--a));animation:d18-sw 2.6s cubic-bezier(.25,1.35,.45,1) both}
@keyframes d18-sw{0%{transform:rotate(calc(var(--a) - 70deg))}100%{transform:rotate(var(--a))}}
.d18 .col{flex:1;min-width:190px;display:flex;flex-direction:column;gap:10px}
.d18 .pl{background:linear-gradient(135deg,#e9cf8a,#b8913f 45%,#e2c578 70%,#a5822f);border-radius:6px;padding:9px 12px;box-shadow:0 3px 6px rgba(0,0,0,.45),inset 0 1px 0 rgba(255,255,255,.5);font-size:12.5px}
.d18 .pl{overflow-wrap:anywhere}
.d18 .pl h4{margin:0 0 4px;font-size:9.5px;letter-spacing:2.5px;text-transform:uppercase;font-weight:400;color:#4a3410}
.d18 .t{font-size:40px;line-height:1;font-weight:700;color:#2b1d0e;text-shadow:0 1px 0 rgba(255,255,255,.4)}
.d18 .r{display:flex;justify-content:space-between;gap:6px;border-bottom:1px solid rgba(74,52,16,.3);padding:1px 0}
.d18 .wk{margin-top:14px;display:grid;grid-template-columns:repeat(7,1fr);gap:6px}
.d18 .wk .pl{padding:6px 3px;text-align:center;font-size:11px;line-height:1.35}
.d18 .wk b{display:block;letter-spacing:1px}
.d18 .rs{font-style:italic;font-size:12px}
@media (max-width:420px){.d18 .wk{grid-template-columns:repeat(4,1fr)}}
${rm("18")}`,
    render: W => {
      const d = W.details, C = 160;
      const P0 = 950, P1 = 1070, ang = p => (p - P0) / (P1 - P0) * 270 - 135;
      let ticks = "";
      for (let p = P0; p <= P1; p += 2) {
        const a = ang(p), maj = p % 10 === 0;
        const [x1, y1] = pol(C, C, 128, a), [x2, y2] = pol(C, C, maj ? 115 : 122, a);
        ticks += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#2b1d0e" stroke-width="${maj ? 1.6 : 0.7}"/>`;
        if (maj && p % 20 === 10) { const [tx, ty] = pol(C, C, 104, a); ticks += `<text x="${tx}" y="${ty + 3}" font-size="9" text-anchor="middle" fill="#2b1d0e">${p}</text>`; }
      }
      const legend = [["STORMY", 962], ["RAIN", 982], ["CHANGE", 1002], ["FAIR", 1022], ["VERY DRY", 1045]].map(([w, p]) => {
        const a = ang(p), [x, y] = pol(C, C, 80, a);
        return `<text x="${x}" y="${y}" transform="rotate(${a.toFixed(1)} ${x} ${y})" font-size="12" font-style="italic" font-weight="700" text-anchor="middle" fill="#3b1f0e" letter-spacing="1">${w}</text>`;
      }).join("");
      // rain sub-dial: 24h clock, 0h at top
      const SX = 160, SY = 246;
      const sub = W.rain24.map(r => {
        const a = r.hour / 24 * 360 + 15, [x1, y1] = pol(SX, SY, 11, a), [x2, y2] = pol(SX, SY, 11 + r.prob * 0.19, a);
        return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#2a5b8c" stroke-width="7" stroke-opacity="${(0.35 + r.prob / 160).toFixed(2)}"/>`;
      }).join("");
      const subl = [[0, "12A"], [6, "6A"], [12, "12P"], [18, "6P"]].map(([h, t]) => { const [x, y] = pol(SX, SY, 36, h / 24 * 360); return `<text x="${x}" y="${y + 2.5}" font-size="7" text-anchor="middle" fill="#2b1d0e">${t}</text>`; }).join("");
      const [nx, ny] = pol(SX, SY, 33, (num(W.hour24, 0) + num(W.minute, 0) / 60) / 24 * 360);
      const pr = Math.min(P1, Math.max(P0, num(d.pressureHpa, 1013))), na = ang(pr).toFixed(1);
      const svg = `<svg class="dial" viewBox="0 0 320 320">
<defs><radialGradient id="d18-br" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#f3dc9a"/><stop offset=".55" stop-color="#b48a36"/><stop offset="1" stop-color="#6e5018"/></radialGradient>
<radialGradient id="d18-dl" cx="45%" cy="40%" r="70%"><stop offset="0" stop-color="#fbf4e1"/><stop offset="1" stop-color="#e8dab8"/></radialGradient></defs>
<circle cx="160" cy="160" r="157" fill="url(#d18-br)"/><circle cx="160" cy="160" r="143" fill="#5a3f12"/><circle cx="160" cy="160" r="141" fill="url(#d18-dl)"/>
${ticks}${legend}
<text x="160" y="118" text-anchor="middle" font-size="8.5" letter-spacing="2" fill="#5a3f12">W.T.H. &amp; Co · ${(W.cityName || W.place.split(",")[0]).toUpperCase().slice(0, 16)}</text>
<text x="160" y="196" text-anchor="middle" font-size="8" fill="#5a3f12">hPa · now ${d.pressureHpa}</text>
<text x="70" y="214" text-anchor="middle" font-size="7" font-style="italic" fill="#5a3f12">Falls for wet</text><text x="70" y="223" text-anchor="middle" font-size="7" font-style="italic" fill="#5a3f12">or more wind</text>
<text x="250" y="214" text-anchor="middle" font-size="7" font-style="italic" fill="#5a3f12">Rises for dry</text><text x="250" y="223" text-anchor="middle" font-size="7" font-style="italic" fill="#5a3f12">or less wind</text>
<circle cx="${SX}" cy="${SY}" r="40" fill="#f6eed8" stroke="#8a6a2a" stroke-width="1.2"/>
${sub}${subl}<circle cx="${nx}" cy="${ny}" r="2.6" fill="#a8322a"/>
<circle cx="${SX}" cy="${SY}" r="9" fill="#f6eed8" stroke="#8a6a2a" stroke-width=".6"/>
<text x="160" y="297" text-anchor="middle" font-size="7.5" letter-spacing="1.5" fill="#5a3f12">RAIN · NEXT 24 H · ● NOW</text>
<g class="ndl" style="--a:${na}deg"><path d="M160,32 L163,150 L160,186 L157,150 Z" fill="#1c140a"/><circle cx="160" cy="172" r="7" fill="none" stroke="#1c140a" stroke-width="2"/></g>
<circle cx="160" cy="160" r="8" fill="url(#d18-br)" stroke="#5a3f12"/>
</svg>`;
      const wk = W.days.map(x => `<div class="pl"><b>${x.name.toUpperCase()}</b>${x.icon}<br>${x.desc}<br>${x.lo}–${x.hi}°C<br>rain ${x.pop}%</div>`).join("");
      return `<div class="d18">
<div class="top">${svg}
 <div class="col">
  <div class="pl"><h4>Thermometer · ${W.localTime}</h4><div class="t">${W.now.tempC}°C</div><div>${W.now.icon} ${W.now.desc} · feels ${W.now.feelsC}°C</div></div>
  <div class="pl"><h4>Observations</h4>
   <div class="r"><span>Humidity</span><span>${d.humidity}%</span></div>
   <div class="r"><span>Wind</span><span>${d.windKmh} km/h ${d.windDir}</span></div>
   <div class="r"><span>UV index</span><span>${d.uv} ${uvTxt(d.uv).toLowerCase()}</span></div>
   <div class="r"><span>Cloud</span><span>${d.cloud}%</span></div>
   <div class="r"><span>Sunrise</span><span>${d.sunrise}</span></div>
   <div class="r"><span>Sunset</span><span>${d.sunset}</span></div>
  </div>
  <div class="pl rs">${W.rainSummary}</div>
 </div>
</div>
<div class="wk">${wk}</div>
</div>`;
    }
  });

  /* ---------------- 19 Instrument cluster ---------------- */
  V.push({
    id: "19", name: "Dashboard Cluster", family: FAM, level: "rich",
    blurb: "A car instrument cluster at night: a temperature 'speedometer' and a wind 'tachometer' do the ignition needle sweep on load, a trip-computer screen in the middle holds the rain strip and the week, and telltale lamps (with words) light for UV, humidity and the sun times. Gauge dials inspired by the radial-dial skeuomorphic weather concepts on Contra/Dribbble.",
    pro: "Dramatic, kinetic, and the gauges show values against a full range.",
    con: "Busy; the car metaphor adds chrome (bezels, redlines) that carries no data.",
    css: `
.d19{background:radial-gradient(ellipse at 50% 0,#1b2230,#07090d 70%);padding:18px 12px;font-family:"Helvetica Neue","Segoe UI",Arial,sans-serif;color:#dfe6ee;box-sizing:border-box;min-height:100%}
.d19 .hd{gap:8px;flex-wrap:wrap;display:flex;justify-content:space-between;font-size:11px;letter-spacing:2px;color:#7f8ea3;margin:0 8px 8px;text-transform:uppercase}
.d19 .cl{display:grid;grid-template-columns:1fr 1.05fr 1fr;align-items:center;gap:6px;background:linear-gradient(#11151c,#0a0c10);border-radius:120px 120px 28px 28px;padding:14px 10px;box-shadow:inset 0 0 0 2px #232a36,0 10px 26px rgba(0,0,0,.6)}
.d19 svg.g{width:100%;height:auto;display:block}
.d19 .nd{transform-box:view-box;transform-origin:100px 100px;transform:rotate(var(--a));animation:d19-sw 2.4s ease-in-out both}
@keyframes d19-sw{0%{transform:rotate(-120deg)}40%{transform:rotate(120deg)}100%{transform:rotate(var(--a))}}
.d19 .tc{background:#03060a;border:1px solid #273042;border-radius:10px;padding:8px 9px;font-size:11px;min-height:150px}
.d19 .tc .big{font-size:15px;color:#fff;font-weight:600}
.d19 .tc .sm{color:#8fa0b6;font-size:10px;letter-spacing:1px;text-transform:uppercase;margin-top:6px}
.d19 .strip{display:grid;grid-template-columns:repeat(12,1fr);gap:2px;margin-top:3px}
.d19 .strip i{display:block;height:16px;border-radius:2px}
.d19 .hrs{display:grid;grid-template-columns:repeat(4,1fr);font-size:8.5px;color:#7f8ea3;margin-top:2px}
.d19 .rs{font-size:10.5px;color:#9fd0ff;margin-top:5px;line-height:1.3}
.d19 .scr{margin:12px 6px 0;background:#03060a;border:1px solid #273042;border-radius:10px;padding:8px 10px}
.d19 .scr .sm{color:#8fa0b6;font-size:10px;letter-spacing:1px;text-transform:uppercase;margin-bottom:4px}
.d19 .row{display:grid;grid-template-columns:44px 1fr 1fr 56px 74px;gap:6px;align-items:center;font-size:11.5px;padding:2.5px 0;border-top:1px solid #141a24}
.d19 .row .tb{height:6px;background:#1a212d;border-radius:3px;position:relative}
.d19 .row .tb i{position:absolute;top:0;bottom:0;border-radius:3px;background:linear-gradient(90deg,#4fb3ff,#ffb547)}
.d19 .row .r{text-align:right;white-space:nowrap}
.d19 .tt{display:flex;flex-wrap:wrap;gap:6px;margin:12px 6px 0;justify-content:center}
.d19 .tt div{border:1px solid #273042;border-radius:6px;padding:4px 8px;font-size:11px;color:#5c6878;animation:d19-bulb 2.4s ease-out both}
.d19 .tt .on{color:#ffb547;border-color:#6a4a16;text-shadow:0 0 8px rgba(255,181,71,.6)}
.d19 .tt .ok{color:#6fe3a1;border-color:#1f5a3a}
@keyframes d19-bulb{0%,30%{color:#ffd27a;border-color:#ffd27a}}
@media (max-width:420px){.d19 .cl{grid-template-columns:1fr 1fr;border-radius:28px}.d19 .tc{grid-column:1/-1;order:3}}
${rm("19")}`,
    render: W => {
      const d = W.details;
      const gauge = (min, max, val, step, label, unit, sub, redFrom, mark, markLbl) => {
        const A = v => (Math.min(max, Math.max(min, num(v, min))) - min) / ((max - min) || 1) * 240 - 120;
        let s = `<circle cx="100" cy="100" r="94" fill="#0c1016" stroke="#2a3342" stroke-width="3"/>`;
        // redline arc
        const [rx1, ry1] = pol(100, 100, 84, A(redFrom)), [rx2, ry2] = pol(100, 100, 84, 120);
        s += `<path d="M${rx1},${ry1} A84,84 0 0,1 ${rx2},${ry2}" fill="none" stroke="#c0392b" stroke-width="5"/>`;
        for (let v = min; v <= max; v += step / 2) {
          const maj = Math.abs((v - min) % step) < 1e-6, a = A(v);
          const [x1, y1] = pol(100, 100, 86, a), [x2, y2] = pol(100, 100, maj ? 74 : 80, a);
          s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#cfd8e3" stroke-width="${maj ? 2 : 1}"/>`;
          if (maj) { const [tx, ty] = pol(100, 100, 63, a); s += `<text x="${tx}" y="${ty + 3.5}" font-size="10" text-anchor="middle" fill="#cfd8e3">${v}</text>`; }
        }
        if (mark != null) { const [x1, y1] = pol(100, 100, 92, A(mark)), [x2, y2] = pol(100, 100, 76, A(mark)); s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#ffb547" stroke-width="3"/>`; const [lx, ly] = pol(100, 100, 100, A(mark)); s += `<text x="${lx}" y="${ly}" font-size="7.5" text-anchor="middle" fill="#ffb547">${markLbl}</text>`; }
        s += `<text x="100" y="72" font-size="8.5" letter-spacing="2" text-anchor="middle" fill="#7f8ea3">${label}</text>`;
        s += `<g class="nd" style="--a:${A(val).toFixed(1)}deg"><path d="M100,22 L103,100 L100,112 L97,100 Z" fill="#ff5a3c"/></g><circle cx="100" cy="100" r="9" fill="#1d2430" stroke="#3a4558"/>`;
        s += `<text x="100" y="146" font-size="22" font-weight="600" text-anchor="middle" fill="#fff">${val}<tspan font-size="11" fill="#8fa0b6"> ${unit}</tspan></text>`;
        s += `<text x="100" y="162" font-size="9.5" text-anchor="middle" fill="#8fa0b6">${sub}</text>`;
        return `<svg class="g" viewBox="0 0 200 200">${s}</svg>`;
      };
      const tv = [W.now.tempC, W.now.feelsC, ...W.days.map(x => x.lo), ...W.days.map(x => x.hi)].filter(isFinite);
      let tMin = Math.floor((Math.min(...tv) - 2) / 5) * 5, tMax = Math.ceil((Math.max(...tv) + 2) / 5) * 5;
      if (tMax - tMin < 20) tMax = tMin + 20;
      const tSpan = tMax - tMin, tStep = tSpan > 60 ? 10 : 5, tRed = Math.round(tMax - tSpan * 0.15);
      const wv = Math.max(num(d.windKmh, 0), num(d.gustKmh, 0)), wMax = Math.max(60, Math.ceil((wv + 5) / 10) * 10), wStep = wMax > 100 ? 20 : 10;
      const tg = gauge(tMin, tMax, W.now.tempC, tStep, "TEMPERATURE", "°C", `feels like ${W.now.feelsC}°C`, tRed, W.now.feelsC, "FEELS");
      const wg = gauge(0, wMax, d.windKmh, wStep, `WIND · FROM ${d.windDir}`, "km/h", `${d.windDir} · gusts ${d.gustKmh} km/h`, Math.round(wMax * 0.83), d.gustKmh, "GUST");
      const strip = W.rain24.map(r => `<i title="${hrL(r.hour)} ${r.prob}%" style="background:rgba(79,179,255,${(0.12 + r.prob / 100 * 0.88).toFixed(2)})"></i>`).join("");
      const hrs = [0, 3, 6, 9].filter(i => W.rain24[i]).map(i => `<span>${hrS(W.rain24[i].hour)} ${W.rain24[i].prob}%</span>`).join("");
      const lo = Math.min(...W.days.map(x => x.lo)), hi = Math.max(...W.days.map(x => x.hi)), sp = (hi - lo) || 1;
      const rows = W.days.map(x => `<div class="row"><b>${x.name}</b><span>${x.icon} ${x.desc}</span><span class="tb"><i style="left:${Math.min(95, (x.lo - lo) / sp * 100).toFixed(1)}%;right:${Math.min(95, (hi - x.hi) / sp * 100).toFixed(1)}%"></i></span><span class="r">☂ ${x.pop}%</span><span class="r">${x.lo}–${x.hi}°C</span></div>`).join("");
      return `<div class="d19">
<div class="hd"><span>${W.place}</span><span>${W.date} · ${W.localTime}</span></div>
<div class="cl">
 ${tg}
 <div class="tc"><div class="big">${W.now.icon} ${W.now.desc}</div><div style="color:#8fa0b6">Today ${W.days[0].lo}–${W.days[0].hi}°C</div>
  <div class="sm">Rain ahead · 24 h</div><div class="strip">${strip}</div><div class="hrs">${hrs}</div>
  <div class="rs">${W.rainSummary}</div></div>
 ${wg}
</div>
<div class="tt">
 <div class="on">🔆 UV ${d.uv} ${uvTxt(d.uv).toUpperCase()}</div>
 <div class="ok">💧 HUMIDITY ${d.humidity}%</div>
 <div class="ok">☁ CLOUD ${d.cloud}%</div>
 <div class="ok">🌅 SUNRISE ${d.sunrise}</div>
 <div class="ok">🌇 SUNSET ${d.sunset}</div>
 <div>⦿ ${d.pressureHpa} hPa</div>
</div>
<div class="scr"><div class="sm">Trip computer · next 7 days</div>${rows}</div>
</div>`;
    }
  });

  /* ---------------- 20 Lab thermometers & rain gauges ---------------- */
  V.push({
    id: "20", name: "Lab Bench", family: FAM, level: "rich",
    blurb: "A row of glass thermometers on graph paper, one per day, with the mercury rising to each day's high and a blue tick at the low, plus twelve graduated test tubes filling to the rain expected in each 2-hour slot. Lab-specimen tag for the header. The measuring-instrument idea comes from the old forecast-gauge collectibles in antique barometer listings.",
    pro: "Every number is literally measured on a scale; highs and rainfall compare honestly.",
    con: "Tall; thin tubes make small differences (1°C, 0.1 mm) hard to see.",
    css: `
.d20{background:#f8fafc;background-image:linear-gradient(rgba(70,130,180,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(70,130,180,.12) 1px,transparent 1px);background-size:14px 14px;padding:18px 16px;font-family:"Avenir Next","Helvetica Neue",Arial,sans-serif;color:#1d2733;box-sizing:border-box;min-height:100%}
.d20 .tag{display:flex;gap:14px;align-items:center;background:#fff;border:1.5px solid #1d2733;border-radius:4px 22px 22px 4px;padding:8px 14px;box-shadow:3px 3px 0 #1d2733}
.d20 .tag .t{font-size:46px;font-weight:700;line-height:1;letter-spacing:-1px}
.d20 .tag .m{overflow-wrap:anywhere;min-width:0;font-size:12.5px;line-height:1.45}
.d20 .tag .k{font-size:9.5px;letter-spacing:2px;text-transform:uppercase;color:#5d6b7a}
.d20 h3{font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:#5d6b7a;margin:14px 0 2px;font-weight:600}
.d20 svg{display:block;width:100%;height:auto}
.d20 .gr{transform-box:fill-box;transform-origin:50% 100%;animation:d20-up 1.8s cubic-bezier(.2,.8,.3,1) both}
@keyframes d20-up{from{transform:scaleY(0)}}
.d20 .sum{font-size:12.5px;background:#fff;border-left:3px solid #2f7fd1;padding:5px 9px;margin-top:4px}
.d20 .rd{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:0;margin-top:12px;background:#fff;border:1px solid #c7d2de;font-size:12px}
.d20 .rd div{padding:5px 9px;border-bottom:1px solid #e3e9f0;display:flex;justify-content:space-between;gap:6px}
.d20 .rd span{color:#5d6b7a}
${rm("20")}`,
    render: W => {
      const d = W.details;
      // thermometers
      const dlo = Math.min(...W.days.map(x => x.lo)), dhi = Math.max(...W.days.map(x => x.hi));
      const tsp = (dhi - dlo) || 1, tst = tsp <= 16 ? 2 : tsp <= 40 ? 5 : 10;
      const T0 = Math.floor(dlo / tst) * tst - tst;
      let T1 = Math.ceil(dhi / tst) * tst + tst;
      if (T1 - T0 < tst * 4) T1 = T0 + tst * 4;
      const yT = t => 190 - (t - T0) / (T1 - T0) * 165;
      let g = "";
      for (let t = T0, n = 0; t <= T1; t += tst, n++) g += `<line x1="38" y1="${yT(t)}" x2="516" y2="${yT(t)}" stroke="#c7d2de" stroke-width=".6" stroke-dasharray="${n % 2 === 0 ? "0" : "2 3"}"/><text x="32" y="${yT(t) + 3}" font-size="8.5" text-anchor="end" fill="#5d6b7a">${t}°</text>`;
      const th = W.days.map((x, i) => {
        const cx = 76 + i * 64;
        return `<rect x="${cx - 7}" y="18" width="14" height="194" rx="7" fill="#fff" stroke="#8796a8" stroke-width="1.2"/>
<rect class="gr" style="animation-delay:${i * 0.12}s" x="${cx - 3.5}" y="${yT(x.hi).toFixed(1)}" width="7" height="${(212 - yT(x.hi)).toFixed(1)}" fill="#d83b3b"/>
<circle cx="${cx}" cy="214" r="12" fill="#d83b3b" stroke="#8796a8" stroke-width="1.2"/>
<line x1="${cx - 12}" y1="${yT(x.lo)}" x2="${cx - 4}" y2="${yT(x.lo)}" stroke="#2f7fd1" stroke-width="2.5"/>
<text x="${cx - 14}" y="${yT(x.lo) + 3}" font-size="9" text-anchor="end" fill="#2f7fd1">${x.lo}</text>
<text x="${cx + 10}" y="${yT(x.hi) + 3}" font-size="10" font-weight="700" fill="#b52a2a">${x.hi}°C</text>
<text x="${cx}" y="244" font-size="11" font-weight="700" text-anchor="middle" fill="#1d2733">${x.name}</text>
<text x="${cx}" y="258" font-size="9" text-anchor="middle" fill="#1d2733">${x.icon} ${x.desc}</text>
<text x="${cx}" y="271" font-size="9" text-anchor="middle" fill="#2f7fd1">rain ${x.pop}%</text>`;
      }).join("");
      // rain test tubes
      const mmax = Math.max(0, ...W.rain24.map(r => num(r.mm, 0))), MX = Math.max(1, mmax * 1.1), mst = nice(MX / 3), H = 80, top = 18;
      const tubes = W.rain24.map((r, i) => {
        const x = 38 + i * 40, h = num(r.mm, 0) / MX * H;
        let grad = "";
        for (let k = 1; k * mst < MX; k++) { const y = top + H - k * mst / MX * H; grad += `<line x1="${x}" y1="${y}" x2="${x + 6}" y2="${y}" stroke="#8796a8" stroke-width=".8"/>`; }
        return `<path d="M${x},${top} V${top + H} a11,11 0 0,0 22,0 V${top}" fill="#fff" stroke="#8796a8" stroke-width="1.2"/>
${h > 0 ? `<path class="gr" style="animation-delay:${0.4 + i * 0.06}s" d="M${x + 1.5},${(top + H - h).toFixed(1)} V${top + H} a9.5,9.5 0 0,0 19,0 V${(top + H - h).toFixed(1)} Z" fill="#4f9ae6" opacity=".85"/>` : ""}${grad}
<text x="${x + 11}" y="${(top + H - h - 4).toFixed(1)}" font-size="8.5" text-anchor="middle" fill="#1d4f86">${r.mm.toFixed(1)}</text>
<text x="${x + 11}" y="${top + H + 26}" font-size="9.5" font-weight="700" text-anchor="middle" fill="#1d2733">${hrS(r.hour)}</text>
<text x="${x + 11}" y="${top + H + 38}" font-size="8.5" text-anchor="middle" fill="#5d6b7a">${r.prob}%</text>`;
      }).join("");
      const scale = [1, 2, 3, 4].filter(k => k * mst < MX).map(k => `<text x="30" y="${top + H - k * mst / MX * H + 3}" font-size="8" text-anchor="end" fill="#5d6b7a">${+(k * mst).toFixed(2)}mm</text>`).join("");
      return `<div class="d20">
<div class="tag"><div class="t">${W.now.tempC}°C</div><div class="m"><div class="k">Specimen · ${W.place} · ${W.localTime}</div>${W.now.icon} ${W.now.desc}, feels like ${W.now.feelsC}°C<br>${W.date}</div></div>
<h3>Rain gauges · next 24 h (mm per 2 h · chance)</h3>
<svg viewBox="0 0 520 142">${scale}${tubes}</svg>
<div class="sum">${W.rainSummary}</div>
<h3>Thermometers · 7 days (high in red, low tick in blue)</h3>
<svg viewBox="0 0 520 278">${g}${th}</svg>
<div class="rd">
 <div><span>Humidity</span>${d.humidity}%</div><div><span>Wind</span>${d.windKmh} km/h ${d.windDir}</div><div><span>Gusts</span>${d.gustKmh} km/h</div>
 <div><span>UV index</span>${d.uv} ${uvTxt(d.uv).toLowerCase()}</div><div><span>Cloud cover</span>${d.cloud}%</div><div><span>Dew point</span>${d.dewC}°C</div>
 <div><span>Sunrise</span>${d.sunrise}</div><div><span>Sunset</span>${d.sunset}</div><div><span>Pressure</span>${d.pressureHpa} hPa</div>
</div>
</div>`;
    }
  });
})();
