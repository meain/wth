// Fetches REAL weather with the loader embedded in the built index.html and renders every design on it.
// Needs network. Usage: node scripts/live-check.js
const fs = require("fs"), path = require("path");
global.window = global;
const root = path.join(__dirname, "..");
const page = fs.readFileSync(path.join(root, "gallery.html"), "utf8");
const script = [...page.matchAll(/<script>([\s\S]*?)<\/script>/g)][0][1];
const cut = script.indexOf("const vs = window.V");
// gallery script = shared data + all designs + loader + page code; keep everything before the page code
eval(script.slice(0, cut) + `
WTH.load().then(W => {
  const live = { place: W.place, time: W.localTime, now: W.now.tempC + "°C " + W.now.desc, days: W.days.length, rain: W.rain24.length, hourly: W.hourlyTempC.length };
  console.log("live data:", JSON.stringify(live));
  let bad = 0;
  for (const v of window.V) {
    try { const h = v.render(W).replace(/<style[\\s\\S]*?<\\/style>/g, ""); const m = h.match(/NaN|undefined|Infinity|\\[object|null/); if (m) { bad++; console.log("BAD", v.id, v.name, m[0]); } }
    catch (e) { bad++; console.log("THROW", v.id, v.name, e.message); }
  }
  console.log(window.V.length + " variants, " + bad + " bad on live data");
  process.exit(bad ? 1 : 0);
}).catch(e => { console.log("load failed:", e.message); process.exit(2); });`);
