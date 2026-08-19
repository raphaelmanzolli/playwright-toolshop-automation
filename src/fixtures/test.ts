import type { APIResponse } from '@playwright/test';
import { test as base } from 'playwright-bdd';
import { CatalogFunctions } from '../functions/catalog.functions';
import { ProductDetailsFunctions } from '../functions/product-details.functions';
import { ProductsApiFunctions } from '../functions/products-api.functions';
import type { Product, ProductsPage } from '../types/product';

export type ScenarioState = {
  response?: APIResponse;
  productsPage?: ProductsPage;
  product?: Product;
  requestedProduct?: Product;
  responseProduct?: Product;
};

type ProjectFixtures = {
  catalog: CatalogFunctions;
  productDetails: ProductDetailsFunctions;
  productsApi: ProductsApiFunctions;
  scenarioState: ScenarioState;
};

export const test = base.extend<ProjectFixtures>({
  catalog: async ({ page }, use) => use(new CatalogFunctions(page)),
  productDetails: async ({ page }, use) => use(new ProductDetailsFunctions(page)),
  productsApi: async ({ request }, use) => use(new ProductsApiFunctions(request)),
  // A fixture precisa receber o primeiro argumento, mesmo sem depender de outra fixture.
  // eslint-disable-next-line no-empty-pattern
  scenarioState: async ({}, use) => use({}),
});

export { expect } from '@playwright/test';
