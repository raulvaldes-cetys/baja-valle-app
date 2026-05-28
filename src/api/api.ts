import api from './axios';
import ENDPOINTS from './endpoints';
import { CartMailBody, ContactMailBody, ProductsListResponse } from './types/api-types';

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

    static async postMailContact(body: ContactMailBody): Promise<void> {
        try {
            await api.post(ENDPOINTS.POST_MAIL_CONTACT, body);
        } catch (error) {
            console.error('Error sending contact mail:', error);
            throw error;
        }
    }

    static async postMailCart(body: CartMailBody): Promise<void> {
        try {
            await api.post(ENDPOINTS.POST_MAIL_CART, body);
        } catch (error) {
            console.error('Error sending cart mail:', error);
            throw error;
        }
    }
}