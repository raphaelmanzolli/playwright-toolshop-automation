import { expect, type Page } from '@playwright/test';
import { ProductDetailsLocators } from '../locators/product-details.locators';

/** Validações e ações reutilizáveis dos detalhes de produto. */
export class ProductDetailsFunctions {
  readonly locators: ProductDetailsLocators;

  constructor(private readonly page: Page) {
    this.locators = new ProductDetailsLocators(page);
  }

  async expectProduct(name: string, price: number): Promise<void> {
    await expect(this.page).toHaveURL(/\/product\//);
    await expect(this.locators.name).toHaveText(name);
    await expect(this.locators.price).toContainText(price.toFixed(2));
    await expect(this.locators.description).not.toBeEmpty();
  }
}
