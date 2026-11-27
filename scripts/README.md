# wth build

`index.html` (simple landing, Floating Ranges) and `gallery.html` (all designs, live data, each bookmarkable as `gallery.html#<name>`) are generated. Edit the sources, then rebuild.

- `src/shared.js`: sample weather object (`window.W`) every design renders from, and the shape the live loader must produce.
- `src/p1.js` to `p5.js`: the design variations (ids 01 to 50). Each pushes `{id, name, family, level, blurb, pro, con, css, render(W)}` onto `window.V`. All CSS selectors start with `.dNN`.
- `build.py`: writes the two pages. Embeds the live-data loader (ipwho.is for the location (wttr.in fallback), Open-Meteo for the forecast; both free, no keys). To change the landing design, change `LANDING_ID` in the landing template.
- `test.js`: renders every design against 5 datasets and fails on NaN/undefined/exceptions.
- `live-check.js`: same check on real fetched data (network needed).
- `build.sh`: test, then build (`--live` adds the live check).

Run `sh scripts/build.sh`.
