// Shared sample data for every design variation. Pune, Friday ~8:30 PM local.
window.V = window.V || [];
window.W = {
  place: "Pune, India",
  localTime: "8:30 PM",
  date: "Friday, 27 November",
  cityName: "Pune",
  weekdayLong: "Friday", weekdayShort: "Fri", dayNum: 27, monthShort: "Nov", monthLong: "November", year: 2026,
  dateShort: "27 Nov",
  hour24: 20, minute: 30,           // local time at the place, for placing sun/moon, clocks
  isNight: true,                    // true when current local time is before sunrise or after sunset
  now: { tempC: 27, icon: "⛅", desc: "Partly cloudy", feelsC: 29, code: 2 },
  // next 24h in 2-hour slots, starting now. prob = chance of rain %, mm = rainfall in slot
  rain24: [
    { hour: 20, prob: 10, mm: 0.0 }, { hour: 22, prob: 20, mm: 0.1 }, { hour: 0, prob: 35, mm: 0.4 },
    { hour: 2, prob: 55, mm: 1.2 }, { hour: 4, prob: 80, mm: 2.6 }, { hour: 6, prob: 90, mm: 3.1 },
    { hour: 8, prob: 70, mm: 1.5 }, { hour: 10, prob: 40, mm: 0.5 }, { hour: 12, prob: 20, mm: 0.1 },
    { hour: 14, prob: 10, mm: 0.0 }, { hour: 16, prob: 5, mm: 0.0 }, { hour: 18, prob: 5, mm: 0.0 }
  ],
  rainSummary: "Rain from about 2 AM, heaviest around 6 AM, 9.4 mm total.",
  // hourly temperature for the next 24h (index 0 = now, 8 PM)
  hourlyTempC: [27,26,26,25,25,24,24,23,23,23,23,24,25,27,29,30,31,31,30,29,28,27,26,26],
  days: [
    { name: "Today", nameLong: "Today", dateNum: 27, monthShort: "Nov", icon: "⛅", desc: "Partly cloudy", lo: 22, hi: 31, pop: 20, mm: 0.1 },
    { name: "Sat", nameLong: "Saturday", dateNum: 28, monthShort: "Nov",   icon: "🌧️", desc: "Rain",          lo: 21, hi: 26, pop: 85, mm: 11.4 },
    { name: "Sun", nameLong: "Sunday", dateNum: 29, monthShort: "Nov",   icon: "🌦️", desc: "Showers",       lo: 21, hi: 27, pop: 60, mm: 4.2 },
    { name: "Mon", nameLong: "Monday", dateNum: 30, monthShort: "Nov",   icon: "⛅", desc: "Partly cloudy", lo: 21, hi: 28, pop: 30, mm: 0.8 },
    { name: "Tue", nameLong: "Tuesday", dateNum: 1, monthShort: "Dec",   icon: "☀️", desc: "Sunny",         lo: 21, hi: 30, pop: 5,  mm: 0.0 },
    { name: "Wed", nameLong: "Wednesday", dateNum: 2, monthShort: "Dec",   icon: "☀️", desc: "Sunny",         lo: 22, hi: 31, pop: 0,  mm: 0.0 },
    { name: "Thu", nameLong: "Thursday", dateNum: 3, monthShort: "Dec",   icon: "🌤️", desc: "Mostly sunny",  lo: 22, hi: 32, pop: 5,  mm: 0.0 }
  ],
  details: {
    humidity: 62, windKmh: 11, windDir: "NW", gustKmh: 24, uv: 7, cloud: 40,
    sunrise: "6:12 AM", sunset: "6:04 PM", sunriseMin: 372, sunsetMin: 1084, // minutes after local midnight
     visibilityKm: 10, pressureHpa: 1012, dewC: 18
  }
};
