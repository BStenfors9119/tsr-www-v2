# PWA screenshots

These images appear in the **Powerful Control** tab of the home-page spotlight
(`src/home/home.container.js` → `spotlight.tabs[].media.gallery`).

They currently ship as **placeholders**. To use real screenshots, capture the
running PWA (e.g. from your logged-in session at `http://localhost:8081`) and
**overwrite the files below, keeping the same names** — no code change needed.

| File | PWA view | Suggested shot |
| --- | --- | --- |
| `remote.png` | `remote` | The channel/source/power control screen |
| `location.png` | `location` | TVs and groups for a venue |
| `automation.png` | `automation` | Game scheduling / automation |

Recommended: landscape, ~1200×800 (or any aspect — they're rendered with
`object-fit: contain`). Keep file sizes reasonable (the whole `assets/` dir is
copied into `dist/` at build time).

To add or remove shots, edit the `media.gallery` array for that tab in
`home.container.js`; the gallery renders a dot per image automatically.
