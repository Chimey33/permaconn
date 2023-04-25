import { Router } from 'express'
import { createProduct, getProducts, updateProduct } from './handlers/product'
import { handleInputErrors } from './modules/middleware'
import {body, query} from "express-validator";

const router = Router();

/**
 * Product routes
 */
router.get('/product',
    [
            query('limit').exists().withMessage('Limit is required'),
            query('skip').exists().withMessage('Skip is required'),
            query('q').optional()
    ],
    handleInputErrors,
    getProducts
);

router.put('/product/:id',
    [
            body('id').exists().withMessage('Id is required'),
            body('title').exists().withMessage('Title is required'),
            body('description').exists().withMessage('Description is required'),
            body('price').exists().withMessage('Price is required'),
            body('discountPercentage').exists().withMessage('Discount percentage is required'),
            body('rating').exists().withMessage('Rating is required'),
            body('stock').exists().withMessage('Stock is required'),
            body('brand').exists().withMessage('Brand is required'),
            body('category').exists().withMessage('Category is required'),
            body('thumbnail').exists().withMessage('Thumbnail is required'),
            body('images').exists().withMessage('Images is required'),
    ],
    handleInputErrors,
    updateProduct
);

router.post('/product',
    [
            body('title').exists().withMessage('Title is required'),
            body('description').exists().withMessage('Description is required'),
            body('price').exists().withMessage('Price is required'),
            body('discountPercentage').exists().withMessage('Discount percentage is required'),
            body('rating').exists().withMessage('Rating is required'),
            body('stock').exists().withMessage('Stock is required'),
            body('brand').exists().withMessage('Brand is required'),
            body('category').exists().withMessage('Category is required'),
    ],
    handleInputErrors,
    createProduct
);

export default router