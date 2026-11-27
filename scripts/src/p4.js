// Family: typography and layout-led. Variants 31-40.
(function () {
  const FAM = "typography and layout-led";
  const hr = (h) => (h === 0 ? "12 AM" : h < 12 ? h + " AM" : h === 12 ? "12 PM" : h - 12 + " PM");
  const hr24 = (h) => String(h).padStart(2, "0") + "00";
  const peak = (W) => W.rain24.reduce((a, b) => (b.prob > a.prob ? b : a), W.rain24[0] || { hour: W.hour24 || 0, prob: 0, mm: 0 });
  const wettest = (W) => W.days.reduce((a, b) => (b.pop > a.pop ? b : a), W.days[0]);
  const nm = (x) => x.nameLong || x.name;
  const uvWord = (u) => (u <= 2 ? "low" : u <= 5 ? "moderate" : u <= 7 ? "high" : u <= 10 ? "very high" : "extreme");
  const beaufort = (k) => { const i = [1, 5, 11, 19, 28, 38, 49, 61, 74, 88, 102, 117].findIndex((x) => k <= x); return i < 0 ? 12 : i; };
  const mmMax = (W) => Math.max(0.1, ...W.rain24.map((r) => r.mm || 0));
  const dirWord = { N: "North", NE: "Northeast", E: "East", SE: "Southeast", S: "South", SW: "Southwest", W: "West", NW: "Northwest" };  const sum = (a) => a.reduce((s, x) => s + x, 0);

  // 31 ---------------------------------------------------------------- Front page
  V.push({
    id: "31",
    name: "Front Page",
    family: FAM,
    blurb: "The forecast as a broadsheet front page: blackletter masthead, a headline written from the rain data, a lede column and the week set like a market-prices table. Inspired by the little weather 'ear' on newspaper front pages (Design Observer) and newspaper grid handbooks.",
    pro: "Instantly familiar reading order; pure HTML/CSS.",
    con: "Dense; small serif text is hard on phones.",
    level: "simple",
    css: `
.d31{background:#f3efe4;color:#151515;font-family:Georgia,"Times New Roman",serif;padding:22px 24px 20px;box-sizing:border-box;width:100%;max-width:560px}
.d31 .mast{text-align:center;font-family:"Old English Text MT","UnifrakturMaguntia",Georgia,serif;font-size:44px;line-height:1;letter-spacing:.5px;margin:0}
.d31 .dl{display:flex;justify-content:space-between;border-top:3px double #151515;border-bottom:1px solid #151515;margin-top:8px;padding:4px 0;font-size:11px;text-transform:uppercase;letter-spacing:1px}
.d31 h2{font-size:30px;line-height:1.05;margin:14px 0 6px;font-weight:700;letter-spacing:-.5px}
.d31 .deck{font-style:italic;font-size:15px;margin:0 0 12px;color:#333}
.d31 .cols{display:grid;grid-template-columns:1fr 1.15fr;gap:0 18px}
.d31 .cols>div{min-width:0}
.d31 .c1{border-right:1px solid #999;padding-right:18px}
.d31 .big{font-size:64px;font-weight:700;line-height:.9;letter-spacing:-2px}
.d31 .cap{font-size:13px;margin:4px 0 10px}
.d31 p{font-size:13px;line-height:1.45;margin:0 0 8px;text-align:justify;hyphens:auto}
.d31 p.drop::first-letter{float:left;font-size:38px;line-height:.85;padding:3px 4px 0 0;font-weight:700}
.d31 .sh{font-size:11px;text-transform:uppercase;letter-spacing:1.5px;border-bottom:1px solid #151515;padding-bottom:2px;margin:0 0 4px;font-weight:700}
.d31 table{width:100%;border-collapse:collapse;font-size:12.5px}
.d31 td{padding:3px 2px;border-bottom:1px dotted #888;white-space:nowrap}
.d31 td:nth-child(2){white-space:normal}
.d31 .mast{overflow-wrap:anywhere}
.d31 .dl{gap:2px 10px;flex-wrap:wrap}
.d31 td.n{text-align:right;font-variant-numeric:tabular-nums}
.d31 td.d{font-weight:700}
.d31 .hrs{font-size:12px;font-variant-numeric:tabular-nums;columns:2;column-gap:12px;margin:0 0 6px}
.d31 .hrs span{display:block;border-bottom:1px dotted #aaa;white-space:nowrap;font-size:11px}
.d31 .hrs b{display:inline-block;width:40px}
.d31 .brief{margin-top:12px;border-top:3px double #151515;padding-top:6px;display:grid;grid-template-columns:repeat(3,1fr);gap:4px 14px;font-size:12px}
.d31 .brief b{text-transform:uppercase;font-size:10px;letter-spacing:1px;display:block;color:#555}
@media (max-width:420px){.d31 .cols{grid-template-columns:1fr}.d31 .c1{border-right:0;padding-right:0}}
`,
    render: (W) => {
      const p = peak(W), wd = wettest(W), d = W.details;
      return `<div class="d31">
<h1 class="mast">The ${W.cityName || W.place.split(",")[0]} Weather Gazette</h1>
<div class="dl"><span>${W.date}</span><span>Late edition, ${W.localTime}</span><span>${W.place}</span></div>
<h2>${p.prob >= 40 ? `Rain likely around ${hr(p.hour)}` : "Dry spell holds for the next 24 hours"}; ${wd.pop >= 30 ? `${nm(wd)} the wettest day of the week` : "little rain on the week's horizon"}</h2>
<p class="deck">${W.rainSummary}</p>
<div class="cols">
 <div class="c1">
  <div class="big">${W.now.tempC}°C</div>
  <div class="cap">${W.now.icon} ${W.now.desc}. Feels like ${W.now.feelsC}°C.</div>
  <p class="drop">${W.isNight ? "Tonight" : "Today"} in ${W.cityName || W.place.split(",")[0]} is ${W.now.desc.toLowerCase()} at ${W.now.tempC}°C, with a ${d.windDir} breeze at ${d.windKmh} km/h. Forecasters put the chance of rain at ${W.rain24[0].prob}% now${p.prob > W.rain24[0].prob ? `, rising to ${p.prob}% by ${hr(p.hour)}` : ""}.</p>
  <div class="sh">Rain, next 24 hours</div>
  <div class="hrs">${W.rain24.map((r) => `<span><b>${hr(r.hour)}</b> ${r.prob}% · ${r.mm.toFixed(1)} mm</span>`).join("")}</div>
 </div>
 <div>
  <div class="sh">The week ahead</div>
  <table>${W.days.map((x) => `<tr><td class="d">${x.name}</td><td>${x.icon} ${x.desc}</td><td class="n">${x.lo}°/${x.hi}°C</td><td class="n">${x.pop}% rain</td></tr>`).join("")}</table>
  <p style="margin-top:8px">${wd.pop >= 30 ? `Markets in umbrellas expected to peak ${nm(wd)} (${wd.pop}%, ${wd.mm} mm).` : `Umbrella markets stay quiet all week (at most ${wd.pop}%).`} Highs this week reach ${Math.max(...W.days.map((x) => x.hi))}°C, lows dip to ${Math.min(...W.days.map((x) => x.lo))}°C.</p>
 </div>
</div>
<div class="brief">
 <div><b>Humidity</b>${d.humidity}%</div>
 <div><b>Wind</b>${d.windDir} ${d.windKmh} km/h, gusts ${d.gustKmh}</div>
 <div><b>UV index</b>${d.uv}, ${uvWord(d.uv)}</div>
 <div><b>Cloud cover</b>${d.cloud}%</div>
 <div><b>Sunrise</b>${d.sunrise}</div>
 <div><b>Sunset</b>${d.sunset}</div>
</div>
</div>`;
    },
  });

  // 32 ---------------------------------------------------------------- Plain sentences
  V.push({
    id: "32",
    name: "Said Plainly",
    family: FAM,
    blurb: "No widgets at all: the forecast is a few paragraphs of large, generous prose with the numbers set in a heavier weight and coloured. From the 'words over numbers' typographic weather apps featured on Creative Bloq and Dribbble.",
    pro: "Reads like a friend telling you; accessible and tiny.",
    con: "Slower to scan for a single number.",
    level: "simple",
    css: `
.d32{background:#fbfaf6;color:#2a2a28;font-family:"Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif;padding:34px 36px 30px;box-sizing:border-box;width:100%;max-width:560px}
.d32 .k{font-family:-apple-system,"Helvetica Neue",Arial,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8a8577;margin-bottom:18px}
.d32 p{font-size:21px;line-height:1.5;margin:0 0 18px}
.d32 p.lead{font-size:30px;line-height:1.25;letter-spacing:-.3px}
.d32 b{font-weight:700;color:#b5452b}
.d32 em{font-style:normal;font-weight:700;color:#2d5b8c}
.d32 .wk{font-size:18px;line-height:1.65}
.d32 .wk span{white-space:nowrap}
.d32 .k{overflow-wrap:anywhere}
.d32 .sm{font-size:16px;color:#55524a;border-top:1px solid #e3dfd3;padding-top:14px;margin:0}
`,
    render: (W) => {
      const p = peak(W), d = W.details, wd = wettest(W);
      const first = W.rain24.find((r) => r.prob >= 50), last = W.rain24[W.rain24.length - 1] || p;
      const rainTxt = first
        ? `The chance of rain is ${W.rain24[0].prob}% now, passes <em>${first.prob}%</em> at ${hr(first.hour)}, tops out at <em>${p.prob}% around ${hr(p.hour)}</em> and drops to ${last.prob}% by ${hr(last.hour)}.`
        : `The chance of rain is ${W.rain24[0].prob}% now and never climbs past <em>${p.prob}%</em> in the next 24 hours.`;
      const dayTxt = W.days.slice(1).map((x) => `<span><strong>${nm(x)}</strong> ${x.icon} ${x.desc.toLowerCase()}, ${x.lo}–${x.hi}°C, ${x.pop >= 50 ? `<em>${x.pop}% chance of rain</em>` : `${x.pop}% chance of rain`}</span>`).join("; ");
      return `<div class="d32">
<div class="k">${W.place} · ${W.date} · ${W.localTime}</div>
<p class="lead">It's <b>${W.now.tempC}°C</b> and ${W.now.icon} ${W.now.desc.toLowerCase()} right now. It feels more like <b>${W.now.feelsC}°C</b>.</p>
<p>${W.rainSummary} ${rainTxt}</p>
<p class="wk">Today tops out at <b>${W.days[0].hi}°C</b> (low ${W.days[0].lo}°C, ${W.days[0].pop}% rain)${dayTxt ? `. Then: ${dayTxt}` : ""}. ${wd.pop >= 30 ? `${nm(wd)} is the one to plan around.` : "Nothing wet to plan around."}</p>
<p class="sm">Humidity is ${d.humidity}%, the wind is from the ${d.windDir} at ${d.windKmh} km/h (gusts ${d.gustKmh}), UV is ${d.uv} (${uvWord(d.uv)}) and ${d.cloud}% of the sky is cloud. Sunrise is at ${d.sunrise} and sunset at ${d.sunset}.</p>
</div>`;
    },
  });

  // 33 ---------------------------------------------------------------- Departures board
  const flap = (s, n, delay) => {
    s = String(s).toUpperCase().slice(0, n).padEnd(n, " ");
    return [...s].map((c, i) => `<i style="animation-delay:${(delay + i * 0.035).toFixed(2)}s">${c === " " ? "&nbsp;" : c}</i>`).join("");
  };
  V.push({
    id: "33",
    name: "Departures Board",
    family: FAM,
    blurb: "The week as a station departures board: every character is a split-flap tile that flips into place, remarks like 'TAKE UMBRELLA' are derived from rain chance, and the details run along a scrolling ticker. From split-flap boards and timetable typography.",
    pro: "Memorable, playful and still a strict table.",
    con: "All-caps mono is slower to read; animation adds weight.",
    level: "rich",
    css: `
.d33{background:#141414;color:#ffc93c;font-family:"SF Mono",Menlo,Consolas,monospace;padding:18px 16px 14px;box-sizing:border-box;width:100%;max-width:560px;overflow:hidden}
.d33 .top{display:flex;justify-content:space-between;align-items:baseline;color:#f4f4f4;font-family:-apple-system,"Helvetica Neue",Arial,sans-serif;font-weight:700;letter-spacing:3px;font-size:13px;border-bottom:2px solid #ffc93c;padding-bottom:8px}
.d33 .top .clk{font-family:"SF Mono",Menlo,monospace;color:#ffc93c;font-size:20px;letter-spacing:1px}
.d33 .now{margin:12px 0 4px;display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.d33 .now .ic{font-size:26px}
.d33 .row{display:flex;align-items:center;gap:6px;margin:3px 0;white-space:nowrap}
.d33 i{font-style:normal;display:inline-block;width:11px;height:19px;line-height:19px;text-align:center;font-size:13px;background:#262626;margin-right:1px;border-radius:2px;position:relative;box-shadow:inset 0 -9.5px 0 #222,inset 0 1px 0 #333;animation:d33-flip .45s ease-out both}
.d33 i::after{content:"";position:absolute;left:0;right:0;top:9px;height:1px;background:#0b0b0b}
.d33 .big i{width:22px;height:34px;line-height:34px;font-size:26px;box-shadow:inset 0 -17px 0 #222}
.d33 .big i::after{top:17px}
.d33 .hd{color:#9a9a9a;font-size:10px;letter-spacing:1px;margin-top:12px}
.d33 .hd span{display:inline-block}
.d33 .em{width:20px;text-align:center;font-size:14px}
.d33 .w5{width:61px}.d33 .w12{width:126px}.d33 .w5b{width:90px}.d33 .w3{width:37px}
.d33 .top>span:first-child{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-right:10px}
.d33 .top .clk{white-space:nowrap}
.d33 .rem i{color:#7dff9a}
.d33 .rem.wet i{color:#ff7b5c}
.d33 .arr{display:grid;grid-template-columns:repeat(12,1fr);gap:3px;margin-top:6px}
.d33 .arr div{background:#1e1e1e;border-radius:2px;padding:4px 0 3px;text-align:center;font-size:10px;color:#cfcfcf}
.d33 .arr b{display:block;color:#ffc93c;font-size:13px}
.d33 .arr .bar{height:24px;display:flex;align-items:flex-end;justify-content:center;margin:2px 0}
.d33 .arr .bar span{width:8px;background:#4da3ff;border-radius:1px}
.d33 .sum{color:#e9e9e9;font-size:11.5px;margin:6px 0 0;font-family:-apple-system,"Helvetica Neue",Arial,sans-serif}
.d33 .tick{margin-top:12px;border-top:1px solid #333;border-bottom:1px solid #333;overflow:hidden;white-space:nowrap;padding:6px 0;color:#f4f4f4;font-size:12px}
.d33 .tick div{display:inline-block;animation:d33-tick 28s linear infinite}
.d33 .tick span{padding-right:40px}
@keyframes d33-flip{0%{transform:rotateX(90deg);color:transparent}60%{transform:rotateX(-20deg)}100%{transform:rotateX(0)}}
@keyframes d33-tick{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@media (prefers-reduced-motion: reduce){.d33 *{animation:none !important}.d33 .tick{white-space:normal}.d33 .tick span+span{display:none}}
@media (max-width:420px){.d33 .w12{width:100px}}
`,
    render: (W) => {
      const d = W.details;
      const rem = (x) => (x.pop >= 60 ? "TAKE UMBRELLA" : x.pop >= 30 ? "MAYBE RAIN" : "ON TIME");
      const rows = W.days.map((x, k) => `<div class="row"><span>${flap(x.name, 5, 0.3 + k * 0.12)}</span><span class="em">${x.icon}</span><span>${flap(x.desc, 10, 0.35 + k * 0.12)}</span><span>${flap(x.lo + "/" + x.hi, 7, 0.4 + k * 0.12)}</span><span>${flap(x.pop + "%", 4, 0.45 + k * 0.12)}</span><span class="rem${x.pop >= 60 ? " wet" : ""}">${flap(rem(x), 13, 0.5 + k * 0.12)}</span></div>`).join("");
      const tk = `HUMIDITY ${d.humidity}% &nbsp;·&nbsp; WIND ${d.windDir} ${d.windKmh} KM/H, GUSTS ${d.gustKmh} &nbsp;·&nbsp; UV ${d.uv} ${uvWord(d.uv).toUpperCase()} &nbsp;·&nbsp; CLOUD ${d.cloud}% &nbsp;·&nbsp; SUNRISE ${d.sunrise} &nbsp;·&nbsp; SUNSET ${d.sunset} &nbsp;·&nbsp; PRESSURE ${d.pressureHpa} HPA &nbsp;·&nbsp; VISIBILITY ${d.visibilityKm} KM`;
      return `<div class="d33">
<div class="top"><span>DEPARTURES · ${W.place.toUpperCase()}</span><span class="clk">${W.localTime}</span></div>
<div class="now"><span class="row big">${flap(W.now.tempC + "°C", 5, 0)}</span><span class="ic">${W.now.icon}</span><span><span class="row">${flap(W.now.desc, 13, 0.1)}</span><span class="row">${flap("FEELS " + W.now.feelsC + "°C", 13, 0.2)}</span></span></div>
<div class="hd"><span class="w5">DAY</span><span style="width:26px"></span><span class="w12" style="width:132px">SKY</span><span class="w5b">LO/HI °C</span><span class="w3" style="width:52px">RAIN</span><span>REMARKS</span></div>
${rows}
<div class="hd">ARRIVALS: RAIN, NEXT 24 HOURS (CHANCE %, BAR = MM)</div>
<div class="arr">${W.rain24.map((r) => `<div>${hr(r.hour).replace(" ", "")}<div class="bar"><span style="height:${Math.max(1, Math.min(24, Math.round(((r.mm || 0) / mmMax(W)) * 24)))}px"></span></div><b>${r.prob}</b>${r.mm.toFixed(1)}</div>`).join("")}</div>
<p class="sum">${W.rainSummary}</p>
<div class="tick"><div><span>${tk}</span><span>${tk}</span></div></div>
</div>`;
    },
  });

  // 34 ---------------------------------------------------------------- Dictionary entry
  V.push({
    id: "34",
    name: "Dictionary Entry",
    family: FAM,
    blurb: "Tonight's weather defined like a word in a dictionary: headword, pronunciation, numbered senses for now / tonight / this week, usage example and an etymology line for sunrise and sunset. Typography carries everything: small caps, italics, bold sense numbers.",
    pro: "Witty and very cheap to build; all text.",
    con: "The joke may wear thin with daily use.",
    level: "simple",
    css: `
.d34{background:#fffefa;color:#1d1b18;font-family:"Hoefler Text","Baskerville","Book Antiqua",Georgia,serif;padding:20px 30px 26px;box-sizing:border-box;width:100%;max-width:560px}
.d34 .gw{display:flex;justify-content:space-between;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#7b746a;border-bottom:1px solid #d9d3c7;padding-bottom:6px;margin-bottom:18px}
.d34 .hw{font-size:40px;font-weight:700;letter-spacing:-.5px;line-height:1;overflow-wrap:anywhere}
.d34 .gw{gap:4px 12px;flex-wrap:wrap}
.d34 .wk span{min-width:0;overflow-wrap:anywhere}
.d34 .pr{font-size:16px;color:#6a6358;margin:4px 0 2px}
.d34 .pos{font-style:italic;color:#8b2e2e;font-size:16px}
.d34 ol{margin:14px 0 0;padding:0;list-style:none;counter-reset:s}
.d34 li{counter-increment:s;position:relative;padding-left:30px;margin-bottom:12px;font-size:15.5px;line-height:1.5}
.d34 li::before{content:counter(s);position:absolute;left:0;top:-1px;font-weight:700;font-size:18px;font-family:-apple-system,"Helvetica Neue",Arial,sans-serif}
.d34 .lab{font-variant:small-caps;letter-spacing:.5px;color:#8b2e2e}
.d34 .ex{font-style:italic;color:#555;display:block;margin-top:2px}
.d34 .sub{display:block;font-size:13.5px;margin-top:3px;color:#333;font-variant-numeric:tabular-nums}
.d34 .wk{display:grid;grid-template-columns:auto 1fr auto auto;gap:1px 12px;font-size:14px;margin-top:4px}
.d34 .wk span:nth-child(4n+1){font-weight:700}
.d34 .wk span:nth-child(4n+3),.d34 .wk span:nth-child(4n){text-align:right;font-variant-numeric:tabular-nums}
.d34 .et{border-top:1px solid #d9d3c7;padding-top:10px;margin-top:6px;font-size:14px;line-height:1.55}
.d34 .et b{font-variant:small-caps;font-weight:400;letter-spacing:1px;color:#8b2e2e}
`,
    render: (W) => {
      const d = W.details, p = peak(W);
      const town = W.cityName || W.place.split(",")[0];
      return `<div class="d34">
<div class="gw"><span>${town.toLowerCase()} weather</span><span>${W.date}</span><span>${W.localTime}</span></div>
<div class="hw">${town} weath·er</div>
<div class="pr">/ˈwɛð.ər/ &nbsp;<span class="pos">noun</span>, <span class="pos">${W.place}</span></div>
<ol>
 <li><span class="lab">(now)</span> ${W.isNight ? "A night" : "A day"} of <b>${W.now.tempC}°C</b>, ${W.now.icon} ${W.now.desc.toLowerCase()}, that feels like ${W.now.feelsC}°C.
  <span class="ex">"the air at ${W.localTime} was ${W.now.feelsC}°C to the skin."</span></li>
 <li><span class="lab">(next 24 hours, informal)</span> ${W.rainSummary}
  <span class="sub">${W.rain24.map((r) => `${hr(r.hour)} ${r.prob}%`).join(" · ")}</span>
  <span class="ex">${p.prob >= 5 ? `"by ${hr(p.hour)} it had a ${p.prob}% chance of being wet."` : `"it stayed dry throughout."`}</span></li>
 <li><span class="lab">(this week)</span> A seven-day run of weather:
  <div class="wk">${W.days.map((x) => `<span>${x.name}</span><span>${x.icon} ${x.desc}</span><span>${x.lo}–${x.hi}°C</span><span>${x.pop}% rain</span>`).join("")}</div></li>
 <li><span class="lab">(of the air)</span> Humidity ${d.humidity}%, stirred by a ${d.windDir} wind of ${d.windKmh} km/h gusting ${d.gustKmh}; ${d.cloud}% cloud; UV ${d.uv}, ${uvWord(d.uv)}.</li>
</ol>
<div class="et"><b>Etymology</b>: from the sunrise at <b>${d.sunrise}</b> and the sunset at <b>${d.sunset}</b>. <b>See also</b>: pressure (${d.pressureHpa} hPa), dew point (${d.dewC}°C), visibility (${d.visibilityKm} km).</div>
</div>`;
    },
  });

  // 35 ---------------------------------------------------------------- Swiss poster
  V.push({
    id: "35",
    name: "Swiss Poster",
    family: FAM,
    blurb: "International Typographic Style: a strict grid, flush-left Helvetica, one red, a giant temperature, rain chances as black columns and the next 24 hours of temperature as a single thick red line. From the Swiss Grid archive (Poster House) and Müller-Brockmann's posters.",
    pro: "Bold and calm; the grid makes every number easy to find.",
    con: "Austere; colour carries little meaning beyond red.",
    level: "medium",
    css: `
.d35{background:#efeee9;color:#111;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;padding:22px;box-sizing:border-box;width:100%;max-width:560px;display:grid;grid-template-columns:repeat(6,1fr);gap:0 12px;position:relative}
.d35 .pl{grid-column:1/7;display:flex;justify-content:space-between;gap:2px 10px;flex-wrap:wrap;font-size:12px;font-weight:500;border-top:4px solid #111;padding-top:6px}
.d35 .t{grid-column:1/5;font-size:150px;font-weight:700;letter-spacing:-9px;line-height:.8;margin:14px 0 6px;color:#e30613}
.d35 .t small{font-size:46px;letter-spacing:-1px;vertical-align:top;line-height:1.4}
.d35 .cn{grid-column:5/7;align-self:end;font-size:14px;line-height:1.3;padding-bottom:10px}
.d35 .cn b{display:block;font-size:22px;line-height:1.05;margin-bottom:4px}
.d35 .lb{grid-column:1/7;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin:14px 0 4px;border-top:1px solid #111;padding-top:4px;display:flex;justify-content:space-between;gap:10px}
.d35 .lb span:last-child{font-weight:400;text-transform:none;letter-spacing:0;text-align:right}
.d35 .cn{min-width:0;overflow-wrap:anywhere}
.d35 .t{min-width:0;overflow:hidden}
.d35 .wk>*{min-width:0;overflow-wrap:anywhere}
.d35 .rn{grid-column:1/7;display:grid;grid-template-columns:repeat(12,1fr);gap:3px;align-items:end;height:84px}
.d35 .rn div{background:#111;position:relative}
.d35 .rn div span{position:absolute;top:-14px;left:0;font-size:10px;font-weight:700}
.d35 .hx{grid-column:1/7;display:grid;grid-template-columns:repeat(12,1fr);gap:3px;font-size:9.5px;margin-top:3px}
.d35 svg{grid-column:1/7;width:100%;height:60px;display:block}
.d35 .wk{grid-column:1/7;display:grid;grid-template-columns:44px 1fr 66px 1fr;gap:0 10px;font-size:13px;align-items:center}
.d35 .wk>*{padding:3px 0;border-bottom:1px solid #c9c8c1}
.d35 .wk .n{font-weight:700}
.d35 .wk .p{display:flex;align-items:center;gap:6px;font-variant-numeric:tabular-nums}
.d35 .wk .p i{display:block;height:8px;background:#e30613}
.d35 .dt{grid-column:1/7;display:grid;grid-template-columns:repeat(3,1fr);gap:10px 12px;margin-top:4px}
.d35 .dt div{font-size:10px;text-transform:uppercase;letter-spacing:1px;font-weight:500}
.d35 .dt b{display:block;font-size:22px;letter-spacing:-.5px;text-transform:none}
`,
    render: (W) => {
      const d = W.details, T = W.hourlyTempC;
      const mn = Math.min(...T), mx = Math.max(...T);
      const sp = mx - mn || 1, n1 = Math.max(1, T.length - 1);
      const pts = T.map((t, i) => `${((i / n1) * 512).toFixed(1)},${(mx === mn ? 30 : 52 - ((t - mn) / sp) * 44).toFixed(1)}`).join(" ");
      const iMx = T.indexOf(mx), iMn = T.indexOf(mn);
      return `<div class="d35">
<div class="pl"><span>${W.place}</span><span>${W.date}</span><span>${W.localTime}</span></div>
<div class="t">${W.now.tempC}<small>°C</small></div>
<div class="cn"><b>${W.now.icon} ${W.now.desc}</b>Feels like ${W.now.feelsC}°C</div>
<div class="lb"><span>Rain chance, next 24 h</span><span>${W.rainSummary}</span></div>
<div class="rn">${W.rain24.map((r) => `<div style="height:${Math.max(2, r.prob * 0.7)}px"><span>${r.prob}</span></div>`).join("")}</div>
<div class="hx">${W.rain24.map((r) => `<span>${hr(r.hour)}</span>`).join("")}</div>
<div class="lb"><span>Temperature, next 24 h</span><span>${mx === mn ? `steady ${mn}°C` : `${mn}°C at ${hr((W.hour24 + iMn) % 24)} → ${mx}°C at ${hr((W.hour24 + iMx) % 24)}`}</span></div>
<svg viewBox="0 0 512 60" preserveAspectRatio="none"><polyline points="${pts}" fill="none" stroke="#e30613" stroke-width="5" stroke-linejoin="round" vector-effect="non-scaling-stroke"/></svg>
<div class="lb"><span>Seven days</span><span>low/high °C, rain chance</span></div>
<div class="wk">${W.days.map((x) => `<span class="n">${x.name}</span><span>${x.icon} ${x.desc}</span><span>${x.lo}/${x.hi}°C</span><span class="p"><i style="width:${Math.max(0, Math.min(100, x.pop))}%"></i>${x.pop}%</span>`).join("")}</div>
<div class="lb"><span>Details</span><span></span></div>
<div class="dt">
<div>Humidity<b>${d.humidity}%</b></div><div>Wind ${d.windDir}<b>${d.windKmh} km/h</b></div><div>UV index<b>${d.uv} ${uvWord(d.uv)}</b></div>
<div>Cloud<b>${d.cloud}%</b></div><div>Sunrise<b>${d.sunrise}</b></div><div>Sunset<b>${d.sunset}</b></div>
</div>
</div>`;
    },
  });

  // 36 ---------------------------------------------------------------- Huge numerals
  const wt = (v, lo, hi) => Math.max(100, Math.min(900, Math.round((100 + ((v - lo) / (hi - lo || 1)) * 800) / 100) * 100));
  V.push({
    id: "36",
    name: "Weighted Numerals",
    family: FAM,
    blurb: "Numbers are the whole design, and their weight is the data: rain chances get heavier as rain gets likelier, daily highs grow in size with heat, and the 24-hour temperature line is drawn in with numeral labels riding on it. Inspired by variable-font specimens and the Slanted 'weather through typography' exercise.",
    pro: "Striking and data-honest without a single icon chart.",
    con: "Weight differences are subtle with fonts that lack many weights.",
    level: "rich",
    css: `
.d36{background:#101010;color:#f1f1ec;font-family:-apple-system,"SF Pro Display","Helvetica Neue",Arial,sans-serif;padding:20px 22px;box-sizing:border-box;width:100%;max-width:560px}
.d36 .hd{display:flex;justify-content:space-between;gap:2px 10px;flex-wrap:wrap;font-size:12px;color:#9a9a92;letter-spacing:.5px}
.d36 .hero{display:flex;align-items:flex-end;gap:14px;margin:4px 0 6px}
.d36 .hero .n{font-size:170px;font-weight:800;line-height:.82;letter-spacing:-10px;color:#c8ff3a;animation:d36-rise .7s ease-out both}
.d36 .hero .u{font-size:30px;font-weight:300;align-self:flex-start;margin-top:8px}
.d36 .hero .s{font-size:15px;line-height:1.35;padding-bottom:8px}
.d36 .hero .s b{font-size:46px;font-weight:200;display:block;line-height:1}
.d36 .lb{font-size:10px;text-transform:uppercase;letter-spacing:2px;color:#8a8a82;margin:14px 0 4px;display:flex;justify-content:space-between;gap:10px}
.d36 .lb span:last-child{text-transform:none;letter-spacing:0;color:#cfcfc8;text-align:right}
.d36 .rn{display:grid;grid-template-columns:repeat(12,1fr);text-align:center}
.d36 .rn b{display:block;font-size:27px;line-height:1.05;color:#7cc3ff;animation:d36-rise .6s ease-out both;font-variant-numeric:tabular-nums}
.d36 .rn span{font-size:9.5px;color:#8a8a82}
.d36 svg{display:block;width:100%;height:auto}
.d36 svg path{stroke-dasharray:1200;stroke-dashoffset:1200;animation:d36-draw 2s .3s ease-out forwards}
.d36 .wk{display:grid;grid-template-columns:repeat(7,1fr);align-items:end;text-align:center;gap:2px}
.d36 .wk .hi{font-weight:700;line-height:.9;letter-spacing:-2px;animation:d36-rise .6s ease-out both}
.d36 .wk .lo{font-size:15px;font-weight:300;color:#9a9a92}
.d36 .wk .nm{font-size:12px;font-weight:700;margin-top:4px}
.d36 .wk>div{min-width:0;overflow-wrap:anywhere}
.d36 .wk .ds{font-size:10px;color:#cfcfc8;line-height:1.2;min-height:24px}
.d36 .wk .pp{font-size:11px;color:#7cc3ff}
.d36 .dt{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:12px;border-top:1px solid #2a2a2a;padding-top:10px}
.d36 .dt div{font-size:10px;color:#8a8a82;text-transform:uppercase;letter-spacing:1px}
.d36 .dt b{display:block;font-size:26px;font-weight:200;color:#f1f1ec;letter-spacing:-.5px;text-transform:none}
@keyframes d36-rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
@keyframes d36-draw{to{stroke-dashoffset:0}}
@media (prefers-reduced-motion: reduce){.d36 *{animation:none !important}.d36 svg path{stroke-dashoffset:0}}
@media (max-width:420px){.d36 .hero .n{font-size:120px}.d36 .rn b{font-size:18px}}
`,
    render: (W) => {
      const d = W.details, T = W.hourlyTempC;
      const mn = Math.min(...T), mx = Math.max(...T);
      const iMx = T.indexOf(mx), n1 = Math.max(1, T.length - 1), sp = mx - mn || 1;
      const X = (i) => 10 + (i / n1) * 496, Y = (t) => (mx === mn ? 50 : 78 - ((t - mn) / sp) * 56);
      const path = "M" + T.map((t, i) => `${X(i).toFixed(1)} ${Y(t).toFixed(1)}`).join(" L");
      const pMax = Math.max(1, ...W.rain24.map((r) => r.prob)), dMax = Math.max(1, ...W.days.map((x) => x.pop));
      const labels = T.map((t, i) => (i % 3 === 0 || i === iMx ?`<text x="${X(i).toFixed(1)}" y="${(Y(t) - 7).toFixed(1)}" font-size="${i === iMx && mx !== mn ? 15 : 11}" font-weight="${wt(t, mn, mx)}" fill="#f1f1ec" text-anchor="middle">${t}°</text><text x="${X(i).toFixed(1)}" y="96" font-size="9" fill="#8a8a82" text-anchor="middle">${i % 3 === 0 ? hr((W.hour24 + i) % 24) : ""}</text>` : "")).join("");
      const his = W.days.map((x) => x.hi), hmn = Math.min(...his), hmx = Math.max(...his);
      return `<div class="d36">
<div class="hd"><span>${W.place}</span><span>${W.date}, ${W.localTime}</span></div>
<div class="hero"><span class="n">${W.now.tempC}</span><span class="u">°C</span><span class="s"><b>${W.now.feelsC}°</b>feels like<br>${W.now.icon} ${W.now.desc}</span></div>
<div class="lb"><span>Rain chance %, weight = likelihood</span><span>${W.rainSummary}</span></div>
<div class="rn">${W.rain24.map((r, i) => `<div><b style="font-weight:${wt(r.prob, 0, pMax)};opacity:${Math.min(1, 0.45 + r.prob / 165).toFixed(2)};animation-delay:${(i * 0.05).toFixed(2)}s">${r.prob}</b><span>${hr(r.hour)}</span></div>`).join("")}</div>
<div class="lb"><span>Temperature, next 24 h</span><span>${mn}° to ${mx}°C</span></div>
<svg viewBox="0 0 516 100"><path d="${path}" fill="none" stroke="#c8ff3a" stroke-width="2"/>${labels}</svg>
<div class="lb"><span>Seven days, size = high</span><span>low below, rain chance</span></div>
<div class="wk">${W.days.map((x, i) => `<div><div class="hi" style="font-size:${Math.round(26 + ((x.hi - hmn) / (hmx - hmn || 1)) * 18)}px;animation-delay:${(0.4 + i * 0.06).toFixed(2)}s">${x.hi}°</div><div class="lo">${x.lo}°</div><div class="nm">${x.name}</div><div class="ds">${x.icon} ${x.desc}</div><div class="pp" style="font-weight:${wt(x.pop, 0, dMax)}">${x.pop}% rain</div></div>`).join("")}</div>
<div class="dt">
<div>Humidity<b>${d.humidity}%</b></div><div>Wind ${d.windDir}<b>${d.windKmh} km/h</b></div><div>UV<b>${d.uv} ${uvWord(d.uv)}</b></div>
<div>Cloud<b>${d.cloud}%</b></div><div>Sunrise<b>${d.sunrise}</b></div><div>Sunset<b>${d.sunset}</b></div>
</div>
</div>`;
    },
  });

  // 37 ---------------------------------------------------------------- Legal pad
  V.push({
    id: "37",
    name: "Legal Pad",
    family: FAM,
    blurb: "A yellow legal pad with ruled lines and a red margin: the forecast written as a handwritten to-do list, with the rain peak circled, the wettest day underlined twice and the week jotted line by line. From notebook-style UI and handwritten list layouts on Dribbble.",
    pro: "Warm and personal; turns the forecast into actions.",
    con: "Relies on whichever handwriting font the system has.",
    level: "simple",
    css: `
.d37{--lh:28px;background:#fdf3a1;background-image:linear-gradient(90deg,transparent 52px,#e7766f 52px,#e7766f 54px,transparent 54px),repeating-linear-gradient(#fdf3a1 0,#fdf3a1 calc(var(--lh) - 1px),#9cc3dd calc(var(--lh) - 1px),#9cc3dd var(--lh));background-position:0 0,0 70px;color:#1f2a5a;font-family:"Bradley Hand","Segoe Print","Chalkboard SE","Comic Sans MS",cursive;font-size:17px;line-height:var(--lh);padding:14px 22px var(--lh) 66px;box-sizing:border-box;width:100%;max-width:560px;box-shadow:inset 0 14px 0 #b84a3a}
.d37 .h{font-size:24px;height:56px;line-height:56px;font-weight:700;padding-top:14px;box-sizing:content-box;margin-top:-14px}
.d37 .h small{font-size:15px;font-weight:400;margin-left:6px}
.d37 .h{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.d37 div{min-height:var(--lh)}
.d37 .bx::before{content:"☐ ";color:#555}
.d37 .ok::before{content:"☑ ";color:#2e7d32}
.d37 .big{font-size:26px;font-weight:700}
.d37 .c{border:2px solid #d0362b;border-radius:50%;padding:0 6px;margin:0 -2px}
.d37 .u2{text-decoration:underline double #d0362b;text-underline-offset:3px}
.d37 s{color:#7a7a7a}
.d37 .ind{padding-left:24px;font-size:15px}
.d37 .wk{display:grid;grid-template-columns:44px 142px 92px 1fr;padding-left:24px;font-size:16px}
.d37 .wk span{white-space:nowrap;overflow:hidden}
.d37 .note{color:#c0392b;font-size:15px}
`,
    render: (W) => {
      const d = W.details, p = peak(W), wd = wettest(W);
      const wet = p.prob >= 35;
      const hrs = W.rain24.filter((r) => r.prob >= 35).map((r) => (r === p ? `<span class="c">${hr(r.hour)} ${r.prob}%</span>` : `${hr(r.hour)} ${r.prob}%`)).join(", ");
      const pi = W.rain24.indexOf(p);
      const dry = W.rain24.find((r, i) => i > pi && r.prob <= 20);
      return `<div class="d37">
<div class="h">Weather, ${W.place}<small>${W.date}, ${W.localTime}</small></div>
<div class="ok">Now: <span class="big">${W.now.tempC}°C</span>, ${W.now.icon} ${W.now.desc.toLowerCase()} (feels like ${W.now.feelsC}°C)</div>
<div class="bx">${wet ? "Umbrella by the door!" : "No umbrella needed"}</div>
<div class="ind">${W.rainSummary}</div>
${wet ? `<div class="ind">${hrs}</div>` : ""}
${wet && dry ? `<div class="ind">dry again by ${hr(dry.hour)}</div>` : ""}
<div class="bx">The week:</div>
${W.days.map((x) => `<div class="wk"><span>${x.name}</span><span>${x.icon} ${x === wd && wd.pop >= 30 ? `<span class="u2">${x.desc}</span>` : x.desc}</span><span>${x.lo}–${x.hi}°C</span><span>${x.pop}% rain${x.pop >= 60 ? ' <span class="note">← !!</span>' : ""}</span></div>`).join("")}
<div class="bx">${d.uv >= 3 ? `<s>skip sunscreen</s> UV ${d.uv}, ${uvWord(d.uv)}: sunscreen if out ${W.isNight ? "tomorrow" : "today"}` : `UV ${d.uv}, ${uvWord(d.uv)}: no sunscreen needed`}</div>
<div class="ind">humidity ${d.humidity}% · wind ${d.windDir} ${d.windKmh} km/h (gusts ${d.gustKmh}) · cloud ${d.cloud}%</div>
<div class="ind">sunrise ${d.sunrise} · sunset ${d.sunset}</div>
</div>`;
    },
  });

  // 38 ---------------------------------------------------------------- Crossword
  V.push({
    id: "38",
    name: "Crossword",
    family: FAM,
    blurb: "A newspaper puzzle page: a small solved crossword whose answers (PUNE, PARTLY, RAIN, NW, YES) carry the headline facts in their clues, a rain strip where shaded squares darken with rain chance, and the week as a grid of numbered cells. From crossword and puzzle-page layouts in print.",
    pro: "Delightful to read; the grid shading is real data.",
    con: "Fixed word list must be regenerated for real conditions.",
    level: "medium",
    css: `
.d38{background:#fff;color:#111;font-family:"Franklin Gothic Medium","Helvetica Neue",Arial,sans-serif;padding:18px 20px;box-sizing:border-box;width:100%;max-width:560px}
.d38 .hd{display:flex;justify-content:space-between;align-items:baseline;border-bottom:3px solid #111;padding-bottom:4px;margin-bottom:12px}
.d38 .hd b{font-family:Georgia,serif;font-size:26px;font-style:italic}
.d38 .hd span{font-size:11px;text-transform:uppercase;letter-spacing:1px}
.d38 .hd{gap:2px 10px;flex-wrap:wrap}
.d38 .wk div{overflow-wrap:anywhere}
.d38 .top{display:grid;grid-template-columns:auto 1fr;gap:18px;align-items:start}
.d38 .g{display:grid;grid-template-columns:repeat(4,36px);grid-auto-rows:36px;border:2px solid #111}
.d38 .g div{border:1px solid #111;position:relative;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:700;font-family:Georgia,serif;animation:d38-in .4s ease-out both}
.d38 .g .x{background:#111}
.d38 .g sup{position:absolute;top:1px;left:2px;font-size:8.5px;font-family:Arial,sans-serif;font-weight:400}
.d38 .cl{font-size:13px;line-height:1.4;font-family:Georgia,serif}
.d38 .cl h4{font-family:"Franklin Gothic Medium",Arial,sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 2px}
.d38 .cl p{margin:0 0 4px}
.d38 .cl p b{font-family:Arial,sans-serif;margin-right:4px}
.d38 .cl .gap{margin-bottom:8px}
.d38 .lb{font-size:11px;text-transform:uppercase;letter-spacing:1.5px;margin:16px 0 4px;font-weight:700;display:flex;justify-content:space-between}
.d38 .lb span:last-child{text-transform:none;letter-spacing:0;font-weight:400;font-family:Georgia,serif;font-style:italic}
.d38 .rs{display:grid;grid-template-columns:repeat(12,1fr);border:2px solid #111}
.d38 .rs div{border:1px solid #111;height:40px;position:relative;font-size:11px;font-weight:700;display:flex;align-items:flex-end;justify-content:center;padding-bottom:2px}
.d38 .rs sup{position:absolute;top:1px;left:2px;font-size:8px;font-weight:400}
.d38 .wk{display:grid;grid-template-columns:repeat(7,1fr);border:2px solid #111}
.d38 .wk div{border:1px solid #111;padding:14px 3px 4px;position:relative;text-align:center;font-size:11px;line-height:1.3;min-width:0}
.d38 .wk sup{position:absolute;top:1px;left:3px;font-size:9px;font-weight:700}
.d38 .wk b{display:block;font-family:Georgia,serif;font-size:19px}
.d38 .wk .p{display:block;margin-top:3px;font-weight:700}
.d38 .dn{display:grid;grid-template-columns:1fr 1fr;gap:2px 16px;font-family:Georgia,serif;font-size:13px}
.d38 .dn b{font-family:Arial,sans-serif;margin-right:4px}
@keyframes d38-in{from{opacity:0}to{opacity:1}}
@media (prefers-reduced-motion: reduce){.d38 *{animation:none !important}}
@media (max-width:420px){.d38 .top{grid-template-columns:1fr}}
`,
    render: (W) => {
      const d = W.details, wd = wettest(W);
      const az = (s) => String(s).normalize("NFD").replace(/[^A-Za-z]/g, "").toUpperCase();
      const city = az(W.cityName || W.place.split(",")[0]) || "CITY";
      const w1 = city.slice(0, 4);
      const pk = peak(W), snowy = [71, 73, 75, 77, 85, 86].includes(W.now.code);
      const w2 = snowy ? "SNOW" : pk.prob >= 40 ? "RAIN" : W.now.code <= 1 ? "SUN" : "DRY";
      const w3 = wd.name === "Today" ? "NOW" : az(wd.name).slice(0, 4) || "DAY";
      const cells = {};
      [[0, w1], [2, w2], [4, w3]].forEach(([r, w], k) => [...w].forEach((ch, c) => { cells[r + "," + c] = c === 0 ? [ch, k + 1] : [ch]; }));
      let g = "";
      for (let r = 0; r < 5; r++) for (let c = 0; c < 4; c++) {
        const v = cells[r + "," + c];
        g += v ? `<div style="animation-delay:${((r * 4 + c) * 0.05).toFixed(2)}s">${v[1] ? `<sup>${v[1]}</sup>` : ""}${v[0]}</div>` : `<div class="x"></div>`;
      }
      return `<div class="d38">
<div class="hd"><b>The Weather Puzzle</b><span>${W.place} · ${W.date} · ${W.localTime}</span></div>
<div class="top">
 <div class="g">${g}</div>
 <div class="cl">
  <h4>Across</h4>
  <p><b>1</b>Where it's ${W.now.tempC}°C at ${W.localTime}, feeling like ${W.now.feelsC}°C (${city.length > 4 ? "first 4 of " + city.length : w1.length})</p>
  <p><b>2</b>${W.rainSummary} (${w2.length})</p>
  <p class="gap"><b>3</b>${wd.pop >= 30 ? `Umbrella for ${nm(wd)}?` : `Wettest day, if any: ${nm(wd)}.`} ${wd.icon} ${wd.desc}, ${wd.pop}% chance, ${wd.mm} mm (${w3.length})</p>
  <h4>Sky</h4>
  <p>${W.now.icon} ${W.now.desc} right now, with ${d.cloud}% cloud cover and a ${d.windDir} wind of ${d.windKmh} km/h, gusting ${d.gustKmh} km/h.</p>
 </div>
</div>
<div class="lb"><span>Rain strip, next 24 h</span><span>darker square = likelier rain, % shown</span></div>
<div class="rs">${W.rain24.map((r) => { const s = Math.max(20, Math.round(255 - r.prob * 2.3)); return `<div style="background:rgb(${s},${s},${s});color:${r.prob > 50 ? "#fff" : "#111"}"><sup>${hr(r.hour)}</sup>${r.prob}%</div>`; }).join("")}</div>
<div class="lb"><span>Seven days</span><span>low–high °C, chance of rain</span></div>
<div class="wk">${W.days.map((x, i) => `<div><sup>${i + 5}</sup>${x.name}<b>${x.hi}°</b>${x.lo}° low<br>${x.icon} ${x.desc}<span class="p">${x.pop}% rain</span></div>`).join("")}</div>
<div class="lb"><span>More clues</span><span>all °C, km/h</span></div>
<div class="dn">
 <span><b>12</b>Humidity: ${d.humidity}%</span><span><b>13</b>UV index: ${d.uv}, ${uvWord(d.uv)}</span>
 <span><b>14</b>Wind: ${d.windDir} ${d.windKmh} km/h</span><span><b>15</b>Cloud cover: ${d.cloud}%</span>
 <span><b>16</b>Sunrise: ${d.sunrise}</span><span><b>17</b>Sunset: ${d.sunset}</span>
</div>
</div>`;
    },
  });

  // 39 ---------------------------------------------------------------- Shipping forecast
  V.push({
    id: "39",
    name: "Shipping Forecast",
    family: FAM,
    blurb: "Written in the clipped cadence of the BBC Shipping Forecast: wind as a Beaufort force, visibility as 'good', a general synopsis from the rain summary and an outlook for the week, set as a radio script with a small compass rose showing where the wind blows from.",
    pro: "Poetic, compact language with a strong identity.",
    con: "Beaufort numbers need the km/h alongside to make sense.",
    level: "medium",
    css: `
.d39{background:#0d2238;color:#efe7d4;font-family:"Courier New",Courier,monospace;padding:22px 24px;box-sizing:border-box;width:100%;max-width:560px}
.d39 .air{display:flex;align-items:center;gap:8px;font-family:-apple-system,"Helvetica Neue",Arial,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9fb4c8}
.d39 .air i{width:8px;height:8px;border-radius:50%;background:#ff5f4a;animation:d39-p 1.6s ease-in-out infinite}
.d39 .air span:last-child{margin-left:auto}
.d39 .air{flex-wrap:wrap}
.d39 .main>div{min-width:0}
.d39 .ol span:nth-child(2){min-width:0;overflow-wrap:anywhere}
.d39 .in{font-family:Georgia,serif;font-style:italic;font-size:17px;line-height:1.45;margin:12px 0 14px;color:#d8cfbb}
.d39 .main{display:grid;grid-template-columns:1fr 120px;gap:14px;align-items:start}
.d39 .ar{overflow-wrap:anywhere;font-size:13px;letter-spacing:2px;color:#f2b84b;font-weight:700}
.d39 .fc{font-size:19px;line-height:1.45;margin:4px 0 0}
.d39 .fc b{color:#fff}
.d39 svg{width:120px;height:120px}
.d39 .cap{font-size:10.5px;text-align:center;color:#9fb4c8;font-family:-apple-system,Arial,sans-serif}
.d39 h5{font-size:12px;letter-spacing:2px;color:#f2b84b;margin:16px 0 4px;font-weight:700;border-top:1px dashed #36506b;padding-top:10px}
.d39 .sy{font-size:14px;line-height:1.5;margin:0}
.d39 .rw{display:grid;grid-template-columns:repeat(3,1fr);gap:1px 14px;font-size:12.5px;margin-top:6px}
.d39 .rw span b{color:#fff}
.d39 .ol{font-size:13.5px;line-height:1.55}
.d39 .ol div{display:grid;grid-template-columns:52px 1fr auto;gap:8px;border-bottom:1px dotted #2c4560}
.d39 .ol b{color:#f2b84b}
.d39 .ol span:last-child{text-align:right;white-space:nowrap}
@keyframes d39-p{50%{opacity:.25}}
@media (prefers-reduced-motion: reduce){.d39 *{animation:none !important}}
@media (max-width:420px){.d39 .main{grid-template-columns:1fr}}
`,
    render: (W) => {
      const d = W.details, f = beaufort(d.windKmh), gf = beaufort(d.gustKmh);
      const vis = d.visibilityKm >= 10 ? "Good" : d.visibilityKm >= 4 ? "Moderate" : "Poor";
      const dirs = { N: 0, NE: 45, E: 90, SE: 135, S: 180, SW: 225, W: 270, NW: 315 };
      const a = dirs[d.windDir] || 0;
      const sea = (x) => (x.pop >= 60 ? "Rain at times" : x.pop >= 30 ? "Showers later" : x.pop >= 10 ? "Mainly fair" : "Fair");
      const rainy = W.rain24.filter((r) => r.prob >= 35);
      const pk = peak(W);
      const ticks = Object.entries(dirs).map(([k, v]) => { const r = (v - 90) * Math.PI / 180; return `<text x="${(60 + Math.cos(r) * 50).toFixed(1)}" y="${(63 + Math.sin(r) * 50).toFixed(1)}" font-size="${k.length > 1 ? 8 : 11}" fill="${k === d.windDir ? "#f2b84b" : "#9fb4c8"}" text-anchor="middle" font-family="Arial">${k}</text>`; }).join("");
      return `<div class="d39">
<div class="air"><i></i><span>On air · ${W.localTime}</span><span>${W.date}</span></div>
<p class="in">And now the forecast for ${W.place}, issued at ${W.localTime} on ${W.date}.</p>
<div class="main">
 <div>
  <div class="ar">${W.place.toUpperCase()}</div>
  <p class="fc"><b>${dirWord[d.windDir] || d.windDir} ${f}</b>, occasionally ${gf} in gusts (${d.windKmh} km/h, gusting ${d.gustKmh}). <b>${W.now.icon} ${W.now.desc}</b>, ${pk.prob >= 40 ? `rain around ${hr(pk.hour)}` : "remaining dry"}. <b>${W.now.tempC}°C</b>, feeling ${W.now.feelsC}°C. Visibility <b>${vis}</b>, ${d.visibilityKm} km.</p>
 </div>
 <div><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="38" fill="none" stroke="#36506b"/><circle cx="60" cy="60" r="2" fill="#efe7d4"/>${ticks}<g transform="rotate(${a + 180} 60 60)"><line x1="60" y1="30" x2="60" y2="88" stroke="#f2b84b" stroke-width="3"/><path d="M60 92 L53 80 L67 80 Z" fill="#f2b84b"/></g></svg><div class="cap">Wind from the ${d.windDir}, force ${f}</div></div>
</div>
<h5>GENERAL SYNOPSIS</h5>
<p class="sy">${W.rainSummary} Pressure ${d.pressureHpa} hPa, humidity ${d.humidity}%, cloud ${d.cloud}%, dew point ${d.dewC}°C. UV ${d.uv}, ${uvWord(d.uv)}. Sunrise ${d.sunrise}, sunset ${d.sunset}.</p>
<div class="rw">${rainy.map((r) => `<span><b>${hr24(r.hour)}</b> ${r.prob}% · ${r.mm.toFixed(1)} mm</span>`).join("")}</div>
<h5>OUTLOOK, SEVEN DAYS</h5>
<div class="ol">${W.days.map((x) => `<div><b>${x.name}</b><span>${x.icon} ${x.desc}. ${sea(x)}.</span><span>${x.lo}–${x.hi}°C · ${x.pop}% rain</span></div>`).join("")}</div>
</div>`;
    },
  });

  // 40 ---------------------------------------------------------------- Magazine cover
  V.push({
    id: "40",
    name: "Magazine Cover",
    family: FAM,
    blurb: "Tonight's weather as a glossy magazine cover: a huge masthead, an outlined cover temperature, sensational coverlines written from the data, a barcode whose bars are the next 24 hours of rain, a spinning price sticker and an 'inside this issue' strip for the week.",
    pro: "Loud, funny and unlike any weather app.",
    con: "Busy; hierarchy competes with the cover gags.",
    level: "rich",
    css: `
.d40{background:#ff5b1f;color:#111;font-family:"Helvetica Neue",Arial,sans-serif;padding:16px 18px 14px;box-sizing:border-box;width:100%;max-width:560px;position:relative;overflow:hidden}
.d40 .mh{font-family:Impact,"Haettenschweiler","Arial Narrow Bold","Helvetica Neue",sans-serif;font-weight:900;font-size:108px;line-height:.82;letter-spacing:-2px;color:#fff;text-transform:uppercase;margin:0}
.d40 .iss{display:flex;justify-content:space-between;gap:2px 10px;flex-wrap:wrap;font-size:10.5px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;border-top:2px solid #111;border-bottom:2px solid #111;padding:3px 0;margin:6px 0 10px}
.d40 .body{display:grid;grid-template-columns:1fr 1.05fr;gap:12px;min-height:240px;position:relative}
.d40 .cl p{margin:0 0 12px;font-size:13px;line-height:1.25;animation:d40-in .6s ease-out both}
.d40 .cl b{display:block;font-family:Impact,"Arial Narrow Bold",sans-serif;font-size:24px;line-height:.95;text-transform:uppercase;font-weight:900}
.d40 .cl .w b{color:#fff}
.d40 .hero{text-align:right}
.d40 .tn{font-family:Impact,"Arial Narrow Bold",sans-serif;font-size:170px;line-height:.8;color:transparent;-webkit-text-stroke:3px #111;letter-spacing:-4px}
.d40 .tn sup{font-size:60px;-webkit-text-stroke:2px #111;vertical-align:top;line-height:1.5}
.d40 .ht{font-weight:900;font-size:22px;text-transform:uppercase;line-height:1;margin-top:4px}
.d40 .ht small{display:block;font-size:13px;font-weight:700;margin-top:3px}
.d40 .stk{position:absolute;right:4px;bottom:-4px;width:92px;height:92px;border-radius:50%;background:#ffe600;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;font-weight:900;font-size:10px;line-height:1.05;text-transform:uppercase;transform:rotate(-12deg);animation:d40-wob 4s ease-in-out infinite;box-shadow:3px 3px 0 #111}
.d40 .stk b{font-family:Impact,"Arial Narrow Bold",sans-serif;font-size:28px;font-weight:900}
.d40 .bot{display:grid;grid-template-columns:1fr 168px;gap:12px;margin-top:10px;align-items:end}
.d40 .ins{background:#111;color:#fff;padding:8px 10px}
.d40 .ins h6{margin:0 0 4px;font-size:10px;letter-spacing:2px;color:#ff5b1f}
.d40 .cl,.d40 .hero{min-width:0;overflow-wrap:anywhere}
.d40 .ins div{display:grid;grid-template-columns:34px 1fr auto auto;gap:6px;font-size:11.5px;line-height:1.55;border-bottom:1px solid #333}
.d40 .ins span:nth-child(3),.d40 .ins span:nth-child(4){text-align:right;font-variant-numeric:tabular-nums}
.d40 .ins b{color:#ffe600}
.d40 .bc{background:#fff;padding:6px 8px 4px}
.d40 .bc svg{display:block;width:100%;height:auto}
.d40 .bc p{margin:2px 0 0;font-size:8.5px;line-height:1.2;font-family:"SF Mono",Menlo,monospace}
.d40 .sp{display:flex;flex-wrap:wrap;gap:4px 12px;font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;margin-top:8px}
@keyframes d40-in{from{opacity:0;transform:translateX(-14px)}to{opacity:1;transform:none}}
@keyframes d40-wob{0%,100%{transform:rotate(-12deg)}50%{transform:rotate(6deg) scale(1.04)}}
@media (prefers-reduced-motion: reduce){.d40 *{animation:none !important}}
@media (max-width:420px){.d40 .mh{font-size:72px}.d40 .tn{font-size:110px}.d40 .bot{grid-template-columns:1fr}}
`,
    render: (W) => {
      const d = W.details, p = peak(W), wd = wettest(W);
      const tot = sum(W.rain24.map((r) => r.mm || 0)).toFixed(1);
      const bw = 136 / Math.max(1, W.rain24.length);
      const bars = W.rain24.map((r, i) => { const h = Math.min(46, 6 + r.prob * 0.42); return `<rect x="${(i * bw).toFixed(1)}" y="${(48 - h).toFixed(1)}" width="${Math.min(bw * 0.9, Math.max(1.5, 1.5 + (r.mm || 0) * 1.8)).toFixed(1)}" height="${h.toFixed(1)}" fill="#111"/>`; }).join("");
      const dd = W.days[Math.min(4, W.days.length - 1)];
      const lab = W.rain24.filter((r, i) => i % 3 === 0).map((r, j) => `<text x="${(j * 3 * bw).toFixed(1)}" y="57" font-size="6.5" font-family="Menlo,monospace">${hr(r.hour).replace(" ", "")}</text>`).join("");
      return `<div class="d40">
<h1 class="mh">Weather</h1>
<div class="iss"><span>${W.place} edition</span><span>${W.date}</span><span>${W.localTime}</span></div>
<div class="body">
 <div class="cl">
  <p style="animation-delay:.1s"><b>${p.prob >= 40 ? `Wet around ${hr(p.hour)}!` : "Bone dry!"}</b>${W.rainSummary}</p>
  <p class="w" style="animation-delay:.25s"><b>${nm(wd)}: ${wd.pop}% ${wd.desc}</b>${wd.icon} ${wd.mm} mm, ${wd.lo}–${wd.hi}°C. ${wd.pop >= 30 ? "Your umbrella's big day." : "Umbrella stays home."}</p>
  <p style="animation-delay:.4s"><b>UV ${d.uv}: the ${uvWord(d.uv)} truth</b>${d.uv >= 3 ? "Why sunscreen still matters" : "Sunscreen can wait"} by ${dd.name} (${dd.hi}°C, ${dd.desc.toLowerCase()}).</p>
 </div>
 <div class="hero">
  <div class="tn">${W.now.tempC}<sup>°C</sup></div>
  <div class="ht">${W.now.icon} ${W.now.desc}<small>Feels like ${W.now.feelsC}°C. Peak rain ${p.prob}% at ${hr(p.hour)}</small></div>
 </div>
 <div class="stk">Only<b>${tot}</b>mm of rain</div>
</div>
<div class="bot">
 <div class="ins"><h6>INSIDE THIS ISSUE · 7 DAYS</h6>${W.days.map((x) => `<div><b>${x.name}</b><span>${x.icon} ${x.desc}</span><span>${x.lo}/${x.hi}°C</span><span>${x.pop}% rain</span></div>`).join("")}</div>
 <div class="bc"><svg viewBox="0 0 140 60">${bars}${lab}</svg><p>RAIN NEXT 24H · HEIGHT = CHANCE, WIDTH = MM</p></div>
</div>
<div class="sp"><span>Humidity ${d.humidity}%</span><span>Wind ${d.windDir} ${d.windKmh} km/h, gusts ${d.gustKmh}</span><span>Cloud ${d.cloud}%</span><span>Sunrise ${d.sunrise}</span><span>Sunset ${d.sunset}</span></div>
</div>`;
    },
  });
})();
