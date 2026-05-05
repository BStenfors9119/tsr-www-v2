# tsr-www

Marketing and account site for **TheSportsRemote.com** — pure JavaScript + Web Components on the front end, Node.js/Express on the back end, Firebase for auth, packaged in Docker.

See [SPECS.md](./SPECS.md) for the product spec and [CLAUDE.md](./CLAUDE.md) for guidance when working with Claude Code.

## Requirements

- Node.js `>=20`
- npm
- (Optional) Docker for containerized runs

## Setup

```bash
npm install
cp .env.example .env
# fill in Firebase credentials in .env
```

Environment variables (see [.env.example](./.env.example)):

| Variable | Purpose |
| --- | --- |
| `PORT` | Express server port (default `8080`) |
| `NODE_ENV` | `development` or `production` |
| `FIREBASE_SERVICE_ACCOUNT_PATH` | Path to Firebase Admin service account JSON |
| `FIREBASE_API_KEY` | Firebase Web client config (exposed via webpack `DefinePlugin`) |
| `FIREBASE_AUTH_DOMAIN` | Firebase Web client config |
| `FIREBASE_PROJECT_ID` | Firebase Web client config |
| `FIREBASE_APP_ID` | Firebase Web client config |

## Scripts

### Development

- `npm run dev` — run backend and frontend bundler in parallel
- `npm run dev:server` — backend only (nodemon on `server.js`)
- `npm run dev:client` — frontend only (`webpack serve` with `webpack.dev.cjs`)

### Build

- `npm run build` — production bundle to `dist/` (`webpack.prod.cjs`)
- `npm run clean` — remove `dist/`
- `npm start` — run the production server (`NODE_ENV=production node server.js`)

### Lint & format

- `npm run lint` — ESLint on `src/`, `server/`, `server.js`
- `npm run lint -- --fix` — auto-fix
- `npm run format` — Prettier write
- `npm run format:check` — Prettier check only

### Tests (Mocha + Chai)

- `npm test` — run all tests
- `npm run test:watch` — watch mode
- `npx mocha path/to/file.test.js` — run a single file
- `npx mocha --grep "<name substring>"` — run by test name

## Docker

```bash
docker build -t tsr-www .
docker run --rm -p 3000:3000 --env-file .env tsr-www
```

## Project layout

```
www/
  public/         static HTML entry
  src/            frontend (Web Components, per-domain folders)
    home/  products/  services/  about/  contact/  login/  install/
    components/   shared UI components
    lib/          shared utilities
    styles/       global styles
    app.js  router.js  index.js
  server/         backend modules (Firebase admin, routes)
  server.js       Express entry point
  test/           Mocha setup and shared test helpers
  assets/         images and static assets
  dist/           build output (generated)
  webpack.common.cjs / webpack.dev.cjs / webpack.prod.cjs
  Dockerfile
```

Each domain folder follows a container/presentation split, e.g.:

```
user/
  user.container.js   data + logic
  user.pres.js        UI rendering
```

## Tech stack

- **Frontend** — vanilla JavaScript (functional style), Web Components, [Web Awesome](https://www.npmjs.com/package/@awesome.me/webawesome) for icons/UI
- **Backend** — Node.js + Express
- **Auth / data** — Firebase (client SDK + `firebase-admin`)
- **Build** — webpack 5
- **Test** — Mocha + Chai (with jsdom)
- **Tooling** — ESLint, Prettier, nodemon
- **Container** — Docker
