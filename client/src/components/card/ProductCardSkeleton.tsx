import React from 'react';
import Card from "@mui/material/Card";
import { Skeleton } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import './ProductCardSkeleton.css'

/**
 * Displays the formatted loading skeleton for a product card
 */
export const ProductCardSkeleton = (): JSX.Element => {
    return (
        <Card classes={{root: 'product-skeleton__card'}} aria-label={'product card loading skeleton'}>
            <CardHeader
                action={<Skeleton animation={'wave'} height={40} width={40} variant={'circular'}/>}
                title={<Skeleton animation={'wave'} width={'80%'}/>}
                subheader={<Skeleton animation={'wave'} height={30} width={'20%'}/>}
            />
            <Skeleton sx={{height: 300}} animation={'wave'} variant={'rectangular'}/>
            <div className={'product-skeleton__stepper'}>
                <Skeleton animation={'wave'} height={40} width={40} variant={'circular'}/>
                <Skeleton animation={'wave'} height={40} width={40} variant={'circular'}/>
            </div>
            <CardContent>
                <>
                    <Skeleton animation={'wave'} height={30}/>
                    <Skeleton animation={'wave'} height={30} width={'80%'}/>
                </>
            </CardContent>
            <CardActions classes={{ root: 'product-skeleton__card-actions'}}>
                <Skeleton animation={'wave'} height={30} width={'20%'}/>
            </CardActions>
        </Card>
    );
}
