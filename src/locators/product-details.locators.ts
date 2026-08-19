import type { Locator, Page } from '@playwright/test';

/** Elementos da página de detalhes de um produto. */
export class ProductDetailsLocators {
  readonly name: Locator;
  readonly price: Locator;
  readonly description: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.name = page.getByTestId('product-name');
    this.price = page.getByTestId('unit-price');
    this.description = page.getByTestId('product-description');
    this.addToCartButton = page.getByTestId('add-to-cart');
  }
}
