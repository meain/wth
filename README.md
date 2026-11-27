# wth

A small weather page for wherever you are. Live at https://meain.io/wth/

It finds your location from your IP with [ipwho.is](https://ipwho.is) (falling back to [wttr.in](https://wttr.in)) and pulls the 7-day forecast and hourly rain from [Open-Meteo](https://open-meteo.com). All free, no keys. The page follows your light or dark setting.

[Gallery](https://meain.io/wth/gallery.html) has 50 other designs running on the same live data. Open one and its address is a bookmark, e.g. `gallery.html#floating-ranges`.

## Build

`index.html` and `gallery.html` are generated and committed, since Pages serves them as they are. The sources are in `scripts/src`.

```sh
sh scripts/build.sh          # test every design, then rebuild both pages
sh scripts/build.sh --live   # also check them against real fetched weather
```

Needs python3 and node, nothing else. More in `scripts/README.md`.
