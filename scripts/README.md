# wth build

`index.html` (simple landing, Floating Ranges) and `gallery.html` (all designs, live data, each bookmarkable as `gallery.html#<name>`) are generated. Edit the sources, then rebuild.

- `src/shared.js`: sample weather object (`window.W`) every design renders from, and the shape the live loader must produce.
- `src/p1.js` to `p5.js`: the design variations (ids 01 to 50). Each pushes `{id, name, family, level, blurb, pro, con, css, render(W)}` onto `window.V`. All CSS selectors start with `.dNN`.
- `build.py`: writes the two pages. Embeds the live-data loader: ipwho.is gives the location from the visitor's IP (wttr.in is only a fallback), Open-Meteo gives the forecast. Both are free and need no key. Open-Meteo can't find a location by itself, and wttr.in's plain-text location isn't available to browsers, which is why ipwho.is is used. To change the landing design, change `LANDING_ID` in the landing template.
- `test.js`: renders every design against 5 datasets and fails on NaN/undefined/exceptions.
- `live-check.js`: same check on real fetched data (network needed).
- `build.sh`: test, then build (`--live` adds the live check).

Run `sh scripts/build.sh`.
