#!/usr/bin/env python3
"""Builds index.html (simple landing, one design) and gallery.html (all designs, live data).

Usage: python3 scripts/build.py [output-dir]     (default: repo root)

Sources live in scripts/src: shared.js (sample data shape) and p1..p5.js (the design variations).
The live-data loader is embedded below. Both output pages are self-contained static files.
"""
import glob, os, sys
here = os.path.dirname(os.path.abspath(__file__))
root = os.path.dirname(here) + "/"
parts_dir = here + "/src/"
out = sys.argv[1] if len(sys.argv) > 1 else root
if not out.endswith("/"): out += "/"
shared = open(parts_dir + "shared.js").read()
parts = [open(f).read() for f in sorted(glob.glob(parts_dir + "p[0-9].js"))]
variants_js = "\n".join("try{" + p + "\n}catch(e){console.error('part failed',e)}" for p in parts)

# -------- live data loader: builds window.W (same shape as shared.js) --------
loader = r'''
const WTH = (() => {
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const WD = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const MO = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const COND = c => {
    if (c === 0) return ["☀️", "Sunny", "🌙", "Clear"];
    if (c === 1) return ["🌤️", "Mostly sunny", "🌙", "Mostly clear"];
    if (c === 2) return ["⛅", "Partly cloudy"];
    if (c === 3) return ["☁️", "Overcast"];
    if (c === 45 || c === 48) return ["🌫️", "Fog"];
    if (c >= 51 && c <= 55) return ["🌦️", "Drizzle"];
    if (c === 56 || c === 57) return ["🌧️", "Freezing drizzle"];
    if (c === 61) return ["🌧️", "Light rain"];
    if (c === 63) return ["🌧️", "Rain"];
    if (c === 65) return ["🌧️", "Heavy rain"];
    if (c === 66 || c === 67) return ["🌧️", "Freezing rain"];
    if (c === 71) return ["❄️", "Light snow"];
    if (c === 73) return ["❄️", "Snow"];
    if (c === 75 || c === 77) return ["❄️", "Heavy snow"];
    if (c === 80) return ["🌦️", "Light showers"];
    if (c === 81) return ["🌦️", "Showers"];
    if (c === 82) return ["⛈️", "Violent showers"];
    if (c === 85 || c === 86) return ["❄️", "Snow showers"];
    if (c === 95) return ["⛈️", "Thunderstorm"];
    if (c >= 96) return ["⛈️", "Thunderstorm with hail"];
    return ["🌡️", "Unknown"];
  };
  const cond = (c, night) => { const r = COND(c); return night && r[2] ? [r[2], r[3]] : [r[0], r[1]]; };
  const clock12 = (h, m) => `${((h + 11) % 12) + 1}${m === undefined ? "" : ":" + String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
  const compass = d => ["N","NE","E","SE","S","SW","W","NW"][Math.round(d / 45) % 8];
  const dayParts = iso => { const [y, m, d] = iso.slice(0, 10).split("-").map(Number); const dt = new Date(Date.UTC(y, m - 1, d)); return { y, m: m - 1, d, wd: dt.getUTCDay() }; };
  const hm = iso => { const h = +iso.slice(11, 13), m = +iso.slice(14, 16); return { h, m, min: h * 60 + m, text: clock12(h, m) }; };

  function rainSummary(slots) {
    const total = slots.reduce((a, s) => a + s.mm, 0);
    const wet = slots.filter(s => s.prob >= 50 || s.mm >= 0.3);
    if (!wet.length) return slots.some(s => s.prob >= 30) ? "Small chance of showers, nothing heavy expected." : "No rain expected in the next 24 hours.";
    const peak = wet.reduce((a, s) => (s.mm > a.mm || (s.mm === a.mm && s.prob > a.prob)) ? s : a);
    const when = wet[0] === slots[0] ? "Rain now" : `Rain from about ${clock12(wet[0].hour)}`;
    return `${when}, heaviest around ${clock12(peak.hour)}, ${total.toFixed(1)} mm total.`;
  }

  // full=false asks Open-Meteo only for what the simple home page shows; full=true (gallery) asks for everything any design uses.
  async function load(full = true) {
    // Location comes from IP geolocation (ipwho.is: free, no key, CORS). wttr.in's plain-text location is
    // unavailable to browsers (it returns an HTML page for browser user agents) and its JSON "nearest_area"
    // is a finer locality (Vypeen instead of Kochi), so wttr.in is only the fallback.
    let city, country, lat, lon;
    try {
      const ir = await fetch("https://ipwho.is/");
      const ip = await ir.json();
      if (!ip.success || ip.latitude == null) throw new Error("ipwho.is failed");
      city = ip.city || ip.region; country = ip.country; lat = ip.latitude; lon = ip.longitude;
    } catch (e) {
      const wr = await fetch("https://wttr.in/?format=j1");
      if (!wr.ok) throw new Error("location lookup failed");
      const a = (await wr.json()).nearest_area[0];
      city = a.areaName[0].value; country = a.country[0].value; lat = a.latitude; lon = a.longitude;
    }
    const place = `${city}, ${country}`;
    const cur = ["temperature_2m", "apparent_temperature", "is_day", "weather_code", "relative_humidity_2m", "cloud_cover", "wind_speed_10m", "wind_direction_10m"];
    const day = ["weather_code", "temperature_2m_max", "temperature_2m_min", "precipitation_probability_max", "sunrise", "sunset", "uv_index_max"];
    const hr = ["temperature_2m", "precipitation_probability", "precipitation"];
    if (full) { cur.push("surface_pressure", "wind_gusts_10m", "dew_point_2m"); day.push("precipitation_sum"); hr.push("visibility"); }
    const q = "https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon +
      "&current=" + cur + "&daily=" + day + "&hourly=" + hr + "&timezone=auto&forecast_days=7&forecast_hours=48";
    const mr = await fetch(q);
    if (!mr.ok) throw new Error("open-meteo " + mr.status);
    const m = await mr.json(), c = m.current, d = m.daily, h = m.hourly;
    const night = !c.is_day;
    const now = dayParts(c.time), t = hm(c.time);
    let start = h.time.findIndex(x => x >= c.time.slice(0, 13) + ":00"); if (start < 0) start = 0;
    const rain24 = [];
    for (let i = 0; i < 12; i++) {
      const ix = [start + i * 2, start + i * 2 + 1].filter(j => j < h.time.length);
      rain24.push({ hour: +h.time[ix[0]].slice(11, 13), prob: Math.max(0, ...ix.map(j => h.precipitation_probability[j] || 0)), mm: Math.round(ix.reduce((s, j) => s + (h.precipitation[j] || 0), 0) * 10) / 10 });
    }
    const [icon, desc] = cond(c.weather_code, night);
    const sr = hm(d.sunrise[0]), ss = hm(d.sunset[0]);
    const days = d.time.map((iso, i) => {
      const p = dayParts(iso), [ic, ds] = cond(d.weather_code[i], false);
      return { name: i === 0 ? "Today" : WD[p.wd].slice(0, 3), nameLong: i === 0 ? "Today" : WD[p.wd], dateNum: p.d, monthShort: MO[p.m].slice(0, 3),
        icon: ic, desc: ds, lo: Math.round(d.temperature_2m_min[i]), hi: Math.round(d.temperature_2m_max[i]),
        pop: d.precipitation_probability_max[i] || 0, mm: Math.round(((d.precipitation_sum && d.precipitation_sum[i]) || 0) * 10) / 10 };
    });
    const vis = h.visibility && h.visibility[start] != null ? Math.round(h.visibility[start] / 100) / 10 : 0;
    return {
      place: esc(place), cityName: esc(city), localTime: t.text, date: `${WD[now.wd]}, ${now.d} ${MO[now.m]}`, dateShort: `${now.d} ${MO[now.m].slice(0, 3)}`,
      weekdayLong: WD[now.wd], weekdayShort: WD[now.wd].slice(0, 3), dayNum: now.d, monthShort: MO[now.m].slice(0, 3), monthLong: MO[now.m], year: now.y,
      hour24: t.h, minute: t.m, isNight: night,
      now: { tempC: Math.round(c.temperature_2m), icon, desc, feelsC: Math.round(c.apparent_temperature), code: c.weather_code },
      rain24, rainSummary: rainSummary(rain24),
      hourlyTempC: h.temperature_2m.slice(start, start + 24).map(Math.round),
      days,
      details: { humidity: Math.round(c.relative_humidity_2m), windKmh: Math.round(c.wind_speed_10m), windDir: compass(c.wind_direction_10m), gustKmh: Math.round(c.wind_gusts_10m || 0),
        uv: Math.round(d.uv_index_max[0]), cloud: Math.round(c.cloud_cover), sunrise: sr.text, sunset: ss.text, sunriseMin: sr.min, sunsetMin: ss.min,
        visibilityKm: vis, pressureHpa: Math.round(c.surface_pressure || 0), dewC: Math.round(c.dew_point_2m || 0) }
    };
  }
  // copy the design's own background onto the page so it fills the window
  function paintBody(rootEl) {
    if (!rootEl) return;
    const cs = getComputedStyle(rootEl);
    document.body.style.background = cs.backgroundImage !== "none" ? cs.backgroundImage : cs.backgroundColor;
    document.body.style.backgroundAttachment = "fixed";
  }
  return { load, paintBody, esc };
})();
'''

base_css = '''*{box-sizing:border-box}html{-webkit-text-size-adjust:100%}html,body{margin:0}body{min-height:100vh;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
.wth-pill{position:fixed;right:12px;bottom:12px;z-index:50;background:rgba(255,255,255,.92);color:#111;border:1px solid rgba(0,0,0,.12);border-radius:999px;padding:6px 14px;font-size:13px;text-decoration:none;box-shadow:0 2px 10px rgba(0,0,0,.15)}
.wth-pill:hover{background:#fff}
@media (prefers-color-scheme:dark){.wth-pill{background:rgba(30,36,45,.92);color:#e8ecf2;border-color:rgba(255,255,255,.14)}.wth-pill:hover{background:#232b36}}
.wth-msg{padding:60px 20px;text-align:center;color:#6b7280}'''

# -------- landing page: variant 08, simple --------
landing_js = "try{" + parts[0] + "\n}catch(e){console.error('part failed',e)}"  # landing only needs variant 08 (in p1)
landing = f'''<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0d1117" media="(prefers-color-scheme: dark)">
<title>Weather</title>
<style>{base_css}
body{{display:flex;align-items:center;justify-content:center;min-height:100vh;min-height:100dvh;padding:16px 0 64px}}
#stage{{width:100%;max-width:560px}}
.wth-pill{{right:max(12px,env(safe-area-inset-right));bottom:max(12px,env(safe-area-inset-bottom))}}
</style><style id="vcss"></style></head>
<body><div id="stage"><div class="wth-msg">Loading weather…</div></div>
<a class="wth-pill" href="gallery.html">More designs →</a>
<script>
{shared}
{landing_js}
{loader}
const LANDING_ID = "08";
const v = window.V.find(x => x.id === LANDING_ID);
document.getElementById("vcss").textContent = v.css;
WTH.load(false).then(W => {{
  const st = document.getElementById("stage");
  st.innerHTML = v.render(W);
  WTH.paintBody(st.firstElementChild);
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => WTH.paintBody(st.firstElementChild));
}}).catch(e => {{ document.getElementById("stage").innerHTML = '<div class="wth-msg">Couldn\\'t load weather (' + WTH.esc(e.message) + ').</div>'; }});
</script></body></html>'''

# -------- gallery: all designs live, hash routed (#slug) --------
gallery = f'''<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Weather, in many designs</title>
<style>{base_css}
body{{background:#f6f6f8;color:#1d1d1f}}
header{{max-width:1500px;margin:0 auto;padding:24px 24px 8px}}
h1{{font-size:24px;margin:0 0 4px}}header p{{margin:0 0 12px;color:#6e6e73}}
.bar{{display:flex;gap:6px;flex-wrap:wrap;align-items:center;font-size:13px}}
.bar button{{border:1px solid #e3e3e6;background:#fff;border-radius:999px;padding:3px 12px;cursor:pointer;font:inherit;font-size:12.5px}}
.bar button.on{{background:#0a66e6;color:#fff;border-color:#0a66e6}}
.grid{{max-width:1500px;margin:0 auto;padding:12px 24px 80px;display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:18px}}
.card{{display:block;color:inherit;text-decoration:none;background:#fff;border:1px solid #e3e3e6;border-radius:12px;padding:10px;transition:box-shadow .15s,border-color .15s}}
.card:hover{{border-color:#0a66e6;box-shadow:0 0 0 3px rgba(10,102,230,.1)}}
.card h2{{font-size:14px;margin:0 0 2px;display:flex;justify-content:space-between;gap:8px}}.card h2 span{{font-weight:400;color:#6e6e73;font-size:12px}}
.card p{{margin:4px 0 0;font-size:12px;color:#6e6e73}}
.thumb{{width:100%;aspect-ratio:560/700;overflow:hidden;border-radius:8px;border:1px solid #eee;position:relative;margin-top:6px;pointer-events:none}}
.thumb>div{{position:absolute;left:0;top:0;width:560px;height:700px;overflow:hidden;transform-origin:0 0}}
#full{{display:none}}
.top{{position:fixed;left:12px;top:12px;z-index:50;display:flex;gap:8px;align-items:center;background:rgba(255,255,255,.92);border:1px solid rgba(0,0,0,.12);border-radius:999px;padding:5px 14px;font-size:13px;box-shadow:0 2px 10px rgba(0,0,0,.15);color:#111}}
.top a{{color:#0a66e6;text-decoration:none}}
#fstage{{max-width:560px;margin:0 auto;min-height:100vh;padding-top:44px}}
</style><style id="vcss"></style></head>
<body>
<div id="list"><header><h1>Weather, in many designs</h1><p>Every design below runs on live data for your location. Click one to open it full size; the address of that page is its own bookmark. <a href="index.html">Back to the simple page</a>.</p><div class="bar" id="bar"></div></header><div class="grid" id="grid"><div class="wth-msg">Loading weather…</div></div></div>
<div id="full"><div class="top"><a href="#">← All designs</a> · <a href="index.html">Simple page</a> · <b id="fname"></b></div><div id="fstage"></div></div>
<script>
{shared}
{variants_js}
{loader}
const vs = window.V.slice().sort((a, b) => a.id.localeCompare(b.id));
const slug = v => v.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
document.getElementById("vcss").textContent = vs.map(v => v.css).join("\\n");
let W = null, fLevel = "all", fFam = "all";
const fams = [...new Set(vs.map(v => v.family))];
const safe = (v, w) => {{ try {{ return v.render(w); }} catch (e) {{ return '<div class="wth-msg">render error</div>'; }} }};
function drawBar() {{
  const b = (t, k, val) => `<button data-k="${{k}}" data-v="${{val}}" class="${{(k === "l" ? fLevel : fFam) === val ? "on" : ""}}">${{t}}</button>`;
  document.getElementById("bar").innerHTML = "Complexity: " + ["all","simple","medium","rich"].map(x => b(x, "l", x)).join("") + " &nbsp; Style: " + b("all", "f", "all") + fams.map(x => b(x, "f", x)).join("");
}}
function drawGrid() {{
  const g = document.getElementById("grid");
  g.innerHTML = vs.filter(v => (fLevel === "all" || v.level === fLevel) && (fFam === "all" || v.family === fFam)).map(v =>
    `<a class="card" href="#${{slug(v)}}"><h2>${{v.name}} <span>${{v.level}}</span></h2><div class="thumb"><div>${{safe(v, W)}}</div></div><p>${{v.blurb.split(". ")[0].replace(/\\.$/, "")}}.</p></a>`).join("");
  g.querySelectorAll(".thumb").forEach(t => {{ const s = t.clientWidth / 560; t.firstElementChild.style.transform = "scale(" + s + ")"; }});
}}
document.getElementById("bar").onclick = e => {{ const b = e.target.closest("button"); if (!b) return; if (b.dataset.k === "l") fLevel = b.dataset.v; else fFam = b.dataset.v; drawBar(); drawGrid(); }};
addEventListener("resize", () => {{ if (W && !location.hash.slice(1)) drawGrid(); }});
function route() {{
  const key = decodeURIComponent(location.hash.slice(1));
  const v = key && vs.find(x => slug(x) === key || x.id === key);
  const list = document.getElementById("list"), full = document.getElementById("full");
  if (!W) return;
  if (v) {{
    list.style.display = "none"; full.style.display = "block";
    document.getElementById("fname").textContent = v.name;
    document.title = v.name + " · weather";
    const st = document.getElementById("fstage"); st.innerHTML = safe(v, W);
    WTH.paintBody(st.firstElementChild); scrollTo(0, 0);
  }} else {{
    full.style.display = "none"; list.style.display = "block";
    document.body.style.background = ""; document.title = "Weather, in many designs";
    drawBar(); drawGrid();
  }}
}}
addEventListener("hashchange", route);
WTH.load().then(w => {{ W = w; route(); }}).catch(e => {{ document.getElementById("grid").innerHTML = '<div class="wth-msg">Couldn\\'t load weather (' + WTH.esc(e.message) + ').</div>'; }});
</script></body></html>'''

os.makedirs(out, exist_ok=True)
open(out + "index.html", "w").write(landing)
open(out + "gallery.html", "w").write(gallery)
print("built into", out)
