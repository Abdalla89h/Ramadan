# Ramadan Department Dashboard (Amman) — Google Maps + GitHub Pages

Static site. Input is ONLY:
- Name
- Entrance time

Exit time = Entrance + 6.5 hours (strict; no prayer-break addition).

## 1) Put your Google Maps API key
Open: `docs/app.js` and replace:
```js
const GOOGLE_MAPS_API_KEY = "PUT_YOUR_KEY_HERE";
```

Enable Google API:
- Maps JavaScript API (TrafficLayer)

## 2) Secure the key (important)
In Google Cloud Console (Credentials):
- Restrict key by **HTTP referrers**:
  - `https://<YOUR_USERNAME>.github.io/*`
  - `https://<YOUR_USERNAME>.github.io/<REPO_NAME>/*`
- Restrict APIs to **Maps JavaScript API** only.

## 3) Deploy to GitHub Pages (publish from /docs)
GitHub → Repo → Settings → Pages
- Source: Deploy from a branch
- Branch: main
- Folder: /docs

Your site:
`https://<username>.github.io/<repo>/`

## Notes
- Google TrafficLayer shows the live traffic colors.
- “Hotspots” are a quick UI: click a hotspot to zoom + cycle local status (heavy/med/light). This is stored locally in the browser.
