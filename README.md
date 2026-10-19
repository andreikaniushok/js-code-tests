# Polygon

JavaScript interview trainer: 310 tasks in 12 sections, Monaco editor, automated tests, and progress saved in the browser. UI and task text in English and Russian.

## Setup

Node.js 18+.

```bash
npm install
npm run dev
```

Open http://localhost:5173/

## Scripts

```bash
npm run dev       # local app
npm run build     # production build
npm run preview   # preview build
npm test          # run task tests (node:test)
npm run test:app  # verify the app catalog
```

`npm test` fails while solutions are still stubs — that is expected.

## Tasks

```
tasks/<section>/
  solution.js     # JSDoc statement + your code
  tests.test.js   # automated checks
```

Solve in the app or edit `solution.js` directly.

## License

MIT — see [LICENSE](LICENSE).
