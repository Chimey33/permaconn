import React, {useCallback, useState} from 'react';
import {useDebouncedCallback} from 'use-debounce';
import {useQuery} from "react-query";
import {Alert, Pagination, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {ProductCardSkeleton} from "../card/ProductCardSkeleton";
import {AddOutlined, FilterAltOutlined} from "@mui/icons-material";
import {CreateEditProductDialog} from "../dialog/CreateEditProductDialog";
import {createProduct, getProducts, ProductsSearchRequest} from "../../productService";
import {DEFAULT_PAGINATED_PRODUCTS, DEFAULT_PRODUCT_SEARCH, PaginatedProducts, Product} from "../../types/Product";
import {PageContainer} from "../layout/PageContainer";
import {ProductCard} from "../card/ProductCard";
import {AsyncFallback} from "../async/AsyncFallback";
import './ProductsPage.css';
import {EmptyState} from "../emptyState/EmptyState";
import Typography from "@mui/material/Typography";

/**
 * Displays the loading skeleton in the same format as the expected outcome o a default request
 */
const LoadingSkeleton = () => {
    return (
        <div className={'products'}>
            {Array.from(Array(12)).map((key, index) => <ProductCardSkeleton key={`${key}-${index}`}/>)}
        </div>
    )
}

/**
 * Displays a lst of product cards with search and pagination capabilities
 * Facilitates create and edit functionality of products
 */
export const ProductsPage = (): JSX.Element => {
    const [open, setOpen] = useState(false);
    const [notification, setNotification] = useState<{ message: React.ReactNode, severity: 'success' | 'error' } | undefined>()
    // Maintain local criteria to control inputs, and debounced criteria to correctly initialise searches
    const [localSearchCriteria, setLocalSearchCriteria] = useState<ProductsSearchRequest>(DEFAULT_PRODUCT_SEARCH);
    const [debouncedSearchCriteria, setDebouncedSearchCriteria] = useState<ProductsSearchRequest>(DEFAULT_PRODUCT_SEARCH);
    // Initialise use query to fetch products based on the the debounced params
    const {data = DEFAULT_PAGINATED_PRODUCTS, status} = useQuery<PaginatedProducts>(
        ['searchProducts', debouncedSearchCriteria],
        () => getProducts(debouncedSearchCriteria).then((res) => res.data),
        {
            refetchOnWindowFocus: false
        }
    );

    /**
     * Update local search criteria and debounce the search to prevent unnecessary requests
     */
    const debouncedUpdatSearchCriteria = useDebouncedCallback((updatedSearchCriteria: Partial<ProductsSearchRequest>) => {
        setLocalSearchCriteria((prev) => ({...prev, ...updatedSearchCriteria}));
        setDebouncedSearchCriteria((prev) => ({...prev, ...updatedSearchCriteria}))
    }, 250);

    /**
     * Updates search criteria and de-bounces search if requested
     * @param updatedSearchCriteria the partially updated search criteria
     * @param debounceSearch the (Optional) boolean flag representing if a search should be debounced
     */
    const setSearchCriteria = useCallback(
        (updatedSearchCriteria: Partial<ProductsSearchRequest>, debounceSearch?: boolean): void => {
            // Update the local search criteria, so it can be used by consumer immediately
            setLocalSearchCriteria((prev) => ({...prev, ...updatedSearchCriteria}));
            // Debounce the search if the flag is set
            debounceSearch
                ? debouncedUpdatSearchCriteria(updatedSearchCriteria)
                : setDebouncedSearchCriteria((prev) => ({...prev, ...updatedSearchCriteria}));
        },
        [setLocalSearchCriteria, debouncedUpdatSearchCriteria]
    );

    /**
     * Clear filters returning search criteria to default state
     */
    const clearFilters = useCallback((): void => {
        setLocalSearchCriteria(DEFAULT_PRODUCT_SEARCH);
        setDebouncedSearchCriteria(DEFAULT_PRODUCT_SEARCH);
    }, [DEFAULT_PRODUCT_SEARCH]);


    /**
     * Increment and decrement page count
     * @param _ unused event
     * @param value the page number
     */
    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setSearchCriteria({
            skip: value * 8,
            page: value
        })
    }

    /**
     *  Send create request and create alert to display outcome of the request
     */
    const onCreateProduct = useCallback((product: Partial<Product>) => {
        createProduct(product).then(() => {
            const message = <><strong>{product.title}</strong> successfully created!</>
            setNotification({
                message,
                severity: 'success'
            })
        }).catch((error) => {
            const message = <>{error.message}</>
            setNotification({
                message,
                severity: 'success'
            })
        }).finally(async () => {
            setOpen(false);
        })
    }, [setOpen]);

    return (
        <PageContainer title={'Products'}>
            {notification &&
                <Alert
                    severity={notification.severity}
                    onClose={() => setNotification(undefined)}
                    variant={'filled'}
                >
                    {notification.message}
                </Alert>}
            <CreateEditProductDialog
                dialogTitle={'Create product'}
                open={open}
                onCancel={() => setOpen(false)}
                onSubmit={onCreateProduct}
            />
            <div className={'products__container'}>
                <div className={'products__actions'}>
                    <div className={'search__actions'}>
                        <TextField
                            id={'products search'}
                            label={'Search products'}
                            value={localSearchCriteria.q || ''}
                            onChange={event => {
                                setSearchCriteria({
                                    ...DEFAULT_PRODUCT_SEARCH,
                                    q: event.target.value.length > 0 ? event.target.value : undefined
                                }, true)
                            }}
                            classes={{root: 'search'}}
                        />
                        <Button
                            onClick={clearFilters}
                            variant={'contained'}
                            size={'large'}
                            classes={{root: 'button'}}
                        >
                            Clear filters
                        </Button>
                    </div>
                    <Button
                        onClick={() => setOpen(true)}
                        variant={'contained'}
                        size={'large'}
                        classes={{root: 'button'}}
                        endIcon={<AddOutlined/>}
                    >
                        Add product
                    </Button>
                </div>
                <AsyncFallback
                    status={status}
                    loadingComponent={<LoadingSkeleton/>}
                >
                    <div className={'products'}>
                        {data.products.map((product) =>
                            <ProductCard
                                product={product}
                                key={product.id}
                                onRequestCompletion={(message, severity) => {
                                    setNotification({message, severity});
                                }}
                            />
                        )}
                    </div>
                    <EmptyState
                        title={'No results returned'}
                        variant={'filtered'}
                        icon={<FilterAltOutlined className={'empty-state__icon'}/>}
                        showEmptyState={data.products.length === 0 && status === 'success'}
                        primaryAction={
                            <Button
                                variant={'outlined'}
                                onClick={clearFilters}
                                classes={{root: 'button'}}
                            >
                                Clear filters
                            </Button>
                        }
                    >
                        <Typography variant={'body2'}>
                                Try adjusting your filters to find the product you are looking for.
                        </Typography>
                    </EmptyState>
                </AsyncFallback>
                <div className={'pagination'}>
                    <Pagination
                        count={data && status === 'success' ? Math.floor(data.total / 8) : 10}
                        page={localSearchCriteria.page}
                        variant={'outlined'}
                        color={'primary'}
                        disabled={status === 'loading'}
                        onChange={handlePageChange}
                        aria-label={'pagination controls'}
                    />
                </div>
            </div>
        </PageContainer>
    );
};
