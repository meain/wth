// Renders every design against 5 datasets (sample + 4 stress cases) and flags NaN/undefined/null/Infinity,
// thrown errors, duplicate ids and missing metadata. Usage: node scripts/test.js [src/p3.js ...]  (default: all parts)
const fs = require("fs"), path = require("path");
global.window = global; global.document = { createElement: () => ({}) };
const SRC = path.join(__dirname, "src");
eval(fs.readFileSync(path.join(SRC, "shared.js"), "utf8"));
const base = JSON.parse(JSON.stringify(window.W));
const files = process.argv.length > 2 ? process.argv.slice(2).map(f => path.resolve(f)) : fs.readdirSync(SRC).filter(f => /^p\d+\.js$/.test(f)).sort().map(f => path.join(SRC, f));
for (const f of files) eval(fs.readFileSync(f, "utf8"));
const clone = o => JSON.parse(JSON.stringify(o));
const ds = { sample: clone(base) };
{ // hot, dry, daytime, long-ish city, different date
  const w = clone(base); w.place = "San Francisco, United States"; w.cityName = "San Francisco";
  w.now = { tempC: 38, icon: "☀️", desc: "Sunny", feelsC: 41, code: 0 }; w.hour24 = 13; w.minute = 5; w.localTime = "1:05 PM"; w.isNight = false;
  w.weekdayLong = "Tuesday"; w.weekdayShort = "Tue"; w.dayNum = 14; w.monthShort = "Jul"; w.monthLong = "July"; w.year = 2027; w.date = "Tuesday, 14 July"; w.dateShort = "14 Jul";
  w.rain24 = w.rain24.map((s, i) => ({ hour: (13 + i * 2) % 24, prob: 0, mm: 0 })); w.rainSummary = "No rain expected in the next 24 hours.";
  w.hourlyTempC = w.hourlyTempC.map(t => t + 11);
  w.days = w.days.map(d => ({ ...d, icon: "☀️", desc: "Sunny", lo: d.lo + 12, hi: d.hi + 9, pop: 0, mm: 0 }));
  w.details = { ...w.details, uv: 11, humidity: 18, cloud: 0, windKmh: 3, gustKmh: 6 }; ds.dryHot = w;
}
{ // freezing, snow, negative temps, early morning
  const w = clone(base); w.place = "Oslo, Norway"; w.cityName = "Oslo";
  w.now = { tempC: -8, icon: "❄️", desc: "Light snow", feelsC: -14, code: 71 }; w.hour24 = 6; w.minute = 45; w.localTime = "6:45 AM"; w.isNight = true;
  w.rain24 = w.rain24.map((s, i) => ({ hour: (6 + i * 2) % 24, prob: 40 + (i % 3) * 20, mm: 0.5 * (i % 4) }));
  w.rainSummary = "Rain from about 8 AM, heaviest around 2 PM, 7.0 mm total.";
  w.hourlyTempC = w.hourlyTempC.map((t, i) => -9 + Math.round(5 * Math.sin(i / 4)));
  w.days = w.days.map((d, i) => ({ ...d, icon: "❄️", desc: "Snow", lo: -12 + i, hi: -3 + i, pop: 70, mm: 4 }));
  w.details = { ...w.details, uv: 0, humidity: 90, windKmh: 34, gustKmh: 61, sunrise: "8:41 AM", sunset: "3:22 PM", sunriseMin: 521, sunsetMin: 922, visibilityKm: 2 }; ds.cold = w;
}
{ // monsoon: rain everywhere, large mm, very long place name
  const w = clone(base); w.place = "Thiruvananthapuram, India"; w.cityName = "Thiruvananthapuram";
  w.now = { tempC: 30, icon: "⛈️", desc: "Thunderstorm with heavy rain", feelsC: 37, code: 95 };
  w.rain24 = w.rain24.map((s, i) => ({ ...s, prob: 90 + (i % 2) * 10, mm: 6 + (i % 5) * 3 }));
  w.rainSummary = "Rain now, heaviest around 8 AM, 99.0 mm total.";
  w.days = w.days.map(d => ({ ...d, icon: "⛈️", desc: "Thunderstorm", lo: 25, hi: 31, pop: 100, mm: 48 }));
  w.details = { ...w.details, humidity: 98, uv: 1, cloud: 100, windKmh: 45, gustKmh: 80 }; ds.monsoon = w;
}
{ // flat temps and no sunrise/sunset (polar)
  const w = clone(base); w.place = "Longyearbyen, Svalbard and Jan Mayen"; w.cityName = "Longyearbyen";
  w.now = { tempC: 0, icon: "☁️", desc: "Overcast", feelsC: 0, code: 3 };
  w.hourlyTempC = new Array(24).fill(0); w.days = w.days.map(d => ({ ...d, lo: 0, hi: 0, pop: 0, mm: 0 }));
  w.rain24 = w.rain24.map(s => ({ ...s, prob: 0, mm: 0 })); w.rainSummary = "No rain expected in the next 24 hours.";
  w.details = { ...w.details, sunrise: "—", sunset: "—", sunriseMin: 0, sunsetMin: 1440 }; ds.flat = w;
}
let bad = 0;
const flags = /NaN|undefined|Infinity|\[object|null/;
const seen = new Set();
for (const v of window.V) {
  const probs = [];
  if (seen.has(v.id)) probs.push("duplicate id"); seen.add(v.id);
  for (const k of ["id", "name", "blurb", "pro", "con", "family", "level", "css"]) if (!v[k]) probs.push("missing " + k);
  if (!/^\d\d$/.test(v.id || "")) probs.push("id should be two digits");
  if (v.css && !v.css.includes(".d" + v.id)) probs.push("css does not use .d" + v.id + " prefix");
  for (const [k, w] of Object.entries(ds)) {
    try {
      const h = v.render(clone(w));
      if (typeof h !== "string" || h.length < 200) probs.push(k + ": render too short");
      const m = h.replace(/<style[\s\S]*?<\/style>/g, "").match(flags);
      if (m) probs.push(k + ": output contains '" + m[0] + "' near: " + h.slice(Math.max(0, h.search(flags) - 50), h.search(flags) + 50).replace(/\s+/g, " "));
    } catch (e) { probs.push(k + ": threw " + e.message); }
  }
  if (probs.length) { bad++; console.log("FAIL", v.id, v.name); probs.slice(0, 4).forEach(p => console.log("   ", p)); } else console.log("ok  ", v.id, v.name);
}
console.log(`${window.V.length} variants, ${bad} failing across ${Object.keys(ds).length} datasets`);
process.exit(bad ? 1 : 0);
