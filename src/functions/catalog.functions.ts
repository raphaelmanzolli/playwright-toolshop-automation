import { expect, type Page } from '@playwright/test';
import { CatalogLocators } from '../locators/catalog.locators';

/** Fluxos e comportamentos reutilizáveis do catálogo. */
export class CatalogFunctions {
  readonly locators: CatalogLocators;

  constructor(private readonly page: Page) {
    this.locators = new CatalogLocators(page);
  }

  async open(): Promise<void> {
    await this.page.goto('/');
    await expect(this.locators.productCards.first()).toBeVisible({ timeout: 15_000 });
  }

  async searchFor(term: string): Promise<void> {
    await this.locators.searchInput.fill(term);
    await this.locators.searchButton.click();
    await expect(this.locators.searchButton).toBeEnabled();
  }

  async sortBy(value: 'name,asc' | 'name,desc' | 'price,asc' | 'price,desc'): Promise<void> {
    await this.locators.sortSelect.selectOption(value);
  }

  async openProduct(name: string): Promise<void> {
    await this.locators.productCard(name).click();
  }

  async visiblePrices(): Promise<number[]> {
    const priceTexts = await this.locators.productPrices.allTextContents();
    return priceTexts.map((price) => Number(price.replace('$', '')));
  }
}
