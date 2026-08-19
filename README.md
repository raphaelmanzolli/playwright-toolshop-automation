# Playwright Quality Portfolio

[![Playwright Tests](https://github.com/raphaelmanzolli/playwright-toolshop-automation/actions/workflows/playwright.yml/badge.svg)](https://github.com/raphaelmanzolli/playwright-toolshop-automation/actions/workflows/playwright.yml)

Test automation portfolio for the
[Practice Software Testing (Toolshop)](https://practicesoftwaretesting.com/) educational
e-commerce platform. The application provides both a frontend and a
[documented REST API](https://api.practicesoftwaretesting.com/api/documentation), enabling UI,
API, and integration testing with Playwright and TypeScript.

## What this project demonstrates

- frontend testing on Chromium, Firefox, WebKit, and a mobile viewport;
- REST API testing with status, header, and contract validations;
- an integration scenario that compares API data with the frontend;
- a layered architecture separating locators, functions, steps, and scenarios;
- executable scenarios written in English with Gherkin;
- typed fixtures and TypeScript strict mode;
- execution tags, parallelism, and a GitHub Actions pipeline;
- HTML and JUnit reports, traces, videos, and screenshots for troubleshooting.

## Automated scenarios

| Layer       | Scenario                                                 | Tags                       |
| ----------- | -------------------------------------------------------- | -------------------------- |
| Frontend    | search for a product by name                             | `@front @smoke`            |
| Frontend    | sort products by lowest price                            | `@front @regression`       |
| Frontend    | view product details                                     | `@front @smoke`            |
| API         | validate the product list and its contract               | `@api @smoke`              |
| API         | retrieve a product by ID                                 | `@api @regression`         |
| API         | return 404 for a nonexistent product                     | `@api @negative`           |
| Integration | keep product name and price consistent across API and UI | `@integration @regression` |

## Getting started

Prerequisite: Node.js 20 or later.

```bash
corepack enable
pnpm install
pnpm exec playwright install
cp .env.example .env
pnpm test
```

On Windows PowerShell, use `Copy-Item .env.example .env` instead of `cp`.

## Available commands

```bash
pnpm test:front       # frontend scenarios only
pnpm test:api         # API scenarios only, without launching a browser
pnpm test:integration # API and frontend integration scenarios
pnpm test:smoke       # fast feedback suite
pnpm test:regression  # extended regression suite
pnpm test:ui          # Playwright interactive mode
pnpm report           # open the HTML report
pnpm check            # run every local quality check
```

## Architecture

```text
features/       # business scenarios written in Gherkin
steps/          # implementation of Given, When, and Then steps
src/
├── locators/   # UI element mappings only
├── functions/  # reusable business actions and HTTP clients
├── fixtures/   # typed dependency injection and isolated scenario state
└── types/      # TypeScript contracts for API responses
```

This separation keeps the scenarios readable and reduces maintenance costs. Business rules
live in `features`; sentence automation lives in `steps`; selector changes stay in `locators`;
and workflow changes stay in `functions`.

The `.features-gen` directory is generated automatically before test execution and is not
committed to the repository.

## CI and failure diagnostics

Every push or pull request to `main` triggers the GitHub Actions pipeline. It validates types,
linting, and formatting before running all test projects. The HTML report is retained as an
artifact for 14 days. Playwright collects a trace on retries and preserves screenshots and
videos for failed tests.

## Key decisions

- The suite uses `data-test` selectors and web-first assertions, with no fixed sleeps.
- API tests run once in the dedicated `api` project instead of being duplicated per browser.
- The integration scenario dynamically selects a product returned by the API, avoiding a
  fixed product ID.
- Environment URLs can be overridden through `.env`.
- The risk-based approach is documented in
  [`docs/TEST-STRATEGY.md`](docs/TEST-STRATEGY.md).

---

Built to demonstrate Quality Engineering reasoning, maintainability, and confidence in the
delivery pipeline—not just the number of automated test cases.
