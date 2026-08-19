import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import { defineBddConfig } from 'playwright-bdd';

dotenv.config();

const testDir = defineBddConfig({
  features: 'features/**/*.feature',
  steps: ['steps/**/*.ts', 'src/fixtures/test.ts'],
  language: 'en',
});

export default defineConfig({
  testDir,
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 30_000,
  expect: { timeout: 5_000 },
  reporter: process.env.CI
    ? [['line'], ['html', { open: 'never' }], ['junit', { outputFile: 'test-results/junit.xml' }]]
    : [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: process.env.BASE_URL ?? 'https://practicesoftwaretesting.com',
    testIdAttribute: 'data-test',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
  },
  outputDir: 'test-results/artifacts',
  projects: [
    { name: 'api', grep: /@api/ },
    {
      name: 'chromium',
      grepInvert: /@api/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      grep: /@front/,
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      grep: /@front/,
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      grep: /@front/,
      use: { ...devices['Pixel 7'] },
    },
  ],
});
