# wth

A small weather page for wherever you are. Live at https://meain.io/wth/

It finds your location from your IP with [ipwho.is](https://ipwho.is) (falling back to [wttr.in](https://wttr.in)) and gets the forecast from [Open-Meteo](https://open-meteo.com): the next 24 hours, 7 days and rain. All free, no keys. The page follows your light or dark setting.

It's a single `index.html` with no build step. Edit it and open it in a browser, or push to publish on GitHub Pages.

A few notes on why it's put together this way:

- Open-Meteo needs coordinates and can't work them out, so the IP lookup is a separate call.
- wttr.in is only a fallback. It returns 3 days of forecast, and its city name isn't available to browsers (it sends an HTML page to browser user agents), only a finer local area name.
- Open-Meteo is asked only for the fields the page shows.
