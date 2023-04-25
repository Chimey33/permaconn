import React from 'react';
import { ProductImageStepper } from './ProductImageStepper';
import { render, screen, waitFor } from '@testing-library/react';
import { clickButton } from "../../../utils/testUtils/reactTestingLibraryUtils";

const TestComponent = (): JSX.Element => {
    return (<ProductImageStepper title={'Image stepper'} images={['image-1', 'image-2']}/>)
}

describe('<ProductImageStepper/>', () => {
    describe('Initialisation', () => {
        test('should render correctly', () => {
            render(<TestComponent/>);
            expect(screen.getByLabelText(/image stepper image 0/i)).toBeVisible();
            expect(screen.getByRole('button', { name: /image stepper next image/i})).toBeVisible();
            expect(screen.getByRole('button', { name: /image stepper previous image/i})).toBeVisible();
        });
    });

    describe('User actions', () => {
        test('should step through images correctly', async () => {
            render(<TestComponent/>);
            expect(screen.getByLabelText(/image stepper image 0/i)).toBeVisible();
            await clickButton(/image stepper next image/i);

            await waitFor(() => expect(screen.getByLabelText(/image stepper image 1/i)).toBeVisible());
            expect(screen.queryByLabelText(/image stepper image 0/i)).not.toBeInTheDocument();
        });
    });
});
