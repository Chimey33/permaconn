import {PaginatedProducts, Product} from "../../types/Product";

/**
 * Builds a product with default values for testing
 * @param overrides the (Optional) props used to override the default values
 */
export const buildProduct = (overrides?: Partial<Product>): Product => {
 return {
     id: 1,
     title: 'Test product',
     description: 'A description',
     price: 133.14,
     discountPercentage: 14.28,
     rating: 4.22,
     stock: 10,
     brand: 'GloboCorp',
     category: 'motorcycle',
     thumbnail: 'thumbnail',
     images: ['image-01'],
     ...overrides
 }
}

/**
 * Builds a paginated product response with default values for testing
 * @param overrides the (Optional) props used to override the default values
 */
export const buildPaginatedProduct = (overrides?: Partial<PaginatedProducts>): PaginatedProducts => {
    return {
        products: [buildProduct()],
        limit: 12,
        skip: 0,
        total: 1,
        ...overrides
    }
}