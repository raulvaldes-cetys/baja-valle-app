import api from './axios';
import ENDPOINTS from './endpoints';
import { ProductsListResponse } from './types/api-types';

export class Api {
    static async getProductsList(): Promise<ProductsListResponse> {
        try {
            const response = await api.get(ENDPOINTS.PRODUCTS, {});
            return response.data;
        } catch (error) {
            console.error('Error fetching products list:', error);
            throw error;
        }
    }

    static async getProductDetails(productId: string) {
        try {
            const response = await api.get(`${ENDPOINTS.PRODUCTS}/${productId}`, {});
            return response.data;
        } catch (error) {
            console.error(`Error fetching product details for ID ${productId}:`, error);
            throw error;
        }
    }

    static async getCategoriesList() {
        try {
            const response = await api.get(ENDPOINTS.CATEGORIES, {});
            return response.data;
        } catch (error) {
            console.error('Error fetching categories list:', error);
            throw error;
        }
    }
}