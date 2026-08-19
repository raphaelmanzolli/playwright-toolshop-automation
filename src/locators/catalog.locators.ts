import type { Locator, Page } from '@playwright/test';

/** Elementos do catálogo. Nenhuma ação ou asserção deve viver nesta camada. */
export class CatalogLocators {
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly resetSearchButton: Locator;
  readonly sortSelect: Locator;
  readonly productCards: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;

  constructor(private readonly page: Page) {
    this.searchInput = page.getByTestId('search-query');
    this.searchButton = page.getByTestId('search-submit');
    this.resetSearchButton = page.getByTestId('search-reset');
    this.sortSelect = page.getByTestId('sort');
    this.productCards = page.locator('a[data-test^="product-"]');
    this.productNames = page.getByTestId('product-name');
    this.productPrices = page.getByTestId('product-price');
  }

  productCard(name: string): Locator {
    return this.productCards.filter({
      has: this.page.getByTestId('product-name').getByText(name, { exact: true }),
    });
  }
}
