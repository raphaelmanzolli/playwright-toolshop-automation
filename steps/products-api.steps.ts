import { createBdd } from 'playwright-bdd';
import { expect, test } from '../src/fixtures/test';

const { Given, When, Then } = createBdd(test);

When('I request the first page of products', async ({ productsApi, scenarioState }) => {
  const { response, body } = await productsApi.list();
  scenarioState.response = response;
  scenarioState.productsPage = body;
});

Then('the API should respond with status {int}', async ({ scenarioState }, status: number) => {
  expect(scenarioState.response).toBeDefined();
  expect(scenarioState.response?.status()).toBe(status);
});

Then('it should return a product list with a valid contract', async ({ scenarioState }) => {
  expect(scenarioState.response?.headers()['content-type']).toContain('application/json');
  expect(scenarioState.productsPage?.current_page).toBe(1);
  expect(scenarioState.productsPage?.data.length).toBeGreaterThan(0);
  expect(scenarioState.productsPage?.data[0]).toEqual(
    expect.objectContaining({
      id: expect.any(String),
      name: expect.any(String),
      price: expect.any(Number),
    }),
  );
});

Given('a product returned by the API exists', async ({ productsApi, scenarioState }) => {
  const { body } = await productsApi.list();
  const product = body.data[0];
  expect(product).toBeDefined();
  scenarioState.requestedProduct = product;
});

When('I request that product by its ID', async ({ productsApi, scenarioState }) => {
  const { response, body } = await productsApi.getById(scenarioState.requestedProduct?.id ?? '');
  scenarioState.response = response;
  scenarioState.responseProduct = body;
});

Then('the details should match the requested product', async ({ scenarioState }) => {
  expect(scenarioState.responseProduct?.id).toBe(scenarioState.requestedProduct?.id);
  expect(scenarioState.responseProduct?.name).toBe(scenarioState.requestedProduct?.name);
});

When('I request a product with a nonexistent ID', async ({ productsApi, scenarioState }) => {
  scenarioState.response = await productsApi.getResponseById('product-that-does-not-exist');
});
