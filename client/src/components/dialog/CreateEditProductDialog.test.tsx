import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Product } from "../../types/Product";
import { CreateEditProductDialog } from "./CreateEditProductDialog";
import { buildProduct } from "../../utils/testUtils/testDataBuilder";
import { assertTextBoxDisplayValue, clickButton } from "../../utils/testUtils/reactTestingLibraryUtils";

const mockOnCancel = jest.fn();
const mockOnSubmit = jest.fn();
const product = buildProduct();

interface TestProps {
    product?: Product;
    open?: boolean;
}

const TestComponent = ({product, open = true}: TestProps) => {
    return (
        <CreateEditProductDialog
            dialogTitle={'Create product'}
            product={product}
            open={open}
            onCancel={mockOnCancel}
            onSubmit={mockOnSubmit}
        />
    );
};

const assertDefaultDialogValues = () => {
    expect(screen.getByText(/create product/i)).toBeVisible();
    expect(screen.getByLabelText(/create product dialog/i)).toBeVisible();
    expect(screen.getByRole('button', { name: /confirm/i })).toBeVisible();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeVisible();
}

describe('<CreateEditProductDialog />', () => {
   describe('Initialisation', () => {
       test('should render with correct structure when product not provided', () => {
           render(<TestComponent/>);
           assertDefaultDialogValues();
           assertTextBoxDisplayValue(/title/i, '');
           assertTextBoxDisplayValue(/description/i, '');
           assertTextBoxDisplayValue(/brand/i, '');
           assertTextBoxDisplayValue(/rating/i, '');
           assertTextBoxDisplayValue(/price/i, '');
           assertTextBoxDisplayValue(/discount percentage/i, '');
           assertTextBoxDisplayValue(/stock/i, '');
       });

       test('should render with correct structure when product is provided', () => {
           render(<TestComponent product={product}/>);
           assertDefaultDialogValues();
           assertTextBoxDisplayValue(/title/i, 'Test product');
           assertTextBoxDisplayValue(/description/i, 'A description');
           assertTextBoxDisplayValue(/brand/i, 'GloboCorp');
           assertTextBoxDisplayValue(/rating/i, '4.22');
           assertTextBoxDisplayValue(/price/i, '133.14');
           assertTextBoxDisplayValue(/discount percentage/i, '14.28');
           assertTextBoxDisplayValue(/stock/i, '10');
       });

       test('should render with correct structure when dialog closed', () => {
           render(<TestComponent open={false}/>);
           expect(screen.queryByLabelText(/create product dialog/i)).not.toBeInTheDocument();
           expect(screen.queryByText(/create product/i)).not.toBeInTheDocument();
       });
   });

    describe('User actions', () => {
        test('should invoke correct callbacks', async () => {
            render(<TestComponent product={product}/>);
            await clickButton(/confirm/i);

            await waitFor(() => expect(mockOnSubmit).toHaveBeenCalledWith(product));

            await clickButton(/cancel/i);

            await waitFor(() => expect(mockOnCancel).toHaveBeenCalled());
        });
    });
});
