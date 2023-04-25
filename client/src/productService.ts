import axios, {AxiosResponse} from "axios";
import {Product} from "./types/Product";

/**
 * Interface defining the properties available for a Product search
 */
export interface ProductsSearchRequest {
    /**
     * The rule type to group the statistics by
     */
    q?: string;
    /**
     * The maximum number of results to return
     */
    limit?: number;
    /**
     *  The number of results to skip
     */
    skip?: number;
    /**
     * The current page number
     */
    page: number;
}

/**
 * Searches for a list of products based on search parameters
 */
export const getProducts = async ({q, limit, skip}: ProductsSearchRequest): Promise<AxiosResponse> => {
    return await axios.get(`http://localhost:3001/api/product`, { params: { q, limit, skip } });
};

/**
 * Creates a new product
 */
export const createProduct = async (productToCreate: Partial<Product>): Promise<AxiosResponse> => {
    return await axios.post('http://localhost:3001/api/product',  {...productToCreate});
};

/**
 * Updates the product with the given id
 */
export const updateProduct = async (productToUpdate: Product): Promise<AxiosResponse> => {
    return await axios.put(`http://localhost:3001/api/product/${productToUpdate.id}`, {...productToUpdate});
};