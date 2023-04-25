import React from 'react';
import { ProductCard } from './ProductCard';
import { render, screen, waitFor } from '@testing-library/react';
import { buildProduct } from "../../utils/testUtils/testDataBuilder";
import { updateProduct } from "../../productService";
import { clickButton, hoverAndAssertTooltip } from "../../utils/testUtils/reactTestingLibraryUtils";

jest.mock("../../productService");

const mockedUpdatedProduct = updateProduct as jest.Mock;
const mockedOnRequestCompletion = jest.fn();

const product = buildProduct();

const TestComponent = (): JSX.Element => {
    return (<ProductCard product={product} onRequestCompletion={mockedOnRequestCompletion}/>)
}

beforeEach(() => {
   mockedUpdatedProduct.mockImplementation(() => Promise.resolve())
});

describe('<ProductCard/>', () => {
    describe('Initialisation', () => {
        test('should render with correct structure', () => {
            render(<TestComponent/>);
            expect(screen.getByText(product.title)).toBeVisible();
            expect(screen.getByText(`$${product.price}`)).toBeVisible();
            expect(screen.getByText(product.description)).toBeVisible();
            expect(screen.getByRole('button', { name: `edit ${product.title}`})).toBeVisible();
            expect(screen.getByLabelText(`${product.title} image 0`)).toBeVisible();
            expect(screen.getByLabelText(`${product.title} rating`)).toBeVisible();
        });
    });

    describe('User actions', () => {
        test('should display tooltip correctly when edit icon hovered', () => {
            render(<TestComponent/>);
            const button = screen.getByRole('button', { name: /edit test product/i});
            hoverAndAssertTooltip(button, /edit test product/i);
        });

        test('should perform product update functionality correctly', async () => {
            render(<TestComponent/>);
            await clickButton(/edit test product/i);

            await waitFor(() => expect(screen.getByText('Edit product')).toBeVisible());
            await clickButton(/confirm/i);

            expect(mockedOnRequestCompletion).toBeCalled();
        });
    });
});
