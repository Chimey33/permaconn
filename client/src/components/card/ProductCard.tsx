import * as React from 'react';
import {useCallback, useState} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {Product} from "../../types/Product";
import {EditOutlined} from "@mui/icons-material";
import {ProductImageStepper} from "./productCard/ProductImageStepper";
import {Rating, Tooltip} from "@mui/material";
import './ProductCard.css';
import {CreateEditProductDialog} from "../dialog/CreateEditProductDialog";
import { updateProduct } from "../../productService";
import {AxiosError} from "axios";

/**
 * Interface defining the props available for the {@link ProductCard}
 */
export interface ProductCardProps {
    /**
     * The product to display the details for
     */
    product: Product;
    /**
     * Callback invoked when product editing request has been completed
     * @param message the message to display
     * @param severity the alert severity
     */
    onRequestCompletion: (message: React.ReactNode, severity: 'success' | 'error') => void;
}

const mapErrors = (error: AxiosError) => {
    return <>
        {/*{error.response?.data?.errors?.map(() => {*/}
        {/*    return (*/}
        {/*    <></>*/}
        {/*    )*/}
        {/*})}*/}
            </>
}

/**
 * Displays the details for an individual product and facilitates product editing
 */
export const ProductCard = ({product, onRequestCompletion}: ProductCardProps) => {
    const {title, price, rating, description, images} = product;
    const [open, setOpen] = useState(false);

    /**
     *  Send edit request and create alert to display outcome of the request
     */
    const onEditProduct = useCallback((product: Partial<Product>) => {
        const validatedProduct: Product = Object.assign(product);
        updateProduct(validatedProduct).then((res) => {
            const message =  <><strong>{res.data.title}</strong> successfully edited!</>
            onRequestCompletion(message, 'success');
        }).catch((error) => {
            const message =  <>{error.message}</>
            onRequestCompletion(message, 'error');
        }).finally(() => setOpen(false))

    }, [setOpen])

    return (
        <>
            <CreateEditProductDialog
                dialogTitle={'Edit product'}
                open={open}
                product={product}
                onCancel={() => setOpen(false)}
                onSubmit={onEditProduct}
            />
            <Card classes={{root: 'product-card__card'}} aria-label={title}>
                <CardHeader
                    classes={{
                        root: 'product-card__card-header',
                        content: 'product-card__card-header--content'
                    }}
                    action={
                        <Tooltip title={`Edit ${title}`} arrow placement={'left'}>
                        <IconButton aria-label={`edit ${title}`} onClick={() => setOpen(true)}>
                            <EditOutlined/>
                        </IconButton>
                        </Tooltip>
                    }
                    title={<Typography variant={'subtitle1'}>{title}</Typography>}
                    subheader={
                    <Typography variant={'subtitle1'} classes={{ root: 'product-card__sub-title'}}>
                        {`$${price.toFixed(2)}`}
                    </Typography>
                }
                />
                <ProductImageStepper images={images} title={title}/>
                <div className={'product-card--card-actions'}>
                    <Typography variant={'body2'} color={'text.secondary'}>
                        {description.length > 80 ? `${description.slice(0, 80)}...`: description}
                    </Typography>
                    <Rating name={`${title} rating`} value={rating} readOnly precision={0.1} aria-label={`${title} rating`}/>
                </div>
            </Card>
        </>
    );
}