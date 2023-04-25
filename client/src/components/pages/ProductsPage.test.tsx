import React from 'react';
import {ProductsPage} from './ProductsPage';
import {render, screen, waitFor} from '@testing-library/react';
import {QueryClientTestWrapper} from "../../utils/testUtils/QueryClientTestWrapper";
import {getProducts} from "../../productService";
import {buildPaginatedProduct} from "../../utils/testUtils/testDataBuilder";
import {hangPromise} from "../../utils/testUtils/testUtils";
import {PaginatedProducts} from "../../types/Product";
import {clickButton, pasteInTextbox} from "../../utils/testUtils/reactTestingLibraryUtils";

jest.mock('../../productService')
const mockedGetProducts = getProducts as jest.Mock;

const TestComponent = (): JSX.Element => {
    return (
        <QueryClientTestWrapper>
            <ProductsPage/>
        </QueryClientTestWrapper>
    )
}

const paginatedProducts = buildPaginatedProduct()

beforeEach(() => {
    mockedGetProducts.mockImplementation(() => Promise.resolve({data: paginatedProducts}))
});

afterEach(() => {
    mockedGetProducts.mockClear();
})

describe('<ProductsPage/>', () => {
    describe('Initialisation render with correct structure',  () => {
        test('should render with correct structure', async () => {
            render(<TestComponent/>);

            expect(screen.getByRole('textbox', {name: /search products/i})).toBeVisible();

            await waitFor(() => expect(screen.getByText('Test product')).toBeVisible());
            expect(screen.getByLabelText(/pagination controls/i)).toBeVisible();
        });
    });

    describe('Loading states', () => {
        test('should render loading skeleton when request is loading', async () => {
            const resolvePromise = hangPromise<PaginatedProducts>(mockedGetProducts);

            render(<TestComponent/>);

            await waitFor(() => expect(screen.getAllByLabelText(/product card loading skeleton/i)).toHaveLength(12));

            resolvePromise(Promise.resolve({data: paginatedProducts}));

            await waitFor(() => expect(screen.queryByLabelText(/product card loading skeleton/i)).not.toBeInTheDocument());

        });

        test('should render fallback when empty results returned', async () => {
            mockedGetProducts.mockImplementationOnce(() => Promise.resolve(
                {
                    data: {
                        ...paginatedProducts,
                        products: []
                    }
                }))

            render(<TestComponent/>);

            await waitFor(() => expect(screen.getByText(/no results returned/i)).toBeVisible());
        });
    });


    describe('User actions', () => {
        test('should invoke callbacks correctly update request params accordingly', async () => {
            render(<TestComponent/>);

            // Searching for value fires new request
            await pasteInTextbox(/search/i, 'new search');
            await waitFor(() => expect(mockedGetProducts).toHaveBeenCalledWith({
                "limit": 12,
                "page": 1,
                "skip": 0,
                q: 'new search'
            }));

            // Clearing filters defaults
            await clickButton(/clear filters/i);
            await waitFor(() => expect(mockedGetProducts).toHaveBeenCalledWith({
                "limit": 12,
                "page": 1,
                "skip": 0,
            }));
        });

        test('should display dialog when add product is clicked', async () => {
            render(<TestComponent/>);

            await clickButton(/add product/i);
            await waitFor(() => expect(screen.getByText('Create product')).toBeVisible());
        });
    });
});
