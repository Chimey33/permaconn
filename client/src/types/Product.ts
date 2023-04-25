import {ProductsSearchRequest} from "../productService";
import * as yup from "yup";

/**
 * Interface defining the fields that make up a product
 */
export interface Product {
    /**
     * The identifier of the product
     */
    id: number;
    /**
     * The name of the products
     */
    title: string;
    /**
     * A short description of the product
     */
    description: string;
    /**
     * The price of the product
     */
    price: number;
    /**
     * The percentage applied as a discount to the product
     */
    discountPercentage: number;
    /**
     * The rating out of 5 for a product
     */
    rating: number;
    /**
     * The number of items in stock
     */
    stock: number;
    /**
     * The brand of the product
     */
    brand: string;
    /**
     * The {@link Categories} of the products
     */
    category: string;
    /**
     * A url to a a quick snapshot image
     */
    thumbnail: string;
    /**
     * A list of urls containing images of the product
     */
    images: string[];
}

/**
 * Interface defining the fields available as part of paginated product requests
 */
export interface PaginatedProducts {
    /**
     * The list of products to display
     */
    products: Product[];
    /**
     * The total number of results
     */
    total: number;
    /**
     * The number of records skipped as part of the search
     */
    skip: number;
    /**
     * The max number of results to return
     */
    limit: number;
}

/**
 * The default response if no data is returned as part of the request
 */
export const DEFAULT_PAGINATED_PRODUCTS = {
    products: [],
    total: 0,
    skip: 0,
    limit: 12,
}

/**
 * The default search applied to a product search
 */
export const DEFAULT_PRODUCT_SEARCH: ProductsSearchRequest = {
    limit: 12,
    skip: 0,
    page: 1,
}

/**
 * Validation available for the create and edit product dialog
 */
export const ProductValidationSchema = yup.object({
    title: yup
        .string()
        .min(1, 'Title should contain a minimum of 1 characters')
        .max(40, 'Title should contain no more than 40 characters')
        .required('Title is required'),
    brand: yup
        .string()
        .min(1, 'Brand should contain a minimum of 1 characters')
        .max(40, 'Brand should contain no more than 40 characters')
        .required('Brand is required'),
    description: yup
        .string()
        .min(1, 'Description should contain a minimum of 1 characters')
        .max(200, 'Description should contain no more than 200 characters')
        .required('Description is required'),
    price: yup
        .number()
        .required('Price is required'),
    rating: yup
        .number()
        .min(0, 'Rating should be greater than or equal to zero')
        .max(5, 'Rating should be less than or equal to five'),
    stock: yup
        .number()
        .integer()
        .min(0, 'Rating should be greater than or equal to zero'),
    category: yup
        .string()
        .required('Category is required'),
});

/**
 * The list of available categories that a product can fall into
 */
export const Categories = [
    'smartphones',
    'laptops',
    'fragrances',
    'skincare',
    'groceries',
    'home-decoration',
    'furniture',
    'tops',
    'womens-dresses',
    'womens-shoes',
    'mens-shirts',
    'mens-shoes',
    'mens-watches',
    'womens-watches',
    'womens-bags',
    'womens-jewellery',
    'sunglasses',
    'automotive',
    'motorcycle',
    'lighting'
];