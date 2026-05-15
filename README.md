# Meal Deck

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

With that intent in mind, here is what the project actually does and how it is organized.

## Description

**Meal Deck** is a client-side meal menu web application built entirely with Vanilla TypeScript — no frameworks, no runtime dependencies. It presents a curated catalog of meals organized into three categories: **Breakfasts**, **Lunches**, and **Shakes**.

Users can browse the full menu or narrow it down by selecting a category filter. Clicking a filter button instantly updates the displayed meal cards to show only items from that category. Selecting **All** restores the complete menu. The active filter state is managed through a custom observable `Store` implementation, meaning the UI reactively re-renders on state changes without any virtual DOM or external state management library.

Each meal is displayed as a card containing the dish name, a description, and any relevant details — giving users a clear overview of what is available before making a choice. The interface is fully responsive, styled with TailwindCSS using a warm, food-friendly color palette.

The application is designed as a single-page experience: fast to load, lightweight to run, and straightforward to navigate. It demonstrates how a reactive, component-driven UI can be built using pure TypeScript and native DOM APIs, making it a practical reference for developers exploring framework-free frontend architecture.

## Technologies used

These are the core technologies that make the experience above possible:

1. Typescript
2. TailwindCSS
3. HTML5
4. CSS3
5. Vite

## Libraries used

On top of those technologies, the project relies on the following packages. Note that there are **no production dependencies** — everything below is tooling for development, testing, linting, and bundling.

#### Dependencies

```
No production dependencies - Pure Vanilla TypeScript
```

#### devDependencies

```
"@eslint/js": "^9.39.2"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/user-event": "^14.5.2"
"@types/jest": "^30.0.0"
"@types/node": "^22.0.0"
"autoprefixer": "^10.4.16"
"eslint": "^9.39.2"
"eslint-config-prettier": "^10.1.8"
"eslint-plugin-prettier": "^5.5.5"
"globals": "^17.3.0"
"husky": "^9.1.7"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^16.2.7"
"postcss": "^8.4.33"
"prettier": "^3.8.1"
"tailwindcss": "^3.4.1"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.54.0"
"vite": "^7.1.5"
```

## Getting Started

Now that you know what powers the app, here is how to run it locally:

> **Requires Node.js ≥ 22.** Use [nvm](https://github.com/nvm-sh/nvm) and run `nvm use` to switch automatically via the included `.nvmrc`.

1. Clone the repository
2. Navigate to the project folder
3. Execute: `npm install`
4. Execute: `npm run dev`

The application will open automatically at `http://localhost:3000`.

## Testing

With the app running locally, you can also exercise the test suite to validate components, store logic, and page rendering:

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## CI/CD

Every push and pull request to `main` runs the following GitHub Actions pipeline:

| Job              | Steps                                      |
| ---------------- | ------------------------------------------ |
| **Lint & Audit** | `npm run lint` → `npm run type-check`      |
| **Testing**      | `npm test` (requires Lint & Audit to pass) |
| **Build**        | `npm run build` (requires Testing to pass) |

## Security Audit

Beyond functional testing, dependencies should be audited for known vulnerabilities before any release.

### npm audit

Check for vulnerabilities in dependencies:

```bash
npm audit
```

## Known Issues

None at the moment.

## Portfolio Link

For more details about this and other projects:

[`https://www.diegolibonati.com.ar/#/project/meal-deck`](https://www.diegolibonati.com.ar/#/project/meal-deck)
