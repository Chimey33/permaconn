import {Request} from "express";
import axios from "axios";

/**
 * Defines the parameters available for searches related to products
 */
interface SearchProductsRequest extends Request {
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
}

/**
 * Search products
 */
export const getProducts = async (req: Request<{}, {}, {}, SearchProductsRequest>, res) => {
    const {q, limit, skip } = req.query;
    const url = q ? '/search' : '';

    const response = await axios.get(`https://dummyjson.com/products${url}`, { params: { q, limit: +limit, skip: +skip } });
    res.json(response.data);
}

/**
 * Create a product
 */
export const createProduct = async (req, res) => {
    const response = await axios.post('https://dummyjson.com/products/add',  {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body)
    });
    res.json(response.data);
}


/**
 * Update product
 */
export const updateProduct = async (req, res) => {
    const response =  await axios.put(`https://dummyjson.com/products/${req.params.id}`, {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body)
    });
    res.json(response.data);
}