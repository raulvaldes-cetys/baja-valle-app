import api from './axios';
import ENDPOINTS from './endpoints';
import { AuthResponse, AuthTokens, CartMailBody, CategoriesListResponse, ContactMailBody, LoginBody, ProductByIdResponse, ProductsListResponse, RegisterBody, UpdateProfileBody, UserProfile } from './types/api-types';


export class Api {
    static async getProductsList(): Promise<ProductsListResponse> {
        try {
            const response = await api.get(ENDPOINTS.PRODUCTS, {});
            const raw = response.data;
            // API returns array directly, normalize to expected shape
            return { products: Array.isArray(raw) ? raw : raw.products ?? [] };
        } catch (error) {
            console.error('Error fetching products list:', error);
            throw error;
        }
    }

    static async getProductDetails(productId: string): Promise<ProductByIdResponse> {
        try {
            const response = await api.get(`${ENDPOINTS.PRODUCTS}/${productId}`, {});
            return response.data;
        } catch (error) {
            console.error(`Error fetching product details for ID ${productId}:`, error);
            throw error;
        }
    }

    static async getCategoriesList(): Promise<CategoriesListResponse> {
        try {
            const response = await api.get(ENDPOINTS.CATEGORIES, {});
            const raw = response.data;
            return { categories: Array.isArray(raw) ? raw : raw.categories ?? [] };
        } catch (error) {
            console.error('Error fetching categories list:', error);
            throw error;
        }
    }

    static async login(body: LoginBody): Promise<AuthResponse> {
        const response = await api.post(ENDPOINTS.AUTH_LOGIN, body);
        return response.data;
    }

    static async register(body: RegisterBody): Promise<AuthResponse> {
        const response = await api.post(ENDPOINTS.AUTH_REGISTER, body);
        return response.data;
    }

    static async refresh(refreshToken: string): Promise<AuthTokens> {
        const response = await api.post(ENDPOINTS.AUTH_REFRESH, { refreshToken });
        return response.data;
    }

    static async logout(): Promise<void> {
        await api.post(ENDPOINTS.AUTH_LOGOUT);
    }

    static async getProfile(): Promise<UserProfile> {
        const response = await api.get(ENDPOINTS.PROFILE);
        return response.data;
    }

    static async updateProfile(body: UpdateProfileBody): Promise<UserProfile> {
        const response = await api.patch(ENDPOINTS.PROFILE, body);
        return response.data;
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
        } catch (error: any) {
            console.error('Error sending cart mail:', error);
            console.error('Response status:', error?.response?.status);
            console.error('Response data:', JSON.stringify(error?.response?.data, null, 2));
            console.error('Request body sent:', JSON.stringify(body, null, 2));
            throw error;
        }
    }
}