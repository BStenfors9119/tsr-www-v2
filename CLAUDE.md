# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

This will be the website project for TSR (TheSportsRemote).  It will give users the ability to view all the products 
and services offered by TSR.  It will also allow users to sign up for an account, manage their account, and make purchases.  
The website will be built using pure Javascript, Web Components and Node.js, and will be hosted within a docker container.

See [SPECS.md](./SPECS.md) for the detailed product specification.

## Commands

These assume standard `npm` scripts defined in `package.json`. Adjust as the project evolves.

### Setup
- `npm install` — install deps
- `cp .env.example .env` — copy env template (then fill in Firebase credentials)

### Development
- `npm run dev` — run dev server (backend + watch frontend bundle)
- `npm run dev:server` — run backend only
- `npm run dev:client` — run frontend bundler in watch mode

### Build
- `npm run build` — production build (bundle frontend assets)
- `npm run clean` — clean build artifacts (or `rm -rf dist/`)

### Lint & format
- `npm run lint` — lint
- `npm run lint -- --fix` — lint and auto-fix
- `npm run format` — format with Prettier
- `npm run format:check` — check formatting without writing

### Tests (Mocha + Chai)
- `npm test` — run all tests
- `npm run test:watch` — watch mode
- `npx mocha path/to/file.test.js` — run a single test file
- `npx mocha --grep "<test name substring>"` — run a single test by name
- `npx mocha 'src/<domain>/**/*.test.js'` — run tests in one domain folder

### Docker
- `docker build -t tsr-www .` — build image
- `docker run --rm -p 3000:3000 --env-file .env tsr-www` — run container locally (loads `.env`)
- `docker compose up --build` — compose up (if `docker-compose.yml` is added)


## Architecture

### Domain Object Model Structure
Each domain object has a folder and all related code (model, service, controller, tests) lives in that folder.  
For example, the User domain object has a `user` folder with the following structure:

### Component Container / Presentation Structure
Each component has a container and presentation component.  
The container component is responsible for fetching data and handling logic, while the presentation component is responsible for rendering the UI.  

For example, the User:
```
user/
  user.container.js
  user.pres.js
```

### Domains to start with
- Home
- Products
- Services
- About Us
- Contact Us
- Login

## Tech Stack
### Frontend
    - Pure Javascript
    - Functional programming style
    - Web components only for UI (no React, Angular, etc.)
### Styling
    - Web Awesome for icons / UI elements
        - bundled
### Backend
    - Node.js for backend services
    - Firebase for authentication and users database
        - local development will use a .env file to store Firebase credentials, 
          which will be loaded using the `dotenv` package
### CI/CD
    - Docker for containerization
### Testing and Tools
    - Mocha and Chai for testing
    - ESLint and Prettier for code quality and formatting
    - GitHub for version control and collaboration
    
## Reference
    - Use the current website for styling and content reference: https://www.TheSportsRemote.com/
    - Images and assets can be found in the `assets` folder of this repository.
