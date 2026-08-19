import { createBdd } from 'playwright-bdd';
import { expect, test } from '../src/fixtures/test';

const { Given, When, Then } = createBdd(test);

Given('I am on the product catalog', async ({ catalog }) => {
  await catalog.open();
});

When('I search for the product {string}', async ({ catalog }, name: string) => {
  await catalog.searchFor(name);
});

Then('I should see only the product {string}', async ({ catalog }, name: string) => {
  await expect(catalog.locators.productCards).toHaveCount(1);
  await expect(catalog.locators.productNames).toHaveText([name]);
});

When('I sort the products by lowest price', async ({ catalog }) => {
  await catalog.sortBy('price,asc');
});

Then('the prices should be displayed in ascending order', async ({ catalog }) => {
  await expect
    .poll(async () => {
      const prices = await catalog.visiblePrices();
      return prices.every((price, index) => index === 0 || (prices[index - 1] ?? price) <= price);
    })
    .toBe(true);
});

When('I open the product {string}', async ({ catalog }, name: string) => {
  await catalog.openProduct(name);
});

Then(
  'I should see the product {string} priced at {float}',
  async ({ productDetails }, name: string, price: number) => {
    await productDetails.expectProduct(name, price);
  },
);
