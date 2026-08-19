import { createBdd } from 'playwright-bdd';
import { expect, test } from '../src/fixtures/test';

const { Given, When, Then } = createBdd(test);

Given('the API returns an in-stock product', async ({ productsApi, scenarioState }) => {
  const { body } = await productsApi.list();
  scenarioState.product = body.data.find((product) => product.in_stock);
  expect(scenarioState.product, 'the API should return an in-stock product').toBeDefined();
});

When('I search for that product in the catalog', async ({ catalog, scenarioState }) => {
  await catalog.open();
  await catalog.searchFor(scenarioState.product?.name ?? '');
});

Then(
  'the displayed name and price should match the API data',
  async ({ catalog, scenarioState }) => {
    const product = scenarioState.product;
    expect(product).toBeDefined();
    await expect(catalog.locators.productCard(product?.name ?? '')).toBeVisible();
    await expect(catalog.locators.productCard(product?.name ?? '')).toContainText(
      `$${product?.price.toFixed(2)}`,
    );
  },
);
