import type { APIRequestContext, APIResponse } from '@playwright/test';
import type { Product, ProductsPage } from '../types/product';

/** Cliente HTTP da API de produtos, sem asserções de cenário. */
export class ProductsApiFunctions {
  constructor(
    private readonly request: APIRequestContext,
    private readonly apiUrl = process.env.API_URL ?? 'https://api.practicesoftwaretesting.com',
  ) {}

  async list(page = 1): Promise<{ response: APIResponse; body: ProductsPage }> {
    const response = await this.request.get(`${this.apiUrl}/products`, { params: { page } });
    return { response, body: (await response.json()) as ProductsPage };
  }

  async getById(id: string): Promise<{ response: APIResponse; body: Product }> {
    const response = await this.request.get(`${this.apiUrl}/products/${id}`);
    return { response, body: (await response.json()) as Product };
  }

  async getResponseById(id: string): Promise<APIResponse> {
    return this.request.get(`${this.apiUrl}/products/${id}`);
  }
}
